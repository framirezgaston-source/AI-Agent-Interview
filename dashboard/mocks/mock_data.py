"""
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
        "evaluados_count": 5,
        "knowledge_files": [
            {"name": "Tech_Stack_Standards_2025.pdf", "size": "2.4 MB", "status": "Ingesta Vectorial Completada"},
            {"name": "Job_Description_FullStack.docx", "size": "1.1 MB", "status": "Ingesta Vectorial Completada"}
        ],
        "ai_directive": "Evaluar experiencia en microservicios, testing y resolución de problemas arquitectónicos con énfasis en alta concurrencia y patrones resilientes.",
        "rubricas": [
            {"criterio": "Experiencia en escalabilidad y concurrencia con Node.js", "peso": 30, "descripcion": "Event Loop, clustering, memory leaks y manejo de colas Kafka/RabbitMQ."},
            {"criterio": "Manejo de estado complejo y optimización en React", "peso": 25, "descripcion": "Server Components, profiling de render, selectores memoizados y virtualización."},
            {"criterio": "Ajuste cultural, comunicación asíncrona y colaboración", "peso": 20, "descripcion": "Resolución de desacuerdos técnicos en PRs y ownership."},
            {"criterio": "Pregunta adaptativa generada por IA basada en su CV", "peso": 25, "descripcion": "Retos declarados en proyectos previos del aspirante."}
        ]
    },
    {
        "id": "pos-002",
        "code": "SYN-8832",
        "titulo": "Frontend Lead",
        "stack": "Design Systems • React • WebGL",
        "departamento": "Product Engineering",
        "seniority": "Staff 8+ años",
        "modalidad": "Full-time / Remoto",
        "estado": "Activa",
        "postulantes_count": 32,
        "evaluados_count": 4,
        "knowledge_files": [
            {"name": "Design_System_Tokens_v3.pdf", "size": "3.8 MB", "status": "Ingesta Vectorial Completada"}
        ],
        "ai_directive": "Enfocar en arquitectura de componentes distribuidos, performance web vitals y liderazgo de equipos de diseño y frontend.",
        "rubricas": [
            {"criterio": "Arquitectura de UI y Component Design", "peso": 35, "descripcion": "Design tokens, modularidad y headless components."},
            {"criterio": "Web Performance & Core Vitals", "peso": 25, "descripcion": "LCP, FID, CLS, Tree-shaking y code splitting."},
            {"criterio": "Liderazgo y Mentoría", "peso": 20, "descripcion": "Onboarding y elevación del nivel de ingeniería."},
            {"criterio": "Pregunta Adaptativa IA", "peso": 20, "descripcion": "Profundización en proyectos más complejos del portafolio."}
        ]
    },
    {
        "id": "pos-003",
        "code": "SYN-7740",
        "titulo": "Data Scientist (NLP & Core LLMs)",
        "stack": "PyTorch • Transformers • MLOps",
        "departamento": "Data & Machine Learning",
        "seniority": "Senior 6+ años",
        "modalidad": "Full-time / Remoto",
        "estado": "Activa",
        "postulantes_count": 27,
        "evaluados_count": 3,
        "knowledge_files": [
            {"name": "LLM_Inference_Cluster_Architecture.pdf", "size": "4.2 MB", "status": "Ingesta Vectorial Completada"}
        ],
        "ai_directive": "Validar fundamentación matemática de atención multi-head, técnicas de cuantización (AWQ, GPTQ) y optimización de vLLM en producción.",
        "rubricas": [
            {"criterio": "Algoritmos y Arquitectura de Modelos", "peso": 40, "descripcion": "Transformers, RoPE, FlashAttention, cuellos de botella de KV cache."},
            {"criterio": "MLOps y Servido en Alta Concurrencia", "peso": 30, "descripcion": "vLLM, TensorRT-LLM, continuous batching y Kubernetes."},
            {"criterio": "Evaluación Empírica y Benchmarks", "peso": 15, "descripcion": "Detección de alucinaciones y calibración de métricas BLEU/ROUGE/HELM."},
            {"criterio": "Adaptabilidad y Casos Reales CV", "peso": 15, "descripcion": "Desafíos de p99 en clusters GPU declarados."}
        ]
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
        "estado_color": "emerald",
        "breakdown": {"tech": 94, "culture": 90, "arch": 92, "comm": 89},
        "cv_file": "Sofia_Ramirez_Senior_FullStack_CV.pdf",
        "skills": ["React 18", "Node.js", "TypeScript", "PostgreSQL", "Kafka", "Docker", "AWS"],
        "resumen_ia": "Candidata sobresaliente con sólida experiencia en migraciones distribuidas y microservicios resilientes.",
        "radar": {"Algoritmos": 92, "MLOps": 85, "Liderazgo": 91, "Cultura": 90, "Resolución": 95}
    },
    {
        "id": "cand-002",
        "slug": "carlos",
        "nombre": "Carlos Méndez",
        "email": "carlos.mendez@pmlead.org",
        "telefono": "+52 55 9182 3401",
        "posicion_id": "pos-001",
        "posicion_titulo": "Product Manager",
        "tags": ["B2B SaaS", "OKRs", "Growth Ops"],
        "avatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuCG5RscYss2aGlZxVj1VCfqYQi2VsjFcAVQiACruet3CM4Ua_4ioHR4A5h2JBKL7ztEsXg4Dmxuew-MvgtF4s9uDq21eEZ3DO1v9VIC6dzKp0ROwpHWVEEBuKnaeJ04D14dhF_yTB6PxhL0IheY3_D55y4yBT8BF9Djb_htQgkUO8iSZDgTWWoFWFkWULS2dzZ2R22FdsAmp3CXOlrUyDCBuWLFwSn_eL0EOL0PlPU1cwfHPWNK58Zq",
        "fecha_entrevista": "23 Oct, 2025",
        "hora": "11:00 CEST",
        "duracion": "55 min",
        "score": 86,
        "tier": "Tier 2",
        "estado": "En Revisión",
        "estado_color": "blue",
        "breakdown": {"tech": 88, "culture": 84, "arch": 85, "comm": 88},
        "cv_file": "Carlos_Mendez_PM_Lead_CV.pdf",
        "skills": ["Product Strategy", "B2B SaaS", "SQL", "Scrum", "Customer Discovery"],
        "resumen_ia": "Fuerte en estrategia de producto y métricas de retención; profundizar en casos prácticos de trade-offs de arquitectura técnica.",
        "radar": {"Algoritmos": 78, "MLOps": 75, "Liderazgo": 92, "Cultura": 89, "Resolución": 88}
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
        "estado_color": "emerald",
        "breakdown": {"tech": 98, "culture": 94, "arch": 96, "comm": 95},
        "cv_file": "Elena_Rostova_Staff_Data_Scientist.pdf",
        "skills": ["PyTorch", "HuggingFace", "vLLM", "CUDA", "Kubernetes", "LangChain", "LoRA"],
        "resumen_ia": "Respuestas con fundamentación matemática sobresaliente. Capacidad analítica superior al 99% de candidatos previos para la posición de NLP Principal.",
        "radar": {"Algoritmos": 98, "MLOps": 92, "Liderazgo": 94, "Cultura": 95, "Resolución": 96},
        "transcript_highlight": {
            "time": "Minuto 24:12 - Concurrencia LLM",
            "agent": "¿Cómo manejarías la degradación graciosa de throughput si un clúster vLLM experimenta latencias de p99 anómalas?",
            "candidate": "Implemento continuous batching desacoplado mediante cola asíncrona con fallback dinámico a modelos cuantizados AWQ de menor huella, protegiendo SLA crítico..."
        }
    },
    {
        "id": "cand-004",
        "slug": "mateo",
        "nombre": "Mateo Chen",
        "email": "m.chen@frontendops.dev",
        "telefono": "+1 415 632 8890",
        "posicion_id": "pos-002",
        "posicion_titulo": "Frontend Lead",
        "tags": ["Design Systems", "React", "WebGL"],
        "avatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAhE8upRDvAB8zlrVmucU4K7evIAemP20LVDEImUt-PQI0zH76pyRda9vpnlwfSigjKg7desY_hP91GMnD5Y6P-NtOcPvFsjsaLRNj1H_v52HZMXkXPS3rabsT8jYSI4V8LEH7e1ZSPir_HDiJAYDrYYjO8Y7_ch1hGH06wwMOqrGqL-Q3O4UIMIZE6nU9bNzdhKym5A1qwKH03osOnUNIdbM9kpBkOUjAVMDe-r6Fbt-pOCMrcXovr",
        "fecha_entrevista": "21 Oct, 2025",
        "hora": "09:30 CEST",
        "duracion": "40 min",
        "score": 81,
        "tier": "Tier 2",
        "estado": "En Revisión",
        "estado_color": "blue",
        "breakdown": {"tech": 89, "culture": 73, "arch": 84, "comm": 78},
        "cv_file": "Mateo_Chen_Frontend_Lead.pdf",
        "skills": ["React", "TypeScript", "Three.js", "TailwindCSS", "Jest", "Microfrontends"],
        "resumen_ia": "Excelente nivel técnico y arquitectural en interfaces complejas. Área de mejora en estructuración de comunicación bajo preguntas abiertas.",
        "radar": {"Algoritmos": 80, "MLOps": 70, "Liderazgo": 82, "Cultura": 79, "Resolución": 89}
    },
    {
        "id": "cand-005",
        "slug": "lucia",
        "nombre": "Lucía Morales",
        "email": "lucia.infra@cloudnative.es",
        "telefono": "+34 91 402 1894",
        "posicion_id": "pos-001",
        "posicion_titulo": "DevOps Engineer",
        "tags": ["Kubernetes", "Terraform", "AWS"],
        "avatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDv9KKNMywe7ORslqPkpTVV6b7ntXok6Ymro8QGYvGIln9enAI734NAfTWy-WADYDHMNdX16uF1rMbhKTdtlAoO1rK_XBtfLvwIBXocBdxm0D5BLWf0ZPEa2RpASMlzGsAhda3kJqDQiNc_oD6OKrFE8fb9lIyYjD_V4swGy11WyazrRWolruDXC3VaXtc4TK4OJkxWaBYex0Ux6-MFr_P9y36ZuM7eufJUpazKRULZ3DA3eFMIU-_d",
        "fecha_entrevista": "20 Oct, 2025",
        "hora": "12:00 CEST",
        "duracion": "35 min",
        "score": 67,
        "tier": "Tier 3",
        "estado": "No Cumple",
        "estado_color": "red",
        "breakdown": {"tech": 71, "culture": 63, "arch": 65, "comm": 68},
        "cv_file": "Lucia_Morales_DevOps_CV.pdf",
        "skills": ["Kubernetes", "Docker", "Terraform", "CI/CD", "Prometheus"],
        "resumen_ia": "Conocimientos generales de infraestructura básica, pero insuficiente profundidad en políticas de seguridad Zero-Trust y mitigación de incidentes p99.",
        "radar": {"Algoritmos": 62, "MLOps": 68, "Liderazgo": 65, "Cultura": 66, "Resolución": 71}
    }
]

MOCK_LINKS = [
    {
        "id": "tok-001",
        "candidato": "Mariana Morales",
        "email": "m.morales@mail.com",
        "posicion_code": "s-fullstack",
        "token": "tok_9482_f839a",
        "url": "http://localhost:8501/Portal_Candidato?token=tok_9482_f839a&pos=s-fullstack",
        "expira_en": "48h 00m",
        "estado": "No utilizado",
        "estado_badge": "bg-blue-50 text-blue-700",
        "creado": "2025-10-24 09:00"
    },
    {
        "id": "tok-002",
        "candidato": "Carlos Silvetti",
        "email": "c.silvetti@domain.dev",
        "posicion_code": "s-fullstack",
        "token": "tok_8812_bb31e",
        "url": "http://localhost:8501/Portal_Candidato?token=tok_8812_bb31e&pos=s-fullstack",
        "expira_en": "36h 12m",
        "estado": "En progreso",
        "estado_badge": "bg-amber-50 text-amber-700",
        "creado": "2025-10-24 10:15"
    },
    {
        "id": "tok-003",
        "candidato": "Lucía Benítez",
        "email": "lbenitez@cloudops.org",
        "posicion_code": "s-fullstack",
        "token": "tok_1102_99ac2",
        "url": "http://localhost:8501/Portal_Candidato?token=tok_1102_99ac2&pos=s-fullstack",
        "expira_en": "Consumido",
        "estado": "Completado",
        "estado_badge": "bg-emerald-50 text-emerald-700",
        "creado": "2025-10-23 15:30"
    },
    {
        "id": "tok-004",
        "candidato": "Santiago Cruz",
        "email": "santiago.c@tech.ai",
        "posicion_code": "s-fullstack",
        "token": "tok_7721_dd01c",
        "url": "http://localhost:8501/Portal_Candidato?token=tok_7721_dd01c&pos=s-fullstack",
        "expira_en": "48h 00m",
        "estado": "No utilizado",
        "estado_badge": "bg-blue-50 text-blue-700",
        "creado": "2025-10-24 11:45"
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
        {
            "emisor": "Agente Syntropic",
            "hora": "14:22:10",
            "texto": "Hola Sofía, bienvenida a tu entrevista técnica automatizada. Revisaremos aspectos arquitecturales y toma de decisiones. Comencemos con tu experiencia en Node y NestJS.",
            "is_agent": True
        },
        {
            "emisor": "Sofía Valenzuela",
            "hora": "14:23:02",
            "texto": "¡Muchas gracias! Sí, encantada de detallar el proceso de migración modular y los retos que resolvimos.",
            "is_agent": False
        },
        {
            "emisor": "Agente Syntropic",
            "hora": "14:24:15",
            "texto": "Sofía, veo en tu CV que lideraste la migración a NestJS en tu rol anterior. ¿Cómo manejaste la consistencia de datos eventual y los patrones de resiliencia ante caídas de servicios externos?",
            "is_agent": True
        },
        {
            "emisor": "Sofía Valenzuela",
            "hora": "14:24:45",
            "texto": "Para la consistencia eventual adoptamos el patrón Outbox transaccional acoplado a un broker Kafka. Si un servicio externo de pasarela fallaba, implementamos Circuit Breakers con resiliencia en memoria y colas de reintentos exponenciales con Dead Letter Queues...",
            "is_agent": False,
            "is_current": True
        }
    ],
    "evaluacion_tiempo_real": [
        {
            "criterio": "Habilidad Técnica (Microservicios)",
            "detalle": "Patrones Outbox, DLQ, Circuit Breakers",
            "score": 92,
            "feedback": "Terminología precisa aplicada a sistemas distribuidos."
        },
        {
            "criterio": "Comunicación y Claridad",
            "detalle": "Estructuración STAR, fluidez vocal",
            "score": 88,
            "feedback": "Respuesta directa y fundamentada sin rodeos."
        },
        {
            "criterio": "Alineación con Base de Conocimiento",
            "detalle": "Stack interno de la empresa (Kafka / Nest)",
            "score": 95,
            "feedback": "Alineación sobresaliente con el perfil de vacante."
        }
    ],
    "observaciones_ia": "La candidata demuestra autonomía en decisiones de alta criticidad en producción. Se sugiere profundizar en la siguiente pregunta sobre observabilidad y tracing distribuido (OpenTelemetry)."
}
