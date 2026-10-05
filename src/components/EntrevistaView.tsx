import React, { useState, useEffect } from 'react';
import { InterviewSession, ActiveTab } from '../types';

interface EntrevistaViewProps {
  interview: InterviewSession;
  setActiveTab: (tab: ActiveTab) => void;
}

export const EntrevistaView: React.FC<EntrevistaViewProps> = ({ interview, setActiveTab }) => {
  const [activeTab, setActiveTabLocal] = useState<'transcript' | 'eval'>('transcript');
  const [micActive, setMicActive] = useState(true);
  const [camActive, setCamActive] = useState(true);
  const [speakerLevel, setSpeakerLevel] = useState(3);
  const [seconds, setSeconds] = useState(865); // 14:25
  const [questionIdx, setQuestionIdx] = useState(3);
  const [showNotes, setShowNotes] = useState(false);
  const [notesText, setNotesText] = useState(
    'Candidata explica patrón Outbox con Kafka de manera precisa. Menciona Circuit Breakers y DLQ.'
  );
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleNextQuestion = () => {
    setQuestionIdx(prev => Math.min(5, prev + 1));
    showToast('Procesando respuesta actual y cargando siguiente pregunta adaptativa...');
  };

  const handleRepeatQuestion = () => {
    showToast('El Agente Syntropic repetirá el enunciado de la pregunta.');
  };

  const handleFinishInterview = () => {
    if (confirm('¿Deseas finalizar y guardar el estado actual de la entrevista en la base de datos?')) {
      showToast('Entrevista finalizada. Reporte consolidado y guardado.');
      setTimeout(() => setActiveTab('dashboard'), 1000);
    }
  };

  return (
    <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 animate-bounce">
          <span className="material-symbols-outlined text-emerald-400">check_circle</span>
          <span className="text-xs font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* Header bar */}
      <header className="bg-white shadow-xs border border-slate-200 rounded-xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">terminal</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
                {interview.fase}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="text-[11px] font-medium text-slate-500">
                Paso {questionIdx} de 5
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 truncate">
              Entrevista Técnica: {interview.posicion_titulo}
            </h1>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            <span className="material-symbols-outlined text-blue-600 animate-pulse text-[18px]">timer</span>
            <span className="font-mono text-sm font-bold text-slate-900 tabular-nums">
              {formatTimer(seconds)}
            </span>
            <span className="text-xs text-slate-500">/ {interview.tiempo_total} min</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600">
            <span className="material-symbols-outlined text-blue-600 text-[16px]">lock</span>
            <span className="font-medium">Sesión Segura y Encriptada • Guardado automático en BD</span>
          </div>

          <button
            onClick={handleFinishInterview}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">stop_circle</span>
            <span>Finalizar y Guardar Entrevista</span>
          </button>
        </div>
      </header>

      {/* Main Grid: Video Stage (8 cols) & Live Telemetry Feed (4 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Stage Container */}
        <section className="xl:col-span-8 space-y-4">
          {/* Virtual Stage Video Frame */}
          <div className="relative w-full aspect-video bg-[#0B192C] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between p-5 text-white select-none border border-slate-800">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

            {/* Top Stage Bar */}
            <div className="relative z-10 flex items-center justify-between w-full">
              <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700/60">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                </span>
                <span className="text-xs font-semibold text-slate-200">Syntropic Agent v3.4</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold ml-1">
                  Hablando...
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700/60 text-xs font-mono text-slate-300">
                <span className="material-symbols-outlined text-blue-400 text-[16px]">bolt</span>
                <span>Latencia: 24ms (Ultra-Low)</span>
              </div>
            </div>

            {/* Center: Glowing AI Core Visualizer */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-blue-600/15 animate-ping opacity-35" />
                <div className="absolute -inset-3 rounded-full bg-blue-500/10 blur-xl" />

                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-linear-to-tr from-blue-700 via-blue-500 to-indigo-500 p-1 shadow-2xl flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#0B192C] flex flex-col items-center justify-center gap-2 relative overflow-hidden border border-blue-400/40">
                    <svg className="w-24 h-12 text-blue-400" fill="none" viewBox="0 0 100 40">
                      <path
                        className="animate-pulse"
                        d="M5 20 Q 15 5, 25 20 T 45 20 T 65 20 T 85 20 T 95 20"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="3"
                      />
                      <path
                        d="M5 20 Q 15 32, 25 20 T 45 20 T 65 20 T 85 20 T 95 20"
                        opacity="0.6"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <span className="text-[10px] text-blue-200 tracking-widest font-mono uppercase font-bold">
                      AI CORE
                    </span>
                  </div>
                </div>

                {/* Modulación Activa Waveform Pill */}
                <div className="absolute -bottom-2 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 border border-slate-700 shadow-md">
                  <span className="w-1.5 h-3 bg-blue-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-1.5 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                  <span className="w-1.5 h-4 bg-blue-400 rounded-full animate-bounce [animation-delay:0.45s]"></span>
                  <span className="text-[11px] text-slate-200 font-mono ml-1">Modulación Activa</span>
                </div>
              </div>
            </div>

            {/* Bottom Stream Bar & Candidate Webcam Frame */}
            <div className="relative z-20 flex justify-between items-end w-full">
              <span className="text-[11px] bg-slate-900/80 px-2.5 py-1 rounded text-slate-400 font-mono border border-slate-800">
                1080p • 60 FPS • WebRTC H.265
              </span>

              {/* Candidate PIP Webcam */}
              <div className="relative w-44 sm:w-56 aspect-video rounded-xl overflow-hidden shadow-2xl bg-slate-800 border border-slate-700 group">
                {camActive ? (
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIh3TeJnPs1ChDSETGP9R86aLVqR0B5fnkokVrZYDH2erdVNfGwxsBVxLZhkfYyWy7V16SPu0Xis8hikNQHHjFGfjLj1oRlJ1-TLOxEuHdDil-GlyTuMyap8d6LFl4rpidzn01u6cUo4tzXOGqJ47Ks9yImPZmTxnqrs8DdhFftktUMAH3wUe3A5SCGkyIYb2cYTEA_te6mxjYy9fin--alEOjy9e35m-CFvaks0wSYM84xxT9Nz3I"
                    alt={interview.candidata_nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-500 text-xs">
                    <span className="material-symbols-outlined text-2xl mb-1">videocam_off</span>
                    <span>Cámara desactivada</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white">
                  <div className="min-w-0">
                    <span className="text-xs font-bold truncate block">{interview.candidata_nombre}</span>
                    <span className="text-[10px] text-slate-300">Candidata</span>
                  </div>
                  <div className="flex items-end gap-0.5 h-3 bg-slate-900/60 px-1 py-0.5 rounded">
                    <span className="w-1 h-1.5 bg-emerald-400 rounded-xs"></span>
                    <span className="w-1 h-3 bg-emerald-400 rounded-xs"></span>
                    <span className="w-1 h-2 bg-emerald-400 rounded-xs"></span>
                  </div>
                </div>

                <div className="absolute top-2 right-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block ring-2 ring-slate-900"></span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Question Card */}
          <div className="bg-white border-l-4 border-blue-600 rounded-xl p-5 border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wide flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">help</span>
                Pregunta {questionIdx} de 5 ({interview.pregunta_actual.contexto})
              </span>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                ID: {interview.pregunta_actual.id}
              </span>
            </div>

            <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
              "{interview.pregunta_actual.texto}"
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-1 text-[11px] text-slate-500 gap-1 border-t border-slate-100">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-slate-400">record_voice_over</span>
                {interview.pregunta_actual.fuente}
              </span>
              <span className="italic">Tiempo sugerido para responder: {interview.pregunta_actual.tiempo_sugerido}</span>
            </div>
          </div>

          {/* Control Action Bar */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setMicActive(!micActive);
                  showToast(micActive ? 'Micrófono silenciado' : 'Micrófono activado');
                }}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${micActive ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-red-100 text-red-600'}`}
                title={micActive ? 'Silenciar Micrófono' : 'Activar Micrófono'}
              >
                <span className="material-symbols-outlined text-[20px]">{micActive ? 'mic' : 'mic_off'}</span>
              </button>

              <button
                onClick={() => {
                  setCamActive(!camActive);
                  showToast(camActive ? 'Cámara apagada' : 'Cámara encendida');
                }}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${camActive ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-red-100 text-red-600'}`}
                title={camActive ? 'Apagar Cámara' : 'Encender Cámara'}
              >
                <span className="material-symbols-outlined text-[20px]">{camActive ? 'videocam' : 'videocam_off'}</span>
              </button>

              <button
                onClick={() => {
                  setSpeakerLevel(prev => (prev % 3) + 1);
                  showToast('Volumen ajustado');
                }}
                className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                title="Ajuste de Audio"
              >
                <span className="material-symbols-outlined text-[20px]">volume_up</span>
              </button>

              <div className="h-5 w-px bg-slate-200 mx-1"></div>

              <button
                onClick={() => setShowNotes(!showNotes)}
                className={`px-3 h-9 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${showNotes ? 'bg-blue-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
              >
                <span className="material-symbols-outlined text-[17px]">edit_note</span>
                <span>Notas Rápidas</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRepeatQuestion}
                className="px-3.5 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[17px]">replay</span>
                <span>Repetir Pregunta</span>
              </button>

              <button
                onClick={handleNextQuestion}
                className="px-4 h-9 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <span>Siguiente Pregunta</span>
                <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Quick Notes Panel */}
          {showNotes && (
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-blue-600">note_alt</span>
                  Bloc de Notas del Evaluador (Sincronizado)
                </span>
                <button onClick={() => setShowNotes(false)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>
              <textarea
                rows={3}
                value={notesText}
                onChange={e => setNotesText(e.target.value)}
                className="w-full p-2.5 text-xs text-slate-800 border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500"
                placeholder="Anota observaciones cualitativas para el panel de decisión..."
              />
            </div>
          )}
        </section>

        {/* Right Feed: Transcripción en Vivo vs Evaluación IA */}
        <aside className="xl:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 flex flex-col h-[700px]">
            {/* Tabs */}
            <div className="flex items-center p-1 bg-slate-100 rounded-lg mb-3">
              <button
                onClick={() => setActiveTabLocal('transcript')}
                className={`flex-1 py-1.5 rounded-md text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 ${activeTab === 'transcript' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <span className="material-symbols-outlined text-[16px]">subtitles</span>
                <span>Transcripción en Vivo</span>
              </button>
              <button
                onClick={() => setActiveTabLocal('eval')}
                className={`flex-1 py-1.5 rounded-md text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 ${activeTab === 'eval' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <span className="material-symbols-outlined text-[16px]">insights</span>
                <span>Evaluación IA</span>
              </button>
            </div>

            {/* Transcript Tab Content */}
            {activeTab === 'transcript' && (
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                {interview.transcripcion.map((t, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border transition-all ${
                      t.is_agent
                        ? 'bg-blue-50/50 border-blue-100'
                        : t.is_current
                        ? 'bg-amber-50/60 border-amber-200'
                        : 'bg-slate-50 border-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-bold flex items-center gap-1 text-[11px] ${t.is_agent ? 'text-blue-700' : 'text-slate-900'}`}>
                        <span className="material-symbols-outlined text-[14px]">
                          {t.is_agent ? 'smart_toy' : 'person'}
                        </span>
                        {t.emisor}
                      </span>
                      {t.is_current ? (
                        <span className="text-[10px] text-amber-700 font-bold font-mono animate-pulse">
                          Hablando ahora...
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-mono">{t.hora}</span>
                      )}
                    </div>
                    <p className="text-slate-700 leading-relaxed text-[11px]">{t.texto}</p>
                  </div>
                ))}
              </div>
            )}

            {/* AI Evaluation Tab Content */}
            {activeTab === 'eval' && (
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
                {interview.evaluacion_tiempo_real.map((ev, i) => (
                  <div key={i} className="space-y-1.5 pb-2 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{ev.criterio}</span>
                        <span className="text-[10px] text-slate-500">{ev.detalle}</span>
                      </div>
                      <span className="text-base font-extrabold text-blue-600">{ev.score}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${ev.score}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                      <span className="material-symbols-outlined text-[12px] text-emerald-600">check_circle</span>
                      <span>{ev.feedback}</span>
                    </div>
                  </div>
                ))}

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Observaciones de la IA
                  </span>
                  <p className="text-[11px] text-slate-700 leading-relaxed">{interview.observaciones_ia}</p>
                </div>
              </div>
            )}

            {/* Bottom active status */}
            <div className="mt-auto pt-3 border-t border-slate-100">
              <div className="bg-slate-50 p-2.5 rounded-lg flex items-center gap-2 border border-slate-100 text-[11px] text-slate-600">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                <span className="leading-tight">
                  Conexión a base de datos activa: Respuestas y transcripción guardadas en tiempo real.
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
