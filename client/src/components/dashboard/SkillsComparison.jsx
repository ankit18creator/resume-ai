import React from 'react';
import { Check, X, ShieldAlert, Sparkles } from 'lucide-react';

export default function SkillsComparison({ matchingSkills = [], missingSkills = [] }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            Skills Alignment Breakdown
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Cross-referencing technical competencies against employer requirements
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matching Skills */}
        <div className="p-5 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Matching Skills ({matchingSkills.length})
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full">
              Verified in Resume
            </span>
          </div>

          {matchingSkills.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-2">No matching skills identified.</p>
          ) : (
            <div className="flex flex-wrap gap-2 pt-1">
              {matchingSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800/80 shadow-xs"
                >
                  <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Missing Skills */}
        <div className="p-5 rounded-xl border border-rose-200/60 dark:border-rose-900/40 bg-rose-50/20 dark:bg-rose-950/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
              <X className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              Missing High-Demand Skills ({missingSkills.length})
            </span>
            <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/80 px-2 py-0.5 rounded-full">
              Recommended to Add
            </span>
          </div>

          {missingSkills.length === 0 ? (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold py-2">
              🎉 Zero skill gaps found! Your resume covers all requested role requirements.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2 pt-1">
              {missingSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-100/80 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800/80 shadow-xs"
                >
                  <span className="text-rose-500 font-bold">+</span>
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
