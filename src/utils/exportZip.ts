import JSZip from 'jszip';

// Contenidos exactos y completos de todos los archivos del proyecto Streamlit
const APP_PY = `"""
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

render_sidebar_header()

if st.session_state.authenticated:
    user = st.session_state.user or {}
    tenant = st.session_state.tenant or {}
    
    st.title("👋 Bienvenido de nuevo a Syntropic AI")
    st.markdown(f"Sesión activa como **{user.get('nombre', 'Usuario')}** (\`{st.session_state.role}\`) en **{tenant.get('name', 'Empresa')}**")
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
`;

const POSICIONES_PY = `"""
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
    
    with st.container():
        st.subheader("2. Base de Conocimiento para la IA")
        st.caption("Archivos técnicos vectores e instrucciones contextuales de evaluación")
        
        uploaded_files = st.file_uploader(
            "Arrastre documentos de arquitectura, estándares o especificaciones (PDF, DOCX, TXT hasta 25MB)",
            accept_multiple_files=True,
            type=["pdf", "docx", "txt", "md"]
        )
        
        st.markdown("**Archivos Indexados para este Rol (2):**")
        st.markdown("""
        - 📄 \`Tech_Stack_Standards_2025.pdf\` (2.4 MB) · <span style="color:#16A34A; font-weight:600;">✓ Ingesta Vectorial Completada</span>
        - 📝 \`Job_Description_FullStack.docx\` (1.1 MB) · <span style="color:#16A34A; font-weight:600;">✓ Ingesta Vectorial Completada</span>
        """, unsafe_allow_html=True)
        
        ai_directive = st.text_area(
            "Instrucciones Específicas de Evaluación (AI System Directive)",
            value="Evaluar experiencia en microservicios, testing y resolución de problemas arquitectónicos con énfasis en alta concurrencia y patrones resilientes.",
            help="Directiva prioritaria para el agente evaluador durante la sesión interactiva."
        )
        
    st.markdown("---")
    
    with st.container():
        st.subheader("3. Banco de Preguntas Clave & Ponderación")
        st.caption("Dimensiones calibradas con peso asignado para el scoring algorítmico (Total: 100%)")
        
        q1_weight = st.slider("1. Escalabilidad y concurrencia con Node.js", 0, 50, 30, format="%d%%")
        q2_weight = st.slider("2. Manejo de estado complejo y optimización en React", 0, 50, 25, format="%d%%")
        q3_weight = st.slider("3. Ajuste cultural, comunicación asíncrona y colaboración", 0, 50, 20, format="%d%%")
        q4_weight = st.slider("4. Pregunta adaptativa generada por IA basada en su CV ✦", 0, 50, 25, format="%d%%")
        
        auto_adapt = st.toggle("Auto-adaptar preguntas según CV en milisegundos", value=True)
        
        total_p = q1_weight + q2_weight + q3_weight + q4_weight
        if total_p == 100:
            st.success(f"Ponderación total balanceada: **{total_p}%**")
        else:
            st.warning(f"La suma de ponderaciones debe ser 100% (actual: {total_p}%)")

with col_links:
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
            st.markdown(f"\`{l['expira_en']}\`")
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
`;

