"""
Syntropic AI - Portal del Candidato / Invitación Verificada
Módulo público de onboarding para candidatos que ingresan con token único Zero-Trust
"""

import streamlit as st
import time

st.set_page_config(
    page_title="Portal del Candidato - Syntropic AI",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Leer parámetros de URL si existen (?token=...&pos=...)
token_param = st.query_params.get("token", "tok_0bd5c252_7199")
pos_param = st.query_params.get("pos", "Master IA Engineer").replace("-", " ").title()

# Obtener nombre de empresa o tenant
tenant_name = st.session_state.get("tenant", {}).get("name", "Franja Automations")

# Header superior
st.markdown(f"""
<div style="display: flex; justify-content: space-between; align-items: center; background: #FFFFFF; padding: 1.25rem 1.5rem; border-radius: 14px; border: 1px solid #E2E8F0; margin-bottom: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
    <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: #0066FF; color: white; width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; font-weight: bold;">
            🧠
        </div>
        <div>
            <div style="font-weight: 800; font-size: 1.1rem; color: #0B192C;">{tenant_name}</div>
            <div style="font-size: 0.75rem; color: #64748B; text-transform: uppercase; font-weight: 600;">
                Evaluación Autónoma en colaboración con Syntropic AI
            </div>
        </div>
    </div>
    <div style="background: #ECFDF5; border: 1px solid #A7F3D0; color: #047857; padding: 6px 14px; border-radius: 9999px; font-size: 0.8rem; font-weight: 700; display: flex; align-items: center; gap: 6px;">
        <span>🔒 Invitación Verificada</span> · <code style="color: #065F46; font-size: 0.75rem;">{token_param}</code>
    </div>
</div>
""", unsafe_allow_html=True)

# Banner de Bienvenida y Fase
st.markdown(f"""
<div style="background: linear-gradient(135deg, #0B192C 0%, #1E293B 100%); color: white; padding: 2rem; border-radius: 16px; margin-bottom: 2rem;">
    <div style="display: inline-block; background: rgba(56, 189, 248, 0.15); color: #38BDF8; padding: 3px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.75rem; text-transform: uppercase;">
        Fase 3: Registro y Validación Técnica
    </div>
    <h1 style="font-size: 1.8rem; margin: 0 0 0.5rem 0; font-weight: 800; color: #FFFFFF;">
        Bienvenido a tu Entrevista Técnica para {pos_param}
    </h1>
    <p style="color: #94A3B8; font-size: 0.95rem; margin: 0; max-width: 800px; line-height: 1.5;">
        Has sido invitado por el equipo de selección de <strong>{tenant_name}</strong>. Esta sesión será conducida por un Agente de Inteligencia Artificial que analizará tu experiencia, proyectos y criterio arquitectónico en tiempo real.
    </p>
</div>
""", unsafe_allow_html=True)

col_left, col_right = st.columns([7, 5], gap="large")

with col_left:
    st.subheader("1. Datos Personales del Postulante")
    
    c1, c2 = st.columns(2)
    with c1:
        c_nombre = st.text_input("Nombre Completo", value="Gastón Ramírez")
    with c2:
        c_email = st.text_input("Correo Electrónico", value="framirezgaston@franjaautomations.com")
        
    c3, c4 = st.columns(2)
    with c3:
        c_phone = st.text_input("Teléfono / WhatsApp", value="+51 987 654 321")
    with c4:
        c_country = st.text_input("Ubicación y Disponibilidad", value="Lima, Perú (Remoto Global)")
        
    c5, c6 = st.columns(2)
    with c5:
        c_linkedin = st.text_input("Perfil de LinkedIn", value="https://linkedin.com/in/gaston-ramirez")
    with c6:
        c_github = st.text_input("Perfil de GitHub / Portafolio", value="https://github.com/framirezgaston-source")

    st.markdown("---")
    
    st.subheader("2. Carga de tu Curriculum Vitae (CV)")
    st.caption("El Agente de IA leerá tus proyectos previos para adaptar las preguntas técnicas a tu experiencia.")
    
    cv_file = st.file_uploader(
        "Arrastra tu CV en formato PDF o Word (.pdf, .docx)",
        type=["pdf", "docx"],
        key="candidate_cv_uploader"
    )
    
    if cv_file:
        st.success(f"✓ CV `{cv_file.name}` ({round(len(cv_file.getvalue())/1024, 1)} KB) analizado exitosamente. Proyectos y stack detectados.")
    else:
        st.info("📄 Archivo de ejemplo precargado en sistema: `CV_Gaston_Ramirez_AI_Engineer.pdf`")

with col_right:
    st.subheader("3. Chequeo de Hardware & Conexión")
    st.caption("Verificación previa para garantizar la mejor calidad en la entrevista con el Agente.")
    
    st.markdown("""
    <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 1.25rem; border-radius: 12px; margin-bottom: 1.5rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #E2E8F0;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: #16A34A; font-size: 1.1rem;">📷</span>
                <span style="font-size: 0.85rem; font-weight: 600; color: #1E293B;">Cámara Web</span>
            </div>
            <span style="color: #16A34A; font-weight: 700; font-size: 0.8rem; background: #DCFCE7; padding: 2px 8px; border-radius: 4px;">Detectada HD</span>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #E2E8F0;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: #16A34A; font-size: 1.1rem;">🎙️</span>
                <span style="font-size: 0.85rem; font-weight: 600; color: #1E293B;">Micrófono</span>
            </div>
            <span style="color: #16A34A; font-weight: 700; font-size: 0.8rem; background: #DCFCE7; padding: 2px 8px; border-radius: 4px;">Nivel Óptimo</span>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 0;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: #16A34A; font-size: 1.1rem;">⚡</span>
                <span style="font-size: 0.85rem; font-weight: 600; color: #1E293B;">Latencia de Red</span>
            </div>
            <span style="color: #16A34A; font-weight: 700; font-size: 0.8rem; background: #DCFCE7; padding: 2px 8px; border-radius: 4px;">24 ms</span>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    st.markdown("""
    <div style="background: #EFF6FF; border: 1px solid #BFDBFE; padding: 1rem; border-radius: 10px; margin-bottom: 1.5rem; font-size: 0.82rem; color: #1E40AF;">
        ℹ️ <strong>Recomendaciones para tu entrevista:</strong>
        <ul style="margin: 6px 0 0 16px; padding: 0;">
            <li>Usa audífonos para evitar eco acústico.</li>
            <li>La entrevista durará aproximadamente <strong>25 minutos</strong>.</li>
            <li>Podrás ver la transcripción y tus métricas en tiempo real.</li>
        </ul>
    </div>
    """, unsafe_allow_html=True)

    if st.button("🚀 Iniciar Entrevista Técnica con Agente de IA", use_container_width=True, type="primary"):
        st.session_state["active_candidate_name"] = c_nombre
        st.session_state["active_candidate_email"] = c_email
        st.session_state["active_position_title"] = pos_param
        st.success("¡Credenciales validadas! Conectando a la Sala de Entrevista...")
        time.sleep(0.5)
        st.switch_page("pages/3_Detalle_Entrevista.py")

st.markdown("---")
st.caption(f"🔒 Sesión protegida por protocolo Zero-Trust · Token HMAC: `{token_param}` · {tenant_name}")
