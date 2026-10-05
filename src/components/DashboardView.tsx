import React, { useState } from 'react';
import { Candidate, ActiveTab } from '../types';

interface DashboardViewProps {
  candidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
  selectedCandidate: Candidate;
  onApproveCandidate: (candidateId: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  candidates,
  onSelectCandidate,
  selectedCandidate,
  onApproveCandidate,
  setActiveTab
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  const [scoreFilter, setScoreFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const filteredCandidates = candidates.filter(cand => {
    if (positionFilter !== 'all' && !cand.posicion_titulo.toLowerCase().includes(positionFilter.toLowerCase())) {
      return false;
    }
    if (scoreFilter === '80' && cand.score < 80) return false;
    if (scoreFilter === '90' && cand.score < 90) return false;
    if (scoreFilter === '70' && cand.score >= 70) return false;
    if (statusFilter !== 'all' && cand.estado !== statusFilter) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = cand.nombre.toLowerCase().includes(q);
      const matchEmail = cand.email.toLowerCase().includes(q);
      const matchRole = cand.posicion_titulo.toLowerCase().includes(q);
      const matchSkills = cand.tags.some(t => t.toLowerCase().includes(q)) || cand.skills.some(s => s.toLowerCase().includes(q));
      if (!matchName && !matchEmail && !matchRole && !matchSkills) return false;
    }
    return true;
  });

  const showToast = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  // Helper calculation for SVG Radar Chart polygon
  // Center is (100, 100), max radius 80
  const radarAxes = [
    { label: 'Algoritmos', key: 'Algoritmos' as const, angle: -Math.PI / 2 },
    { label: 'MLOps', key: 'MLOps' as const, angle: -Math.PI / 2 + (2 * Math.PI) / 5 },
    { label: 'Liderazgo', key: 'Liderazgo' as const, angle: -Math.PI / 2 + (4 * Math.PI) / 5 },
    { label: 'Cultura', key: 'Cultura' as const, angle: -Math.PI / 2 + (6 * Math.PI) / 5 },
    { label: 'Resolución', key: 'Resolución' as const, angle: -Math.PI / 2 + (8 * Math.PI) / 5 }
  ];

  const getPolygonPoints = (scale = 1.0) => {
    return radarAxes
      .map(axis => {
        const r = 80 * scale;
        const x = 100 + r * Math.cos(axis.angle);
        const y = 100 + r * Math.sin(axis.angle);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  const getDataPoints = (cand: Candidate) => {
    return radarAxes
      .map(axis => {
        const val = cand.radar[axis.key] || 80;
        const r = (80 * val) / 100;
        const x = 100 + r * Math.cos(axis.angle);
        const y = 100 + r * Math.sin(axis.angle);
        return { x, y, str: `${x.toFixed(1)},${y.toFixed(1)}` };
      });
  };

  const candidatePoints = getDataPoints(selectedCandidate);
  const dataPolygon = candidatePoints.map(p => p.str).join(' ');

  return (
    <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 animate-bounce">
          <span className="material-symbols-outlined text-emerald-400">check_circle</span>
          <span className="text-xs font-semibold">{notificationMsg}</span>
        </div>
      )}

      {/* Header Block */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              Telemetry v4.2 Live
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-medium text-slate-500">Talent Operations Unit</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
            Dashboard de Reclutamiento
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl mt-1">
            Monitoreo de candidatos y métricas de desempeño evaluadas por IA en tiempo real con auditoría de sesgo activa.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => showToast('Generando reporte consolidado en PDF con métricas y sesgo...')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-xs hover:bg-slate-50 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-slate-500">file_download</span>
            <span>Exportar Reporte</span>
          </button>

          <button
            onClick={() => setActiveTab('posiciones')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>+ Crear Nueva Posición</span>
          </button>
        </div>
      </div>

      {/* Top KPI Row (4 Metric Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Posiciones Activas
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-900 tabular-nums">12</span>
                <span className="text-xs text-slate-500">vacantes</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">work</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1 font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full text-[11px]">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +3 este mes
            </span>
            <span className="text-slate-400">4 en fase final</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Entrevistas Completadas
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-900 tabular-nums">348</span>
                <span className="text-xs text-slate-500">sesiones</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">smart_toy</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">
              <span className="material-symbols-outlined text-[14px]">done_all</span>
              94% completadas
            </span>
            <span className="text-slate-400">~38 min / sesion</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Score Promedio General
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold text-slate-900 tabular-nums">84.5</span>
                <span className="text-sm text-slate-400 font-normal">/100</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-100/60 text-blue-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">verified</span>
            </div>
          </div>
          <div className="mt-4 space-y-1.5">
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: '84.5%' }} />
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-400">
              <span>High match threshold (80.0)</span>
              <span className="font-bold text-blue-600">Top 12% global</span>
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Ahorro de Tiempo Estimado
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-900 tabular-nums">186</span>
                <span className="text-xs text-slate-500">horas</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">bolt</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1 font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full text-[11px]">
              <span className="material-symbols-outlined text-[14px]">speed</span>
              78% vs tradicional
            </span>
            <span className="text-slate-400">~12.4h por plaza</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Candidates Table (8 cols) & AI Candidate Highlight Drawer (4 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Primary Data Workspace (Table) */}
        <div className="xl:col-span-8 space-y-4">
          {/* Filter Bar */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, correo, tecnología o posición..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 text-slate-900 placeholder:text-slate-400 text-xs border border-transparent focus:border-blue-500 focus:bg-white focus:outline-hidden transition-all"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Position Filter */}
              <select
                value={positionFilter}
                onChange={e => setPositionFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium px-3 py-2 rounded-lg cursor-pointer focus:outline-hidden hover:bg-slate-100"
              >
                <option value="all">Todas las Posiciones</option>
                <option value="senior full stack">Senior Full Stack</option>
                <option value="frontend lead">Frontend Lead</option>
                <option value="product manager">Product Manager</option>
                <option value="data scientist">Data Scientist</option>
                <option value="devops">DevOps Engineer</option>
              </select>

              {/* Score Filter */}
              <select
                value={scoreFilter}
                onChange={e => setScoreFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium px-3 py-2 rounded-lg cursor-pointer focus:outline-hidden hover:bg-slate-100"
              >
                <option value="all">Score: Todos</option>
                <option value="80">Score: &gt; 80 pts</option>
                <option value="90">Score: &gt; 90 pts (Top)</option>
                <option value="70">Score: &lt; 70 pts</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium px-3 py-2 rounded-lg cursor-pointer focus:outline-hidden hover:bg-slate-100"
              >
                <option value="all">Estado: Todos</option>
                <option value="Recomendado">Recomendado</option>
                <option value="En Revisión">En Revisión</option>
                <option value="No Cumple">No Cumple</option>
                <option value="Aprobado Fase Final">Aprobado</option>
              </select>
            </div>
          </div>

          {/* Candidate Table Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-5 py-3.5 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900">Candidatos Evaluados</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                  {filteredCandidates.length} activos
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                Algoritmo de anti-sesgo validado ISO-27701
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider font-semibold border-b border-slate-200">
                    <th className="py-3 px-4">Candidato</th>
                    <th className="py-3 px-4">Posición / Rol</th>
                    <th className="py-3 px-4">Fecha Entrevista</th>
                    <th className="py-3 px-4">Score IA & Breakdown</th>
                    <th className="py-3 px-4">Estado</th>
                    <th className="py-3 px-4">Documento</th>
                    <th className="py-3 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
                  {filteredCandidates.map(cand => {
                    const isSelected = selectedCandidate.id === cand.id;
                    return (
                      <tr
                        key={cand.id}
                        onClick={() => onSelectCandidate(cand)}
                        className={`transition-colors cursor-pointer group ${isSelected ? 'bg-blue-50/60' : 'hover:bg-slate-50/80'}`}
                      >
                        {/* Candidato Info */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative shrink-0">
                              <img
                                src={cand.avatar}
                                alt={cand.nombre}
                                className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200 shadow-xs"
                              />
                              <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white ${cand.score >= 90 ? 'bg-emerald-500' : (cand.score >= 80 ? 'bg-blue-500' : 'bg-red-500')}`} />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                                {cand.nombre}
                              </span>
                              <span className="text-[11px] text-slate-500 truncate">{cand.email}</span>
                              <span className="text-[10px] text-slate-400">{cand.telefono}</span>
                            </div>
                          </div>
                        </td>

                        {/* Posición / Rol */}
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900">{cand.posicion_titulo}</span>
                            <span className="text-[10px] text-slate-500">{cand.tags.join(' • ')}</span>
                          </div>
                        </td>

                        {/* Fecha */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-800">{cand.fecha_entrevista}</span>
                            <span className="text-[10px] text-slate-400">{cand.hora}</span>
                          </div>
                        </td>

                        {/* Score IA & Breakdown */}
                        <td className="py-3.5 px-4 min-w-[140px]">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${cand.score >= 90 ? 'bg-emerald-100 text-emerald-800' : (cand.score >= 80 ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800')}`}>
                                {cand.score} / 100
                              </span>
                              <span className="text-[10px] font-semibold text-slate-500">{cand.tier}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                              <span>Tech: <strong className="text-slate-900">{cand.breakdown.tech}%</strong></span>
                              <span>•</span>
                              <span>Culture: <strong className="text-slate-900">{cand.breakdown.culture}%</strong></span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${cand.score >= 90 ? 'bg-emerald-500' : (cand.score >= 80 ? 'bg-blue-600' : 'bg-red-500')}`}
                                style={{ width: `${cand.score}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Estado Badge */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              cand.estado === 'Recomendado'
                                ? 'bg-emerald-50 text-emerald-700'
                                : cand.estado === 'Aprobado Fase Final'
                                ? 'bg-emerald-100 text-emerald-900'
                                : cand.estado === 'En Revisión'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-red-50 text-red-700'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${cand.estado === 'Recomendado' || cand.estado === 'Aprobado Fase Final' ? 'bg-emerald-500' : (cand.estado === 'En Revisión' ? 'bg-blue-500' : 'bg-red-500')}`} />
                            {cand.estado}
                          </span>
                        </td>

                        {/* Documento CV */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              showToast(`Descargando ${cand.cv_file}...`);
                            }}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all text-[11px] font-semibold cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[14px]">picture_as_pdf</span>
                            <span>Descargar CV</span>
                          </button>
                        </td>

                        {/* Acciones */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectCandidate(cand);
                              }}
                              className="p-1 rounded-md hover:bg-slate-200/80 text-blue-600 transition-colors"
                              title="Ver reporte detallado IA"
                            >
                              <span className="material-symbols-outlined text-[18px]">analytics</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveTab('entrevistas');
                              }}
                              className="p-1 rounded-md hover:bg-blue-600 hover:text-white text-slate-500 transition-colors"
                              title="Abrir sala de entrevista interactiva"
                            >
                              <span className="material-symbols-outlined text-[18px]">videocam</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="p-3.5 bg-slate-50/70 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <span>
                Mostrando <strong>{filteredCandidates.length}</strong> de <strong>48</strong> postulantes filtrados
              </span>
              <div className="flex items-center gap-1 text-xs">
                <button className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-500 hover:text-slate-900 cursor-pointer">Anterior</button>
                <button className="px-2.5 py-1 rounded bg-blue-600 text-white font-bold cursor-pointer">1</button>
                <button className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer">2</button>
                <button className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer">3</button>
                <button className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-500 hover:text-slate-900 cursor-pointer">Siguiente</button>
              </div>
            </div>
          </div>
        </div>

        {/* Candidate Highlight Drawer (4 cols) */}
        <div className="xl:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            {/* Top Badge & Header */}
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-blue-700">
                  Candidato Destacado IA
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                Match {selectedCandidate.score}% Match Fit
              </span>
            </div>

            {/* Profile Info */}
            <div className="flex items-start gap-3.5">
              <img
                src={selectedCandidate.avatar}
                alt={selectedCandidate.nombre}
                className="w-16 h-16 rounded-xl object-cover shadow-sm shrink-0 border border-slate-100"
              />
              <div className="min-w-0">
                <h3 className="text-base font-bold text-slate-900 truncate">
                  {selectedCandidate.nombre}
                </h3>
                <p className="text-xs text-blue-600 font-semibold">{selectedCandidate.posicion_titulo}</p>
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mt-1">
                  <span>Berlín, Alemania</span>
                  <span>•</span>
                  <span>8+ años exp.</span>
                </div>
              </div>
            </div>

            {/* Radar / Score Breakdown SVG */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">Radar de Competencias Cuantitativas</span>
                <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-extrabold">
                  {selectedCandidate.score}/100 Global
                </span>
              </div>

              {/* Compact SVG Radar Chart */}
              <div className="flex items-center justify-center py-1">
                <svg className="w-48 h-48 overflow-visible" viewBox="0 0 200 200">
                  {/* Concentric rings */}
                  <polygon fill="none" stroke="#CBD5E1" strokeWidth="1" points={getPolygonPoints(1.0)} />
                  <polygon fill="none" stroke="#E2E8F0" strokeWidth="1" points={getPolygonPoints(0.75)} />
                  <polygon fill="none" stroke="#E2E8F0" strokeWidth="1" points={getPolygonPoints(0.5)} />
                  <polygon fill="none" stroke="#E2E8F0" strokeWidth="1" points={getPolygonPoints(0.25)} />

                  {/* Axis lines */}
                  {radarAxes.map((axis, i) => {
                    const x = 100 + 80 * Math.cos(axis.angle);
                    const y = 100 + 80 * Math.sin(axis.angle);
                    return (
                      <line key={i} x1="100" y1="100" x2={x} y2={y} stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 2" />
                    );
                  })}

                  {/* Filled Data Polygon */}
                  <polygon
                    points={dataPolygon}
                    fill="rgba(0, 102, 255, 0.22)"
                    stroke="#0066FF"
                    strokeWidth="2.5"
                  />

                  {/* Data Points */}
                  {candidatePoints.map((pt, i) => (
                    <circle key={i} cx={pt.x} cy={pt.y} r="3.5" fill="#0066FF" />
                  ))}

                  {/* Axis Labels */}
                  <text x="100" y="8" textAnchor="middle" className="text-[9px] fill-slate-700 font-bold">
                    Algoritmos ({selectedCandidate.radar.Algoritmos})
                  </text>
                  <text x="195" y="80" textAnchor="start" className="text-[9px] fill-slate-700 font-bold">
                    MLOps ({selectedCandidate.radar.MLOps})
                  </text>
                  <text x="165" y="185" textAnchor="middle" className="text-[9px] fill-slate-700 font-bold">
                    Liderazgo ({selectedCandidate.radar.Liderazgo})
                  </text>
                  <text x="35" y="185" textAnchor="middle" className="text-[9px] fill-slate-700 font-bold">
                    Cultura ({selectedCandidate.radar.Cultura})
                  </text>
                  <text x="5" y="80" textAnchor="end" className="text-[9px] fill-slate-700 font-bold">
                    Resolución ({selectedCandidate.radar.Resolución})
                  </text>
                </svg>
              </div>

              {/* Score Pill Matrix */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Proficiencia Técnica</span>
                  <span className="text-base font-extrabold text-slate-900">
                    {selectedCandidate.breakdown.tech}%{' '}
                    <span className="text-[10px] font-semibold text-emerald-600">Top 1%</span>
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Alineación Cultural</span>
                  <span className="text-base font-extrabold text-slate-900">
                    {selectedCandidate.breakdown.culture}%{' '}
                    <span className="text-[10px] font-semibold text-blue-600">Alta</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Transcript Preview Snippet */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Extracto Transcripción IA</span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {selectedCandidate.transcript_highlight?.time || 'Minuto 24:12 - Concurrencia'}
                </span>
              </div>
              <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                <div className="pl-2.5 border-l-2 border-blue-600">
                  <span className="text-[10px] font-bold text-blue-700 block mb-0.5">Syntropic AI Interviewer</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    "{selectedCandidate.transcript_highlight?.agent}"
                  </p>
                </div>
                <div className="pl-2.5 border-l-2 border-slate-300">
                  <span className="text-[10px] font-bold text-slate-900 block mb-0.5">{selectedCandidate.nombre}</span>
                  <p className="text-slate-800 text-[11px] leading-relaxed italic">
                    "{selectedCandidate.transcript_highlight?.candidate}"
                  </p>
                </div>
              </div>
            </div>

            {/* AI Synthesis Executive Notes */}
            <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-100 text-emerald-900 text-xs flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-700 text-[18px] shrink-0 mt-0.5">psychology</span>
              <p className="leading-snug text-[11px]">
                <strong>Evaluación Sintética:</strong> {selectedCandidate.resumen_ia}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => {
                  onApproveCandidate(selectedCandidate.id);
                  showToast(`¡${selectedCandidate.nombre} ha sido aprobada a la Fase Final!`);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold text-center shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[17px]">verified_user</span>
                <span>Aprobar a Fase Final</span>
              </button>

              <button
                onClick={() => showToast('Enlace de reporte compartido con Hiring Manager por correo y Slack.')}
                className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                title="Compartir Reporte"
              >
                <span className="material-symbols-outlined text-[19px]">share</span>
              </button>
            </div>
          </div>

          {/* System Telemetry Micro-Card */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">security</span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Auditoría Ética & Compliance</span>
                <span className="text-[11px] text-slate-400">0.00% sesgo demográfico detectado</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Verificado
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
