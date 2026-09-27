import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { HistoryProvider, useHistory } from './context/HistoryContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AnalyzePage from './pages/AnalyzePage';
import ResultsPage from './pages/ResultsPage';
import HistoryPage from './pages/HistoryPage';
import AboutPage from './pages/AboutPage';

import { checkServerHealth } from './services/api';

function MainApp() {
  const [activePage, setActivePage] = useState('home');
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [preloadedData, setPreloadedData] = useState(null);
  const [serverStatus, setServerStatus] = useState({
    status: 'checking',
    openAiConfigured: false,
    mode: 'Demo Mode',
  });

  const { activeAnalysis, setActiveAnalysis } = useHistory();

  // Check backend server status on mount
  useEffect(() => {
    async function probeServer() {
      const health = await checkServerHealth();
      setServerStatus(health);
    }
    probeServer();
  }, []);

  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalysisComplete = (analysisData) => {
    setCurrentAnalysis(analysisData);
    setActiveAnalysis(analysisData);
    setActivePage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadSampleAndAnalyze = (samplePreset) => {
    setPreloadedData(samplePreset);
    setActivePage('analyze');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHistoryItem = (historyItem) => {
    setCurrentAnalysis(historyItem);
    setActiveAnalysis(historyItem);
    setActivePage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDemoMode = !serverStatus.openAiConfigured;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar
        activePage={activePage}
        setActivePage={handleNavigate}
        isDemoMode={isDemoMode}
      />

      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            onNavigateAnalyze={() => handleNavigate('analyze')}
            onLoadSampleAndAnalyze={handleLoadSampleAndAnalyze}
          />
        )}

        {activePage === 'dashboard' && (
          <DashboardPage
            onNavigateAnalyze={() => handleNavigate('analyze')}
            onSelectAnalysis={handleSelectHistoryItem}
            onLoadSampleAndAnalyze={handleLoadSampleAndAnalyze}
          />
        )}

        {activePage === 'analyze' && (
          <AnalyzePage
            preloadedData={preloadedData}
            onAnalysisComplete={handleAnalysisComplete}
          />
        )}

        {activePage === 'results' && (
          <ResultsPage
            analysis={currentAnalysis || activeAnalysis}
            onNewAnalysis={() => {
              setPreloadedData(null);
              handleNavigate('analyze');
            }}
            onBackToAnalyze={() => handleNavigate('analyze')}
          />
        )}

        {activePage === 'history' && (
          <HistoryPage
            onSelectAnalysis={handleSelectHistoryItem}
            onNavigateAnalyze={() => {
              setPreloadedData(null);
              handleNavigate('analyze');
            }}
          />
        )}

        {activePage === 'about' && (
          <AboutPage onNavigateAnalyze={() => handleNavigate('analyze')} />
        )}
      </main>

      <Footer setActivePage={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <HistoryProvider>
          <MainApp />
        </HistoryProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
