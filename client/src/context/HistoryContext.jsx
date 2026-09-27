import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const HistoryContext = createContext();
const STORAGE_KEY = 'resumeai_history_v1';

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to load history from localStorage:', e);
      return [];
    }
  });

  const [activeAnalysis, setActiveAnalysis] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to persist history to localStorage:', e);
    }
  }, [history]);

  const saveAnalysis = useCallback((data) => {
    const id = data.id || `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const record = {
      ...data,
      id,
      savedAt: data.savedAt || new Date().toISOString(),
    };

    setHistory((prev) => {
      // Remove any existing entry with identical ID if updating
      const filtered = prev.filter((item) => item.id !== id);
      return [record, ...filtered];
    });

    setActiveAnalysis(record);
    return record;
  }, []);

  const deleteAnalysis = useCallback((id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    setActiveAnalysis((current) => (current?.id === id ? null : current));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    setActiveAnalysis(null);
  }, []);

  const getAnalysis = useCallback(
    (id) => {
      return history.find((item) => item.id === id) || null;
    },
    [history]
  );

  return (
    <HistoryContext.Provider
      value={{
        history,
        activeAnalysis,
        setActiveAnalysis,
        saveAnalysis,
        deleteAnalysis,
        clearHistory,
        getAnalysis,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
}
