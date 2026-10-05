import React, { useState } from 'react';
import { ActiveTab, UserSession, UserRole, ViewMode } from '../types';
import { downloadDashboardZip } from '../utils/exportZip';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  user: UserSession;
  setUser: React.Dispatch<React.SetStateAction<UserSession>>;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  setUser,
  viewMode,
  setViewMode,
  onLogout
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showTenantMenu, setShowTenantMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const roles: UserRole[] = [
    'SuperAdmin',
    'Talent Lead',
    'Recruiter',
    'Hiring Manager',
    'Technical Interviewer',
    'Candidato'
  ];

  const tenants = ['TechCorp Inc.', 'FinTech Global Labs', 'BioHealth AI'];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Tenant Dropdown */}
        <div className="flex items-center gap-4 lg:gap-6">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-2.5 text-left group focus:outline-hidden"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs">
              <span className="material-symbols-outlined text-[20px]">psychology</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-extrabold text-slate-900 tracking-tight text-lg">
                Syntropic<span className="text-blue-600">.ai</span>
              </span>
            </div>
          </button>

          <div className="h-5 w-px bg-slate-200 hidden md:block" />

          {/* Tenant Selector */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowTenantMenu(!showTenantMenu)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 transition-colors text-xs font-semibold text-slate-800"
            >
              <div className="w-4 h-4 rounded bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                T
              </div>
              <span className="truncate max-w-[130px]">{user.tenant.name}</span>
              <span className="material-symbols-outlined text-[16px] text-slate-500">unfold_more</span>
            </button>

            {showTenantMenu && (
              <div className="absolute left-0 mt-1.5 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50">
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Organizaciones
                </div>
                {tenants.map(t => (
                  <button
                    key={t}
                    onClick={() => {
                      setUser(prev => ({ ...prev, tenant: { ...prev.tenant, name: t } }));
                      setShowTenantMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 ${user.tenant.name === t ? 'text-blue-600 font-semibold bg-blue-50/50' : 'text-slate-700'}`}
                  >
                    <span>{t}</span>
                    {user.tenant.name === t && <span className="material-symbols-outlined text-[14px]">check</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Bar */}
          <nav className="hidden xl:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('posiciones')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'posiciones' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              Posiciones
            </button>
            <button
              onClick={() => setActiveTab('entrevistas')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'entrevistas' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              Sala Entrevista
            </button>
            <button
              onClick={() => setActiveTab('candidatos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'candidatos' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              Candidatos
            </button>
            <button
              onClick={() => setActiveTab('links')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'links' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              Links
            </button>
            <button
              onClick={() => setActiveTab('buscar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'buscar' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              Buscar
            </button>
            <button
              onClick={() => setActiveTab('portal_candidato')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'portal_candidato' ? 'bg-indigo-600 text-white shadow-xs' : 'text-indigo-600 hover:bg-indigo-50'}`}
              title="Ver portal público con token de un solo uso"
            >
              Vista Candidato
            </button>
            <button
              onClick={() => setActiveTab('codigo_streamlit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${activeTab === 'codigo_streamlit' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              <span className="material-symbols-outlined text-[16px] text-amber-500">terminal</span>
              <span>Código & Docker</span>
            </button>
          </nav>
        </div>

        {/* Right Actions: Export ZIP, View Mode Switch, Notifications & User */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Export ZIP Button */}
          <button
            onClick={async () => {
              setIsExporting(true);
              try {
                await downloadDashboardZip();
              } finally {
                setIsExporting(false);
              }
            }}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer active:scale-95"
            title="Descargar todos los archivos del proyecto Streamlit comprimidos en .ZIP"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isExporting ? 'autorenew' : 'folder_zip'}
            </span>
            <span className="hidden sm:inline">{isExporting ? 'Empaquetando...' : 'Descargar .ZIP'}</span>
          </button>

          {/* View Mode Switcher: Streamlit vs Executive Syntropic */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('syntropic')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${viewMode === 'syntropic' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
              title="Diseño Corporativo Syntropic"
            >
              Ejecutivo
            </button>
            <button
              onClick={() => setViewMode('streamlit')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1 ${viewMode === 'streamlit' ? 'bg-white text-red-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
              title="Simulador de interfaz nativa Streamlit"
            >
              <span>Streamlit</span>
            </button>
          </div>

          {/* Quick Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Notificaciones"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="text-xs font-bold text-slate-900">Notificaciones Recientes</span>
                  <span className="text-[11px] text-blue-600 font-medium">Marcar leídas</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-lg bg-blue-50/60 text-slate-800">
                    <span className="font-semibold block text-blue-900">Entrevista completada</span>
                    Elena Rostova completó la sesión con Score 96/100.
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 text-slate-700">
                    <span className="font-semibold block text-slate-900">15 Tokens generados</span>
                    Lote para Senior Full Stack enviado por email.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.nombre}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[120px]">
                  {user.nombre}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">{user.role}</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-slate-400 hidden md:block">
                expand_more
              </span>
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                  <div className="text-xs font-bold text-slate-900">{user.nombre}</div>
                  <div className="text-[11px] text-slate-500">{user.email}</div>
                  <div className="text-[10px] text-blue-600 font-medium mt-0.5">Rol: {user.role}</div>
                </div>

                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Cambiar Rol (RBAC)
                </div>
                {roles.map(r => (
                  <button
                    key={r}
                    onClick={() => {
                      setUser(prev => ({ ...prev, role: r }));
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 ${user.role === r ? 'text-blue-600 font-semibold bg-blue-50/50' : 'text-slate-700'}`}
                  >
                    <span>{r}</span>
                    {user.role === r && <span className="material-symbols-outlined text-[14px]">check</span>}
                  </button>
                ))}

                <div className="border-t border-slate-100 my-1"></div>
                <button
                  onClick={onLogout}
                  className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-1.5 font-medium"
                >
                  <span className="material-symbols-outlined text-[15px]">logout</span>
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Nav bar sub-row */}
      <div className="xl:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-slate-100 text-xs font-semibold no-scrollbar">
        <button onClick={() => setActiveTab('dashboard')} className={`px-2.5 py-1 rounded-md shrink-0 ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}>Dashboard</button>
        <button onClick={() => setActiveTab('posiciones')} className={`px-2.5 py-1 rounded-md shrink-0 ${activeTab === 'posiciones' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}>Posiciones</button>
        <button onClick={() => setActiveTab('entrevistas')} className={`px-2.5 py-1 rounded-md shrink-0 ${activeTab === 'entrevistas' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}>Entrevista</button>
        <button onClick={() => setActiveTab('candidatos')} className={`px-2.5 py-1 rounded-md shrink-0 ${activeTab === 'candidatos' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}>Candidatos</button>
        <button onClick={() => setActiveTab('links')} className={`px-2.5 py-1 rounded-md shrink-0 ${activeTab === 'links' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}>Links</button>
        <button onClick={() => setActiveTab('buscar')} className={`px-2.5 py-1 rounded-md shrink-0 ${activeTab === 'buscar' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}>Buscar</button>
        <button onClick={() => setActiveTab('portal_candidato')} className={`px-2.5 py-1 rounded-md shrink-0 ${activeTab === 'portal_candidato' ? 'bg-indigo-600 text-white' : 'text-indigo-600'}`}>Portal Candidato</button>
        <button onClick={() => setActiveTab('codigo_streamlit')} className={`px-2.5 py-1 rounded-md shrink-0 ${activeTab === 'codigo_streamlit' ? 'bg-slate-900 text-white' : 'text-slate-700'}`}>Código Python</button>
      </div>
    </header>
  );
};
