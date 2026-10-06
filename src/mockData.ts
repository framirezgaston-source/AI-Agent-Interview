import { Candidate, TokenLink, InterviewSession, KnowledgeFile, RubricCriteria, UserSession } from './types';

export const INITIAL_USER: UserSession = {
  email: 'elena.rostova@techcorp.io',
  nombre: 'Elena Rostova',
  cargo: 'Talent AI Lead',
  role: 'Talent Lead',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC1On3aDwams0rnMYwVmJbBf4X8--1uuY7mBHIZ1rWirFQoR2_x44CRT1vJIcXXzaYkVyBduAabgwqOKn7J-7yZkw3hGUa4K3yWLONgOptXTdLITkMwwjO65rV75opTngyZtMTyWS9PD77Yc1mKpSnNKbp4EPMepCiDzXC3aoTlZ3Lo94Zq2E4RXaY7REOMTRlUyhJnAZ9ERiCzhUdnx1ho1zwAAuA2jbRcJGdRfn89ymuDMrNTjGf',
  tenant: {
    id: 't-001',
    name: 'TechCorp Inc.',
    tier: 'Enterprise Elite'
  }
};

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'cand-001',
    slug: 'sofia',
    nombre: 'Sofía Ramírez',
    email: 'sofia.ramirez@devmail.io',
    telefono: '+34 612 884 192',
    posicion_id: 'pos-001',
    posicion_titulo: 'Senior Full Stack',
    tags: ['Next.js', 'Node', 'Distributed Sys'],
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB84HaTvYnAi0P5ZFK8peWv1P9OaXc8wlrOhQ3_8Bjo8m7QM7WjX7QS7bSRCBao9S-poRDSR8pS3C45cKtHfK7YRAni6LCP-xaSegNNSXD95sF1nkM1wQCdsqHN_LDRHxLM2fQrvSMoO21k2Rw2B8jeWvBN-JKdWEEz4DAQ9YNIsu0V-jMLXArU6VNMUe4eHtXqRZOuEX5KCxIeWRJ1jSVbmPqo8LTT1KUa5aB-4qBJY_rnw4yxn9A',
    fecha_entrevista: '24 Oct, 2025',
    hora: '14:30 CEST (42 min)',
    duracion: '42 min',
    score: 92,
    tier: 'Tier 1',
    estado: 'Recomendado',
    breakdown: { tech: 94, culture: 90, arch: 92, comm: 89 },
    cv_file: 'Sofia_Ramirez_Senior_FullStack_CV.pdf',
    skills: ['React 18', 'Node.js', 'TypeScript', 'PostgreSQL', 'Kafka', 'Docker', 'AWS'],
    resumen_ia: 'Candidata sobresaliente con sólida experiencia en migraciones distribuidas y microservicios resilientes. Capacidad probada en entornos cloud-native.',
    radar: { Algoritmos: 92, MLOps: 85, Liderazgo: 91, Cultura: 90, Resolución: 95 },
    transcript_highlight: {
      time: 'Minuto 18:40 - Patrones de Resiliencia',
      agent: '¿Cómo manejas fallos de conexión en microservicios asíncronos?',
      candidate: 'Implemento Circuit Breakers con Fallbacks parametrizados y reintentos con jitter exponencial...'
    }
  },
  {
    id: 'cand-002',
    slug: 'carlos',
    nombre: 'Carlos Méndez',
    email: 'carlos.mendez@pmlead.org',
    telefono: '+52 55 9182 3401',
    posicion_id: 'pos-001',
    posicion_titulo: 'Product Manager',
    tags: ['B2B SaaS', 'OKRs', 'Growth Ops'],
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCG5RscYss2aGlZxVj1VCfqYQi2VsjFcAVQiACruet3CM4Ua_4ioHR4A5h2JBKL7ztEsXg4Dmxuew-MvgtF4s9uDq21eEZ3DO1v9VIC6dzKp0ROwpHWVEEBuKnaeJ04D14dhF_yTB6PxhL0IheY3_D55y4yBT8BF9Djb_htQgkUO8iSZDgTWWoFWFkWULS2dzZ2R22FdsAmp3CXOlrUyDCBuWLFwSn_eL0EOL0PlPU1cwfHPWNK58Zq',
    fecha_entrevista: '23 Oct, 2025',
    hora: '11:00 CEST (55 min)',
    duracion: '55 min',
    score: 86,
    tier: 'Tier 2',
    estado: 'En Revisión',
    breakdown: { tech: 88, culture: 84, arch: 85, comm: 88 },
    cv_file: 'Carlos_Mendez_PM_Lead_CV.pdf',
    skills: ['Product Strategy', 'B2B SaaS', 'SQL', 'Scrum', 'Customer Discovery'],
    resumen_ia: 'Fuerte en visión estratégica de producto y métricas de retención; profundizar en casos prácticos de trade-offs de arquitectura técnica.',
    radar: { Algoritmos: 78, MLOps: 75, Liderazgo: 92, Cultura: 89, Resolución: 88 },
    transcript_highlight: {
      time: 'Minuto 31:10 - Priorización de Roadmap',
      agent: '¿Cómo balanceas deuda técnica crítica contra requerimientos de revenue inmediato?',
      candidate: 'Reservo un 20% recurrente de capacidad de sprint asignado a invariantes arquitecturales acordado con stakeholders...'
    }
  },
  {
    id: 'cand-003',
    slug: 'elena',
    nombre: 'Elena Rostova',
    email: 'e.rostova@datasci.ai',
    telefono: '+49 30 7721 905',
    posicion_id: 'pos-003',
    posicion_titulo: 'Data Scientist (NLP)',
    tags: ['PyTorch', 'Transformers', 'MLOps'],
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAf-jfbFw1jSiOEe_JX9mHEyhZTWPCx1FYdchzphukJpRRSgG4ZihCU7CnuiriW6c6o_vkxRfGeJRgq-YZfjZ6EaFsHAA2kMpLfZNoSO3fgD0EbEJrhyD0mvzNqAAml10v9R56BgfRy08PKJOIvRDBj2o6tSWX1QKp32TXzwTSjn47MC9BRMGTrJkFDXkQyOZg9jIKOPjZC1USZpz0DKxPNRuz45otjTjy6rku5QvIWqiXwz5_OFnXP',
    fecha_entrevista: '22 Oct, 2025',
    hora: '16:15 CEST (48 min)',
    duracion: '48 min',
    score: 96,
    tier: 'Tier 1+',
    estado: 'Recomendado',
    breakdown: { tech: 98, culture: 94, arch: 96, comm: 95 },
    cv_file: 'Elena_Rostova_Staff_Data_Scientist.pdf',
    skills: ['PyTorch', 'HuggingFace', 'vLLM', 'CUDA', 'Kubernetes', 'LangChain', 'LoRA'],
    resumen_ia: 'Respuestas con fundamentación matemática sobresaliente. Capacidad analítica superior al 99% de candidatos previos para la posición de NLP Principal.',
    radar: { Algoritmos: 98, MLOps: 92, Liderazgo: 94, Cultura: 95, Resolución: 96 },
    transcript_highlight: {
      time: 'Minuto 24:12 - Concurrencia LLM',
      agent: '¿Cómo manejarías la degradación graciosa de throughput si un clúster vLLM experimenta latencias de p99 anómalas?',
      candidate: 'Implemento continuous batching desacoplado mediante cola asíncrona con fallback dinámico a modelos cuantizados AWQ de menor huella, protegiendo SLA crítico...'
    }
  },
  {
    id: 'cand-004',
    slug: 'mateo',
    nombre: 'Mateo Chen',
    email: 'm.chen@frontendops.dev',
    telefono: '+1 415 632 8890',
    posicion_id: 'pos-002',
    posicion_titulo: 'Frontend Lead',
    tags: ['Design Systems', 'React', 'WebGL'],
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhE8upRDvAB8zlrVmucU4K7evIAemP20LVDEImUt-PQI0zH76pyRda9vpnlwfSigjKg7desY_hP91GMnD5Y6P-NtOcPvFsjsaLRNj1H_v52HZMXkXPS3rabsT8jYSI4V8LEH7e1ZSPir_HDiJAYDrYYjO8Y7_ch1hGH06wwMOqrGqL-Q3O4UIMIZE6nU9bNzdhKym5A1qwKH03osOnUNIdbM9kpBkOUjAVMDe-r6Fbt-pOCMrcXovr',
    fecha_entrevista: '21 Oct, 2025',
    hora: '09:30 CEST (40 min)',
    duracion: '40 min',
    score: 81,
    tier: 'Tier 2',
    estado: 'En Revisión',
    breakdown: { tech: 89, culture: 73, arch: 84, comm: 78 },
    cv_file: 'Mateo_Chen_Frontend_Lead.pdf',
    skills: ['React', 'TypeScript', 'Three.js', 'TailwindCSS', 'Jest', 'Microfrontends'],
    resumen_ia: 'Excelente nivel técnico y arquitectural en interfaces complejas. Área de mejora en estructuración de comunicación bajo preguntas abiertas.',
    radar: { Algoritmos: 80, MLOps: 70, Liderazgo: 82, Cultura: 79, Resolución: 89 },
    transcript_highlight: {
      time: 'Minuto 14:05 - Performance Web Vitals',
      agent: '¿Qué estrategia usas para asegurar INP sub-50ms en árboles DOM masivos?',
      candidate: 'Utilizamos virtualización de listas con requestAnimationFrame y segregamos el estado volátil a Web Workers dedicados...'
    }
  },
  {
    id: 'cand-005',
    slug: 'lucia',
    nombre: 'Lucía Morales',
    email: 'lucia.infra@cloudnative.es',
    telefono: '+34 91 402 1894',
    posicion_id: 'pos-001',
    posicion_titulo: 'DevOps Engineer',
    tags: ['Kubernetes', 'Terraform', 'AWS'],
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv9KKNMywe7ORslqPkpTVV6b7ntXok6Ymro8QGYvGIln9enAI734NAfTWy-WADYDHMNdX16uF1rMbhKTdtlAoO1rK_XBtfLvwIBXocBdxm0D5BLWf0ZPEa2RpASMlzGsAhda3kJqDQiNc_oD6OKrFE8fb9lIyYjD_V4swGy11WyazrRWolruDXC3VaXtc4TK4OJkxWaBYex0Ux6-MFr_P9y36ZuM7eufJUpazKRULZ3DA3eFMIU-_d',
    fecha_entrevista: '20 Oct, 2025',
    hora: '12:00 CEST (35 min)',
    duracion: '35 min',
    score: 67,
    tier: 'Tier 3',
    estado: 'No Cumple',
    breakdown: { tech: 71, culture: 63, arch: 65, comm: 68 },
    cv_file: 'Lucia_Morales_DevOps_CV.pdf',
    skills: ['Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'Prometheus'],
    resumen_ia: 'Conocimientos generales de infraestructura básica, pero insuficiente profundidad en políticas de seguridad Zero-Trust y mitigación de incidentes p99.',
    radar: { Algoritmos: 62, MLOps: 68, Liderazgo: 65, Cultura: 66, Resolución: 71 },
    transcript_highlight: {
      time: 'Minuto 20:15 - Despliegues Zero Downtime',
      agent: '¿Cómo coordinas migraciones de esquema Postgres en despliegues Canary?',
      candidate: 'Normalmente pausamos el tráfico entrante durante la noche para aplicar los scripts de base de datos...'
    }
  }
];

