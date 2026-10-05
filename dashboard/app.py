"""
Syntropic AI - Talent Intelligence Platform
app.py: Entrada principal, autenticación corporativa, registro con base de datos SQLite y redirección
"""

import streamlit as st
from auth.session import (
    init_session,
    login_user,
    register_user,
    render_sidebar_header,
    ROLE_TALENT_LEAD,
    ROLE_SUPERADMIN,
    ROLE_RECRUITER,
    ROLE_HIRING_MANAGER
)

# Configuración global de la página
st.set_page_config(
    page_title="Syntropic AI - Acceso Corporativo",
    page_icon="🧠",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Inicializar sesión y base de datos SQLite
init_session()

# Estilos CSS personalizados
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');

html, body, [class*="css"] {
    font-family: 'Inter', sans-serif;
}
h1, h2, h3, h4, h5, h6 {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 700;
}
.stButton>button {
    background-color: #0066FF;
    color: white;
    border-radius: 8px;
    font-weight: 600;
    border: none;
    padding: 0.5rem 1rem;
    transition: all 0.2s ease;
}
.stButton>button:hover {
    background-color: #0052CC;
    color: white;
}
</style>
""", unsafe_allow_html=True)

# Renderizar barra lateral si ya está autenticado
render_sidebar_header()

if st.session_state.authenticated:
    user = st.session_state.user or {}
    tenant = st.session_state.tenant or {}

    st.title("👋 Bienvenido de nuevo a Syntropic AI")
    st.markdown(f"Sesión activa como **{user.get('nombre', 'Usuario')}** (`{st.session_state.role}`) en **{tenant.get('name', 'Empresa')}**")
    st.caption(f"📧 Correo registrado: `{user.get('email', '')}`")

    st.markdown("---")

    col1, col2, col3 = st.columns(3)
    with col1:
        st.subheader("📋 Gestión de Posiciones")
        st.write("Crea nuevas vacantes, indexa bases de conocimiento y calibra ponderaciones de IA.")
        if st.button("Ir a Posiciones", key="nav_pos", use_container_width=True):
            st.switch_page("pages/1_Posiciones.py")

    with col2:
        st.subheader("👥 Dashboard de Candidatos")
        st.write("Visualiza métricas, scores calculados por IA, radares de competencias y transcripciones.")
        if st.button("Ir a Candidatos", key="nav_cand", use_container_width=True):
            st.switch_page("pages/2_Candidatos.py")

    with col3:
        st.subheader("🔗 Enlaces Dinámicos")
        st.write("Genera y despacha invitaciones protegidas con tokens de un solo uso SHA-256 HMAC.")
        if st.button("Gestionar Enlaces", key="nav_links", use_container_width=True):
            st.switch_page("pages/4_Links.py")

else:
    # Vista de Login y Registro
    col_left, col_right = st.columns([6, 6], gap="large")

    with col_left:
        # Tarjeta izquierda corporativa sin sangrías excesivas para evitar <pre><code>
        st.markdown("""
<div style="background: #0B192C; color: #F8FAFC; padding: 2rem; border-radius: 16px;">
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 1.25rem;">
        <span style="font-size: 1.5rem;">🧠</span>
        <span style="font-size: 1.4rem; font-weight: 700; letter-spacing: -0.02em;">Syntropic<span style="color:#38BDF8;">.ai</span></span>
        <span style="font-size: 0.72rem; background: rgba(56, 189, 248, 0.2); color: #38BDF8; padding: 2px 8px; border-radius: 4px; font-weight: 600; text-transform: uppercase;">Enterprise Intelligence</span>
    </div>
    <h2 style="font-size: 1.8rem; line-height: 1.2; margin-bottom: 0.75rem; color: #FFFFFF; font-weight: 800;">
        Talento evaluado con rigor algorítmico y precisión ejecutiva.
    </h2>
    <p style="color: #94A3B8; font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.5;">
        La plataforma líder de entrevistas técnicas y ejecutivas potenciada por Agentes de Inteligencia Artificial sin sesgos.
    </p>
    <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); padding: 0.85rem 1rem; border-radius: 10px; margin-bottom: 0.75rem;">
        <div style="font-weight: 600; color: #F8FAFC; font-size: 0.9rem;">📖 Contexto Organizacional Profundo</div>
        <div style="font-size: 0.82rem; color: #94A3B8; margin-top: 2px;">Evaluaciones objetivas basadas en el CV del candidato y las bases de conocimiento de tu empresa.</div>
    </div>
    <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); padding: 0.85rem 1rem; border-radius: 10px; margin-bottom: 0.75rem;">
        <div style="font-weight: 600; color: #F8FAFC; font-size: 0.9rem;">🔒 Seguridad e Integridad Zero-Trust</div>
        <div style="font-size: 0.82rem; color: #94A3B8; margin-top: 2px;">Enlaces dinámicos de un solo uso para garantizar integridad total del proceso de selección.</div>
    </div>
    <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); padding: 0.85rem 1rem; border-radius: 10px; margin-bottom: 1rem;">
        <div style="font-weight: 600; color: #F8FAFC; font-size: 0.9rem;">📊 Predictibilidad de Contratación</div>
        <div style="font-size: 0.82rem; color: #94A3B8; margin-top: 2px;">Reportes analíticos instantáneos con scoring cuantitativo, radar de skills y transcripción sincronizada.</div>
    </div>
    <div style="background: rgba(255, 255, 255, 0.08); border-left: 3px solid #0066FF; padding: 0.75rem 1rem; border-radius: 8px;">
        <p style="margin: 0; color: #E2E8F0; font-size: 0.85rem; font-style: italic;">
            “Syntropic redujo nuestro tiempo de filtrado técnico en un 73% mientras incrementó la paridad y consistencia en cada entrevista directiva.”
        </p>
        <div style="margin-top: 6px; font-size: 0.78rem; color: #38BDF8; font-weight: 600;">
            Elena Morales · VP of Global Talent, Kinetix Group
        </div>
    </div>
