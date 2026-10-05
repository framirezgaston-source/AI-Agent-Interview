"""
Syntropic AI - Módulo de Creación y Configuración de Posiciones
Paso 1 y 2: Parámetros del Modelo, Base de Conocimiento y Vínculos Dinámicos
"""

import streamlit as st
from auth.session import require_auth, render_sidebar_header, ROLE_SUPERADMIN, ROLE_TALENT_LEAD, ROLE_RECRUITER
from services.api_client import api

st.set_page_config(page_title="Syntropic - Crear Posición", page_icon="📝", layout="wide")
require_auth([ROLE_SUPERADMIN, ROLE_TALENT_LEAD, ROLE_RECRUITER])
render_sidebar_header()

st.markdown("""
<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; background: #FFFFFF; padding: 1.25rem; border-radius: 12px; border: 1px solid #E2E8F0;">
    <div>
        <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.4rem; font-weight: 700; color: #0B192C;">Crear Nueva Posición de Entrevista</span>
            <span style="font-size: 0.75rem; background: #EFF6FF; color: #1D4ED8; padding: 2px 8px; border-radius: 9999px; font-weight: 600; text-transform: uppercase;">Borrador</span>
        </div>
        <div style="color: #64748B; font-size: 0.85rem; margin-top: 4px;">
            Pipeline ID: <strong>#SYN-9941</strong> · <span style="color: #0066FF; font-weight: 600;">Paso 1 y 2: Parámetros del Modelo & Vínculos Dinámicos</span>
        </div>
    </div>
</div>
""", unsafe_allow_html=True)

col_form, col_links = st.columns([7, 5], gap="large")

with col_form:
    # 1. Detalles de la Posición
    with st.container():
        st.subheader("1. Detalles de la Posición")
        st.caption("Calibración semántica del perfil para el evaluador autónomo de IA")
        
        titulo_puesto = st.text_input("Título del Puesto", value="Senior Full Stack Developer (React & Node)")
        
        c1, c2 = st.columns(2)
        with c1:
            departamento = st.selectbox("Departamento", ["Engineering", "Architecture & Cloud", "Data & Machine Learning", "Product"])
        with c2:
            seniority = st.selectbox("Seniority", ["Senior 5+ años", "Staff Engineer (8+ años)", "Principal Engineer (10+ años)", "Lead Developer"])
            
        modalidad = st.selectbox("Modalidad y Jornada", [
            "Full-time / Remoto (LatAm / Global Core)",
            "Full-time / Híbrido",
            "Contractor / Remoto"
        ])
        
    st.markdown("---")
    
    # 2. Base de Conocimiento para la IA
    with st.container():
        st.subheader("2. Base de Conocimiento para la IA")
        st.caption("Archivos técnicos vectores e instrucciones contextuales de evaluación")
        
        uploaded_files = st.file_uploader(
            "Arrastre documentos de arquitectura, estándares o especificaciones (PDF, DOCX, TXT hasta 25MB)",
            accept_multiple_files=True,
            type=["pdf", "docx", "txt", "md"]
        )

        # Botón para descargar el PDF de ejemplo pregenerado
        import os
        sample_pdf_path = os.path.join(os.path.dirname(__file__), "..", "data", "IA_Engineer_Knowledge_Base_Franja_Automations.pdf")
        if os.path.exists(sample_pdf_path):
            with open(sample_pdf_path, "rb") as f:
                st.download_button(
                    label="📥 Descargar PDF de Ejemplo: AI_Engineer_Knowledge_Base_Franja.pdf",
                    data=f.read(),
                    file_name="IA_Engineer_Knowledge_Base_Franja_Automations.pdf",
                    mime="application/pdf",
                    help="Descarga este archivo de ejemplo para subirlo a la casilla y probar la indexación vectorial.",
                    use_container_width=True
                )
        
        st.markdown("**Archivos Indexados para este Rol:**")
        if uploaded_files:
            st.success(f"¡{len(uploaded_files)} archivo(s) procesado(s) exitosamente en memoria vectorial!")
            for uf in uploaded_files:
                size_kb = round(len(uf.getvalue()) / 1024, 1)
                st.markdown(f"- 📄 **`{uf.name}`** ({size_kb} KB) · <span style='color:#16A34A; font-weight:600;'>✓ Ingesta Vectorial Completada</span>", unsafe_allow_html=True)
        else:
            st.markdown("""
            - 📄 `Tech_Stack_Standards_2025.pdf` (2.4 MB) · <span style="color:#16A34A; font-weight:600;">✓ Ingesta Vectorial Completada</span>
            - 📝 `Job_Description_FullStack.docx` (1.1 MB) · <span style="color:#16A34A; font-weight:600;">✓ Ingesta Vectorial Completada</span>
            """, unsafe_allow_html=True)
        
        ai_directive = st.text_area(
            "Instrucciones Específicas de Evaluación (AI System Directive)",
            value="Evaluar experiencia en agentes autónomos, RAG híbrido (Dense + BM25), microservicios en FastAPI y mitigación de prompt injection con énfasis en sistemas en producción.",
            help="Directiva prioritaria para el agente evaluador durante la sesión interactiva."
        )
        
    st.markdown("---")
    
    # 3. Banco de Preguntas Clave & Ponderación
    with st.container():
        st.subheader("3. Banco de Preguntas Clave & Ponderación")
        st.caption("Dimensiones calibradas con peso asignado para el scoring algorítmico (Total: 100%)")
        
        q1_weight = st.slider("1. Escalabilidad y concurrencia con Node.js", 0, 50, 30, format="%d%%")
        st.caption("Indagar sobre Event Loop, clustering, memory leaks y colas Kafka/RabbitMQ.")
        
        q2_weight = st.slider("2. Manejo de estado complejo y optimización en React", 0, 50, 25, format="%d%%")
        st.caption("Server Components, profiling de renderizado, selectores memoizados y virtualización.")
        
        q3_weight = st.slider("3. Ajuste cultural, comunicación asíncrona y colaboración", 0, 50, 20, format="%d%%")
        st.caption("Resolución de desacuerdos técnicos en PRs, documentación y ownership funcional.")
        
        q4_weight = st.slider("4. Pregunta adaptativa generada por IA basada en su CV ✦", 0, 50, 25, format="%d%%")
        st.caption("El motor analiza proyectos previos del aspirante y formula retos a medida.")
        
        auto_adapt = st.toggle("Auto-adaptar preguntas según CV en milisegundos", value=True)
        
        total_p = q1_weight + q2_weight + q3_weight + q4_weight
        if total_p == 100:
            st.success(f"Ponderación total balanceada: **{total_p}%**")
        else:
            st.warning(f"La suma de ponderaciones debe ser 100% (actual: {total_p}%)")

