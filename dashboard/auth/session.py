"""
Syntropic AI - Módulo de Autenticación, Registro y Base de Datos Local
Gestión de usuarios en SQLite con hash de contraseñas seguro, control de roles (RBAC) y sesiones en Streamlit
"""

import os
import time
import sqlite3
import hashlib
import secrets
import streamlit as st
from typing import List, Optional, Dict, Any

# Roles permitidos en el ecosistema Syntropic AI
ROLE_SUPERADMIN = "SuperAdmin"
ROLE_TALENT_LEAD = "Talent Lead"
ROLE_RECRUITER = "Recruiter"
ROLE_HIRING_MANAGER = "Hiring Manager"
ROLE_INTERVIEWER = "Technical Interviewer"
ROLE_CANDIDATE = "Candidato"

ALL_ROLES = [
    ROLE_SUPERADMIN,
    ROLE_TALENT_LEAD,
    ROLE_RECRUITER,
    ROLE_HIRING_MANAGER,
    ROLE_INTERVIEWER,
    ROLE_CANDIDATE
]

# Ruta de la base de datos SQLite local
DB_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data")
os.makedirs(DB_DIR, exist_ok=True)
DB_PATH = os.path.join(DB_DIR, "users.db")


def get_db_connection():
    """Crea una conexión con la base de datos SQLite."""
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


def hash_password(password: str, salt: Optional[str] = None) -> tuple[str, str]:
    """Genera un hash SHA-256 seguro con salt para almacenar la contraseña."""
    if not salt:
        salt = secrets.token_hex(16)
    hashed = hashlib.sha256((password + salt).encode('utf-8')).hexdigest()
    return hashed, salt


def verify_password(password: str, stored_hash: str, salt: str) -> bool:
    """Verifica si la contraseña ingresada coincide con el hash almacenado."""
    expected_hash, _ = hash_password(password, salt)
    return secrets.compare_digest(expected_hash, stored_hash)


