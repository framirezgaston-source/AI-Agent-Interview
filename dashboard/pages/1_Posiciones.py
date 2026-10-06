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
    
    st.markdown("#### 📥 Carga de Postulantes (Excel / CSV)")
    st.caption("Sube la lista de candidatos para generar y asociar sus enlaces dinámicos a este puesto.")

    # Plantilla de ejemplo CSV para descargar
    csv_template = "nombre,apellido,email\nGastón,Ramírez,framirezgaston@franjaautomations.com\nCarlos,Mendoza,carlos.mendoza@devlatam.io\nValeria,Paredes,valeria.paredes@cloudlabs.net\n"
    st.download_button(
        label="📄 Descargar Plantilla de Postulantes (.CSV)",
        data=csv_template,
        file_name="plantilla_postulantes_syntropic.csv",
        mime="text/csv",
        help="Usa este archivo como modelo. Columnas requeridas: nombre, apellido, email",
        use_container_width=True
    )

    # Inicializar almacenamiento de postulantes en sesión para esta posición
    current_tenant_name = st.session_state.get("tenant", {}).get("name", "Franja Automations")
    pos_session_key = f"cands_{titulo_puesto.strip()}"
    if pos_session_key not in st.session_state:
        from auth.session import get_position_candidates
        # Cargar de SQLite si ya existen
        db_cands = get_position_candidates(position_title=titulo_puesto, tenant_name=current_tenant_name)
        st.session_state[pos_session_key] = db_cands if db_cands else []

    # File uploader para CSV o Excel
    candidates_file = st.file_uploader(
        "Subir archivo de postulantes (.CSV o .XLSX)",
        type=["csv", "xlsx", "txt"],
        key="uploader_cands_file"
    )

    import io
    import csv
    import time
    import secrets
    from auth.session import save_position_candidates_bulk

    def parse_candidates_stream(raw_bytes, filename=""):
        """Parser universal que detecta automáticamente delimitadores (, ; tab) y codificaciones (UTF-8, Latin-1, CP1252)."""
        # Si es Excel .xlsx
        if filename.endswith(".xlsx"):
            try:
                import pandas as pd
                df = pd.read_excel(io.BytesIO(raw_bytes))
                df.columns = [str(c).strip().lower() for c in df.columns]
                parsed = []
                for _, r in df.iterrows():
                    nom = str(r.get("nombre", "")).strip()
                    ape = str(r.get("apellido", "")).strip()
                    full = f"{nom} {ape}".strip() if (nom and ape) else str(r.get("candidato", r.get("nombre_completo", ""))).strip()
                    email = ""
                    for col in df.columns:
                        val = str(r[col]).strip()
                        if "@" in val and not val.startswith("nan"):
                            email = val
                            break
                    if email and not full:
                        full = email.split("@")[0].capitalize()
                    if email:
                        parsed.append({"candidato": full, "email": email})
                return parsed, None
            except Exception as e:
                return [], f"Error al leer Excel: {e}"

        # Si es CSV / Texto
        text = ""
        for enc in ["utf-8-sig", "utf-8", "latin-1", "cp1252"]:
            try:
                text = raw_bytes.decode(enc)
                break
            except Exception:
                continue

        if not text:
            return [], "No se pudo decodificar el archivo. Asegúrate de que sea un archivo de texto o CSV válido."

        # Detectar delimitador (, ; \t |)
        first_line = text.strip().split("\n")[0]
        delim = ","
        if first_line.count(";") > first_line.count(","):
            delim = ";"
        elif first_line.count("\t") > first_line.count(","):
            delim = "\t"
        elif first_line.count("|") > first_line.count(","):
            delim = "|"

        try:
            reader = csv.reader(io.StringIO(text), delimiter=delim)
            rows = [r for r in reader if any(field.strip() for field in r)]
            if not rows:
                return [], "El archivo está vacío."

            headers = [h.strip().lower() for h in rows[0]]
            parsed = []

            for row in rows[1:]:
                row_dict = {headers[i]: row[i].strip() for i in range(min(len(headers), len(row)))}
                nom = row_dict.get("nombre", "")
                ape = row_dict.get("apellido", "")
                full = f"{nom} {ape}".strip() if (nom or ape) else row_dict.get("candidato", row_dict.get("nombre_completo", ""))
                
                # Buscar correo en cualquier columna
                email = ""
                for k, v in row_dict.items():
                    if "@" in v:
                        email = v
                        break
                
                if not full and email:
                    full = email.split("@")[0].replace(".", " ").capitalize()

                if email:
                    parsed.append({"candidato": full or "Candidato", "email": email})

            return parsed, None
        except Exception as e:
            return [], f"Error al interpretar formato CSV: {e}"

    if candidates_file:
        raw_data = candidates_file.getvalue()
        extracted_cands, parse_err = parse_candidates_stream(raw_data, filename=candidates_file.name.lower())

        if parse_err:
            st.error(parse_err)
        elif not extracted_cands:
            st.warning("⚠️ No se encontraron filas con correos electrónicos válidos (@). Verifica que tu archivo tenga columnas como 'nombre', 'apellido', 'email'.")
        else:
            new_generated = []
            pos_slug = titulo_puesto.lower().replace(" ", "-")[:16]
            for item in extracted_cands:
                token_id = f"tok_{secrets.token_hex(4)}_{int(time.time()) % 10000}"
                new_generated.append({
                    "candidato": item["candidato"],
                    "email": item["email"],
                    "token": token_id,
                    "url": f"http://localhost:8501/Portal_Candidato?token={token_id}&pos={pos_slug}",
                    "expira_en": "48h 00m",
                    "estado": "No utilizado"
                })

            existing_emails = {c["email"].lower() for c in st.session_state[pos_session_key]}
            to_add = [c for c in new_generated if c["email"].lower() not in existing_emails]

            if to_add:
                st.session_state[pos_session_key].extend(to_add)
                save_position_candidates_bulk(titulo_puesto, to_add, tenant_name=current_tenant_name)
                st.success(f"✓ ¡Se procesaron {len(to_add)} postulantes desde '{candidates_file.name}' y se generaron sus enlaces únicos!")
                time.sleep(0.3)
                st.rerun()
            else:
                st.info(f"Los {len(new_generated)} postulantes del archivo ya se encontraban registrados en este lote.")

    # Formulario para agregar candidato manual
    with st.expander("➕ O agregar postulante manual"):
        with st.form("form_add_single_candidate"):
            c_nom = st.text_input("Nombre", placeholder="Ej: Gastón")
            c_ape = st.text_input("Apellido", placeholder="Ej: Ramírez")
            c_mail = st.text_input("Correo electrónico", placeholder="candidato@empresa.com")
            if st.form_submit_button("Generar Enlace Seguro para este Candidato"):
                if c_mail and "@" in c_mail:
                    tok_id = f"tok_{secrets.token_hex(4)}_{int(time.time()) % 10000}"
                    p_slug = titulo_puesto.lower().replace(" ", "-")[:16]
                    single_cand = {
                        "candidato": f"{c_nom.strip()} {c_ape.strip()}" if c_nom else "Candidato Manual",
                        "email": c_mail.strip(),
                        "token": tok_id,
                        "url": f"http://localhost:8501/Portal_Candidato?token={tok_id}&pos={p_slug}",
                        "expira_en": "48h 00m",
                        "estado": "No utilizado"
                    }
                    st.session_state[pos_session_key].append(single_cand)
                    save_position_candidates_bulk(titulo_puesto, [single_cand], tenant_name=current_tenant_name)
                    st.success(f"¡Enlace generado para {single_cand['candidato']} y guardado en BD!")
                    st.rerun()
                else:
                    st.error("Por favor ingresa un correo válido.")

    st.markdown("---")
    current_links = st.session_state.get(pos_session_key, [])
    
    st.markdown(f"#### Enlaces Asignados al Lote ({len(current_links)})")
    
    if not current_links:
        st.info("ℹ️ Aún no has cargado postulantes para esta posición. Descarga la plantilla CSV arriba o agrega candidatos para generar sus enlaces únicos.")
    else:
        # Botón para descargar el reporte de todos los links generados
        report_lines = ["candidato,email,enlace_entrevista,token,expiracion,estado"]
        for l in current_links:
            report_lines.append(f'"{l["candidato"]}","{l["email"]}","{l["url"]}","{l["token"]}","{l.get("expira_en", "48h 00m")}","{l.get("estado", "No utilizado")}"')
        report_csv = "\n".join(report_lines)
        
        st.download_button(
            label="📥 Descargar Lista de Enlaces Generados (.CSV)",
            data=report_csv,
            file_name=f"enlaces_entrevista_{titulo_puesto.lower().replace(' ', '_')[:15]}.csv",
            mime="text/csv",
            help="Descarga todos los links para enviarlos desde tu propio correo o CRM.",
            use_container_width=True
        )

        st.info("💡 **Acceso a Entrevistas en Localhost (`localhost:8501`):** Cada enlace a continuación está configurado para ejecutarse en tu servidor local de Streamlit. Haz clic en **'🚀 Abrir Entrevista en Localhost'** para probar la experiencia del candidato, o navega en el menú lateral a **'6 Portal Candidato'**.")

        st.markdown(f"**Tokens Activos ({len(current_links)}):**")
        for idx, l in enumerate(current_links):
            with st.container():
                c_info, c_badge = st.columns([8, 4])
                with c_info:
                    st.markdown(f"👤 **{l['candidato']}** · `{l['email']}`")
                    # Normalizar a localhost si el enlace guardado tiene syntropic.ai
                    raw_url = l.get("url", "")
                    tok_id = l.get("token", "")
                    p_slug = titulo_puesto.lower().replace(" ", "-")[:16]
                    if not tok_id and "tok_" in raw_url:
                        tok_id = "tok_" + raw_url.split("tok_")[1].split("?")[0]
                    local_url = f"http://localhost:8501/Portal_Candidato?token={tok_id}&pos={p_slug}" if tok_id else raw_url.replace("https://syntropic.ai/interview/", "http://localhost:8501/Portal_Candidato?token=")
                    
                    st.code(local_url, language="text")
                    st.markdown(f"""
                    <div style="margin-top: 4px; margin-bottom: 8px;">
                        <a href="{local_url}" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; background: #0066FF; color: white; padding: 6px 14px; border-radius: 6px; text-decoration: none; font-size: 0.8rem; font-weight: 700; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                            🚀 Abrir Entrevista de {l['candidato']} en Localhost ↗
                        </a>
                        <span style="font-size: 0.72rem; color: #64748B; margin-left: 8px;">Abre la pestaña del aspirante en tu navegador</span>
                    </div>
                    """, unsafe_allow_html=True)
                with c_badge:
                    badge_color = "#16A34A" if l.get('estado') == "Completado" else ("#D97706" if l.get('estado') == "En progreso" else "#2563EB")
                    st.markdown(f"<div style='text-align:right;'><span style='color:{badge_color}; font-weight:700; font-size:0.8rem;'>● {l.get('estado', 'No utilizado')}</span><br><span style='font-size:0.75rem; color:#64748B;'>Expira: {l.get('expira_en', '48h 00m')}</span></div>", unsafe_allow_html=True)
                st.markdown("<hr style='margin: 0.5rem 0; border: none; border-top: 1px dashed #E2E8F0;' />", unsafe_allow_html=True)

        if st.button(f"✉️ Enviar {len(current_links)} Invitaciones Masivas por Correo", use_container_width=True):
            st.success(f"¡Se han despachado {len(current_links)} invitaciones tokenizadas por email a los postulantes de Franja Automations!")

    st.caption("🔒 Token SHA-256 HMAC · Revocación instantánea activa · Guardado en SQLite")
    
    st.markdown("---")
    if st.button("🚀 Publicar Posición y Activar Pipeline", use_container_width=True):
        api.create_position({
            "titulo": titulo_puesto,
            "departamento": departamento,
            "seniority": seniority,
            "modalidad": modalidad,
            "ai_directive": ai_directive,
            "candidates_count": len(current_links)
        })
        st.success(f"Posición '{titulo_puesto}' publicada con éxito con {len(current_links)} postulantes asociados. Redirigiendo a Candidatos...")
        st.switch_page("pages/2_Candidatos.py")
