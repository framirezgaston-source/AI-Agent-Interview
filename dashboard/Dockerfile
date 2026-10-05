# ==============================================================
# Syntropic AI - Talent Intelligence Streamlit Dashboard
# Dockerfile para despliegue productivo y visualización local
# ==============================================================
FROM python:3.11-slim

# Evitar creación de archivos .pyc y activar stdout sin buffer
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Directorio de trabajo en el contenedor
WORKDIR /app

# Instalar dependencias del sistema necesarias
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copiar manifiesto de dependencias e instalar
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código fuente completo del dashboard
COPY . .

# Puerto estándar de Streamlit
EXPOSE 8501

# Comprobación de salud de la aplicación
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8501/_stcore/health || exit 1

# Configuración y ejecución de Streamlit
ENTRYPOINT ["streamlit", "run", "app.py", \
            "--server.port=8501", \
            "--server.address=0.0.0.0", \
            "--server.headless=true", \
            "--server.enableCORS=false", \
            "--server.enableXsrfProtection=true"]
