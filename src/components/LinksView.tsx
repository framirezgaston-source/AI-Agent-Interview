import React, { useState } from 'react';
import { TokenLink, ActiveTab } from '../types';

interface LinksViewProps {
  links: TokenLink[];
  onGenerateLink: (candidateName: string, email: string, posCode: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const LinksView: React.FC<LinksViewProps> = ({ links, onGenerateLink, setActiveTab }) => {
  const [candName, setCandName] = useState('');
  const [candEmail, setCandEmail] = useState('');
  const [posCode, setPosCode] = useState('s-fullstack');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candName || !candEmail) {
      showToast('Por favor ingresa nombre y correo.');
      return;
    }
    onGenerateLink(candName, candEmail, posCode);
    showToast(`Token generado con éxito para ${candName}`);
    setCandName('');
    setCandEmail('');
  };

  const handleCopy = (url: string) => {
    navigator.clipboard?.writeText(url);
    showToast('¡Enlace de un solo uso copiado!');
  };

  return (
    <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 animate-bounce">
          <span className="material-symbols-outlined text-emerald-400">check_circle</span>
          <span className="text-xs font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
              Módulo 4 · 4_Links.py
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Generador y Despacho de Enlaces Dinámicos
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Autenticación Tokenizada Zero-Trust · Cada enlace expira tras 1 uso y está vinculado a 1 candidato específico.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('portal_candidato')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-[17px]">preview</span>
          <span>Probar Portal del Candidato</span>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Form Generator Left */}
        <div className="xl:col-span-5 space-y-5">
          <div className="bg-[#0B192C] text-white p-6 rounded-2xl shadow-md space-y-3">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
              SEGURIDAD ZERO-TRUST
            </span>
            <h2 className="text-lg font-bold text-white">Crear Nueva Invitación Tokenizada</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Genera un enlace criptográfico único basado en HMAC SHA-256 para neutralizar fraudes o transferencias de sesión.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-800">Nombre del Candidato</label>
              <input
                type="text"
                required
                value={candName}
                onChange={e => setCandName(e.target.value)}
                placeholder="Ej: Valentina Morales"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-800">Correo Electrónico</label>
              <input
                type="email"
                required
                value={candEmail}
                onChange={e => setCandEmail(e.target.value)}
                placeholder="valentina@empresa.dev"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-800">Posición Destino</label>
              <select
                value={posCode}
                onChange={e => setPosCode(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-white"
              >
                <option value="s-fullstack">Senior Full Stack Developer</option>
                <option value="fe-lead">Frontend Lead</option>
                <option value="ds-nlp">Data Scientist (NLP)</option>
                <option value="devops">DevOps Engineer</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">bolt</span>
              <span>Generar Token y Enlace Seguro</span>
            </button>
          </form>

          {/* Mass Dispatch Banner */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <span className="font-bold text-slate-900 block">Despacho Masivo de Lotes</span>
            <p className="text-slate-500 text-[11px]">
              Envía automáticamente las invitaciones pendientes a los candidatos programados para la fase técnica.
            </p>
            <button
              type="button"
              onClick={() => showToast('¡15 invitaciones tokenizadas despachadas por email con firma HMAC!')}
              className="w-full py-2 px-3 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-blue-600">forward_to_inbox</span>
              <span>Enviar 15 Invitaciones Masivas</span>
            </button>
          </div>
        </div>

        {/* Link Inventory Table Right */}
        <div className="xl:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Inventario de Enlaces Activos</h3>
                <p className="text-[11px] text-slate-500">Monitoreo en tiempo real del ciclo de vida de los tokens emitidos</p>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                {links.length} tokens
              </span>
            </div>

            <div className="space-y-3">
              {links.map(l => (
                <div key={l.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-sm block">{l.candidato}</span>
                      <span className="text-[11px] text-slate-500">{l.email} · Posición: <code className="bg-white px-1 py-0.5 rounded border border-slate-200">{l.posicion_code}</code></span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${l.estado === 'Completado' ? 'bg-emerald-50 text-emerald-700' : (l.estado === 'En progreso' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700')}`}>
                      {l.estado}
                    </span>
                  </div>

                  <div className="p-2 rounded bg-white border border-slate-200 font-mono text-[11px] text-slate-700 truncate">
                    {l.url}
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                    <span>Expiración: <strong className="text-slate-700">{l.expira_en}</strong> · Creado: {l.creado}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(l.url)}
                        className="text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">content_copy</span>
                        <span>Copiar</span>
                      </button>
                      <button
                        onClick={() => showToast(`Token ${l.token} revocado.`)}
                        className="text-red-600 hover:underline font-semibold flex items-center gap-0.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">block</span>
                        <span>Revocar</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