export const INITIAL_LINKS: TokenLink[] = [
  {
    id: 'tok-001',
    candidato: 'Mariana Morales',
    email: 'm.morales@mail.com',
    posicion_code: 's-fullstack',
    token: 'tok_9482_f839a',
    url: 'http://localhost:8501/Portal_Candidato?token=tok_9482_f839a&pos=s-fullstack',
    expira_en: '48h 00m',
    estado: 'No utilizado',
    creado: 'Hoy, 09:00'
  },
  {
    id: 'tok-002',
    candidato: 'Carlos Silvetti',
    email: 'c.silvetti@domain.dev',
    posicion_code: 's-fullstack',
    token: 'tok_8812_bb31e',
    url: 'http://localhost:8501/Portal_Candidato?token=tok_8812_bb31e&pos=s-fullstack',
    expira_en: '36h 12m',
    estado: 'En progreso',
    creado: 'Hoy, 10:15'
  },
  {
    id: 'tok-003',
    candidato: 'Lucía Benítez',
    email: 'lbenitez@cloudops.org',
    posicion_code: 's-fullstack',
    token: 'tok_1102_99ac2',
    url: 'http://localhost:8501/Portal_Candidato?token=tok_1102_99ac2&pos=s-fullstack',
    expira_en: 'Consumido',
    estado: 'Completado',
    creado: 'Ayer, 15:30'
  },
  {
    id: 'tok-004',
    candidato: 'Santiago Cruz',
    email: 'santiago.c@tech.ai',
    posicion_code: 's-fullstack',
    token: 'tok_7721_dd01c',
    url: 'https://syntropic.ai/interview/tok_7721_dd01c?pos=s-fullstack',
    expira_en: '48h 00m',
    estado: 'No utilizado',
    creado: 'Hoy, 11:45'
  }
];

