import React, { useState } from 'react';
import { ActiveTab } from '../types';

interface PortalCandidatoViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const PortalCandidatoView: React.FC<PortalCandidatoViewProps> = ({ setActiveTab }) => {
  const [nombre, setNombre] = useState('Sofía Valenzuela');
  const [email, setEmail] = useState('sofia.valenzuela@example.com');
  const [phone, setPhone] = useState('+34 612 345 678');
  const [location, setLocation] = useState('Madrid, España (Disponible para remoto)');
  const [linkedin, setLinkedin] = useState('https://linkedin.com/in/sofia-valenzuela');
  const [github, setGithub] = useState('https://github.com/sofiavalenzuela');
  const [isStarting, setIsStarting] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleStartInterview = () => {
    setIsStarting(true);
    showToast('Validando credenciales biométricas y conectando con el Agente...');
    setTimeout(() => {
      setActiveTab('entrevistas');
    }, 1200);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-6">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 animate-bounce">
          <span className="material-symbols-outlined text-emerald-400">check_circle</span>
          <span className="text-xs font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* Top Brand & Single-Use Verification Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
            <span className="material-symbols-outlined text-[22px]">layers</span>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">TechCorp Inc.</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              en colaboración con Syntropic AI
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span className="uppercase text-[10px] tracking-wide">Invitación Verificada • Enlace de un solo uso activo</span>
        </div>
      </div>

      {/* Hero Invitation Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-900 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white shadow-md">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 text-blue-200 text-[10px] font-bold uppercase tracking-wider border border-white/15">
            <span className="material-symbols-outlined text-[15px]">verified</span>
            Fase 3: Registro y Validación Técnica
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Bienvenido al proceso de selección para <span className="text-blue-400">Senior Full Stack Developer</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
            Por favor completa tus datos y adjunta tu Curriculum Vitae antes de iniciar tu entrevista interactiva con nuestro Agente de IA. El proceso está optimizado para evaluar tu trayectoria sin sesgos.
          </p>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-72 opacity-20 pointer-events-none flex items-center justify-center">
          <svg className="w-full h-full text-blue-300" fill="none" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" stroke="currentColor" strokeDasharray="6 6" strokeWidth="2" />
            <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="20" fill="currentColor" fillOpacity="0.3" />
          </svg>
        </div>
      </div>

      {/* Grid: Form (8 cols) & Requirements (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Datos Personales */}
          <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">1</span>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Datos Personales y Contacto</h2>
                  <p className="text-[11px] text-slate-500">Confirma la información que usará el equipo técnico para formalizar el contacto.</p>
                </div>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase">Requerido</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2 space-y-1">
                <label className="font-semibold text-slate-800">Nombre completo</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">person</span>
                  <input
                    type="text"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-800">Correo electrónico</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">mail</span>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-800">Teléfono / WhatsApp</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">call</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="font-semibold text-slate-800">Ubicación / Residencia</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">location_on</span>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-800">Perfil LinkedIn</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">link</span>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={e => setLinkedin(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 truncate"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-800">Repositorio GitHub / Portafolio</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">code</span>
                  <input
                    type="url"
                    value={github}
                    onChange={e => setGithub(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 truncate"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Carga de CV */}
          <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">2</span>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Carga de Curriculum Vitae (CV)</h2>
                  <p className="text-[11px] text-slate-500">Nuestro motor de IA extraerá tu historial técnico para formular preguntas personalizadas.</p>
                </div>
              </div>
              <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold uppercase">Procesamiento Inmediato</span>
            </div>

            {/* Uploaded File Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-[22px]">description</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">Sofia_Valenzuela_CV_2025.pdf</span>
                    <span className="text-[10px] text-slate-400">1.8 MB</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-600 mt-0.5">
                    <span className="material-symbols-outlined text-[15px] text-blue-600">check_circle</span>
                    <span>CV parseado con éxito: <strong className="text-blue-700">6 años exp</strong> detectados en React & Node.js</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => showToast('Abriendo visor previo de CV encriptado...')}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[15px]">visibility</span>
                  <span>Previsualizar</span>
                </button>
              </div>
            </div>

            {/* Detected Skills */}
            <div className="pt-1 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[11px] text-slate-400 font-medium mr-1">Competencias detectadas:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">React 18</span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">TypeScript</span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">Node.js / Express</span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">PostgreSQL</span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">Docker / AWS</span>
            </div>
          </section>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Agent Persona Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600 text-[20px]">smart_toy</span>
              <h3 className="text-sm font-bold text-slate-900">Agente de Selección AI</h3>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="relative w-11 h-11 shrink-0 rounded-full overflow-hidden shadow-xs">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjDv6BDztGifyWB14FJCf5XkQQDb79uTIObLh6CrH0TDJX2FsouizSykOESr_l48b075vM2V721kSQkmDKKMquDa34Z7Tc79N2-HYwbR-BcWO7ORO94gg13qfnu16lzI6QavBbY6SHB4zYh3b1RLFAHWZi6Ow5yudmkqwX9qoUit1oI1gQygfjY5Zpfemt61DQdnPY4e82R6gw3x14BzKBZSOJNLwc_vqIfkMDLF717DqeEoJyPxTz"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-blue-600 ring-2 ring-white"></span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Syntropic Persona v3.4</p>
                <p className="text-[11px] text-slate-500">Evaluador técnico adaptativo</p>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              La entrevista consiste en una conversación dinámica con preguntas situacionales, revisión de decisiones de arquitectura y casos prácticos en tiempo real.
            </p>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="material-symbols-outlined text-[16px]">timer</span>
                <span>Duración estimada</span>
              </div>
              <span className="font-bold text-slate-900">20 minutos</span>
            </div>
          </div>

          {/* Hardware Diagnostics */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Requisitos Previos</h3>
              <span className="text-[11px] text-blue-600 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                4 de 4 listos
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-blue-600">videocam</span>
                  <span className="font-medium text-slate-800">Cámara web</span>
                </div>
                <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                  <span className="material-symbols-outlined text-[15px]">check_circle</span>
                  Detectada
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-blue-600">mic</span>
                  <span className="font-medium text-slate-800">Micrófono</span>
                </div>
                <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                  <span className="material-symbols-outlined text-[15px]">check_circle</span>
                  Verificado
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-blue-600">wifi</span>
                  <span className="font-medium text-slate-800">Conexión a internet</span>
                </div>
                <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                  <span className="material-symbols-outlined text-[15px]">check_circle</span>
                  Estable (120 Mbps)
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-blue-600">volume_off</span>
                  <span className="font-medium text-slate-800">Entorno silencioso</span>
                </div>
                <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                  <span className="material-symbols-outlined text-[15px]">check_circle</span>
                  Confirmado
                </span>
              </div>
            </div>

            <button
              onClick={() => showToast('Diagnóstico de hardware repetido: Todo el hardware funciona óptimamente.')}
              className="w-full mt-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">refresh</span>
              <span>Repetir diagnóstico de hardware</span>
            </button>
          </div>

          {/* Privacy & CTA */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-start gap-2 text-[11px] text-slate-500 leading-tight">
              <span className="material-symbols-outlined text-blue-600 text-[18px] shrink-0 mt-0.5">verified_user</span>
              <span>
                Tus datos personales y respuestas están encriptados bajo el RGPD. No se transferirán a terceros sin tu autorización expresa.
              </span>
            </div>

            <button
              onClick={handleStartInterview}
              disabled={isStarting}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              {isStarting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">autorenew</span>
                  <span>Conectando con IA...</span>
                </>
              ) : (
                <>
                  <span>Comenzar Entrevista con IA</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-slate-400">
              Al iniciar, confirmas haber leído la política de evaluación automatizada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
