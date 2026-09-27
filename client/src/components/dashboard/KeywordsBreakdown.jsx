import React from 'react';
import { KeyRound, Check, X, Tag } from 'lucide-react';

export default function KeywordsBreakdown({
  matchingKeywords = [],
  missingKeywords = [],
  importantKeywords = [],
}) {
  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            ATS Keyword Coverage Analysis
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            ATS search algorithms rank candidates based on keyword occurrence and context
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Important JD Keywords */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5 mb-3">
            <Tag className="w-3.5 h-3.5 text-brand-500" />
            Target Keywords
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {importantKeywords.length === 0 ? (
              <span className="text-xs text-slate-400 italic">None detected</span>
            ) : (
              importantKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono"
                >
                  {kw}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Matched Keywords */}
        <div className="p-4 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 mb-3">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            Matched in Resume ({matchingKeywords.length})
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {matchingKeywords.length === 0 ? (
              <span className="text-xs text-slate-400 italic">None detected</span>
            ) : (
              matchingKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800"
                >
                  {kw}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Missing Keywords */}
        <div className="p-4 rounded-xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5 mb-3">
            <X className="w-3.5 h-3.5 text-amber-600" />
            Missing From Resume ({missingKeywords.length})
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {missingKeywords.length === 0 ? (
              <span className="text-xs text-emerald-600 font-medium">All target keywords present</span>
            ) : (
              missingKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs font-semibold rounded-md bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800"
                >
                  {kw}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
