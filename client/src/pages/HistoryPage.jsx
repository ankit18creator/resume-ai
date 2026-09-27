import React from 'react';
import { useHistory } from '../context/HistoryContext';
import { useToast } from '../context/ToastContext';
import HistoryTable from '../components/history/HistoryTable';
import EmptyHistory from '../components/history/EmptyHistory';
import { History as HistoryIcon, ShieldCheck } from 'lucide-react';

export default function HistoryPage({ onSelectAnalysis, onNavigateAnalyze }) {
  const { history, deleteAnalysis, clearHistory } = useHistory();
  const { toastSuccess } = useToast();

  const handleDelete = (id) => {
    deleteAnalysis(id);
    toastSuccess('Analysis record removed from local storage');
  };

  const handleClearAll = () => {
    clearHistory();
    toastSuccess('All analysis history has been cleared');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <HistoryIcon className="w-7 h-7 text-brand-600 dark:text-brand-400" />
            Saved Analysis History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review past scores, monitor career progress, and compare resumes locally stored in your browser.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700/80 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Private • Stored in localStorage</span>
        </div>
      </div>

      {history.length > 0 ? (
        <HistoryTable
          history={history}
          onView={onSelectAnalysis}
          onDelete={handleDelete}
          onClearAll={handleClearAll}
        />
      ) : (
        <EmptyHistory onNavigateAnalyze={onNavigateAnalyze} />
      )}
    </div>
  );
}