const CANDIDATOS_PY = `"""
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

f_col1, f_col2, f_col3, f_col4 = st.columns([5, 3, 2, 2])
with f_col1:
    search_q = st.text_input("🔍 Buscar por nombre, tecnología o posición...", placeholder="Ej: React, Python, Sofia, NLP...")
with f_col2:
    pos_filter = st.selectbox("Posición", ["Todas las Posiciones", "Senior Full Stack", "Frontend Lead", "Product Manager", "Data Scientist", "DevOps Engineer"])
with f_col3:
    score_filter = st.selectbox("Score", ["Todos", "> 80 pts (High)", "> 90 pts (Top)", "< 70 pts"])
with f_col4:
    status_filter = st.selectbox("Estado", ["Todos", "Recomendado", "En Revisión", "No Cumple"])

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

col_table, col_radar = st.columns([8, 4], gap="medium")

if "selected_candidate_slug" not in st.session_state:
    st.session_state.selected_candidate_slug = "elena"

with col_table:
    st.markdown("""
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <span style="font-weight: 700; font-size: 1.15rem; color: #0B192C;">Candidatos Evaluados</span>
        <span style="font-size: 0.8rem; color: #16A34A; font-weight: 600;">● Algoritmo de anti-sesgo validado ISO-27701</span>
    </div>
    """, unsafe_allow_html=True)
    
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
                if st.button(f"🔍 Ver Evaluación", key=f"sel_{cand['slug']}"):
                    st.session_state.selected_candidate_slug = cand["slug"]
                    st.rerun()
            with c_btn2:
                if st.button(f"📄 Descargar CV", key=f"cv_{cand['slug']}"):
                    st.toast(f"Descargando {cand['cv_file']}...")
            with c_btn3:
                if st.button(f"🎙️ Sala Entrevista", key=f"ent_{cand['slug']}"):
                    st.switch_page("pages/3_Detalle_Entrevista.py")

with col_radar:
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
        
        radar_data = selected.get("radar", {})
        if radar_data:
            categories = list(radar_data.keys())
            values = list(radar_data.values())
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
                polar=dict(radialaxis=dict(visible=True, range=[0, 100], showticklabels=False)),
                margin=dict(l=30, r=30, t=20, b=20),
                height=260,
                showlegend=False
            )
            st.plotly_chart(fig, use_container_width=True)
            
        p1, p2 = st.columns(2)
        with p1:
            st.metric("Proficiencia Técnica", f"{selected.get('breakdown', {}).get('tech', 95)}%", delta="Top 1%")
        with p2:
            st.metric("Alineación Cultural", f"{selected.get('breakdown', {}).get('culture', 90)}%", delta="Alta")
            
        st.info(f"💡 **Evaluación Sintética:** {selected.get('resumen_ia', 'Evaluación automatizada completada.')}")
        
        if st.button("✅ Aprobar a Fase Final", key="btn_approve_cand", use_container_width=True):
            api.approve_candidate(selected["id"])
            st.success(f"¡{selected['nombre']} ha sido aprobada a la Fase Final!")
            st.rerun()
`;

const DETALLE_ENTREVISTA_PY = `"""
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
                <div>
                    <div style="font-size: 0.85rem; font-weight: 700; color: #F8FAFC;">Sofía Valenzuela</div>
                    <div style="font-size: 0.7rem; color: #94A3B8;">Candidata (En Línea)</div>
                </div>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    current_q = session_data["pregunta_actual"]
    st.markdown(f"""
    <div style="background: #FFFFFF; border-left: 4px solid #0066FF; border-radius: 8px; padding: 1.25rem; margin-top: 1rem; border: 1px solid #E2E8F0;">
        <span style="font-size: 0.8rem; color: #0066FF; font-weight: 700; text-transform: uppercase;">
            ❓ PREGUNTA {current_q['numero']} DE {current_q['total']} ({current_q['contexto']})
        </span>
        <p style="font-size: 1.05rem; font-weight: 600; color: #0B192C; margin: 10px 0;">
            "{current_q['texto']}"
        </p>
    </div>
    """, unsafe_allow_html=True)

with col_feed:
    tab_trans, tab_eval = st.tabs(["📝 Transcripción en Vivo", "📊 Evaluación IA"])
    with tab_trans:
        for t in session_data["transcripcion"]:
            st.markdown(f"**{t['emisor']}** ({t['hora']}): {t['texto']}")
    with tab_eval:
        for ev in session_data["evaluacion_tiempo_real"]:
            st.metric(ev['criterio'], f"{ev['score']}%", ev['detalle'])
`;

const LINKS_PY = `"""
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
    with st.form("form_new_link"):
        cand_name = st.text_input("Nombre del Candidato", placeholder="Ej: Valentina Morales")
        cand_email = st.text_input("Correo Electrónico", placeholder="valentina@empresa.dev")
        pos_code = st.selectbox("Posición Destino", ["s-fullstack (Senior Full Stack)", "fe-lead (Frontend Lead)", "ds-nlp (Data Scientist NLP)"])
        code_clean = pos_code.split(" ")[0]
        
        submitted = st.form_submit_button("⚡ Generar Token y Enlace Seguro", use_container_width=True)
        if submitted:
            new_link = api.generate_token_link(cand_name, cand_email, code_clean)
            st.success(f"¡Token {new_link['token']} generado con éxito para {cand_name}!")
            st.code(new_link["url"], language="bash")

with col_list:
    st.subheader("Inventario de Enlaces Activos")
    links = api.get_links()
    for l in links:
        st.markdown(f"**{l['candidato']}** - \`{l['url']}\` ({l['estado']})")
`;