def init_db():
    """Inicializa las tablas de SQLite y crea el usuario inicial si no existe."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        role TEXT NOT NULL,
        tenant_name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS position_candidates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        position_title TEXT NOT NULL,
        candidato TEXT NOT NULL,
        email TEXT NOT NULL,
        token TEXT NOT NULL,
        url TEXT NOT NULL,
        expira_en TEXT NOT NULL DEFAULT '48h 00m',
        estado TEXT NOT NULL DEFAULT 'No utilizado',
        tenant_name TEXT NOT NULL DEFAULT 'Franja Automations',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    conn.commit()

    # Sembrar usuario por defecto si la base está vacía
    cursor.execute("SELECT COUNT(*) as count FROM users")
    count = cursor.fetchone()["count"]
    if count == 0:
        h1, s1 = hash_password("demo123")
        cursor.execute("""
        INSERT INTO users (nombre, email, password_hash, salt, role, tenant_name)
        VALUES (?, ?, ?, ?, ?, ?)
        """, (
            "Elena Rostova",
            "elena.rostova@techcorp.io",
            h1,
            s1,
            ROLE_TALENT_LEAD,
            "TechCorp Inc."
        ))
        conn.commit()
    conn.close()


def register_user(nombre: str, email: str, password: str, role: str = ROLE_TALENT_LEAD, tenant_name: str = "TechCorp Inc.") -> tuple[bool, str]:
    """
    Registra un usuario real con correo y contraseña en la base de datos SQLite.
    Retorna (éxito: bool, mensaje: str).
    """
    email_clean = email.strip().lower()
    if not email_clean or "@" not in email_clean:
        return False, "Por favor ingresa un correo electrónico válido."
    if len(password) < 6:
        return False, "La contraseña debe tener al menos 6 caracteres."
    if not nombre.strip():
        nombre = email_clean.split("@")[0].capitalize()

    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        pwd_hash, salt = hash_password(password)
        cursor.execute("""
        INSERT INTO users (nombre, email, password_hash, salt, role, tenant_name)
        VALUES (?, ?, ?, ?, ?, ?)
        """, (nombre.strip(), email_clean, pwd_hash, salt, role, tenant_name.strip()))
        conn.commit()
        conn.close()
        return True, f"¡Usuario {email_clean} registrado con éxito! Ya puedes iniciar sesión."
    except sqlite3.IntegrityError:
        conn.close()
        return False, f"El correo '{email_clean}' ya está registrado. Por favor inicia sesión."
    except Exception as e:
        conn.close()
        return False, f"Error al registrar: {str(e)}"


def authenticate_user(email: str, password: str) -> Optional[Dict[str, Any]]:
    """
    Verifica las credenciales en la base de datos SQLite.
    Retorna el diccionario del usuario si es correcto, o None si falla.
    """
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email.strip().lower(),))
    user_row = cursor.fetchone()
    conn.close()

    if not user_row:
        return None

    if verify_password(password, user_row["password_hash"], user_row["salt"]):
        return {
            "id": user_row["id"],
            "nombre": user_row["nombre"],
            "email": user_row["email"],
            "role": user_row["role"],
            "tenant_name": user_row["tenant_name"],
            "created_at": user_row["created_at"]
        }
    return None


def init_session() -> None:
    """Inicializa las variables de estado de sesión en Streamlit."""
    init_db()
    if "authenticated" not in st.session_state:
        st.session_state.authenticated = False
    if "jwt_token" not in st.session_state:
        st.session_state.jwt_token = None
    if "user" not in st.session_state:
        st.session_state.user = None
    if "tenant" not in st.session_state:
        st.session_state.tenant = {
            "id": "t-001",
            "name": "TechCorp Inc.",
            "tier": "Enterprise Elite"
        }
    if "role" not in st.session_state:
        st.session_state.role = ROLE_TALENT_LEAD


def login_user(email: str, password: str, role: Optional[str] = None, tenant_name: Optional[str] = None) -> bool:
    """Inicia sesión validando contra la base de datos SQLite."""
    user = authenticate_user(email, password)
    if not user:
        return False

    mock_token = f"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.{int(time.time())}.syntropic_db_token"
    st.session_state.authenticated = True
    st.session_state.jwt_token = mock_token
    st.session_state.role = role if role else user["role"]
    st.session_state.tenant = {
        "id": "t-001",
        "name": tenant_name if tenant_name else user["tenant_name"],
        "tier": "Enterprise Elite"
    }
    st.session_state.user = {
        "id": user["id"],
        "email": user["email"],
        "nombre": user["nombre"],
        "avatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuBC1On3aDwams0rnMYwVmJbBf4X8--1uuY7mBHIZ1rWirFQoR2_x44CRT1vJIcXXzaYkVyBduAabgwqOKn7J-7yZkw3hGUa4K3yWLONgOptXTdLITkMwwjO65rV75opTngyZtMTyWS9PD77Yc1mKpSnNKbp4EPMepCiDzXC3aoTlZ3Lo94Zq2E4RXaY7REOMTRlUyhJnAZ9ERiCzhUdnx1ho1zwAAuA2jbRcJGdRfn89ymuDMrNTjGf",
        "cargo": st.session_state.role,
        "login_time": time.strftime("%Y-%m-%d %H:%M:%S")
    }
    return True


def logout_user() -> None:
    """Cierra la sesión actual y limpia las credenciales."""
    st.session_state.authenticated = False
    st.session_state.jwt_token = None
    st.session_state.user = None
    st.session_state.role = None
    st.rerun()


def require_auth(allowed_roles: Optional[List[str]] = None) -> bool:
    """Guardián de acceso para páginas en /pages/."""
    init_session()
    if not st.session_state.authenticated:
        st.warning("⚠️ Debes iniciar sesión para acceder a este módulo.")
        if st.button("Ir al Login"):
            st.switch_page("app.py")
        st.stop()
        return False
    current_role = st.session_state.role
    if allowed_roles and current_role not in allowed_roles:
        st.error(f"⛔ Acceso denegado: El rol '{current_role}' no tiene permisos para ver este módulo.")
        if st.button("Volver al Dashboard"):
            st.switch_page("pages/2_Candidatos.py")
        st.stop()
        return False
    return True


def render_sidebar_header():
    """Renderiza el identificador de tenant, perfil y botón de logout en el sidebar."""
    if not st.session_state.get("authenticated", False):
        return
    user = st.session_state.get("user", {})
    tenant = st.session_state.get("tenant", {})
    role = st.session_state.get("role", "User")
    with st.sidebar:
        st.markdown(f"**🏢 {tenant.get('name', 'Syntropic')}**")
        st.caption(f"Tenant: \`{tenant.get('name', 'TechCorp')}\` · Rol: **{role}**")
        st.markdown("---")
        st.markdown(f"👤 **{user.get('nombre', 'Usuario')}**")
        st.caption(f"📧 {user.get('email', '')}")
        if st.button("Cerrar Sesión", key="btn_logout_sidebar", use_container_width=True):
            logout_user()
        st.markdown("---")


def save_position_candidates_bulk(position_title: str, candidates: List[Dict[str, Any]], tenant_name: str = "Franja Automations") -> int:
    """Guarda de forma persistente la lista de postulantes y sus enlaces en SQLite."""
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    saved = 0
    for c in candidates:
        cursor.execute("""
        INSERT INTO position_candidates (position_title, candidato, email, token, url, expira_en, estado, tenant_name)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            position_title.strip(),
            c.get("candidato", "").strip(),
            c.get("email", "").strip(),
            c.get("token", ""),
            c.get("url", ""),
            c.get("expira_en", "48h 00m"),
            c.get("estado", "No utilizado"),
            tenant_name.strip()
        ))
        saved += 1
    conn.commit()
    conn.close()
    return saved


def get_position_candidates(position_title: Optional[str] = None, tenant_name: Optional[str] = None) -> List[Dict[str, Any]]:
    """Obtiene los postulantes y enlaces guardados para una vacante específica o tenant."""
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    if position_title and tenant_name:
        cursor.execute("SELECT * FROM position_candidates WHERE position_title = ? AND tenant_name = ? ORDER BY id DESC", (position_title.strip(), tenant_name.strip()))
    elif position_title:
        cursor.execute("SELECT * FROM position_candidates WHERE position_title = ? ORDER BY id DESC", (position_title.strip(),))
    elif tenant_name:
        cursor.execute("SELECT * FROM position_candidates WHERE tenant_name = ? ORDER BY id DESC", (tenant_name.strip(),))
    else:
        cursor.execute("SELECT * FROM position_candidates ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(r) for r in rows]

