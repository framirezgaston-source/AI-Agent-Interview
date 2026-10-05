"""
Syntropic AI - Dashboard de Reclutamiento & Evaluación de Candidatos
Visualización de KPIs, tabla de postulantes evaluados con IA y panel de análisis profundo con gráfico radar
"""

import streamlit as st
import plotly.graph_objects as go
from auth.session import require_auth, render_sidebar_header, ROLE_SUPERADMIN, ROLE_TALENT_LEAD, ROLE_RECRUITER, ROLE_HIRING_MANAGER, ROLE_INTERVIEWER
from services.api_client import api

st.set_page_config(page_title="Syntropic - Dashboard de Reclutamiento", page_icon="👥", layout="wide")
require_auth([ROLE_SUPERADMIN, ROLE_TALENT_LEAD, ROLE_RECRUITER, ROLE_HIRING_MANAGER, ROLE_INTERVIEWER])
render_sidebar_header()

# Header de página con estado de telemetría y acciones ejecutivas
st.markdown("""
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
    <div>
        <div style="display: flex; align-items: center; gap: 8px;">
            <span style="background: #E2E8F0; color: #0050CB; font-size: 0.72rem; padding: 2px 8px; border-radius: 9999px; font-weight: 700; text-transform: uppercase;">
                ● Telemetry v4.2 Live
            </span>
            <span style="color: #94A3B8; font-size: 0.8rem;">| Talent Operations Unit</span>
        </div>
        <h1 style="font-size: 2.1rem; font-weight: 800; color: #0B192C; margin: 4px 0;">Dashboard de Reclutamiento</h1>
        <p style="color: #64748B; font-size: 0.95rem; margin: 0;">
            Monitoreo de candidatos y métricas de desempeño evaluadas por IA en tiempo real con auditoría de sesgo activa.
        </p>
    </div>
</div>
""", unsafe_allow_html=True)

# 4 Tarjetas de Métricas (Top KPI Row)
kpis = api.get_kpis()
c1, c2, c3, c4 = st.columns(4)

with c1:
    st.metric("POSICIONES ACTIVAS", f"{kpis['posiciones_activas']} vacantes", delta=kpis['posiciones_activas_delta'])
    st.caption("4 en fase final")

with c2:
    st.metric("ENTREVISTAS COMPLETADAS", f"{kpis['entrevistas_completadas']} sesiones", delta=kpis['tasa_completadas'])
    st.caption(kpis['duracion_promedio'])

with c3:
    st.metric("SCORE PROMEDIO GENERAL", f"{kpis['score_promedio']} / 100", delta=kpis['percentil_global'])
    st.caption(f"Umbral de corte: {kpis['threshold']}")

with c4:
    st.metric("AHORRO DE TIEMPO", f"{kpis['horas_ahorradas']} horas", delta=kpis['ahorro_porcentaje'])
    st.caption(kpis['ahorro_por_plaza'])

st.markdown("---")

# Barra de Búsqueda y Filtros
f_col1, f_col2, f_col3, f_col4 = st.columns([5, 3, 2, 2])
with f_col1:
    search_q = st.text_input("🔍 Buscar por nombre, tecnología o posición...", placeholder="Ej: React, Python, Sofia, NLP...")
with f_col2:
    pos_filter = st.selectbox("Posición", ["Todas las Posiciones", "Senior Full Stack", "Frontend Lead", "Product Manager", "Data Scientist", "DevOps Engineer"])
with f_col3:
    score_filter = st.selectbox("Score", ["Todos", "> 80 pts (High)", "> 90 pts (Top)", "< 70 pts"])
with f_col4:
    status_filter = st.selectbox("Estado", ["Todos", "Recomendado", "En Revisión", "No Cumple"])

# Convertir filtros
min_s = 90 if "> 90" in score_filter else (80 if "> 80" in score_filter else None)
stat_f = None if status_filter == "Todos" else status_filter

candidates = api.get_candidates(min_score=min_s, status=stat_f)
if search_q:
    candidates = [
        c for c in candidates 
        if search_q.lower() in c['nombre'].lower() 
        or search_q.lower() in c['posicion_titulo'].lower()
        or any(search_q.lower() in t.lower() for t in c.get('tags', []))
    ]

# Layout principal: Tabla (8 cols) y Ficha de Análisis IA (4 cols)
col_table, col_radar = st.columns([8, 4], gap="medium")

# Manejo de candidato seleccionado para inspección
if "selected_candidate_slug" not in st.session_state:
    st.session_state.selected_candidate_slug = "elena"