const BUSCAR_CANDIDATOS_PY = `"""
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

query = st.text_input("Consulta semántica o nombre", placeholder="Ej: 'Ingeniero con experiencia en clusters vLLM y microservicios'")
min_score = st.slider("Score IA Mínimo", 50, 100, 75)

candidates = api.get_candidates(min_score=min_score)
for c in candidates:
    st.markdown(f"### {c['nombre']} - {c['posicion_titulo']} ({c['score']} / 100)")
    st.caption(f"Habilidades: {', '.join(c.get('skills', []))}")
    st.write(c.get('resumen_ia', ''))
    st.markdown("---")
`;

const API_CLIENT_PY = `"""
Syntropic AI - Cliente de API para FastAPI
Encapsula todas las llamadas HTTP al backend FastAPI con inyección de JWT,
manejo de errores y fallback transparente a mocks locales cuando la API está offline.
"""

import os
import requests
import streamlit as st
from typing import Dict, Any, List, Optional
from mocks import mock_data

API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:8000/api/v1")
TIMEOUT_SECONDS = int(os.getenv("API_TIMEOUT", "4"))

class APIClient:
    def __init__(self, base_url: str = API_BASE_URL):
        self.base_url = base_url.rstrip("/")
        
    def _get_headers(self) -> Dict[str, str]:
        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
        if "jwt_token" in st.session_state and st.session_state.jwt_token:
            headers["Authorization"] = f"Bearer {st.session_state.jwt_token}"
        if "tenant" in st.session_state and st.session_state.tenant:
            headers["X-Tenant-ID"] = st.session_state.tenant.get("id", "t-001")
        return headers

    def get_kpis(self) -> Dict[str, Any]:
        try:
            resp = requests.get(f"{self.base_url}/stats/kpis", headers=self._get_headers(), timeout=TIMEOUT_SECONDS)
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass
        return mock_data.MOCK_KPIS

    def get_positions(self) -> List[Dict[str, Any]]:
        try:
            resp = requests.get(f"{self.base_url}/positions", headers=self._get_headers(), timeout=TIMEOUT_SECONDS)
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass
        return mock_data.MOCK_POSICIONES

    def create_position(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        try:
            resp = requests.post(f"{self.base_url}/positions", json=payload, headers=self._get_headers(), timeout=TIMEOUT_SECONDS)
            if resp.status_code in [200, 201]:
                return resp.json()
        except Exception:
            pass
        new_pos = {
            "id": f"pos-{len(mock_data.MOCK_POSICIONES) + 1:03d}",
            "code": f"SYN-{9000 + len(mock_data.MOCK_POSICIONES)}",
            "titulo": payload.get("titulo", "Nueva Posición"),
            "stack": payload.get("stack", "Full Stack"),
            "departamento": payload.get("departamento", "Engineering"),
            "seniority": payload.get("seniority", "Senior"),
            "modalidad": payload.get("modalidad", "Full-time / Remoto"),
            "estado": "Activa",
            "postulantes_count": 0,
            "evaluados_count": 0,
            "knowledge_files": payload.get("knowledge_files", []),
            "ai_directive": payload.get("ai_directive", ""),
            "rubricas": payload.get("rubricas", [])
        }
        mock_data.MOCK_POSICIONES.append(new_pos)
        return new_pos

    def get_candidates(self, position_id: Optional[str] = None, min_score: Optional[int] = None, status: Optional[str] = None) -> List[Dict[str, Any]]:
        try:
            params = {}
            if position_id and position_id != "all":
                params["position_id"] = position_id
            if min_score:
                params["min_score"] = min_score
            if status and status != "all":
                params["status"] = status
                
            resp = requests.get(f"{self.base_url}/candidates", params=params, headers=self._get_headers(), timeout=TIMEOUT_SECONDS)
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass
            
        candidates = list(mock_data.MOCK_CANDIDATOS)
        if min_score:
            candidates = [c for c in candidates if c["score"] >= min_score]
        if status and status != "all":
            candidates = [c for c in candidates if c["estado"].lower() == status.lower()]
        return candidates

    def get_candidate_detail(self, candidate_slug: str) -> Optional[Dict[str, Any]]:
        try:
            resp = requests.get(f"{self.base_url}/candidates/{candidate_slug}", headers=self._get_headers(), timeout=TIMEOUT_SECONDS)
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass
        for c in mock_data.MOCK_CANDIDATOS:
            if c["slug"] == candidate_slug or c["id"] == candidate_slug:
                return c
        return mock_data.MOCK_CANDIDATOS[2]

    def approve_candidate(self, candidate_id: str) -> bool:
        try:
            resp = requests.post(f"{self.base_url}/candidates/{candidate_id}/approve", headers=self._get_headers(), timeout=TIMEOUT_SECONDS)
            if resp.status_code == 200:
                return True
        except Exception:
            pass
        for c in mock_data.MOCK_CANDIDATOS:
            if c["id"] == candidate_id:
                c["estado"] = "Aprobado Fase Final"
                c["estado_color"] = "emerald"
                return True
        return True

    def get_interview_session(self, session_id: str = "default") -> Dict[str, Any]:
        try:
            resp = requests.get(f"{self.base_url}/interviews/{session_id}", headers=self._get_headers(), timeout=TIMEOUT_SECONDS)
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass
        return mock_data.MOCK_INTERVIEW_SESSION

    def get_links(self) -> List[Dict[str, Any]]:
        try:
            resp = requests.get(f"{self.base_url}/links", headers=self._get_headers(), timeout=TIMEOUT_SECONDS)
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass
        return mock_data.MOCK_LINKS

    def generate_token_link(self, candidate_name: str, email: str, position_code: str) -> Dict[str, Any]:
        try:
            payload = {"candidato": candidate_name, "email": email, "position_code": position_code}
            resp = requests.post(f"{self.base_url}/links/generate", json=payload, headers=self._get_headers(), timeout=TIMEOUT_SECONDS)
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass
        import uuid
        token_id = f"tok_{uuid.uuid4().hex[:8]}"
        new_link = {
            "id": f"tok-{len(mock_data.MOCK_LINKS) + 1:03d}",
            "candidato": candidate_name,
            "email": email,
            "posicion_code": position_code,
            "token": token_id,
            "url": f"https://syntropic.ai/interview/{token_id}?pos={position_code}",
            "expira_en": "48h 00m",
            "estado": "No utilizado",
            "estado_badge": "bg-blue-50 text-blue-700",
            "creado": "Recién generado"
        }
        mock_data.MOCK_LINKS.insert(0, new_link)
        return new_link

    def send_mass_invitations(self) -> int:
        try:
            resp = requests.post(f"{self.base_url}/links/dispatch-mass", headers=self._get_headers(), timeout=TIMEOUT_SECONDS)
            if resp.status_code == 200:
                return resp.json().get("dispatched_count", 15)
        except Exception:
            pass
        return 15

api = APIClient()
`;