</div>
""", unsafe_allow_html=True)

    with col_right:
        st.subheader("Acceso al Sistema")
        st.caption("Autenticación con Base de Datos SQLite persistente en `data/users.db`")

        # Pestañas para Iniciar Sesión o Registrarse
        tab_login, tab_register = st.tabs(["🔑 Iniciar Sesión", "📝 Registrar Nuevo Usuario"])

        with tab_login:
            # Botón de Demo / SSO Rápido
            if st.button("🌐 Continuar con Google Workspace / Demo SSO", use_container_width=True):
                if login_user("elena.rostova@techcorp.io", "demo123", role=ROLE_TALENT_LEAD):
                    st.success("¡Acceso concedido! Redirigiendo...")
                    st.switch_page("pages/2_Candidatos.py")

            st.markdown("<div style='text-align: center; color: #94A3B8; font-size: 0.75rem; margin: 0.75rem 0;'>O INGRESA CON TUS CREDENCIALES</div>", unsafe_allow_html=True)

            with st.form("form_login"):
                email_in = st.text_input("Correo electrónico", value="elena.rostova@techcorp.io", placeholder="tu.correo@empresa.com")
                password_in = st.text_input("Contraseña", value="demo123", type="password")

                col_sub, col_help = st.columns([1, 1])
                with col_sub:
                    submitted_login = st.form_submit_button("Iniciar Sesión ➔", use_container_width=True)

                if submitted_login:
                    if login_user(email_in, password_in):
                        st.success(f"¡Bienvenido {email_in}! Redirigiendo...")
                        st.switch_page("pages/2_Candidatos.py")
                    else:
                        st.error("Credenciales incorrectas. Si es tu primera vez, regístrate en la pestaña 'Registrar Nuevo Usuario'.")

        with tab_register:
            st.info("Crea una cuenta real. Se guardará de forma persistente con contraseña cifrada (hash SHA-256 + salt).")

            with st.form("form_register"):
                new_nombre = st.text_input("Nombre completo", placeholder="Ej: Gastón Ramírez")
                new_email = st.text_input("Correo electrónico real", placeholder="tu_correo@franjaautomations.com")
                new_pass = st.text_input("Contraseña (mínimo 6 caracteres)", type="password", placeholder="Crea tu contraseña segura")
                new_pass_confirm = st.text_input("Confirmar contraseña", type="password", placeholder="Repite tu contraseña")

                c_rol, c_tenant = st.columns(2)
                with c_rol:
                    new_role = st.selectbox("Rol", [ROLE_TALENT_LEAD, ROLE_SUPERADMIN, ROLE_RECRUITER, ROLE_HIRING_MANAGER])
                with c_tenant:
                    new_tenant = st.text_input("Empresa / Organización", value="Franja Automations")

                submitted_register = st.form_submit_button("Crear Cuenta y Guardar en BD 💾", use_container_width=True)

                if submitted_register:
                    if not new_email or not new_pass:
                        st.error("Por favor completa el correo y la contraseña.")
                    elif new_pass != new_pass_confirm:
                        st.error("Las contraseñas no coinciden.")
                    else:
                        ok, msg = register_user(new_nombre, new_email, new_pass, role=new_role, tenant_name=new_tenant)
                        if ok:
                            st.success(msg)
                            # Auto login
                            login_user(new_email, new_pass, role=new_role, tenant_name=new_tenant)
                            st.info("Iniciando sesión con tu nueva cuenta...")
                            st.rerun()
                        else:
                            st.error(msg)

        st.caption("🛡️ Almacenamiento seguro en SQLite (`data/users.db`) · Cifrado SHA-256 con salt aleatorio")