export const INITIAL_KNOWLEDGE_FILES: KnowledgeFile[] = [
  { name: 'Tech_Stack_Standards_2025.pdf', size: '2.4 MB', type: 'PDF', status: 'Ingesta Vectorial Completada' },
  { name: 'Job_Description_FullStack.docx', size: '1.1 MB', type: 'DOC', status: 'Ingesta Vectorial Completada' }
];

export const INITIAL_RUBRICS: RubricCriteria[] = [
  { id: 1, criterio: 'Experiencia en escalabilidad y concurrencia con Node.js', peso: 30, descripcion: 'Indagar sobre Event Loop, clustering, memory leaks y manejo de colas Kafka/RabbitMQ.' },
  { id: 2, criterio: 'Manejo de estado complejo y optimización en React', peso: 25, descripcion: 'Evaluar Server Components, profiling de renderizado, selectores memoizados y virtualización.' },
  { id: 3, criterio: 'Ajuste cultural, comunicación asíncrona y colaboración', peso: 20, descripcion: 'Resolución de desacuerdos técnicos en PRs, documentación proactiva y ownership funcional.' },
  { id: 4, criterio: 'Pregunta adaptativa generada por IA basada en su CV', peso: 25, descripcion: 'El motor analiza proyectos previos del aspirante y formula preguntas sobre los mayores retos declarados.' }
];

