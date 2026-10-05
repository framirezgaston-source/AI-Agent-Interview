import React, { useState } from 'react';
import { UserSession, UserRole } from '../types';

interface LoginViewProps {
  onLogin: (session: Partial<UserSession>) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('elena.rostova@techcorp.io');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('Talent Lead');
  const [tenantName, setTenantName] = useState('TechCorp Inc.');
  const [remember, setRemember] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      email,
      nombre: email.includes('elena') ? 'Elena Rostova' : email.split('@')[0].toUpperCase(),
      cargo: role === 'Talent Lead' ? 'Talent AI Lead' : role,
      role: role,
      tenant: {
        id: 't-001',
        name: tenantName,
        tier: 'Enterprise Elite'
      }
    });
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
                  <span className="material-symbols-outlined text-[20px]">auto_stories</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Contexto Organizacional Profundo</span>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Evaluaciones objetivas basadas en el CV del candidato y las bases de conocimiento de tu empresa.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 shrink-0">
                  <span className="material-symbols-outlined text-[20px]">link</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Seguridad e Integridad Zero-Trust</span>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Enlaces dinámicos de un solo uso para garantizar integridad total del proceso de selección.
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
                    Reportes analíticos instantáneos con scoring predictivo, radar de competencias y descarga de CV.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="relative z-10 mt-8 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
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

        {/* Right Column: Authentication Form */}
        <div className="lg:col-span-6 bg-white p-8 sm:p-12 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-slate-900 tracking-tight text-lg">
              Syntropic<span className="text-blue-600">.ai</span>
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              Gateway v4.8
            </div>
          </div>

          <div className="max-w-md w-full mx-auto my-auto py-6 space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Acceso Corporativo para Reclutadores
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Ingresa tus credenciales de empresa para acceder a tus vacantes y candidatos
              </p>
            </div>

            {/* SSO Button */}
            <button
              type="button"
              onClick={handleSSO}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                {/* Google Icon */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
                <span className="text-slate-300">/</span>
                {/* Microsoft Icon */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M1 1h10v10H1z" fill="#F25022" />
                  <path d="M1 13h10v10H1z" fill="#00A4EF" />
                  <path d="M13 1h10v10H13z" fill="#7FBA00" />
                  <path d="M13 13h10v10H13z" fill="#FFB900" />
                </svg>
              </div>
              <span>Continuar con Google Workspace / Microsoft SSO</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-slate-200" />
              <span className="absolute bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                o ingresa con tu correo de empresa
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-800">Correo corporativo</label>
                  <span className="text-[10px] text-slate-400">Dominio autorizado</span>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                    business_center
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="reclutador@empresa.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-800">Contraseña</label>
                  <a href="#forgot" className="text-blue-600 hover:underline text-[11px]">¿Olvidaste tu contraseña?</a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                    lock
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Role & Tenant Demo Selectors */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 text-[11px]">Rol en Plataforma</label>
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value as UserRole)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 font-medium"
                  >
                    <option value="Talent Lead">Talent Lead</option>
                    <option value="SuperAdmin">SuperAdmin</option>
                    <option value="Recruiter">Recruiter</option>
                    <option value="Hiring Manager">Hiring Manager</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 text-[11px]">Organización</label>
                  <select
                    value={tenantName}
                    onChange={e => setTenantName(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 font-medium"
                  >
                    <option value="TechCorp Inc.">TechCorp Inc.</option>
                    <option value="FinTech Global Labs">FinTech Global</option>
                    <option value="BioHealth AI">BioHealth AI</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={e => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 accent-blue-600"
                  />
                  <span className="text-slate-600 text-xs">Recordar esta sesión por 30 días</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Iniciar Sesión en el Dashboard</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </form>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 text-center sm:text-left">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-blue-600 text-[16px]">verified_user</span>
              <span>Protección de datos conforme a GDPR y SOC2 Tipo II</span>
            </div>
            <span className="font-mono uppercase text-[10px]">Cifrado AES-256</span>
          </div>
        </div>
      </div>
    </div>
  );
};
