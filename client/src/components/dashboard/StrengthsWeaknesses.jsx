import React from 'react';
import { CheckCircle2, AlertTriangle, ThumbsUp, AlertCircle } from 'lucide-react';

export default function StrengthsWeaknesses({ strengths = [], weaknesses = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Strengths Card */}
      <div className="rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20 p-6 shadow-sm">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ThumbsUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-100">
              Key Strengths Detected
            </h3>
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              {strengths.length} positive signals giving you a competitive edge
            </p>
          </div>
        </div>

        {strengths.length === 0 ? (
          <p className="text-xs text-slate-500 italic">No explicit strengths isolated.</p>
        ) : (
          <ul className="space-y-3">
            {strengths.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Areas to Improve Card */}
      <div className="rounded-2xl border border-amber-200/80 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20 p-6 shadow-sm">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-amber-950 dark:text-amber-100">
              Critical Areas to Improve
            </h3>
            <p className="text-xs text-amber-700 dark:text-amber-400">
              {weaknesses.length} potential friction points affecting your ranking
            </p>
          </div>
        </div>

        {weaknesses.length === 0 ? (
          <p className="text-xs text-slate-500 italic">No major vulnerabilities detected!</p>
        ) : (
          <ul className="space-y-3">
            {weaknesses.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-800 dark:text-slate-200">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
