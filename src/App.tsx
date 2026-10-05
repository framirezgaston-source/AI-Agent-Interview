import { useState } from 'react';
import { ActiveTab, Candidate, TokenLink, UserSession, ViewMode } from './types';
import {
  INITIAL_USER,
  INITIAL_CANDIDATES,
  INITIAL_LINKS,
  INITIAL_KNOWLEDGE_FILES,
  INITIAL_RUBRICS,
  INITIAL_INTERVIEW
} from './mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DashboardView } from './components/DashboardView';
import { PosicionesView } from './components/PosicionesView';
import { EntrevistaView } from './components/EntrevistaView';
import { PortalCandidatoView } from './components/PortalCandidatoView';
import { LinksView } from './components/LinksView';
import { BuscarCandidatosView } from './components/BuscarCandidatosView';
import { LoginView } from './components/LoginView';
import { CodeExplorerView } from './components/CodeExplorerView';
import { StreamlitSimulatorView } from './components/StreamlitSimulatorView';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [user, setUser] = useState<UserSession>(INITIAL_USER);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [viewMode, setViewMode] = useState<ViewMode>('syntropic');

  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(INITIAL_CANDIDATES[2]); // Elena Rostova
  const [links, setLinks] = useState<TokenLink[]>(INITIAL_LINKS);
  const [knowledgeFiles] = useState(INITIAL_KNOWLEDGE_FILES);
  const [rubrics] = useState(INITIAL_RUBRICS);
  const [interview] = useState(INITIAL_INTERVIEW);

  const handleLogin = (sessionData: Partial<UserSession>) => {
    setUser(prev => ({
      ...prev,
      ...sessionData,
      tenant: sessionData.tenant || prev.tenant
    }));
    setIsAuthenticated(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleApproveCandidate = (candidateId: string) => {
    setCandidates(prev =>
      prev.map(c =>
        c.id === candidateId
          ? { ...c, estado: 'Aprobado Fase Final' }
          : c
      )
    );
    if (selectedCandidate.id === candidateId) {
      setSelectedCandidate(prev => ({ ...prev, estado: 'Aprobado Fase Final' }));
    }
  };

  const handleGenerateLink = (candidateName: string, email: string, posCode: string) => {
    const token = `tok_${Math.random().toString(36).substring(2, 9)}`;
    const newLink: TokenLink = {
      id: `tok-${Date.now()}`,
      candidato: candidateName,
      email: email,
      posicion_code: posCode,
      token: token,
      url: `https://syntropic.ai/interview/${token}?pos=${posCode}`,
      expira_en: '48h 00m',
      estado: 'No utilizado',
      creado: 'Recién generado'
    };
    setLinks(prev => [newLink, ...prev]);
  };

  // If unauthenticated, show corporate login view
  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B192C] flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        setUser={setUser}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {viewMode === 'streamlit' ? (
          <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <StreamlitSimulatorView
              candidates={candidates}
              links={links}
              interview={interview}
              user={user}
            />
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <DashboardView
                candidates={candidates}
                onSelectCandidate={setSelectedCandidate}
                selectedCandidate={selectedCandidate}
                onApproveCandidate={handleApproveCandidate}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'posiciones' && (
              <PosicionesView
                setActiveTab={setActiveTab}
                knowledgeFiles={knowledgeFiles}
                rubrics={rubrics}
                links={links}
              />
            )}

            {activeTab === 'candidatos' && (
              <DashboardView
                candidates={candidates}
                onSelectCandidate={setSelectedCandidate}
                selectedCandidate={selectedCandidate}
                onApproveCandidate={handleApproveCandidate}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'entrevistas' && (
              <EntrevistaView
                interview={interview}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'links' && (
              <LinksView
                links={links}
                onGenerateLink={handleGenerateLink}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'buscar' && (
              <BuscarCandidatosView
                candidates={candidates}
                onSelectCandidate={cand => {
                  setSelectedCandidate(cand);
                  setActiveTab('dashboard');
                }}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'portal_candidato' && (
              <PortalCandidatoView setActiveTab={setActiveTab} />
            )}

            {activeTab === 'codigo_streamlit' && (
              <CodeExplorerView />
            )}
          </>
        )}
      </main>

      {/* Corporate Footer */}
      <Footer />
    </div>
  );
}