export const INITIAL_INTERVIEW: InterviewSession = {
  posicion_titulo: 'Senior Full Stack Developer',
  candidata_nombre: 'Sofía Valenzuela',
  tiempo_transcurrido: '14:25',
  tiempo_total: '25:00',
  paso: 'Paso 4 de 5',
  fase: 'Fase de Evaluación Técnica',
  pregunta_actual: {
    numero: 3,
    total: 5,
    id: 'PRG-MS-884',
    contexto: 'Basada en tu experiencia con microservicios en tu CV',
    texto: 'Sofía, veo en tu CV que lideraste la migración a NestJS en tu rol anterior. ¿Cómo manejaste la consistencia de datos eventual y los patrones de resiliencia ante caídas de servicios externos?',
    fuente: 'Mercado Libre Senior Backend Match',
    tiempo_sugerido: '3 minutos'
  },
  transcripcion: [
    {
      emisor: 'Agente Syntropic',
      hora: '14:22:10',
      texto: 'Hola Sofía, bienvenida a tu entrevista técnica automatizada. Revisaremos aspectos arquitecturales y toma de decisiones. Comencemos con tu experiencia en Node y NestJS.',
      is_agent: true
    },
    {
      emisor: 'Sofía Valenzuela',
      hora: '14:23:02',
      texto: '¡Muchas gracias! Sí, encantada de detallar el proceso de migración modular y los retos que resolvimos.',
      is_agent: false
    },
    {
      emisor: 'Agente Syntropic',
      hora: '14:24:15',
      texto: 'Sofía, veo en tu CV que lideraste la migración a NestJS en tu rol anterior. ¿Cómo manejaste la consistencia de datos eventual y los patrones de resiliencia ante caídas de servicios externos?',
      is_agent: true
    },
    {
      emisor: 'Sofía Valenzuela',
      hora: '14:24:45',
      texto: 'Para la consistencia eventual adoptamos el patrón Outbox transaccional acoplado a un broker Kafka. Si un servicio externo de pasarela fallaba, implementamos Circuit Breakers con resiliencia en memoria y colas de reintentos exponenciales con Dead Letter Queues...',
      is_agent: false,
      is_current: true
    }
  ],
  evaluacion_tiempo_real: [
    {
      criterio: 'Habilidad Técnica (Microservicios)',
      detalle: 'Patrones Outbox, DLQ, Circuit Breakers',
      score: 92,
      feedback: 'Terminología precisa aplicada a sistemas distribuidos.'
    },
    {
      criterio: 'Comunicación y Claridad',
      detalle: 'Estructuración STAR, fluidez vocal',
      score: 88,
      feedback: 'Respuesta directa y fundamentada sin rodeos.'
    },
    {
      criterio: 'Alineación con Base de Conocimiento',
      detalle: 'Stack interno de la empresa (Kafka / Nest)',
      score: 95,
      feedback: 'Alineación sobresaliente con el perfil de vacante.'
    }
  ],
  observaciones_ia: 'La candidata demuestra autonomía en decisiones de alta criticidad en producción. Se sugiere profundizar en la siguiente pregunta sobre observabilidad y tracing distribuido (OpenTelemetry).'
};

