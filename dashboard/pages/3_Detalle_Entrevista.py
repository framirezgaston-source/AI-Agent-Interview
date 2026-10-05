"""
Syntropic AI - Módulo de Detalle y Sala de Entrevista Interactiva
Simulador de sesión en tiempo real con Agente de IA, transcripción y evaluación cuantitativa
"""

import streamlit as st
from auth.session import require_auth, render_sidebar_header, ROLE_SUPERADMIN, ROLE_TALENT_LEAD, ROLE_RECRUITER, ROLE_HIRING_MANAGER, ROLE_INTERVIEWER
from services.api_client import api

st.set_page_config(page_title="Syntropic - Sala de Entrevista Interactiva", page_icon="🎙️", layout="wide")
require_auth([ROLE_SUPERADMIN, ROLE_TALENT_LEAD, ROLE_RECRUITER, ROLE_HIRING_MANAGER, ROLE_INTERVIEWER])
render_sidebar_header()

session_data = api.get_interview_session("default")

# Header de la Sesión de Entrevista
h_col1, h_col2 = st.columns([7, 5])
with h_col1:
    st.markdown(f"""
    <div style="display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 1.6rem;">💻</span>
        <div>
            <div style="font-size: 0.75rem; color: #0066FF; font-weight: 700; text-transform: uppercase;">
                {session_data['fase']} · {session_data['paso']}
            </div>
            <h2 style="margin: 0; font-size: 1.4rem; color: #0B192C;">
                Entrevista Técnica: {session_data['posicion_titulo']}
            </h2>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
with h_col2:
    st.markdown(f"""
    <div style="display: flex; justify-content: flex-end; align-items: center; gap: 12px; height: 100%;">
        <span style="background: #F1F5F9; padding: 6px 12px; border-radius: 8px; font-weight: 700; font-family: monospace; font-size: 1.1rem; color: #0B192C;">
            ⏱️ {session_data['tiempo_transcurrido']} <span style="font-size: 0.8rem; font-weight: 400; color: #64748B;">/ {session_data['tiempo_total']} min</span>
        </span>
    </div>
    """, unsafe_allow_html=True)

st.markdown("---")

col_stage, col_feed = st.columns([7, 5], gap="large")

with col_stage:
    # Canvas del Agente de IA y Candidata
    st.markdown("""
    <div style="background: #0B192C; border-radius: 16px; padding: 1.5rem; color: white; position: relative; min-height: 380px; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); padding: 4px 12px; border-radius: 9999px;">
                <span style="color: #38BDF8;">●</span>
                <span style="font-size: 0.85rem; font-weight: 600;">Syntropic Agent v3.4</span>
                <span style="font-size: 0.7rem; background: #0066FF; padding: 2px 6px; border-radius: 4px;">Hablando...</span>
            </div>
            <div style="font-size: 0.8rem; font-family: monospace; color: #94A3B8;">
                ⚡ Latencia: 24ms (Ultra-Low)
            </div>
        </div>
        
        <div style="text-align: center; margin: 2rem 0;">
            <div style="display: inline-block; width: 120px; height: 120px; border-radius: 9999px; background: radial-gradient(circle, #0066FF 0%, #0B192C 70%); border: 2px solid #38BDF8; box-shadow: 0 0 30px rgba(0, 102, 255, 0.5); padding: 24px;">
                <div style="font-size: 0.75rem; font-weight: 800; letter-spacing: 0.1em; color: #E0F2FE; margin-top: 15px;">AI CORE</div>
                <div style="color: #38BDF8; font-size: 1.2rem;">〜〜〜</div>
            </div>
            <div style="margin-top: 10px; font-size: 0.8rem; color: #94A3B8; font-family: monospace;">Modulación de Voz Activa</div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: flex-end;">
            <div style="font-size: 0.75rem; color: #64748B; font-family: monospace;">
                1080p · 60 FPS · WebRTC H.265
            </div>
            <div style="background: rgba(15, 23, 42, 0.85); border: 1px solid #334155; border-radius: 8px; padding: 6px 10px; display: flex; align-items: center; gap: 8px;">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIh3TeJnPs1ChDSETGP9R86aLVqR0B5fnkokVrZYDH2erdVNfGwxsBVxLZhkfYyWy7V16SPu0Xis8hikNQHHjFGfjLj1oRlJ1-TLOxEuHdDil-GlyTuMyap8d6LFl4rpidzn01u6cUo4tzXOGqJ47Ks9yImPZmTxnqrs8DdhFftktUMAH3wUe3A5SCGkyIYb2cYTEA_te6mxjYy9fin--alEOjy9e35m-CFvaks0wSYM84xxT9Nz3I" style="width: 38px; height: 38px; border-radius: 6px; object-fit: cover;">
                <div>
                    <div style="font-size: 0.85rem; font-weight: 700; color: #F8FAFC;">Sofía Valenzuela</div>
                    <div style="font-size: 0.7rem; color: #94A3B8;">Candidata (En Línea)</div>
                </div>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    # Tarjeta de la Pregunta en Curso
    current_q = session_data["pregunta_actual"]
    st.markdown(f"""
    <div style="background: #FFFFFF; border-left: 4px solid #0066FF; border-radius: 8px; padding: 1.25rem; margin-top: 1rem; border-top: 1px solid #E2E8F0; border-right: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.8rem; color: #0066FF; font-weight: 700; text-transform: uppercase;">
                ❓ PREGUNTA {current_q['numero']} DE {current_q['total']} ({current_q['contexto']})
            </span>
            <span style="font-size: 0.75rem; background: #F1F5F9; color: #475569; padding: 2px 6px; border-radius: 4px; font-family: monospace;">
                {current_q['id']}
            </span>
        </div>
        <p style="font-size: 1.05rem; font-weight: 600; color: #0B192C; margin: 10px 0;">
            "{current_q['texto']}"
        </p>
        <div style="display: flex; justify-content: space-between; font-size: 0.78rem; color: #64748B;">
            <span>🎙️ {current_q['fuente']}</span>
            <span>Tiempo sugerido para responder: {current_q['tiempo_sugerido']}</span>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    # Barra de Controles de la Entrevista
    ctrl1, ctrl2, ctrl3, ctrl4 = st.columns([2, 2, 3, 3])
    with ctrl1:
        mic_on = st.toggle("🎤 Mic", value=True)
    with ctrl2:
        cam_on = st.toggle("📹 Cam", value=True)
    with ctrl3:
        if st.button("🔄 Repetir Pregunta", use_container_width=True):
            st.toast("El Agente Syntropic repetirá la pregunta a la candidata...")
    with ctrl4:
        if st.button("⏩ Siguiente Pregunta", use_container_width=True):
            st.toast("Evaluando respuesta y formulando Pregunta 4 de 5...")

with col_feed:
    tab_trans, tab_eval = st.tabs(["📝 Transcripción en Vivo", "📊 Evaluación IA"])
    
    with tab_trans:
        for t in session_data["transcripcion"]:
            bg_c = "#EFF6FF" if t.get("is_agent") else ("#F8FAFC" if not t.get("is_current") else "#FEF3C7")
            st.markdown(f"""
            <div style="background: {bg_c}; border-radius: 8px; padding: 0.75rem; margin-bottom: 0.5rem; border-left: 3px solid {'#0066FF' if t.get('is_agent') else '#64748B'};">
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 4px;">
                    <strong style="color: {'#0066FF' if t.get('is_agent') else '#0B192C'};">{t['emisor']}</strong>
                    <span style="color: #94A3B8; font-family: monospace;">{t.get('hora', '')}</span>
                </div>
                <div style="font-size: 0.88rem; color: #1E293B;">
                    {t['texto']}
                </div>
            </div>
            """, unsafe_allow_html=True)
            
    with tab_eval:
        for ev in session_data["evaluacion_tiempo_real"]:
            st.markdown(f"**{ev['criterio']}** · `{ev['score']}%`")
            st.progress(ev['score'] / 100.0)
            st.caption(f"{ev['detalle']} — {ev['feedback']}")
            st.markdown("<br>", unsafe_allow_html=True)
            
        st.info(f"🧠 **Observaciones del Agente:** {session_data['observaciones_ia']}")
        
    st.markdown("""
    <div style="background: #ECFDF5; border: 1px solid #A7F3D0; padding: 0.5rem; border-radius: 6px; font-size: 0.75rem; color: #065F46; text-align: center; margin-top: 1rem;">
        ● Conexión a base de datos activa: Respuestas y transcripción guardadas en tiempo real.
    </div>
    """, unsafe_allow_html=True)
    
    if st.button("⏹️ Finalizar y Guardar Entrevista", type="primary", use_container_width=True):
        st.success("Entrevista consolidada con éxito en la base de datos.")
        st.switch_page("pages/2_Candidatos.py")
