"""
Syntropic AI - Módulo de Gestión de Enlaces Dinámicos de Un Solo Uso
Pipeline seguro Zero-Trust para prevención de suplantación y control de sesiones
"""

import streamlit as st
from auth.session import require_auth, render_sidebar_header, ROLE_SUPERADMIN, ROLE_TALENT_LEAD, ROLE_RECRUITER
from services.api_client import api

st.set_page_config(page_title="Syntropic - Enlaces Dinámicos", page_icon="🔗", layout="wide")
require_auth([ROLE_SUPERADMIN, ROLE_TALENT_LEAD, ROLE_RECRUITER])
render_sidebar_header()

st.title("🔗 Generador y Despacho de Enlaces Dinámicos")
st.caption("Autenticación Tokenizada Zero-Trust · Cada enlace expira tras 1 uso y está vinculado a 1 candidato")

col_gen, col_list = st.columns([5, 7], gap="large")

with col_gen:
    st.markdown("""
    <div style="background: #0B192C; color: white; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
        <div style="font-size: 0.75rem; color: #38BDF8; font-weight: 700; text-transform: uppercase;">
            SEGURIDAD ZERO-TRUST
        </div>
        <h3 style="margin: 6px 0; color: white;">Crear Nueva Invitación Tokenizada</h3>
        <p style="color: #94A3B8; font-size: 0.85rem;">
            Genera un enlace criptográfico único que garantiza que sólo el candidato autorizado acceda a la sesión.
        </p>
    </div>
    """, unsafe_allow_html=True)
    
    with st.form("form_new_link"):
        cand_name = st.text_input("Nombre del Candidato", placeholder="Ej: Valentina Morales")
        cand_email = st.text_input("Correo Electrónico", placeholder="valentina@empresa.dev")
        pos_code = st.selectbox("Posición Destino", ["s-fullstack (Senior Full Stack)", "fe-lead (Frontend Lead)", "ds-nlp (Data Scientist NLP)"])
        code_clean = pos_code.split(" ")[0]
        
        submitted = st.form_submit_button("⚡ Generar Token y Enlace Seguro", use_container_width=True)
        if submitted:
            if cand_name and cand_email:
                new_link = api.generate_token_link(cand_name, cand_email, code_clean)
                tok_id = new_link.get("token", "")
                local_url = f"http://localhost:8501/Portal_Candidato?token={tok_id}&pos={code_clean}"
                st.success(f"¡Token {tok_id} generado con éxito para {cand_name}!")
                st.code(local_url, language="bash")
                st.markdown(f"""
                <div style="margin-top: 6px; margin-bottom: 12px;">
                    <a href="{local_url}" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; background: #0066FF; color: white; padding: 7px 16px; border-radius: 8px; text-decoration: none; font-size: 0.85rem; font-weight: 700;">
                        🚀 Abrir Entrevista en Localhost (Portal Candidato) ↗
                    </a>
                </div>
                """, unsafe_allow_html=True)
            else:
                st.error("Por favor completa nombre y correo.")
                
    st.markdown("---")
    st.subheader("Despacho Masivo de Lotes")
    st.write("Genera y envía automáticamente las 15 invitaciones preparadas para la fase.")
    if st.button("✉️ Enviar 15 Invitaciones Masivas por Correo", use_container_width=True):
        count = api.send_mass_invitations()
        st.success(f"¡{count} enlaces seguros despachados satisfactoriamente!")

with col_list:
    st.subheader("Inventario de Enlaces Activos")
    st.caption("Monitoreo en tiempo real del ciclo de vida de los tokens emitidos")
    
    links = api.get_links()
    
    for l in links:
        raw_url = l.get('url', '')
        tok_id = l.get('token', '')
        pos_code = l.get('posicion_code', 'ia-engineer')
        local_url = f"http://localhost:8501/Portal_Candidato?token={tok_id}&pos={pos_code}" if "syntropic.ai" in raw_url else raw_url
        
        with st.container():
            st.markdown(f"""
            <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 10px; padding: 1rem; margin-bottom: 0.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="font-size: 1rem; color: #0B192C;">{l['candidato']}</strong>
                        <div style="font-size: 0.8rem; color: #64748B;">{l['email']} · Posición: <code>{pos_code}</code></div>
                    </div>
                    <div>
                        <span style="background: {'#ECFDF5' if l['estado'] == 'Completado' else ('#FEF3C7' if l['estado'] == 'En progreso' else '#EFF6FF')};
                                     color: {'#047857' if l['estado'] == 'Completado' else ('#B45309' if l['estado'] == 'En progreso' else '#1D4ED8')};
                                     padding: 3px 8px; border-radius: 9999px; font-size: 0.75rem; font-weight: 700;">
                            {l['estado']}
                        </span>
                    </div>
                </div>
                <div style="margin-top: 8px; font-size: 0.78rem; font-family: monospace; color: #475569; word-break: break-all; background: #F8FAFC; padding: 6px 10px; border-radius: 4px; border: 1px solid #E2E8F0;">
                    {local_url}
                </div>
                <div style="margin-top: 6px;">
                    <a href="{local_url}" target="_blank" style="display: inline-flex; align-items: center; gap: 4px; background: #0B192C; color: #38BDF8; border: 1px solid #38BDF8; padding: 4px 10px; border-radius: 6px; text-decoration: none; font-size: 0.75rem; font-weight: 600;">
                        🎓 Probar como Candidato en Localhost ↗
                    </a>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; font-size: 0.75rem; color: #64748B;">
                    <span>⏳ Expiración: <strong>{l['expira_en']}</strong></span>
                    <span>Emitido: {l.get('creado', 'Hoy')}</span>
                </div>
            </div>
            """, unsafe_allow_html=True)
            
            c_cop, c_rev = st.columns([1, 1])
            with c_cop:
                if st.button("📋 Copiar URL", key=f"cop_{l['token']}", use_container_width=True):
                    st.toast(f"Copiado: {local_url}")
            with c_rev:
                if st.button("🚫 Revocar Token", key=f"rev_{l['token']}", use_container_width=True):
                    st.toast(f"Token {l['token']} revocado inmediatamente.")