const SESSION_PY = `"""
Syntropic AI - Módulo de Autenticación y Sesión
Gestión de JWT, control de roles (RBAC), multi-tenant y estado en Streamlit
"""

import time
import streamlit as st
from typing import List, Optional

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

def init_session() -> None:
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
    if not email or not password:
        return False
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
    st.session_state.authenticated = False
    st.session_state.jwt_token = None
    st.session_state.user = None
    st.session_state.role = None
    st.rerun()

def require_auth(allowed_roles: Optional[List[str]] = None) -> bool:
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
    if not st.session_state.get("authenticated", False):
        return
    user = st.session_state.get("user", {})
    tenant = st.session_state.get("tenant", {})
    role = st.session_state.get("role", "User")
    with st.sidebar:
        st.markdown(f"**🏢 {tenant.get('name', 'Syntropic')}**")
        st.caption(f"Tenant ID: \`{tenant.get('id', 't-001')}\` · {tenant.get('tier', 'Enterprise')}")
        st.markdown("---")
        st.markdown(f"**{user.get('nombre', 'Usuario')}**")
        st.caption(f"{role}")
        if st.button("Cerrar Sesión", key="btn_logout", use_container_width=True):
            logout_user()
        st.markdown("---")
`;

const MOCK_DATA_PY = `"""
Syntropic AI - Mock Data & API Schemas
Estructura y datos de prueba con la forma exacta esperada por FastAPI
"""

MOCK_TENANTS = [
    {"id": "t-001", "name": "TechCorp Inc.", "tier": "Enterprise Elite", "domain": "techcorp.io"},
    {"id": "t-002", "name": "FinTech Global Labs", "tier": "Growth", "domain": "fintechglobal.com"},
    {"id": "t-003", "name": "BioHealth Robotics", "tier": "Enterprise", "domain": "biohealth.ai"},
]

MOCK_KPIS = {
    "posiciones_activas": 12,
    "posiciones_activas_delta": "+3 este mes",
    "fase_final_count": 4,
    "entrevistas_completadas": 348,
    "tasa_completadas": "94%",
    "duracion_promedio": "~38 min / sesion",
    "score_promedio": 84.5,
    "threshold": 80.0,
    "percentil_global": "Top 12% global",
    "horas_ahorradas": 186,
    "ahorro_porcentaje": "78% vs tradicional",
    "ahorro_por_plaza": "~12.4h por plaza",
    "sesgo_demografico": "0.00% sesgo demográfico detectado",
    "certificacion": "ISO-27701 & SOC2 Tipo II"
}

MOCK_POSICIONES = [
    {
        "id": "pos-001",
        "code": "SYN-9941",
        "titulo": "Senior Full Stack Developer",
        "stack": "React 18 & Node.js",
        "departamento": "Engineering",
        "seniority": "Senior 5+ años",
        "modalidad": "Full-time / Remoto (LatAm / Global Core)",
        "estado": "Activa",
        "postulantes_count": 48,
        "evaluados_count": 5
    }
]

MOCK_CANDIDATOS = [
    {
        "id": "cand-001",
        "slug": "sofia",
        "nombre": "Sofía Ramírez",
        "email": "sofia.ramirez@devmail.io",
        "telefono": "+34 612 884 192",
        "posicion_id": "pos-001",
        "posicion_titulo": "Senior Full Stack",
        "tags": ["Next.js", "Node", "Distributed Sys"],
        "avatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuCB84HaTvYnAi0P5ZFK8peWv1P9OaXc8wlrOhQ3_8Bjo8m7QM7WjX7QS7bSRCBao9S-poRDSR8pS3C45cKtHfK7YRAni6LCP-xaSegNNSXD95sF1nkM1wQCdsqHN_LDRHxLM2fQrvSMoO21k2Rw2B8jeWvBN-JKdWEEz4DAQ9YNIsu0V-jMLXArU6VNMUe4eHtXqRZOuEX5KCxIeWRJ1jSVbmPqo8LTT1KUa5aB-4qBJY_rnw4yxn9A",
        "fecha_entrevista": "24 Oct, 2025",
        "hora": "14:30 CEST",
        "duracion": "42 min",
        "score": 92,
        "tier": "Tier 1",
        "estado": "Recomendado",
        "breakdown": {"tech": 94, "culture": 90, "arch": 92, "comm": 89},
        "cv_file": "Sofia_Ramirez_Senior_FullStack_CV.pdf",
        "skills": ["React 18", "Node.js", "TypeScript", "PostgreSQL", "Kafka", "Docker", "AWS"],
        "resumen_ia": "Candidata sobresaliente con sólida experiencia en migraciones distribuidas y microservicios resilientes.",
        "radar": {"Algoritmos": 92, "MLOps": 85, "Liderazgo": 91, "Cultura": 90, "Resolución": 95}
    },
    {
        "id": "cand-003",
        "slug": "elena",
        "nombre": "Elena Rostova",
        "email": "e.rostova@datasci.ai",
        "telefono": "+49 30 7721 905",
        "posicion_id": "pos-003",
        "posicion_titulo": "Data Scientist (NLP)",
        "tags": ["PyTorch", "Transformers", "MLOps"],
        "avatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAf-jfbFw1jSiOEe_JX9mHEyhZTWPCx1FYdchzphukJpRRSgG4ZihCU7CnuiriW6c6o_vkxRfGeJRgq-YZfjZ6EaFsHAA2kMpLfZNoSO3fgD0EbEJrhyD0mvzNqAAml10v9R56BgfRy08PKJOIvRDBj2o6tSWX1QKp32TXzwTSjn47MC9BRMGTrJkFDXkQyOZg9jIKOPjZC1USZpz0DKxPNRuz45otjTjy6rku5QvIWqiXwz5_OFnXP",
        "fecha_entrevista": "22 Oct, 2025",
        "hora": "16:15 CEST",
        "duracion": "48 min",
        "score": 96,
        "tier": "Tier 1+",
        "estado": "Recomendado",
        "breakdown": {"tech": 98, "culture": 94, "arch": 96, "comm": 95},
        "cv_file": "Elena_Rostova_Staff_Data_Scientist.pdf",
        "skills": ["PyTorch", "HuggingFace", "vLLM", "CUDA", "Kubernetes", "LangChain", "LoRA"],
        "resumen_ia": "Respuestas con fundamentación matemática sobresaliente. Capacidad analítica superior al 99% de candidatos previos.",
        "radar": {"Algoritmos": 98, "MLOps": 92, "Liderazgo": 94, "Cultura": 95, "Resolución": 96}
    }
]

MOCK_LINKS = [
    {
        "id": "tok-001",
        "candidato": "Mariana Morales",
        "email": "m.morales@mail.com",
        "posicion_code": "s-fullstack",
        "token": "tok_9482_f839a",
        "url": "https://syntropic.ai/interview/tok_9482_f839a?pos=s-fullstack",
        "expira_en": "48h 00m",
        "estado": "No utilizado",
        "creado": "2025-10-24 09:00"
    }
]

MOCK_INTERVIEW_SESSION = {
    "posicion_titulo": "Senior Full Stack Developer",
    "candidata_nombre": "Sofía Valenzuela",
    "tiempo_transcurrido": "14:25",
    "tiempo_total": "25:00",
    "paso": "Paso 4 de 5",
    "fase": "Fase de Evaluación Técnica",
    "pregunta_actual": {
        "numero": 3,
        "total": 5,
        "id": "PRG-MS-884",
        "contexto": "Basada en tu experiencia con microservicios en tu CV",
        "texto": "Sofía, veo en tu CV que lideraste la migración a NestJS en tu rol anterior. ¿Cómo manejaste la consistencia de datos eventual y los patrones de resiliencia ante caídas de servicios externos?",
        "fuente": "Mercado Libre Senior Backend Match",
        "tiempo_sugerido": "3 minutos"
    },
    "transcripcion": [
        {"emisor": "Agente Syntropic", "hora": "14:22:10", "texto": "Hola Sofía, bienvenida a tu entrevista técnica automatizada.", "is_agent": True},
        {"emisor": "Sofía Valenzuela", "hora": "14:23:02", "texto": "¡Muchas gracias! Sí, encantada de detallar el proceso de migración modular.", "is_agent": False}
    ],
    "evaluacion_tiempo_real": [
        {"criterio": "Habilidad Técnica (Microservicios)", "detalle": "Patrones Outbox, DLQ, Circuit Breakers", "score": 92, "feedback": "Terminología precisa aplicada a sistemas distribuidos."}
    ],
    "observaciones_ia": "La candidata demuestra autonomía en decisiones de alta criticidad en producción."
}
`;

