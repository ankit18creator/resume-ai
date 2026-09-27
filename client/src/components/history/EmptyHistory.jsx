import React from 'react';
import { History, ArrowRight, Sparkles } from 'lucide-react';

export default function EmptyHistory({ onNavigateAnalyze }) {
  return (
    <div className="text-center py-16 px-4 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 max-w-2xl mx-auto my-8">
      <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto mb-5 shadow-sm">
        <History className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
        No Previous Analyses Found
      </h3>

      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-2 leading-relaxed">
        Your analyzed resumes are preserved right here in your browser’s local storage. Start by analyzing a resume against a target job description.
      </p>

      <div className="mt-6">
        <button
          onClick={onNavigateAnalyze}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/25 transition active:scale-95 text-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span>Analyze Your First Resume</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
