import React, { useState } from 'react';
import { Candidate, TokenLink, InterviewSession, UserSession } from '../types';

interface StreamlitSimulatorViewProps {
  candidates: Candidate[];
  links: TokenLink[];
  interview: InterviewSession;
  user: UserSession;
}

export const StreamlitSimulatorView: React.FC<StreamlitSimulatorViewProps> = ({
  candidates,
  links,
  interview,
  user
}) => {
  const [stPage, setStPage] = useState<'app' | 'posiciones' | 'candidatos' | 'entrevista' | 'links' | 'buscar'>('candidatos');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(candidates[2]); // Elena Rostova
  const [minScore, setMinScore] = useState(80);
  const [activeTab, setActiveTab] = useState<'transcript' | 'eval'>('transcript');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] bg-white text-[#262730] flex flex-col md:flex-row border border-slate-200 rounded-2xl overflow-hidden shadow-md my-4 font-sans">
      {/* Streamlit Sidebar Left */}
      <aside className="w-full md:w-64 bg-[#F0F2F6] border-r border-[#E0E2EC] p-4 flex flex-col justify-between shrink-0">
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-300">
            <span className="text-red-500 font-bold text-lg">👑</span>
            <div className="leading-tight">
              <span className="font-bold text-slate-800 text-sm block">Streamlit App</span>
              <span className="text-[10px] text-slate-500">v1.38.0 · Port 8501</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Pages (Multi-Page App)
            </span>
            <button
              onClick={() => setStPage('app')}
              className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                stPage === 'app' ? 'bg-[#E0E2EC] text-slate-900 font-bold' : 'hover:bg-slate-200/60 text-slate-700'
              }`}
            >
              <span>🏠</span>
              <span>app.py</span>
            </button>

            <button
              onClick={() => setStPage('posiciones')}
              className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                stPage === 'posiciones' ? 'bg-[#E0E2EC] text-slate-900 font-bold' : 'hover:bg-slate-200/60 text-slate-700'
              }`}
            >
              <span>📝</span>
              <span>1_Posiciones.py</span>
            </button>

            <button
              onClick={() => setStPage('candidatos')}
              className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                stPage === 'candidatos' ? 'bg-[#E0E2EC] text-slate-900 font-bold' : 'hover:bg-slate-200/60 text-slate-700'
              }`}
            >
              <span>👥</span>
              <span>2_Candidatos.py</span>
            </button>

            <button
              onClick={() => setStPage('entrevista')}
              className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                stPage === 'entrevista' ? 'bg-[#E0E2EC] text-slate-900 font-bold' : 'hover:bg-slate-200/60 text-slate-700'
              }`}
            >
              <span>🎙️</span>
              <span>3_Detalle_Entrevista.py</span>
            </button>

            <button
              onClick={() => setStPage('links')}
              className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                stPage === 'links' ? 'bg-[#E0E2EC] text-slate-900 font-bold' : 'hover:bg-slate-200/60 text-slate-700'
              }`}
            >
              <span>🔗</span>
              <span>4_Links.py</span>
            </button>

            <button
              onClick={() => setStPage('buscar')}
              className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                stPage === 'buscar' ? 'bg-[#E0E2EC] text-slate-900 font-bold' : 'hover:bg-slate-200/60 text-slate-700'
              }`}
            >
              <span>🔎</span>
              <span>5_Buscar_Candidatos.py</span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-300 space-y-2 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Session RBAC (auth/session.py)
            </span>
            <div className="p-2.5 rounded bg-white border border-slate-300">
              <span className="font-bold text-slate-900 block">{user.nombre}</span>
              <span className="text-[11px] text-blue-600 font-semibold block">{user.role}</span>
              <span className="text-[10px] text-slate-500">{user.tenant.name}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-300 text-[11px] text-slate-500">
          <span>Running locally on <code>localhost:8501</code></span>
        </div>
      </aside>

      {/* Streamlit Main Viewport */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto space-y-6 bg-white">
        {/* Streamlit Page Banner */}
        <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-100">
          <span>Renderizado en modo: <strong>Streamlit Component Engine</strong></span>
          <span className="text-red-500 font-mono">http://localhost:8501/{stPage === 'app' ? '' : stPage}</span>
        </div>

        {/* Page: 2_Candidatos.py */}
        {stPage === 'candidatos' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard de Reclutamiento</h1>
              <p className="text-xs text-slate-500">Métricas de desempeño evaluadas por IA en tiempo real (FastAPI mocks).</p>
            </div>

            {/* st.metric Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-lg bg-[#F0F2F6] border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Posiciones Activas</span>
                <span className="text-2xl font-extrabold text-slate-900 block">12</span>
                <span className="text-[11px] text-blue-600 font-semibold">+3 este mes</span>
              </div>
              <div className="p-3.5 rounded-lg bg-[#F0F2F6] border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Entrevistas Completadas</span>
                <span className="text-2xl font-extrabold text-slate-900 block">348</span>
                <span className="text-[11px] text-emerald-600 font-semibold">94% completadas</span>
              </div>
              <div className="p-3.5 rounded-lg bg-[#F0F2F6] border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Score Promedio</span>
                <span className="text-2xl font-extrabold text-slate-900 block">84.5</span>
                <span className="text-[11px] text-blue-600 font-semibold">Top 12% global</span>
              </div>
              <div className="p-3.5 rounded-lg bg-[#F0F2F6] border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Ahorro Estimado</span>
                <span className="text-2xl font-extrabold text-slate-900 block">186h</span>
                <span className="text-[11px] text-emerald-600 font-semibold">78% vs tradicional</span>
              </div>
            </div>

            {/* st.slider & search */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Buscar candidato</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="st.text_input('Buscar...')"
                  className="w-full px-3 py-1.5 rounded border border-slate-300 text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  st.slider('Score mínimo', 60, 100, {minScore})
                </label>
                <input
                  type="range"
                  min="60"
                  max="100"
                  value={minScore}
                  onChange={e => setMinScore(Number(e.target.value))}
                  className="w-full accent-red-500"
                />
              </div>
            </div>

            {/* st.dataframe style table */}
            <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
              <div className="p-2.5 bg-[#F0F2F6] font-bold text-slate-700 flex justify-between">
                <span>st.dataframe(candidatos_df)</span>
                <span>5 registros</span>
              </div>
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-600 text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Candidato</th>
                    <th className="p-2.5">Posición</th>
                    <th className="p-2.5">Score IA</th>
                    <th className="p-2.5">Tier</th>
                    <th className="p-2.5">Estado</th>
                    <th className="p-2.5">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {candidates
                    .filter(c => c.score >= minScore)
                    .filter(c => !searchTerm || c.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(c => (
                      <tr key={c.id} className="hover:bg-slate-50">
                        <td className="p-2.5 font-bold text-slate-900">{c.nombre}</td>
                        <td className="p-2.5 text-slate-600">{c.posicion_titulo}</td>
                        <td className="p-2.5 font-bold text-blue-600">{c.score}</td>
                        <td className="p-2.5">{c.tier}</td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.estado === 'Recomendado' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                            {c.estado}
                          </span>
                        </td>
                        <td className="p-2.5">
                          <button
                            onClick={() => setSelectedCandidate(c)}
                            className="px-2 py-1 rounded bg-[#E0E2EC] hover:bg-slate-300 text-slate-800 text-[11px] font-semibold cursor-pointer"
                          >
                            st.button('Detalle')
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* st.expander for Candidate Detail */}
            <div className="border border-slate-200 rounded-lg p-4 bg-[#F8FAFC] space-y-2">
              <span className="text-xs font-bold text-slate-800 block">
                st.expander("Detalle y Radar de Competencias: {selectedCandidate.nombre}")
              </span>
              <p className="text-xs text-slate-600">
                <strong>Evaluación IA:</strong> {selectedCandidate.resumen_ia}
              </p>
              <div className="grid grid-cols-5 gap-2 text-center text-xs">
                {Object.entries(selectedCandidate.radar).map(([k, v]) => (
                  <div key={k} className="p-2 bg-white rounded border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">{k}</span>
                    <span className="font-extrabold text-blue-600 text-sm">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Page: 1_Posiciones.py */}
        {stPage === 'posiciones' && (
          <div className="space-y-4 text-xs">
            <h1 className="text-2xl font-bold text-slate-900">Crear Nueva Posición de Entrevista</h1>
            <p className="text-slate-500">Pipeline ID: #SYN-9941 (services.api_client.create_position)</p>

            <div className="border border-slate-200 p-4 rounded-lg space-y-3 bg-[#F8FAFC]">
              <span className="font-bold text-slate-800 block">st.text_input("Título del Puesto")</span>
              <input type="text" readOnly value="Senior Full Stack Developer (React & Node)" className="w-full p-2 border border-slate-300 rounded bg-white" />

              <span className="font-bold text-slate-800 block">st.file_uploader("Documentos técnicos de arquitectura")</span>
              <div className="p-3 border border-dashed border-slate-300 rounded text-center text-slate-500 bg-white">
                Archivos cargados: Tech_Stack_Standards_2025.pdf, Job_Description_FullStack.docx
              </div>

              <span className="font-bold text-slate-800 block">st.text_area("AI System Directive")</span>
              <textarea readOnly rows={2} value="Evaluar experiencia en microservicios, testing y resiliencia en alta concurrencia..." className="w-full p-2 border border-slate-300 rounded bg-white" />

              <button className="px-4 py-2 bg-red-600 text-white font-bold rounded cursor-pointer">
                st.button("Publicar Posición y Generar Enlaces")
              </button>
            </div>
          </div>
        )}

        {/* Page: 3_Detalle_Entrevista.py */}
        {stPage === 'entrevista' && (
          <div className="space-y-4 text-xs">
            <h1 className="text-2xl font-bold text-slate-900">Sala de Entrevista Técnica Interactiva</h1>
            <p className="text-slate-500">Candidata: Sofía Valenzuela · Paso 4 de 5 · WebRTC</p>

            <div className="p-4 bg-[#0B192C] text-white rounded-xl space-y-2">
              <span className="text-blue-400 font-bold block">Syntropic Agent v3.4 (Hablando...)</span>
              <p className="text-sm italic">
                "{interview.pregunta_actual.texto}"
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('transcript')}
                className={`px-3 py-1.5 rounded font-bold ${activeTab === 'transcript' ? 'bg-red-500 text-white' : 'bg-slate-200'}`}
              >
                st.tab("Transcripción en Vivo")
              </button>
              <button
                onClick={() => setActiveTab('eval')}
                className={`px-3 py-1.5 rounded font-bold ${activeTab === 'eval' ? 'bg-red-500 text-white' : 'bg-slate-200'}`}
              >
                st.tab("Evaluación IA")
              </button>
            </div>

            {activeTab === 'transcript' ? (
              <div className="p-3 border border-slate-200 rounded-lg space-y-2 bg-slate-50">
                {interview.transcripcion.map((t, idx) => (
                  <div key={idx} className="p-2 bg-white rounded border border-slate-200">
                    <strong className="text-blue-600">{t.emisor}: </strong>
                    <span>{t.texto}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 border border-slate-200 rounded-lg space-y-3 bg-slate-50">
                {interview.evaluacion_tiempo_real.map((ev, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between font-bold">
                      <span>{ev.criterio}</span>
                      <span>{ev.score}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full" style={{ width: `${ev.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Page: 4_Links.py */}
        {stPage === 'links' && (
          <div className="space-y-4 text-xs">
            <h1 className="text-2xl font-bold text-slate-900">Gestor de Enlaces Dinámicos HMAC</h1>
            <p className="text-slate-500">Tokens Zero-Trust de un solo uso para prevenir suplantación.</p>

            <div className="border border-slate-200 rounded-lg p-4 space-y-2 bg-slate-50">
              <span className="font-bold text-slate-800 block">st.dataframe(links_df)</span>
              {links.map(l => (
                <div key={l.id} className="p-2 bg-white border border-slate-200 rounded flex justify-between items-center">
                  <div>
                    <span className="font-bold block text-slate-900">{l.candidato}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{l.url}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">
                    {l.estado}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Page: 5_Buscar_Candidatos.py */}
        {stPage === 'buscar' && (
          <div className="space-y-4 text-xs">
            <h1 className="text-2xl font-bold text-slate-900">Búsqueda Semántica de Candidatos</h1>
            <p className="text-slate-500">Filtrado vectorial por skills, experiencia y score.</p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="font-bold text-slate-800 block">st.multiselect('Skills requeridas')</span>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-white border border-slate-300 rounded font-semibold">React 18</span>
                <span className="px-2 py-1 bg-white border border-slate-300 rounded font-semibold">Node.js</span>
                <span className="px-2 py-1 bg-white border border-slate-300 rounded font-semibold">PyTorch</span>
              </div>
            </div>
          </div>
        )}

        {/* Page: app.py */}
        {stPage === 'app' && (
          <div className="space-y-4 text-xs">
            <h1 className="text-2xl font-bold text-slate-900">Entrada Principal (app.py)</h1>
            <p className="text-slate-500">Autenticación y Redirección a módulos con control de rol RBAC.</p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <p>Sesión activa: <strong>{user.email}</strong></p>
              <p>Rol: <code>{user.role}</code></p>
              <button onClick={() => setStPage('candidatos')} className="px-3 py-1.5 bg-red-600 text-white font-bold rounded">
                st.switch_page("pages/2_Candidatos.py")
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