const DOCKERFILE = `# ==============================================================
# Syntropic AI - Talent Intelligence Streamlit Dashboard
# Dockerfile para despliegue productivo y visualización local
# ==============================================================
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \\
    build-essential \\
    curl \\
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8501

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:8501/_stcore/health || exit 1

ENTRYPOINT ["streamlit", "run", "app.py", \\
            "--server.port=8501", \\
            "--server.address=0.0.0.0", \\
            "--server.headless=true", \\
            "--server.enableCORS=false", \\
            "--server.enableXsrfProtection=true"]
`;

const DOCKER_COMPOSE_YML = `version: '3.8'

services:
  streamlit-dashboard:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: syntropic_streamlit_dashboard
    ports:
      - "8501:8501"
    environment:
      - API_BASE_URL=http://fastapi-backend:8000/api/v1
      - API_TIMEOUT=5
    restart: unless-stopped
    volumes:
      - .:/app
`;

const REQUIREMENTS_TXT = `streamlit>=1.38.0
requests>=2.31.0
python-jose>=3.3.0
pandas>=2.0.0
plotly>=5.18.0
pydantic>=2.0.0
python-dotenv>=1.0.0
`;

const README_MD = `# Syntropic AI - Streamlit Dashboard de Reclutamiento & Inteligencia de Talento

Estructura modular en Streamlit para evaluación autónoma de candidatos, gestión de posiciones y enlaces dinámicos con FastAPI.

## Estructura del Proyecto

\`\`\`text
dashboard/
├── app.py                 # Entrada principal: login corporativo y redirección por rol
├── pages/                 # Una página por módulo, visible según rol (RBAC)
│   ├── 1_Posiciones.py           # Creación de vacantes, base de conocimiento y ponderaciones
│   ├── 2_Candidatos.py           # Dashboard de reclutamiento, KPIs y ficha con radar chart
│   ├── 3_Detalle_Entrevista.py    # Sala de entrevista técnica interactiva y transcripción IA
│   ├── 4_Links.py                # Generador de enlaces dinámicos de un solo uso (HMAC)
│   └── 5_Buscar_Candidatos.py    # Búsqueda semántica por habilidades y scoring
├── services/
│   └── api_client.py     # Cliente unificado con llamadas a FastAPI y fallback a mocks
├── auth/
│   └── session.py        # Control de sesiones, JWT, roles RBAC y tenant
├── mocks/
│   └── mock_data.py      # Datos de prueba con el esquema exacto de la API
├── requirements.txt      # Dependencias de Python
├── Dockerfile            # Configuración para despliegue en contenedor Docker
└── docker-compose.yml    # Orquestación con FastAPI opcional
\`\`\`

## Ejecución Local

1. Instalar dependencias:
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

2. Ejecutar la aplicación en Streamlit:
   \`\`\`bash
   streamlit run app.py
   \`\`\`
   Abrir en el navegador en \`http://localhost:8501\`.

## Ejecución con Docker

Construir la imagen:
\`\`\`bash
docker build -t syntropic-dashboard .
\`\`\`

Iniciar el contenedor:
\`\`\`bash
docker run -d -p 8501:8501 --name syntropic-app syntropic-dashboard
\`\`\`

Visitar \`http://localhost:8501\` en tu navegador.
`;

