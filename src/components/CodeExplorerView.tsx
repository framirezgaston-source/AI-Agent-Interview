import React, { useState } from 'react';
import { CODE_FILES_MANIFEST } from '../mockData';
import { downloadDashboardZip } from '../utils/exportZip';

export const CodeExplorerView: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState(CODE_FILES_MANIFEST[0]);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportZip = async () => {
    setIsExporting(true);
    try {
      await downloadDashboardZip();
    } finally {
      setIsExporting(false);
    }
  };

  const downloadAllScript = () => {
    const text = `# Despliegue rápido de Syntropic AI Dashboard en Streamlit
git clone <tu-repo> && cd dashboard
pip install -r requirements.txt
streamlit run app.py --server.port=8501`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quickstart_syntropic_streamlit.sh';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              Estructura Streamlit & Dockerfile Creados
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600 text-[26px]">folder_special</span>
            <span>Explorador de Código Streamlit & Docker</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Archivos creados bajo la estructura <code>dashboard/</code> con arquitectura RBAC, API Client y Dockerfile.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleExportZip}
            disabled={isExporting}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isExporting ? 'autorenew' : 'folder_zip'}
            </span>
            <span>{isExporting ? 'Generando ZIP...' : 'Descargar Proyecto Completo (.ZIP)'}</span>
          </button>

          <button
            onClick={downloadAllScript}
            className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px]">terminal</span>
            <span>Script Quickstart (.sh)</span>
          </button>
        </div>
      </div>

      {/* Terminal Quickstart Commands */}
      <div className="bg-[#0B192C] text-white p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
        <div className="flex items-center justify-between text-slate-400 text-[11px] pb-1 border-b border-slate-800">
          <span>🚀 Comandos para Ejecutar en tu Máquina o Contenedor Docker</span>
          <span className="text-blue-400">Puerto Streamlit: 8501</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/60">
            <span className="text-slate-400 block text-[10px] font-bold mb-1">Opción A: Docker Container</span>
            <code>docker build -t syntropic-dashboard . && docker run -p 8501:8501 syntropic-dashboard</code>
          </div>
          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/60">
            <span className="text-slate-400 block text-[10px] font-bold mb-1">Opción B: Python Local</span>
            <code>pip install -r requirements.txt && streamlit run app.py</code>
          </div>
        </div>
      </div>

      {/* Main Grid: File Tree (4 cols) & Code Viewer (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* File Tree Left */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-2">
          <div className="text-xs font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-blue-600 text-[18px]">account_tree</span>
            <span>Árbol de Archivos <code>dashboard/</code></span>
          </div>

          <div className="space-y-1 text-xs">
            {CODE_FILES_MANIFEST.map(file => {
              const isSelected = selectedFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left px-3 py-2 rounded-lg flex flex-col gap-0.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 text-blue-900 border border-blue-200'
                      : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-slate-400">
                      {file.path.endsWith('.py') ? 'code' : (file.path.includes('Dockerfile') ? 'deployed_code' : 'description')}
                    </span>
                    <span className="font-bold text-xs font-mono truncate">{file.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 pl-6 line-clamp-1">{file.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Code Viewer Right */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          <div className="px-5 py-3 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span className="text-slate-300 font-bold ml-2">{selectedFile.path}</span>
            </div>

            <button
              onClick={handleCopy}
              className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                copied ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? '¡Copiado!' : 'Copiar Código'}</span>
            </button>
          </div>

          <div className="p-4 bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto min-h-[460px] leading-relaxed">
            <pre className="whitespace-pre">
              <code>{selectedFile.code}</code>
            </pre>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span>Ruta: <code>{selectedFile.path}</code></span>
            <span>{selectedFile.desc}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
