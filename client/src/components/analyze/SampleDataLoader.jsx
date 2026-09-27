import React from 'react';
import { Zap, Sparkles } from 'lucide-react';
import { SAMPLE_DATA_PRESETS } from '../../utils/sampleData';

export default function SampleDataLoader({ onSelectPreset }) {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-brand-50/40 to-white dark:from-slate-900 dark:via-brand-950/20 dark:to-slate-900 border border-brand-200/80 dark:border-brand-900/60 shadow-sm">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-brand-900 dark:text-brand-300">
            Quick Test Presets (Instant Demo)
          </span>
        </div>
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          No file needed • Click any to populate
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {SAMPLE_DATA_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => onSelectPreset(preset)}
            className="flex flex-col items-start p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-brand-500 hover:shadow-md transition text-left group"
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">
                {preset.title}
              </span>
              <Sparkles className="w-3 h-3 text-brand-400 opacity-0 group-hover:opacity-100 transition" />
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
              {preset.category}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
