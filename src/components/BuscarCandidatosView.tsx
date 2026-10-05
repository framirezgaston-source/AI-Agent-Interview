import React, { useState } from 'react';
import { Candidate, ActiveTab } from '../types';

interface BuscarCandidatosViewProps {
  candidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const BuscarCandidatosView: React.FC<BuscarCandidatosViewProps> = ({
  candidates,
  onSelectCandidate,
  setActiveTab
}) => {
  const [query, setQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [minScore, setMinScore] = useState(70);
  const [tier, setTier] = useState('all');
  const [status, setStatus] = useState('all');

  const allSkills = [
    'React 18',
    'Node.js',
    'TypeScript',
    'PyTorch',
    'vLLM',
    'Kubernetes',
    'AWS',
    'Kafka',
    'PostgreSQL',
    'Product Strategy'
  ];

  const toggleSkill = (s: string) => {
    setSelectedSkills(prev => 
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  const filtered = candidates.filter(c => {
    if (c.score < minScore) return false;
    if (tier !== 'all' && !c.tier.toLowerCase().includes(tier.toLowerCase())) return false;
    if (status !== 'all' && c.estado !== status) return false;

    if (selectedSkills.length > 0) {
      const candSkills = [...c.skills, ...c.tags].map(s => s.toLowerCase());
      const hasSkill = selectedSkills.some(s => candSkills.includes(s.toLowerCase()));
      if (!hasSkill) return false;
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      const matchName = c.nombre.toLowerCase().includes(q);
      const matchRole = c.posicion_titulo.toLowerCase().includes(q);
      const matchSum = c.resumen_ia.toLowerCase().includes(q);
      const matchTags = c.tags.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchRole && !matchSum && !matchTags) return false;
    }

    return true;
  });

  return (
    <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
            Módulo 5 · 5_Buscar_Candidatos.py
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Búsqueda Inteligente de Candidatos
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Motor semántico para localización de talento técnico calificado por IA con análisis de competencias.
        </p>
      </div>

      {/* Search Filter Panel */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-7 space-y-1.5">
            <label className="text-xs font-semibold text-slate-800">Consulta semántica o nombre</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                search
              </span>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Ej: 'Ingeniero con experiencia en clusters vLLM y microservicios'"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-800">Score IA Mínimo</label>
              <span className="font-bold text-blue-600">{minScore} pts</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              value={minScore}
              onChange={e => setMinScore(Number(e.target.value))}
              className="w-full accent-blue-600 mt-2"
            />
          </div>
        </div>

        {/* Skill Pills Selection */}
        <div className="space-y-1.5 pt-1">
          <label className="text-xs font-semibold text-slate-800 block">Filtrar por Habilidades Técnicas</label>
          <div className="flex flex-wrap items-center gap-1.5">
            {allSkills.map(sk => {
              const isSelected = selectedSkills.includes(sk);
              return (
                <button
                  key={sk}
                  type="button"
                  onClick={() => toggleSkill(sk)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {sk}
                </button>
              );
            })}
            {selectedSkills.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedSkills([])}
                className="text-xs text-blue-600 hover:underline font-semibold ml-2"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Resultados encontrados: <strong className="text-slate-900">{filtered.length} candidatos</strong></span>
      </div>

      {/* Candidate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(cand => (
          <div
            key={cand.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow space-y-3.5 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={cand.avatar}
                  alt={cand.nombre}
                  className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{cand.nombre}</h3>
                  <p className="text-xs text-blue-600 font-semibold">{cand.posicion_titulo}</p>
                  <p className="text-[11px] text-slate-400">{cand.email} · {cand.telefono}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-lg font-extrabold text-blue-600 tabular-nums">
                  {cand.score} / 100
                </span>
                <span className="block text-[10px] font-bold text-slate-500 uppercase">{cand.tier}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              "{cand.resumen_ia}"
            </p>

            <div className="flex flex-wrap gap-1.5">
              {cand.skills.map(s => (
                <span key={s} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                  {s}
                </span>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                cand.estado === 'Recomendado'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-blue-50 text-blue-700'
              }`}>
                {cand.estado}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onSelectCandidate(cand);
                    setActiveTab('dashboard');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer"
                >
                  Ver en Dashboard
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
