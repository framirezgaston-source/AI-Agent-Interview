"""
Syntropic AI - Módulo de Autenticación y Sesión
Gestión de JWT, control de roles (RBAC), multi-tenant y estado en Streamlit
"""

import time
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

# Mapa de permisos de páginas por rol
PAGE_PERMISSIONS = {
    "1_Posiciones.py": [ROLE_SUPERADMIN, ROLE_TALENT_LEAD, ROLE_RECRUITER],
    "2_Candidatos.py": [ROLE_SUPERADMIN, ROLE_TALENT_LEAD, ROLE_RECRUITER, ROLE_HIRING_MANAGER, ROLE_INTERVIEWER],
    "3_Detalle_Entrevista.py": [ROLE_SUPERADMIN, ROLE_TALENT_LEAD, ROLE_RECRUITER, ROLE_HIRING_MANAGER, ROLE_INTERVIEWER],
    "4_Links.py": [ROLE_SUPERADMIN, ROLE_TALENT_LEAD, ROLE_RECRUITER],
    "5_Buscar_Candidatos.py": [ROLE_SUPERADMIN, ROLE_TALENT_LEAD, ROLE_RECRUITER, ROLE_HIRING_MANAGER],
}


def init_session() -> None:
    """Inicializa las variables de estado de sesión en Streamlit."""
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


def login_user(email: str, password: str, role: str = ROLE_TALENT_LEAD, tenant_name: str = "TechCorp Inc.") -> bool:
    """
    Simula autenticación contra el backend FastAPI generando payload JWT.
    En entorno productivo, llama a services.api_client.auth_login()
    """
    if not email or not password:
        return False
    
    # Generar payload de token firmado (mock token seguro con timestamps)
    mock_token = f"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.{int(time.time())}.mock_syntropic_sig"
    
    st.session_state.authenticated = True
    st.session_state.jwt_token = mock_token
    st.session_state.role = role
    st.session_state.tenant = {
        "id": "t-001",
        "name": tenant_name,
        "tier": "Enterprise Elite"
    }
    st.session_state.user = {
        "email": email,
        "nombre": "Elena Rostova" if "elena" in email.lower() else email.split("@")[0].capitalize(),
        "avatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuBC1On3aDwams0rnMYwVmJbBf4X8--1uuY7mBHIZ1rWirFQoR2_x44CRT1vJIcXXzaYkVyBduAabgwqOKn7J-7yZkw3hGUa4K3yWLONgOptXTdLITkMwwjO65rV75opTngyZtMTyWS9PD77Yc1mKpSnNKbp4EPMepCiDzXC3aoTlZ3Lo94Zq2E4RXaY7REOMTRlUyhJnAZ9ERiCzhUdnx1ho1zwAAuA2jbRcJGdRfn89ymuDMrNTjGf",
        "cargo": "Talent AI Lead" if role == ROLE_TALENT_LEAD else role,
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
    """
    Guardián de acceso para páginas en /pages/.
    Si no está autenticado o el rol no coincide, redirige o detiene la ejecución.
    """
    init_session()
    
    if not st.session_state.authenticated:
        st.warning("⚠️ Debes iniciar sesión para acceder a este módulo.")
        st.info("Redirigiendo a la pantalla de acceso corporativo...")
        if st.button("Ir al Login"):
            st.switch_page("app.py")
        st.stop()
        return False
    
    current_role = st.session_state.role
    if allowed_roles and current_role not in allowed_roles:
        st.error(f"⛔ Acceso denegado: El rol '{current_role}' no tiene permisos para ver este módulo.")
        st.info(f"Roles autorizados: {', '.join(allowed_roles)}")
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
        st.caption(f"Tenant ID: `{tenant.get('id', 't-001')}` · {tenant.get('tier', 'Enterprise')}")
        st.markdown("---")
        
        col1, col2 = st.columns([1, 3])
        with col1:
            avatar = user.get("avatar")
            if avatar:
                st.image(avatar, width=44)
            else:
                st.markdown("👤")
        with col2:
            st.markdown(f"**{user.get('nombre', 'Usuario')}**")
            st.caption(f"{role}")
            
        if st.button("Cerrar Sesión", key="btn_logout", use_container_width=True):
            logout_user()
        st.markdown("---")