export const CODE_FILES_MANIFEST = [
  {
    path: 'dashboard/app.py',
    title: 'app.py',
    desc: 'Entrada principal, login corporativo, registro en SQLite y redirección por rol',
    lang: 'python',
    code: `"""
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

st.set_page_config(page_title="Syntropic AI - Acceso Corporativo", page_icon="🧠", layout="wide")
init_session()
render_sidebar_header()

if st.session_state.authenticated:
    st.title("👋 Bienvenido de nuevo a Syntropic AI")
    st.switch_page("pages/2_Candidatos.py")
else:
    col_left, col_right = st.columns([6, 6], gap="large")
    with col_right:
        st.subheader("Acceso al Sistema")
        st.caption("Autenticación con Base de Datos SQLite persistente en data/users.db")

        # Pestañas para Iniciar Sesión o Registrarse
        tab_login, tab_register = st.tabs(["🔑 Iniciar Sesión", "📝 Registrar Nuevo Usuario"])

        with tab_login:
            if st.button("🌐 Continuar con Google Workspace / Demo SSO", use_container_width=True):
                login_user("elena.rostova@techcorp.io", "demo123", role=ROLE_TALENT_LEAD)
                st.switch_page("pages/2_Candidatos.py")

            with st.form("form_login"):
                email_in = st.text_input("Correo electrónico", value="elena.rostova@techcorp.io")
                password_in = st.text_input("Contraseña", value="demo123", type="password")
                if st.form_submit_button("Iniciar Sesión ➔", use_container_width=True):
                    if login_user(email_in, password_in):
                        st.switch_page("pages/2_Candidatos.py")
                    else:
                        st.error("Credenciales incorrectas. Regístrate en la pestaña 'Registrar Nuevo Usuario'.")

        with tab_register:
            st.info("Crea una cuenta real. Se guardará con hash SHA-256 + salt en data/users.db.")
            with st.form("form_register"):
                new_nombre = st.text_input("Nombre completo", placeholder="Ej: Gastón Ramírez")
                new_email = st.text_input("Correo electrónico real", placeholder="tu_correo@franjaautomations.com")
                new_pass = st.text_input("Contraseña (mínimo 6 caracteres)", type="password")
                new_pass_c = st.text_input("Confirmar contraseña", type="password")
                new_role = st.selectbox("Rol", [ROLE_TALENT_LEAD, ROLE_SUPERADMIN, ROLE_RECRUITER, ROLE_HIRING_MANAGER])
                new_tenant = st.text_input("Empresa", value="Franja Automations")

                if st.form_submit_button("Crear Cuenta y Guardar en BD 💾", use_container_width=True):
                    if new_pass != new_pass_c:
                        st.error("Las contraseñas no coinciden.")
                    else:
                        ok, msg = register_user(new_nombre, new_email, new_pass, role=new_role, tenant_name=new_tenant)
                        if ok:
                            st.success(msg)
                            login_user(new_email, new_pass, role=new_role, tenant_name=new_tenant)
                            st.rerun()
                        else:
                            st.error(msg)`
  },
  {
    path: 'dashboard/pages/1_Posiciones.py',
    title: '1_Posiciones.py',
    desc: 'Creación de posiciones, base de conocimiento y ponderaciones',
    lang: 'python',
    code: `import streamlit as st
from auth.session import require_auth, render_sidebar_header
from services.api_client import api

st.set_page_config(page_title="Syntropic - Crear Posición", page_icon="📝", layout="wide")
require_auth(["SuperAdmin", "Talent Lead", "Recruiter"])
render_sidebar_header()

st.title("Crear Nueva Posición de Entrevista")
# Formulario de parámetros, carga vectorial y generación de enlaces...`
  },
  {
    path: 'dashboard/pages/2_Candidatos.py',
    title: '2_Candidatos.py',
    desc: 'Dashboard de reclutamiento, KPIs y ficha con radar chart',
    lang: 'python',
    code: `import streamlit as st
import plotly.graph_objects as go
from auth.session import require_auth, render_sidebar_header
from services.api_client import api

st.set_page_config(page_title="Syntropic - Dashboard de Reclutamiento", page_icon="👥", layout="wide")
require_auth(["SuperAdmin", "Talent Lead", "Recruiter", "Hiring Manager"])
render_sidebar_header()

kpis = api.get_kpis()
# Renderizado de 4 tarjetas de métricas, filtros dinámicos, tabla y radar...`
  },
  {
    path: 'dashboard/pages/3_Detalle_Entrevista.py',
    title: '3_Detalle_Entrevista.py',
    desc: 'Sala de entrevista técnica interactiva y transcripción IA',
    lang: 'python',
    code: `import streamlit as st
from auth.session import require_auth, render_sidebar_header
from services.api_client import api

st.set_page_config(page_title="Syntropic - Sala de Entrevista Interactiva", page_icon="🎙️", layout="wide")
require_auth(["SuperAdmin", "Talent Lead", "Recruiter", "Hiring Manager", "Technical Interviewer"])
render_sidebar_header()

session_data = api.get_interview_session("default")
# Visualizador de modulación AI CORE, WebRTC y transcripción en vivo...`
  },
  {
    path: 'dashboard/pages/4_Links.py',
    title: '4_Links.py',
    desc: 'Generador de enlaces dinámicos de un solo uso (HMAC)',
    lang: 'python',
    code: `import streamlit as st
from auth.session import require_auth, render_sidebar_header
from services.api_client import api

st.set_page_config(page_title="Syntropic - Enlaces Dinámicos", page_icon="🔗", layout="wide")
require_auth(["SuperAdmin", "Talent Lead", "Recruiter"])
render_sidebar_header()

# Gestión de tokens criptográficos SHA-256 HMAC y despacho masivo...`
  },
  {
    path: 'dashboard/pages/5_Buscar_Candidatos.py',
    title: '5_Buscar_Candidatos.py',
    desc: 'Búsqueda semántica por habilidades y scoring',
    lang: 'python',
    code: `import streamlit as st
from auth.session import require_auth, render_sidebar_header
from services.api_client import api

st.set_page_config(page_title="Syntropic - Buscar Candidatos", page_icon="🔎", layout="wide")
require_auth(["SuperAdmin", "Talent Lead", "Recruiter", "Hiring Manager"])
render_sidebar_header()

# Motor de búsqueda semántico con filtros por skills, tier y score...`
  },
  {
    path: 'dashboard/services/api_client.py',
    title: 'services/api_client.py',
    desc: 'Cliente unificado con llamadas a FastAPI y fallback a mocks',
    lang: 'python',
    code: `import os, requests, streamlit as st
from mocks import mock_data

API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:8000/api/v1")

class APIClient:
    def get_kpis(self): ...
    def get_candidates(self, ...): ...
    def create_position(self, ...): ...
    def generate_token_link(self, ...): ...`
  },
  {
    path: 'dashboard/auth/session.py',
    title: 'auth/session.py',
    desc: 'Control de sesiones, JWT, roles RBAC y tenant',
    lang: 'python',
    code: `import streamlit as st

ROLE_SUPERADMIN = "SuperAdmin"
ROLE_TALENT_LEAD = "Talent Lead"
ROLE_RECRUITER = "Recruiter"
ROLE_HIRING_MANAGER = "Hiring Manager"

def init_session(): ...
def login_user(email, password, role, ...): ...
def require_auth(allowed_roles=None): ...`
  },
  {
    path: 'dashboard/mocks/mock_data.py',
    title: 'mocks/mock_data.py',
    desc: 'Datos de prueba con el esquema exacto de la API',
    lang: 'python',
    code: `MOCK_TENANTS = [...]
MOCK_KPIS = {...}
MOCK_POSICIONES = [...]
MOCK_CANDIDATOS = [...]
MOCK_LINKS = [...]
MOCK_INTERVIEW_SESSION = {...}`
  },
  {
    path: 'dashboard/Dockerfile',
    title: 'Dockerfile',
    desc: 'Configuración para contenedor Docker con Streamlit en puerto 8501',
    lang: 'dockerfile',
    code: `FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8501
ENTRYPOINT ["streamlit", "run", "app.py", "--server.port=8501", "--server.address=0.0.0.0"]`
  },
  {
    path: 'dashboard/requirements.txt',
    title: 'requirements.txt',
    desc: 'Dependencias de Python necesarias',
    lang: 'text',
    code: `streamlit>=1.38.0
requests>=2.31.0
python-jose>=3.3.0
pandas>=2.0.0
plotly>=5.18.0
pydantic>=2.0.0
python-dotenv>=1.0.0`
  }
];
