import React from 'react';
import { Lightbulb, AlertCircle, ArrowRight, Sparkles, CheckCheck } from 'lucide-react';

export default function ActionableRecommendations({ recommendations = [] }) {
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800">
            High Priority
          </span>
        );
      case 'Medium':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800">
            Medium Priority
          </span>
        );
      case 'Low':
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
            Low Priority
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500 fill-amber-500" />
            Prioritized AI Improvement Recommendations
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Step-by-step actionable revisions designed to elevate your resume’s interview conversion rate
          </p>
        </div>
      </div>

      {recommendations.length === 0 ? (
        <p className="text-sm text-slate-500 italic">No recommendations available.</p>
      ) : (
        <div className="space-y-4">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 transition hover:border-brand-300 dark:hover:border-brand-700"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {rec.title}
                  </h4>
                </div>
                {getPriorityBadge(rec.priority)}
              </div>

              <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                {rec.description}
              </p>

              {rec.example && (
                <div className="mt-3.5 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 block mb-1">
                    Suggested Action / Concrete Example:
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-mono leading-normal">
                    {rec.example}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
