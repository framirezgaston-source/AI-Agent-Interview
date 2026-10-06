import React, { useState } from 'react';
import { ActiveTab, KnowledgeFile, RubricCriteria, TokenLink } from '../types';

interface PosicionesViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  knowledgeFiles: KnowledgeFile[];
  rubrics: RubricCriteria[];
  links: TokenLink[];
}

export const PosicionesView: React.FC<PosicionesViewProps> = ({
  setActiveTab,
  knowledgeFiles: initialFiles,
  rubrics: initialRubrics,
  links
}) => {
  const [roleTitle, setRoleTitle] = useState('Senior Full Stack Developer (React & Node)');
  const [dept, setDept] = useState('Engineering');
  const [seniority, setSeniority] = useState('Senior 5+ años');
  const [modality, setModality] = useState('Full-time / Remoto (LatAm / Global Core)');
  const [files, setFiles] = useState<KnowledgeFile[]>(initialFiles);
  const [aiDirective, setAiDirective] = useState(
    'Evaluar experiencia en microservicios, testing y resolución de problemas arquitectónicos con énfasis en alta concurrencia y patrones resilientes.'
  );

  const [weights, setWeights] = useState({
    q1: 30,
    q2: 25,
    q3: 20,
    q4: 25
  });

  const [autoAdapt, setAutoAdapt] = useState(true);
  const [candidateLimit, setCandidateLimit] = useState(15);
  const [copied, setCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Postulantes asociados a esta vacante (inicia vacío para nuevas posiciones)
  const [lotCandidates, setLotCandidates] = useState<TokenLink[]>([]);
  const [manualName, setManualName] = useState('');
  const [manualSurname, setManualSurname] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [showManualForm, setShowManualForm] = useState(false);

  const totalWeight = weights.q1 + weights.q2 + weights.q3 + weights.q4;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleDownloadTemplate = () => {
    const csvContent = "nombre,apellido,email\nGastón,Ramírez,framirezgaston@franjaautomations.com\nCarlos,Mendoza,carlos.mendoza@devlatam.io\nValeria,Paredes,valeria.paredes@cloudlabs.net\n";
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'plantilla_postulantes_syntropic.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Plantilla descargada: plantilla_postulantes_syntropic.csv');
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        if (lines.length < 2) {
          showToast('El archivo debe tener un encabezado y al menos una fila de datos.');
          return;
        }

        const headers = lines[0].toLowerCase().split(',').map(h => h.trim().replace(/['"]/g, ''));
        const newCands: TokenLink[] = [];

        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',').map(c => c.trim().replace(/['"]/g, ''));
          let full_name = 'Candidato Postulante';
          let email = '';

          const nomIdx = headers.indexOf('nombre');
          const apeIdx = headers.indexOf('apellido');
          const emailIdx = headers.indexOf('email') !== -1 ? headers.indexOf('email') : headers.indexOf('correo');
          const candIdx = headers.indexOf('candidato');

          if (nomIdx !== -1 && apeIdx !== -1) {
            full_name = `${cols[nomIdx] || ''} ${cols[apeIdx] || ''}`.trim();
          } else if (candIdx !== -1) {
            full_name = cols[candIdx] || '';
          }

          if (emailIdx !== -1) {
            email = cols[emailIdx] || '';
          }

          if (email && email.includes('@')) {
            const tok = `tok_${Math.random().toString(36).substring(2, 8)}_${Date.now() % 10000}`;
            const pSlug = roleTitle.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 16);
            newCands.push({
              id: `tok-${Date.now()}-${i}`,
              candidato: full_name || email.split('@')[0],
              email,
              posicion_code: pSlug,
              token: tok,
              url: `http://localhost:8501/Portal_Candidato?token=${tok}&pos=${pSlug}`,
              expira_en: '48h 00m',
              estado: 'No utilizado',
              creado: 'Recién cargado'
            });
          }
        }

        if (newCands.length > 0) {
          setLotCandidates(prev => {
            const existingEmails = new Set(prev.map(p => p.email.toLowerCase()));
            const filtered = newCands.filter(c => !existingEmails.has(c.email.toLowerCase()));
            return [...prev, ...filtered];
          });
          showToast(`✓ ¡Se cargaron y tokenizaron ${newCands.length} postulantes desde el archivo!`);
        } else {
          showToast('No se encontraron correos válidos en el archivo. Verifica el formato.');
        }
      } catch {
        showToast('Error al leer el archivo. Asegúrate de que sea un archivo CSV válido.');
      }
    };
    reader.readAsText(file);
  };

  const handleAddManualCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualEmail || !manualEmail.includes('@')) {
      showToast('Por favor ingresa un correo válido.');
      return;
    }
    const tok = `tok_${Math.random().toString(36).substring(2, 8)}_${Date.now() % 10000}`;
    const pSlug = roleTitle.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 16);
    const fullName = `${manualName.trim()} ${manualSurname.trim()}`.trim() || manualEmail.split('@')[0];
    
    const newCand: TokenLink = {
      id: `tok-${Date.now()}`,
      candidato: fullName,
      email: manualEmail.trim(),
      posicion_code: pSlug,
      token: tok,
      url: `http://localhost:8501/Portal_Candidato?token=${tok}&pos=${pSlug}`,
      expira_en: '48h 00m',
      estado: 'No utilizado',
      creado: 'Recién generado'
    };

    setLotCandidates(prev => [newCand, ...prev]);
    setManualName('');
    setManualSurname('');
    setManualEmail('');
    setShowManualForm(false);
    showToast(`✓ Enlace generado para ${fullName}`);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText('https://syntropic.ai/interview/tok_9482_f839a?pos=s-fullstack');
    setCopied(true);
    showToast('¡Enlace copiado al portapapeles!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRemoveFile = (fileName: string) => {
    setFiles(prev => prev.filter(f => f.name !== fileName));
    showToast(`Archivo ${fileName} removido de la base vectorial.`);
  };

  const handleAddDemoFile = () => {
    const newDoc: KnowledgeFile = {
      name: 'Microservices_Architecture_Specs_2025.pdf',
      size: '3.1 MB',
      type: 'PDF',
      status: 'Ingesta Vectorial Completada'
    };
    setFiles(prev => [...prev, newDoc]);
    showToast('Documento indexado en la base de conocimiento IA.');
  };

  return (
    <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 animate-bounce">
          <span className="material-symbols-outlined text-emerald-400">check_circle</span>
          <span className="text-xs font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* Top Breadcrumb & Workflow Action Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-xs"
            aria-label="Volver al dashboard"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Crear Nueva Posición de Entrevista
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                Borrador
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span>Pipeline ID: <strong>#SYN-9941</strong></span>
              <span>•</span>
              <span className="text-blue-600 font-semibold">Paso 1 y 2: Parámetros del Modelo & Vínculos Dinámicos</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end md:self-auto">
          <button
            onClick={() => showToast('Borrador guardado localmente.')}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px]">save</span>
            <span>Guardar Borrador</span>
          </button>
          <button
            onClick={() => {
              showToast('¡Posición publicada y enlaces dinámicos generados con éxito!');
              setTimeout(() => setActiveTab('candidatos'), 1200);
            }}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px]">rocket_launch</span>
            <span>Publicar y Generar Enlaces</span>
          </button>
        </div>
      </section>

      {/* Main Grid: Form Left (7 cols) & Links Right (5 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols) */}
        <div className="xl:col-span-7 space-y-6">
          {/* Card 1: Detalles de la Posición */}
          <article className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">badge</span>
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">1. Detalles de la Posición</h2>
                  <p className="text-xs text-slate-500">Calibración semántica del perfil para el evaluador autónomo</p>
                </div>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase">
                Requerido
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-slate-800">Título del Puesto</label>
                <input
                  type="text"
                  value={roleTitle}
                  onChange={e => setRoleTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-800">Departamento</label>
                <select
                  value={dept}
                  onChange={e => setDept(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-blue-500 bg-white"
                >
                  <option>Engineering</option>
                  <option>Architecture & Cloud</option>
                  <option>Data & Machine Learning</option>
                  <option>Product Development</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-800">Seniority</label>
                <select
                  value={seniority}
                  onChange={e => setSeniority(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-blue-500 bg-white"
                >
                  <option>Senior 5+ años</option>
                  <option>Staff Engineer (8+ años)</option>
                  <option>Principal Engineer (10+ años)</option>
                  <option>Lead Developer</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-slate-800">Modalidad y Jornada</label>
                <select
                  value={modality}
                  onChange={e => setModality(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-blue-500 bg-white"
                >
                  <option>Full-time / Remoto (LatAm / Global Core)</option>
                  <option>Full-time / Híbrido</option>
                  <option>Contractor / Remoto</option>
                </select>
              </div>
            </div>
          </article>

          {/* Card 2: Base de Conocimiento para la IA */}
          <article className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">psychology</span>
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">2. Base de Conocimiento para la IA</h2>
                  <p className="text-xs text-slate-500">Archivos técnicos vectores e instrucciones contextuales de evaluación</p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold uppercase">
                Indexador Activo
              </span>
            </div>

            {/* Document Upload Area */}
            <div 
              onClick={handleAddDemoFile}
              className="border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/60 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-xs">
                <span className="material-symbols-outlined text-[24px]">cloud_upload</span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Arrastre documentos de arquitectura, estándares o especificaciones
                </span>
                <span className="text-[11px] text-slate-400">
                  Soporta PDF, DOCX, TXT, Markdown hasta 25 MB por archivo
                </span>
              </div>
              <button
                type="button"
                className="mt-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold shadow-xs cursor-pointer"
              >
                Explorar Archivos Locales
              </button>
            </div>

            {/* Quick Sample PDF Download Helper */}
            <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-blue-600 text-[22px]">picture_as_pdf</span>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    PDF de Ejemplo Generado: AI Engineer Spec
                  </span>
                  <span className="text-[11px] text-slate-600">
                    Estándares, arquitectura RAG híbrido, FastAPI y banco de preguntas de Franja Automations.
                  </span>
                </div>
              </div>
              <a
                href="/IA_Engineer_Knowledge_Base_Franja_Automations.pdf"
                download="IA_Engineer_Knowledge_Base_Franja_Automations.pdf"
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs whitespace-nowrap cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Descargar PDF</span>
              </a>
            </div>

            {/* Uploaded Files Roster */}
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                Archivos Indexados para este Rol ({files.length})
              </span>
              {files.map(f => (
                <div key={f.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${f.type === 'PDF' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                      {f.type}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block truncate max-w-xs sm:max-w-md">
                        {f.name}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {f.size} • {f.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
                    <button
                      onClick={() => handleRemoveFile(f.name)}
                      className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                      title="Eliminar archivo"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Directive Textarea */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-800">
                  Instrucciones Específicas de Evaluación (AI System Directive)
                </label>
                <span className="text-[11px] text-blue-600 font-medium">Token limit: 120 / 1,000</span>
              </div>
              <textarea
                rows={3}
                value={aiDirective}
                onChange={e => setAiDirective(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-blue-500 leading-relaxed"
              />
            </div>
          </article>

          {/* Card 3: Banco de Preguntas Clave & Ponderación */}
          <article className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">format_list_bulleted</span>
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">3. Banco de Preguntas Clave & Ponderación</h2>
                  <p className="text-xs text-slate-500">Dimensiones calibradas con peso asignado para el scoring algorítmico</p>
                </div>
              </div>
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-extrabold ${totalWeight === 100 ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-600'}`}>
                <span>Total:</span>
                <span>{totalWeight}%</span>
              </div>
            </div>

            <div className="space-y-3">
              {/* Question 1 */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">1</span>
                    <span className="text-xs font-bold text-slate-900">Experiencia en escalabilidad y concurrencia con Node.js</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">Ponderación</span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-extrabold">{weights.q1}%</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 pl-7">
                  Indagar sobre Event Loop, clustering, memory leaks y manejo de colas de mensajería (Kafka/RabbitMQ).
                </p>
                <div className="pl-7 pt-1">
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={weights.q1}
                    onChange={e => setWeights(prev => ({ ...prev, q1: Number(e.target.value) }))}
                    className="w-full accent-blue-600"
                  />
                </div>
              </div>

              {/* Question 2 */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">2</span>
                    <span className="text-xs font-bold text-slate-900">Manejo de estado complejo y optimización en React</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">Ponderación</span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-extrabold">{weights.q2}%</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 pl-7">
                  Evaluar Server Components, profiling de renderizado, selectores memoizados y virtualización de UI.
                </p>
                <div className="pl-7 pt-1">
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={weights.q2}
                    onChange={e => setWeights(prev => ({ ...prev, q2: Number(e.target.value) }))}
                    className="w-full accent-blue-600"
                  />
                </div>
              </div>

              {/* Question 3 */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">3</span>
                    <span className="text-xs font-bold text-slate-900">Ajuste cultural, comunicación asíncrona y colaboración</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">Ponderación</span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-extrabold">{weights.q3}%</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 pl-7">
                  Resolución de desacuerdos técnicos en PRs, documentación proactiva y ownership funcional.
                </p>
                <div className="pl-7 pt-1">
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={weights.q3}
                    onChange={e => setWeights(prev => ({ ...prev, q3: Number(e.target.value) }))}
                    className="w-full accent-blue-600"
                  />
                </div>
              </div>

              {/* Question 4: Adaptive AI */}
              <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">4</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900">Pregunta adaptativa generada por IA basada en su CV</span>
                      <span className="material-symbols-outlined text-[16px] text-blue-600">auto_awesome</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">Ponderación</span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-extrabold">{weights.q4}%</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 pl-7">
                  El motor analiza proyectos previos del aspirante y formula preguntas sobre los mayores retos declarados en su historial.
                </p>
                <div className="pl-7 pt-1">
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={weights.q4}
                    onChange={e => setWeights(prev => ({ ...prev, q4: Number(e.target.value) }))}
                    className="w-full accent-blue-600"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-blue-100 pl-7">
                  <span className="text-xs font-semibold text-slate-800 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-blue-600">psychology</span>
                    Auto-adaptar según CV en milisegundos
                  </span>
                  <input
                    type="checkbox"
                    checked={autoAdapt}
                    onChange={e => setAutoAdapt(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Right Column (5 cols): Dynamic Single-Use Link Generator */}
        <div className="xl:col-span-5 space-y-6">
          <article className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] bg-blue-50 text-blue-700 font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                  Paso 2 / Despliegue
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Autenticación Tokenizada
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Generador de Enlaces Dinámicos de Un Solo Uso
              </h2>
              <p className="text-xs text-slate-500">Pipeline seguro para prevención de suplantación y validación biométrica</p>
            </div>

            {/* Zero-Trust Guarantee Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-start gap-2.5">
              <span className="material-symbols-outlined text-blue-600 text-[20px] shrink-0 mt-0.5">verified_user</span>
              <div className="space-y-0.5 text-slate-700">
                <span className="font-bold text-slate-900 block">Garantía Zero-Trust Syntropic</span>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Cada enlace es estrictamente único, expira automáticamente tras 1 uso y está vinculado a 1 candidato específico para neutralizar fraudes o transferencias de sesión.
                </p>
              </div>
            </div>

            {/* Bulk Candidate Upload Area (CSV / Excel) */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">📥 Carga de Postulantes (Excel / CSV)</span>
                  <span className="text-[11px] text-slate-500">Sube la nómina de candidatos para generar y asociar sus enlaces dinámicos a este puesto.</span>
                </div>
              </div>

              {/* Template download & File Upload */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={handleDownloadTemplate}
                  className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px] text-blue-600">download</span>
                  <span>Descargar Plantilla (.CSV)</span>
                </button>

                <label className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors">
                  <span className="material-symbols-outlined text-[16px]">upload_file</span>
                  <span>Subir Postulantes (.CSV)</span>
                  <input
                    type="file"
                    accept=".csv,.txt"
                    onChange={handleCSVUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Toggle manual form */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowManualForm(!showManualForm)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {showManualForm ? 'remove' : 'add'}
                  </span>
                  <span>{showManualForm ? 'Ocultar formulario manual' : '➕ O agregar postulante manualmente'}</span>
                </button>

                {showManualForm && (
                  <form onSubmit={handleAddManualCandidate} className="mt-2 p-3 bg-white rounded-lg border border-slate-200 space-y-2 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Nombre"
                        value={manualName}
                        onChange={e => setManualName(e.target.value)}
                        className="px-2.5 py-1.5 rounded border border-slate-200 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Apellido"
                        value={manualSurname}
                        onChange={e => setManualSurname(e.target.value)}
                        className="px-2.5 py-1.5 rounded border border-slate-200 text-xs"
                      />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="Correo electrónico (ej: candidato@empresa.com)"
                      value={manualEmail}
                      onChange={e => setManualEmail(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded border border-slate-200 text-xs"
                    />
                    <button
                      type="submit"
                      className="w-full py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded font-bold text-xs cursor-pointer"
                    >
                      Generar Enlace Seguro para este Candidato
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Dynamic Active Single Link Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Enlace Generado Dinámico (Token Activo)</span>
                <span className="text-[11px] text-emerald-600 font-semibold">Listo para despacho</span>
              </div>
              <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 flex items-center text-xs font-mono text-slate-700 truncate">
                <span className="material-symbols-outlined text-[16px] text-slate-400 mr-2 shrink-0">link</span>
                <span className="truncate">http://localhost:8501/Portal_Candidato?token=tok_9482_f839a&pos=s-fullstack</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`py-2 px-3 rounded-lg text-xs font-bold text-white transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer ${copied ? 'bg-emerald-600' : 'bg-slate-800 hover:bg-slate-900'}`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                  <span>{copied ? '¡Copiado!' : 'Copiar Enlace'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('portal_candidato')}
                  className="py-2 px-3 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  <span>Probar Entrevista</span>
                </button>
              </div>
            </div>

            {/* Link Inventory List */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Enlaces Asignados al Lote ({lotCandidates.length})
                </span>
                {lotCandidates.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setLotCandidates([]);
                      showToast('Lote de candidatos limpiado.');
                    }}
                    className="text-red-500 hover:underline text-[11px] font-semibold flex items-center gap-0.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">delete</span>
                    <span>Limpiar Lote</span>
                  </button>
                )}
              </div>

              {lotCandidates.length === 0 ? (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-1">
                  <span className="material-symbols-outlined text-slate-400 text-[24px]">group_add</span>
                  <p className="text-xs font-semibold text-slate-700">Aún no has cargado postulantes para esta posición.</p>
                  <p className="text-[11px] text-slate-500">
                    Descarga la plantilla CSV arriba o añade candidatos manualmente para generar sus enlaces únicos.
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-slate-200 overflow-hidden bg-white text-xs divide-y divide-slate-100">
                  <div className="grid grid-cols-12 px-3 py-2 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <div className="col-span-5">Candidato / Destino</div>
                    <div className="col-span-3 text-center">Expiración</div>
                    <div className="col-span-4 text-right">Acción / Estado</div>
                  </div>

                  {lotCandidates.map(l => (
                    <div key={l.id} className="grid grid-cols-12 px-3 py-2.5 items-center hover:bg-slate-50/60 transition-colors">
                      <div className="col-span-5 min-w-0">
                        <span className="font-bold text-slate-900 block truncate">{l.candidato}</span>
                        <span className="text-[10px] text-slate-400 truncate block">{l.email}</span>
                      </div>
                      <div className="col-span-3 text-center text-[10px] font-mono text-slate-600">
                        {l.expira_en}
                      </div>
                      <div className="col-span-4 flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setActiveTab('portal_candidato')}
                          className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 text-[10px] font-bold flex items-center gap-0.5 cursor-pointer"
                          title="Abrir vista de entrevista del candidato"
                        >
                          <span className="material-symbols-outlined text-[13px]">play_circle</span>
                          <span>Entrevista</span>
                        </button>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${l.estado === 'Completado' ? 'bg-emerald-50 text-emerald-700' : (l.estado === 'En progreso' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700')}`}>
                          {l.estado}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {lotCandidates.length > 0 && (
                <button
                  type="button"
                  onClick={() => showToast(`¡Se han despachado ${lotCandidates.length} invitaciones tokenizadas por email!`)}
                  className="w-full mt-2 py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-[17px]">forward_to_inbox</span>
                  <span>Enviar {lotCandidates.length} Invitaciones Masivas por Correo</span>
                </button>
              )}
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1 font-mono">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                Token SHA-256 HMAC
              </span>
              <span>Revocación instantánea activa</span>
            </div>
          </article>

          {/* Contextual Help */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">help_center</span>
            </div>
            <div className="text-xs">
              <span className="font-bold text-slate-900 block">¿Necesitas ponderaciones personalizadas?</span>
              <span className="text-slate-500">Puedes configurar rúbricas adicionales para entrevistas en vivo tipo panel.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
