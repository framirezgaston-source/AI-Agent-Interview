"""
Syntropic AI - Módulo de Búsqueda Semántica de Candidatos
Exploración de postulantes por habilidades, score algorítmico y afinidad de perfil
"""

import streamlit as st
from auth.session import require_auth, render_sidebar_header, ROLE_SUPERADMIN, ROLE_TALENT_LEAD, ROLE_RECRUITER, ROLE_HIRING_MANAGER
from services.api_client import api

st.set_page_config(page_title="Syntropic - Buscar Candidatos", page_icon="🔎", layout="wide")
require_auth([ROLE_SUPERADMIN, ROLE_TALENT_LEAD, ROLE_RECRUITER, ROLE_HIRING_MANAGER])
render_sidebar_header()

st.title("🔎 Búsqueda Inteligente de Candidatos")
st.caption("Motor semántico para localización de talento técnico calificado por IA")

# Barra de Búsqueda Avanzada
col_query, col_skill = st.columns([6, 6])
with col_query:
    query = st.text_input("Consulta semántica o nombre", placeholder="Ej: 'Ingeniero con experiencia en clusters vLLM y microservicios'")
with col_skill:
    skills_selected = st.multiselect(
        "Habilidades técnicas requeridas",
        ["React 18", "Node.js", "TypeScript", "PyTorch", "vLLM", "Kubernetes", "AWS", "Kafka", "PostgreSQL", "Product Strategy"],
        default=[]
    )

col_s1, col_s2, col_s3 = st.columns(3)
with col_s1:
    min_score = st.slider("Score IA Mínimo", 50, 100, 75)
with col_s2:
    tier_filter = st.selectbox("Tier Algorítmico", ["Todos los Tiers", "Tier 1+ (Top 1%)", "Tier 1 (Top 5%)", "Tier 2", "Tier 3"])
with col_s3:
    status_filter = st.selectbox("Estado", ["Todos", "Recomendado", "En Revisión"])

candidates = api.get_candidates()

# Aplicar filtros
filtered = []
for c in candidates:
    if c["score"] < min_score:
        continue
    if status_filter != "Todos" and c["estado"] != status_filter:
        continue
    if skills_selected:
        cand_skills = [s.lower() for s in c.get("skills", []) + c.get("tags", [])]
        if not any(req.lower() in cand_skills for req in skills_selected):
            continue
    if query:
        q = query.lower()
        match = (q in c["nombre"].lower() or 
                 q in c["posicion_titulo"].lower() or 
                 any(q in s.lower() for s in c.get("skills", [])) or
                 q in c.get("resumen_ia", "").lower())
        if not match:
            continue
    filtered.append(c)

st.markdown(f"**Resultados encontrados:** `{len(filtered)} candidatos`")
st.markdown("---")

if not filtered:
    st.info("No se encontraron candidatos que coincidan con los criterios seleccionados.")
else:
    for cand in filtered:
        c_avatar, c_info, c_score, c_act = st.columns([1, 5, 3, 3])
        with c_avatar:
            st.image(cand["avatar"], width=60)
        with c_info:
            st.markdown(f"### {cand['nombre']}")
            st.markdown(f"**{cand['posicion_titulo']}** · `{cand['tier']}`")
            st.caption(f"📧 {cand['email']} · 📱 {cand['telefono']}")
            st.write(f"💡 *{cand['resumen_ia']}*")
            
            # Badges de skills
            skills_html = " ".join([f"<span style='background:#F1F5F9; color:#0F172A; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:600;'>{s}</span>" for s in cand.get("skills", [])])
            st.markdown(skills_html, unsafe_allow_html=True)
            
        with c_score:
            st.metric("Score IA", f"{cand['score']} / 100", delta=cand["tier"])
            st.caption(f"Tech: {cand['breakdown']['tech']}% · Cultura: {cand['breakdown']['culture']}%")
            
        with c_act:
            if st.button("Ver Perfil Completo", key=f"btn_p_{cand['slug']}", use_container_width=True):
                st.session_state.selected_candidate_slug = cand["slug"]
                st.switch_page("pages/2_Candidatos.py")
            if st.button("Descargar CV", key=f"btn_cv_{cand['slug']}", use_container_width=True):
                st.toast(f"Descargando {cand['cv_file']}...")
                
        st.markdown("<hr style='margin: 1rem 0; border: 0; border-top: 1px solid #E2E8F0;'>", unsafe_allow_html=True)