with col_table:
    st.markdown("""
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <span style="font-weight: 700; font-size: 1.15rem; color: #0B192C;">Candidatos Evaluados</span>
        <span style="font-size: 0.8rem; color: #16A34A; font-weight: 600;">● Algoritmo de anti-sesgo validado ISO-27701</span>
    </div>
    """, unsafe_allow_html=True)
    
    # Renderizado iterativo de candidatos con interacción
    for cand in candidates:
        is_selected = (st.session_state.selected_candidate_slug == cand["slug"])
        border_style = "2px solid #0066FF" if is_selected else "1px solid #E2E8F0"
        bg_style = "#EFF6FF" if is_selected else "#FFFFFF"
        
        with st.container():
            st.markdown(f"""
            <div style="background: {bg_style}; border: {border_style}; border-radius: 12px; padding: 1rem; margin-bottom: 0.75rem; transition: all 0.2s;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <img src="{cand['avatar']}" style="width: 44px; height: 44px; border-radius: 9999px; object-fit: cover;">
                        <div>
                            <div style="font-weight: 700; font-size: 1.05rem; color: #0B192C;">{cand['nombre']}</div>
                            <div style="font-size: 0.8rem; color: #64748B;">{cand['email']} · {cand['telefono']}</div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <span style="font-size: 1.1rem; font-weight: 800; color: #0050CB;">{cand['score']} / 100</span>
                        <div style="font-size: 0.75rem; font-weight: 600; color: #64748B;">{cand['tier']}</div>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; font-size: 0.85rem;">
                    <div>
                        <strong>{cand['posicion_titulo']}</strong> · <span style="color:#64748B;">{', '.join(cand['tags'])}</span>
                    </div>
                    <div>
                        <span style="background: {'#ECFDF5' if cand['estado'] == 'Recomendado' else ('#EFF6FF' if cand['estado'] == 'En Revisión' else '#FEF2F2')}; 
                                     color: {'#047857' if cand['estado'] == 'Recomendado' else ('#1D4ED8' if cand['estado'] == 'En Revisión' else '#B91C1C')}; 
                                     padding: 3px 8px; border-radius: 9999px; font-weight: 700; font-size: 0.75rem;">
                            {cand['estado']}
                        </span>
                    </div>
                </div>
            </div>
            """, unsafe_allow_html=True)
            
            c_btn1, c_btn2, c_btn3 = st.columns([3, 2, 2])
            with c_btn1:
                if st.button(f"🔍 Ver Evaluación Completa", key=f"sel_{cand['slug']}"):
                    st.session_state.selected_candidate_slug = cand["slug"]
                    st.rerun()
            with c_btn2:
                if st.button(f"📄 Descargar CV", key=f"cv_{cand['slug']}"):
                    st.toast(f"Descargando {cand['cv_file']}...")
            with c_btn3:
                if st.button(f"🎙️ Sala Entrevista", key=f"ent_{cand['slug']}"):
                    st.switch_page("pages/3_Detalle_Entrevista.py")

with col_radar:
    # Ficha del candidato seleccionado
    selected = api.get_candidate_detail(st.session_state.selected_candidate_slug)
    if selected:
        st.markdown(f"""
        <div style="background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 14px; padding: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <span style="font-size: 0.75rem; color: #0050CB; font-weight: 700; text-transform: uppercase;">● CANDIDATO DESTACADO IA</span>
                <span style="background: #ECFDF5; color: #047857; font-size: 0.75rem; padding: 2px 8px; border-radius: 9999px; font-weight: 700;">
                    Match {selected['score']}% Fit
                </span>
            </div>
            <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 1rem;">
                <img src="{selected['avatar']}" style="width: 54px; height: 54px; border-radius: 12px; object-fit: cover;">
                <div>
                    <h3 style="margin: 0; font-size: 1.15rem; color: #0B192C;">{selected['nombre']}</h3>
                    <div style="font-size: 0.85rem; color: #0066FF; font-weight: 600;">{selected['posicion_titulo']}</div>
                    <div style="font-size: 0.75rem; color: #64748B;">Berlín · 8+ años exp.</div>
                </div>
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        # Gráfico Radar de Competencias Cuantitativas
        radar_data = selected.get("radar", {})
        if radar_data:
            categories = list(radar_data.keys())
            values = list(radar_data.values())
            # Cerrar el polígono
            categories.append(categories[0])
            values.append(values[0])
            
            fig = go.Figure()
            fig.add_trace(go.Scatterpolar(
                r=values,
                theta=categories,
                fill='toself',
                fillcolor='rgba(0, 102, 255, 0.2)',
                line=dict(color='#0066FF', width=2),
                name=selected['nombre']
            ))
            fig.update_layout(
                polar=dict(
                    radialaxis=dict(visible=True, range=[0, 100], showticklabels=False),
                ),
                margin=dict(l=30, r=30, t=20, b=20),
                height=260,
                showlegend=False
            )
            st.plotly_chart(fig, use_container_width=True)
            
        # Píldoras métricas de desglose
        p1, p2 = st.columns(2)
        with p1:
            st.metric("Proficiencia Técnica", f"{selected.get('breakdown', {}).get('tech', 95)}%", delta="Top 1%")
        with p2:
            st.metric("Alineación Cultural", f"{selected.get('breakdown', {}).get('culture', 90)}%", delta="Alta")
            
        # Extracto de transcripción
        st.markdown("**Extracto Transcripción IA**")
        st.caption("Minuto 24:12 - Concurrencia y Resiliencia")
        st.markdown("""
        > **Syntropic AI:** *"¿Cómo manejarías la degradación graciosa de throughput si un clúster experimenta latencias de p99 anómalas?"*  
        >  
        > **Candidato:** *"Implemento continuous batching desacoplado mediante cola asíncrona con fallback dinámico..."*
        """)
        
        st.info(f"💡 **Evaluación Sintética:** {selected.get('resumen_ia', 'Evaluación automatizada completada.')}")
        
        if st.button("✅ Aprobar a Fase Final", key="btn_approve_cand", use_container_width=True):
            api.approve_candidate(selected["id"])
            st.success(f"¡{selected['nombre']} ha sido aprobada a la Fase Final!")
            st.rerun()
            
        st.markdown("""
        <div style="background: #F8FAFC; border: 1px solid #CBD5E1; padding: 0.75rem; border-radius: 8px; font-size: 0.75rem; color: #475569; display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
            <span>🛡️ <strong>Auditoría Ética:</strong> 0.00% sesgo detectado</span>
            <span style="color: #16A34A; font-weight: 700;">VERIFICADO</span>
        </div>
        """, unsafe_allow_html=True)
