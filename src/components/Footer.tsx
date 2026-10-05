import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-200 py-6 mt-12">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900 text-sm">
            Syntropic<span className="text-blue-600">.ai</span>
          </span>
          <span className="text-slate-300">|</span>
          <span>Enterprise Autonomous Talent Intelligence</span>
        </div>

        <div className="flex items-center gap-6 font-medium">
          <span className="hover:text-slate-900 cursor-pointer transition-colors">Compliance & Bias Audits (ISO-27701)</span>
          <span className="hover:text-slate-900 cursor-pointer transition-colors">API Telemetry</span>
          <span className="hover:text-slate-900 cursor-pointer transition-colors">Seguridad SOC2 Tipo II</span>
          <span className="hover:text-slate-900 cursor-pointer transition-colors">Soporte Corporativo</span>
        </div>

        <div>
          © 2025 Syntropic AI Inc. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
