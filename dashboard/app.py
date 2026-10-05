"""
Syntropic AI - Talent Intelligence Platform
app.py: Entrada principal, autenticación corporativa y enrutamiento por roles
"""

import streamlit as st
from auth.session import init_session, login_user, render_sidebar_header, ROLE_TALENT_LEAD, ROLE_SUPERADMIN, ROLE_RECRUITER, ROLE_HIRING_MANAGER

# Configuración global de la página
st.set_page_config(
    page_title="Syntropic AI - Acceso Corporativo",
    page_icon="🧠",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Inicializar sesión
init_session()

# Estilos CSS personalizados para alinear con la estética corporativa Syntropic AI
st.markdown("""
<style>
    /* Tipografía y jerarquía */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');
    
    html, body, [class*="css"] {
        font-family: 'Inter', sans-serif;
    }
    h1, h2, h3, h4, h5, h6 {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: 700;
    }
    
    /* Botones primarios corporativos */
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
    
    /* Tarjetas ejecutivas */
    .corporate-card {
        background: #0B192C;
        color: #F8FAFC;
        padding: 2.5rem;
        border-radius: 16px;
    }
    .pillar-box {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 1rem 1.25rem;
        border-radius: 12px;
        margin-bottom: 0.75rem;
    }
    .quote-box {
        background: rgba(255, 255, 255, 0.08);
        border-left: 3px solid #0066FF;
        padding: 1rem;
        border-radius: 8px;
        font-style: italic;
    }
</style>
""", unsafe_allow_html=True)

# Renderizar barra lateral si ya está autenticado
render_sidebar_header()

if st.session_state.authenticated:
    # Vista para usuarios ya autenticados
    user = st.session_state.user or {}
    tenant = st.session_state.tenant or {}
    
    st.title("👋 Bienvenido de nuevo a Syntropic AI")
    st.markdown(f"Sesión activa como **{user.get('nombre', 'Usuario')}** (`{st.session_state.role}`) en **{tenant.get('name', 'Empresa')}**")
    
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
    # Vista de Login Corporativo (Split Layout fiel a Image 9)
    col_left, col_right = st.columns([6, 5], gap="large")
    
    with col_left:
        st.markdown("""
        <div class="corporate-card">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 1.5rem;">
                <span style="font-size: 1.5rem;">🧠</span>
                <span style="font-size: 1.4rem; font-weight: 700; letter-spacing: -0.02em;">Syntropic<span style="color:#38BDF8;">.ai</span></span>
                <span style="font-size: 0.75rem; background: rgba(56, 189, 248, 0.2); color: #38BDF8; padding: 2px 8px; border-radius: 4px; font-weight: 600; text-transform: uppercase;">Enterprise Intelligence</span>
            </div>
            
            <h1 style="font-size: 2.2rem; line-height: 1.2; margin-bottom: 1rem; color: #FFFFFF;">
                Talento evaluado con rigor algorítmico y precisión ejecutiva.
            </h1>
            <p style="color: #94A3B8; font-size: 1.05rem; margin-bottom: 2rem;">
                La plataforma líder de entrevistas técnicas y ejecutivas potenciada por Agentes de Inteligencia Artificial sin sesgos.
            </p>
            
            <div class="pillar-box">
                <div style="font-weight: 600; color: #F8FAFC; margin-bottom: 4px;">📖 Contexto Organizacional Profundo</div>
                <div style="font-size: 0.88rem; color: #94A3B8;">Evaluaciones objetivas basadas en el CV del candidato y las bases de conocimiento de tu empresa.</div>
            </div>
            
            <div class="pillar-box">
                <div style="font-weight: 600; color: #F8FAFC; margin-bottom: 4px;">🔒 Seguridad e Integridad Zero-Trust</div>
                <div style="font-size: 0.88rem; color: #94A3B8;">Enlaces dinámicos de un solo uso para garantizar integridad total del proceso de selección.</div>
            </div>
            
            <div class="pillar-box">
                <div style="font-weight: 600; color: #F8FAFC; margin-bottom: 4px;">📊 Predictibilidad de Contratación</div>
                <div style="font-size: 0.88rem; color: #94A3B8;">Reportes analíticos instantáneos con scoring cuantitativo, radar de skills y transcripción sincronizada.</div>
            </div>
            
            <div class="quote-box" style="margin-top: 1.5rem;">
                <p style="margin: 0; color: #E2E8F0; font-size: 0.92rem;">
                    “Syntropic redujo nuestro tiempo de filtrado técnico en un 73% mientras incrementó la paridad y consistencia en cada entrevista directiva.”
                </p>
                <div style="margin-top: 8px; font-size: 0.82rem; color: #38BDF8; font-weight: 600;">
                    Elena Morales · VP of Global Talent, Kinetix Group
                </div>
            </div>
        </div>
        """, unsafe_allow_html=True)
        
    with col_right:
        st.markdown("### Acceso Corporativo para Reclutadores")
        st.caption("Ingresa tus credenciales de empresa para acceder a tus vacantes y candidatos")
        
        # Botón de SSO Google / Microsoft
        if st.button("🌐 Continuar con Google Workspace / Microsoft SSO", use_container_width=True):
            login_user("elena.rostova@techcorp.io", "demo123", role=ROLE_TALENT_LEAD)
            st.success("Acceso concedido mediante SSO corporativo.")
            st.rerun()
            
        st.markdown("<div style='text-align: center; color: #94A3B8; font-size: 0.8rem; margin: 1rem 0;'>O INGRESA CON TU CORREO DE EMPRESA</div>", unsafe_allow_html=True)
        
        with st.form("form_login"):
            email = st.text_input("Correo corporativo", value="elena.rostova@techcorp.io", placeholder="reclutador@empresa.com")
            password = st.text_input("Contraseña", value="••••••••••••", type="password")
            
            col_r1, col_r2 = st.columns(2)
            with col_r1:
                selected_role = st.selectbox("Rol a simular", [ROLE_TALENT_LEAD, ROLE_SUPERADMIN, ROLE_RECRUITER, ROLE_HIRING_MANAGER])
            with col_r2:
                selected_tenant = st.selectbox("Empresa / Tenant", ["TechCorp Inc.", "FinTech Global Labs", "BioHealth AI"])
                
            remember_session = st.checkbox("Recordar esta sesión por 30 días", value=True)
            
            submitted = st.form_submit_button("Iniciar Sesión en el Dashboard ➔", use_container_width=True)
            if submitted:
                if login_user(email, password, role=selected_role, tenant_name=selected_tenant):
                    st.success("¡Sesión iniciada con éxito! Redirigiendo...")
                    st.switch_page("pages/2_Candidatos.py")
                else:
                    st.error("Credenciales incorrectas o campos vacíos.")
                    
        st.caption("🛡️ Protección de datos conforme a GDPR y SOC2 Tipo II · Cifrado AES-256")
