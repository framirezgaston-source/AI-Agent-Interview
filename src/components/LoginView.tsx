import React, { useState, useEffect } from 'react';
import { UserSession, UserRole } from '../types';
import {
  initializeUsersDB,
  getStoredUsers,
  registerNewUser,
  verifyUserCredentials,
  convertStoredUserToSession,
  StoredUser
} from '../utils/authService';

interface LoginViewProps {
  onLogin: (session: Partial<UserSession>) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [activeAuthTab, setActiveAuthTab] = useState<'login' | 'register'>('login');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('elena.rostova@techcorp.io');
  const [loginPassword, setLoginPassword] = useState('demo123');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null);

  // Register form state
  const [regNombre, setRegNombre] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPasswordConfirm, setRegPasswordConfirm] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('Talent Lead');
  const [regTenant, setRegTenant] = useState('Franja Automations');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);
  const [regSuccess, setRegSuccess] = useState<string | null>(null);

  const [storedUsers, setStoredUsers] = useState<StoredUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize DB and load stored users
  useEffect(() => {
    async function init() {
      await initializeUsersDB();
      setStoredUsers(getStoredUsers());
    }
    init();
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginSuccess(null);
    setIsLoading(true);

    try {
      const result = await verifyUserCredentials(loginEmail, loginPassword);
      if (result.success && result.user) {
        setLoginSuccess(result.message);
        setTimeout(() => {
          const session = convertStoredUserToSession(result.user!);
          onLogin(session);
        }, 400);
      } else {
        setLoginError(result.message);
      }
    } catch {
      setLoginError('Error de autenticación. Intente de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);
    setRegSuccess(null);

    if (regPassword !== regPasswordConfirm) {
      setRegError('Las contraseñas no coinciden. Por favor verifícalas.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await registerNewUser(
        regNombre,
        regEmail,
        regPassword,
        regRole,
        regTenant
      );

      if (result.success && result.user) {
        setRegSuccess(result.message);
        setStoredUsers(getStoredUsers());
        // Pre-fill login
        setLoginEmail(result.user.email);
        setLoginPassword(regPassword);
        
        // Auto-login after 1 second or let user click
        setTimeout(() => {
          const session = convertStoredUserToSession(result.user!);
          onLogin(session);
        }, 1200);
      } else {
        setRegError(result.message);
      }
    } catch {
      setRegError('Error al crear la cuenta. Intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSSO = () => {
    onLogin({
      email: 'elena.rostova@techcorp.io',
      nombre: 'Elena Rostova',
      cargo: 'Talent AI Lead',
      role: 'Talent Lead',
      tenant: {
        id: 't-001',
        name: 'TechCorp Inc.',
        tier: 'Enterprise Elite'
      }
    });
  };

  const selectUserForLogin = (user: StoredUser) => {
    setLoginEmail(user.email);
    setLoginPassword(user.email.includes('elena') ? 'demo123' : '');
    setActiveAuthTab('login');
    setLoginError(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 grid grid-cols-1 lg:grid-cols-12 min-h-[720px]">
        {/* Left Column: Value Proposition & Executive Proof */}
        <div className="lg:col-span-6 bg-[#0B192C] text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Ambient Lighting */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Content */}
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs">
                <span className="material-symbols-outlined text-[20px]">psychology</span>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">Syntropic.ai</span>
              <span className="ml-2 text-[10px] font-bold uppercase tracking-wider bg-white/10 text-blue-300 px-2 py-0.5 rounded border border-white/10">
                Enterprise Intelligence
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-white tracking-tight">
                Talento evaluado con rigor algorítmico y precisión ejecutiva.
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                La plataforma líder de entrevistas técnicas y ejecutivas potenciada por Agentes de Inteligencia Artificial.
              </p>
            </div>

            {/* Feature Stack */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 shrink-0">
                  <span className="material-symbols-outlined text-[20px]">database</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Persistencia Real de Cuentas</span>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Tus credenciales y perfiles se guardan con cifrado SHA-256 + salt tanto en SQLite local (<code className="text-blue-300">data/users.db</code>) como en el navegador.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 shrink-0">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Seguridad e Integridad Zero-Trust</span>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Enlaces dinámicos de un solo uso protegidos con HMAC-SHA256 para prevenir suplantación.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 shrink-0">
                  <span className="material-symbols-outlined text-[20px]">analytics</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Predictibilidad de Contratación</span>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Reportes analíticos instantáneos con scoring cuantitativo, radar de competencias y transcripción sincronizada.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="relative z-10 mt-6 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1 text-amber-400">
                <span className="material-symbols-outlined text-[16px]">star</span>
                <span className="material-symbols-outlined text-[16px]">star</span>
                <span className="material-symbols-outlined text-[16px]">star</span>
                <span className="material-symbols-outlined text-[16px]">star</span>
                <span className="material-symbols-outlined text-[16px]">star</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Validado por HR Tech</span>
            </div>
            <p className="text-xs text-slate-200 italic leading-relaxed">
              “Syntropic redujo nuestro tiempo de filtrado técnico en un 73% mientras incrementó la paridad y consistencia en cada entrevista directiva.”
            </p>
            <div className="flex items-center gap-3 mt-3">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGVMeksCs6Wt8-QVDY8-VfPfLBC0ZvPulhxmqYTHt-8xOwMsS0PnUfYRuzsUCo1xiJQBmVUOeVYFDMIbrhfHSpgS-c13MagIlHLKIm5YA1Ods3Wx7QQ4JbKdeaHV5EAxfenhtBuG2XRmgbEcvgQrsLoKVJtVw8U5-2vsm84qcui6_lA-9UebGyPFFezMPUlh20zr247WWMPC2O2kcZdG8gHmiJktvFlNByzM-Di7h-dl0Gts6kjD7G"
                alt="Elena Morales"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30"
              />
              <div>
                <span className="text-xs font-bold text-white block">Elena Morales</span>
                <span className="text-[10px] text-slate-400">VP of Global Talent, Kinetix Group</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Authentication & Registration */}
        <div className="lg:col-span-6 bg-white p-8 sm:p-12 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-slate-900 tracking-tight text-lg">
              Syntropic<span className="text-blue-600">.ai</span>
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              SQLite & Local Auth Activo
            </div>
          </div>

          <div className="max-w-md w-full mx-auto my-auto py-4 space-y-5">
            {/* Tabs for Login vs Register */}
            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setActiveAuthTab('login');
                  setLoginError(null);
                  setLoginSuccess(null);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeAuthTab === 'login'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">key</span>
                <span>Iniciar Sesión</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveAuthTab('register');
                  setRegError(null);
                  setRegSuccess(null);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeAuthTab === 'register'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">person_add</span>
                <span>Crear Cuenta Real</span>
              </button>
            </div>

            {/* TAB 1: LOGIN */}
            {activeAuthTab === 'login' && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Acceso Corporativo
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Ingresa con tu correo registrado y contraseña verificada.
                  </p>
                </div>

                {/* SSO Button */}
                <button
                  type="button"
                  onClick={handleSSO}
                  className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-xs transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                    </svg>
                  </div>
                  <span>Continuar con Cuenta Demo (Elena Rostova)</span>
                </button>

                <div className="relative flex items-center justify-center">
                  <div className="w-full border-t border-slate-200" />
                  <span className="absolute bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    o ingresa con tu contraseña
                  </span>
                </div>

                {loginError && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                    <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">error</span>
                    <span>{loginError}</span>
                  </div>
                )}

                {loginSuccess && (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-start gap-2">
                    <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">check_circle</span>
                    <span>{loginSuccess}</span>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-800">Correo registrado</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                        mail
                      </span>
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                        placeholder="tu.correo@empresa.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-800">Contraseña</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                        lock
                      </span>
                      <input
                        type={showLoginPassword ? 'text' : 'password'}
                        required
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        placeholder="Ingresa tu contraseña"
                        className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {showLoginPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Registered Accounts Quick Select */}
                  {storedUsers.length > 0 && (
                    <div className="pt-1">
                      <div className="text-[11px] font-semibold text-slate-500 mb-1.5 flex items-center justify-between">
                        <span>Cuentas guardadas en base de datos:</span>
                        <span className="text-[10px] text-blue-600 font-mono">({storedUsers.length} registradas)</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1.5 rounded-lg bg-slate-50 border border-slate-200">
                        {storedUsers.map(u => (
                          <button
                            key={u.id}
                            type="button"
                            onClick={() => selectUserForLogin(u)}
                            className={`px-2 py-1 rounded text-[10px] font-medium border transition-colors flex items-center gap-1 cursor-pointer ${
                              loginEmail === u.email
                                ? 'bg-blue-100 border-blue-300 text-blue-800 font-bold'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span>{u.nombre}</span>
                            <span className="text-slate-400">({u.email})</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group disabled:opacity-50"
                  >
                    <span>{isLoading ? 'Verificando...' : 'Iniciar Sesión en el Dashboard'}</span>
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB 2: REGISTER */}
            {activeAuthTab === 'register' && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Crear Cuenta Real
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Registra tu correo y contraseña. Quedarán almacenados de manera segura con cifrado SHA-256 y salt único.
                  </p>
                </div>

                {regError && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                    <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">error</span>
                    <span>{regError}</span>
                  </div>
                )}

                {regSuccess && (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-start gap-2">
                    <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">check_circle</span>
                    <span>{regSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-800">Nombre completo</label>
                    <input
                      type="text"
                      required
                      value={regNombre}
                      onChange={e => setRegNombre(e.target.value)}
                      placeholder="Ej: Gastón Ramírez"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-800">Correo electrónico real</label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={e => setRegEmail(e.target.value)}
                      placeholder="tu_correo@franjaautomations.com"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-800">Contraseña</label>
                      <div className="relative">
                        <input
                          type={showRegPassword ? 'text' : 'password'}
                          required
                          value={regPassword}
                          onChange={e => setRegPassword(e.target.value)}
                          placeholder="Mín. 6 caracteres"
                          className="w-full px-3 pr-8 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPassword(!showRegPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {showRegPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-800">Confirmar</label>
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        required
                        value={regPasswordConfirm}
                        onChange={e => setRegPasswordConfirm(e.target.value)}
                        placeholder="Repite la contraseña"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-800">Rol en Plataforma</label>
                      <select
                        value={regRole}
                        onChange={e => setRegRole(e.target.value as UserRole)}
                        className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 font-medium"
                      >
                        <option value="Talent Lead">Talent Lead</option>
                        <option value="SuperAdmin">SuperAdmin</option>
                        <option value="Recruiter">Recruiter</option>
                        <option value="Hiring Manager">Hiring Manager</option>
                        <option value="Technical Interviewer">Technical Interviewer</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-800">Empresa / Tenant</label>
                      <input
                        type="text"
                        value={regTenant}
                        onChange={e => setRegTenant(e.target.value)}
                        placeholder="Franja Automations"
                        className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 font-medium"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[18px]">save</span>
                    <span>{isLoading ? 'Guardando en BD...' : 'Registrar y Guardar Cuenta'}</span>
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 text-center sm:text-left">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-blue-600 text-[16px]">verified_user</span>
              <span>Protección de credenciales: SHA-256 + salt criptográfico</span>
            </div>
            <span className="font-mono text-[10px] text-slate-500">BD: SQLite & Web Storage</span>
          </div>
        </div>
      </div>
    </div>
  );
};