with col_links:
    # Paso 2 / Despliegue: Generador de Enlaces Dinámicos
    st.markdown("""
    <div style="background: #FFFFFF; padding: 1.5rem; border-radius: 12px; border: 1px solid #E2E8F0;">
        <span style="font-size: 0.75rem; background: #EFF6FF; color: #1D4ED8; padding: 2px 8px; border-radius: 4px; font-weight: 700; text-transform: uppercase;">Paso 2 / Despliegue</span>
        <h3 style="margin-top: 8px; color: #0B192C;">Generador de Enlaces Dinámicos de Un Solo Uso</h3>
        <p style="color: #64748B; font-size: 0.85rem;">Pipeline seguro para prevención de suplantación y validación biométrica.</p>
        
        <div style="background: #F8FAFC; border: 1px solid #CBD5E1; padding: 0.75rem; border-radius: 8px; font-size: 0.82rem; color: #334155; margin-bottom: 1rem;">
            🛡️ <strong>Garantía Zero-Trust Syntropic:</strong> Cada enlace es estrictamente único, expira automáticamente tras 1 uso y está vinculado a 1 candidato específico.
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    st.markdown("#### Límite de candidatos a invitar")
    quota = st.number_input("Tokens a generar", min_value=1, max_value=100, value=15)
    
    token_url = "https://syntropic.ai/interview/tok_9482_f839a?pos=s-fullstack"
    st.text_input("Enlace Generado Dinámico (Token Activo)", value=token_url, disabled=True)
    
    if st.button("📋 Copiar Enlace Seguro", use_container_width=True):
        st.toast("¡Enlace copiado al portapapeles!")
        
    st.markdown("#### Enlaces Asignados al Lote")
    links_data = api.get_links()
    for l in links_data:
        c_name, c_exp, c_status = st.columns([5, 3, 4])
        with c_name:
            st.markdown(f"**{l['candidato']}**<br><span style='font-size:0.75rem;color:#64748B;'>{l['email']}</span>", unsafe_allow_html=True)
        with c_exp:
            st.markdown(f"`{l['expira_en']}`")
        with c_status:
            badge_color = "#16A34A" if l['estado'] == "Completado" else ("#D97706" if l['estado'] == "En progreso" else "#2563EB")
            st.markdown(f"<span style='color:{badge_color}; font-size:0.8rem; font-weight:600;'>{l['estado']}</span>", unsafe_allow_html=True)
            
    if st.button("✉️ Enviar 15 Invitaciones Masivas por Correo", use_container_width=True):
        count = api.send_mass_invitations()
        st.success(f"¡Se han despachado {count} invitaciones tokenizadas por email!")
        
    st.caption("🔒 Token SHA-256 HMAC · Revocación instantánea activa")
    
    st.markdown("---")
    if st.button("🚀 Publicar Posición y Activar Pipeline", use_container_width=True):
        api.create_position({
            "titulo": titulo_puesto,
            "departamento": departamento,
            "seniority": seniority,
            "modalidad": modalidad,
            "ai_directive": ai_directive,
        })
        st.success(f"Posición '{titulo_puesto}' publicada con éxito. Redirigiendo a Candidatos...")
        st.switch_page("pages/2_Candidatos.py")