/**
 * Empaqueta todos los archivos del dashboard en un archivo .ZIP descargable en el navegador
 */
export async function downloadDashboardZip(): Promise<void> {
  const zip = new JSZip();

  // Crear la carpeta raíz dashboard
  const folder = zip.folder('dashboard') || zip;

  // Archivos en la raíz de dashboard/
  folder.file('app.py', APP_PY.trim());
  folder.file('Dockerfile', DOCKERFILE.trim());
  folder.file('requirements.txt', REQUIREMENTS_TXT.trim());
  folder.file('docker-compose.yml', DOCKER_COMPOSE_YML.trim());
  folder.file('README.md', README_MD.trim());

  // Subcarpeta pages/
  const pages = folder.folder('pages');
  if (pages) {
    pages.file('1_Posiciones.py', POSICIONES_PY.trim());
    pages.file('2_Candidatos.py', CANDIDATOS_PY.trim());
    pages.file('3_Detalle_Entrevista.py', DETALLE_ENTREVISTA_PY.trim());
    pages.file('4_Links.py', LINKS_PY.trim());
    pages.file('5_Buscar_Candidatos.py', BUSCAR_CANDIDATOS_PY.trim());
  }

  // Subcarpeta services/
  const services = folder.folder('services');
  if (services) {
    services.file('api_client.py', API_CLIENT_PY.trim());
  }

  // Subcarpeta auth/
  const auth = folder.folder('auth');
  if (auth) {
    auth.file('session.py', SESSION_PY.trim());
  }

  // Subcarpeta mocks/
  const mocks = folder.folder('mocks');
  if (mocks) {
    mocks.file('mock_data.py', MOCK_DATA_PY.trim());
  }

  // Generar blob y forzar descarga
  const content = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(content);

  const anchor = document.createElement('a');
  anchor.href = downloadUrl;
  anchor.download = 'syntropic_streamlit_dashboard.zip';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(downloadUrl);
}
