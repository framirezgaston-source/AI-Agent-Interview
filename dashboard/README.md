# Syntropic AI - Streamlit Dashboard de Reclutamiento & Inteligencia de Talento

Estructura modular en Streamlit para evaluación autónoma de candidatos, gestión de posiciones y enlaces dinámicos con FastAPI.

## Estructura del Proyecto

```text
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
```

## Ejecución Local

1. Instalar dependencias:
   ```bash
   pip install -r requirements.txt
   ```

2. Ejecutar la aplicación en Streamlit:
   ```bash
   streamlit run app.py
   ```
   Abrir en el navegador en `http://localhost:8501`.

## Ejecución con Docker

Construir la imagen:
```bash
docker build -t syntropic-dashboard .
```

Iniciar el contenedor:
```bash
docker run -d -p 8501:8501 --name syntropic-app syntropic-dashboard
```

Visitar `http://localhost:8501` en tu navegador.

## Roles Soportados (RBAC)
- **SuperAdmin**: Acceso completo a todos los módulos y administración de tenants.
- **Talent Lead**: Gestión de vacantes, ponderaciones, candidatos y despacho de enlaces.
- **Recruiter**: Consulta de candidatos, programación y enlaces.
- **Hiring Manager**: Visualización de candidatos evaluados y aprobación a fase final.
- **Technical Interviewer**: Acceso a la sala de entrevista técnica y transcripciones.
