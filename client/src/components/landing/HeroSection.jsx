import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap, FileCheck2, Cpu, TrendingUp } from 'lucide-react';

export default function HeroSection({ onGetStarted, onLoadSample }) {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-brand-500/15 via-indigo-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>Next-Generation Career Intelligence</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Analyze Your Resume. <br />
              <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-500 bg-clip-text text-transparent">
                Improve Your Career.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Uncover critical ATS blind spots, benchmark against real job descriptions, and unlock quantifiable AI bullet improvements to land more high-paying interviews.
            </p>

            {/* Quick Benefits Bullet Bar */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Real PDF/DOCX Parsing
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> ATS Compatibility Audit
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Exact Keyword Match
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-600/30 hover:shadow-brand-600/40 transition active:scale-95 text-base"
              >
                <span>Analyze My Resume</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onLoadSample}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition active:scale-95 text-base"
              >
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Try Instant Demo</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex -space-x-2">
                <span className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] text-white font-bold">JD</span>
                <span className="w-7 h-7 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] text-white font-bold">AC</span>
                <span className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] text-white font-bold">MP</span>
              </div>
              <span>Trusted by 10,000+ candidates for FAANG & startup applications</span>
            </div>
          </div>

          {/* Right Column: Interactive Scanning Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-2xl p-6 backdrop-blur-xl transition-all hover:border-brand-300 dark:hover:border-brand-700">
              {/* Header inside mockup */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-950/70 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Alex_Chen_Staff_Engineer.pdf</h4>
                    <p className="text-xs text-slate-400">Parsed: 524 words • 100% readable</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300">
                  92% Match
                </span>
              </div>

              {/* Animated Scanner Bar */}
              <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-4 space-y-3">
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent shadow-[0_0_15px_rgba(99,102,241,0.8)] animate-scan pointer-events-none" />

                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-brand-500" /> ATS Readability Engine
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Passed (95/100)</span>
                </div>

                {/* Dummy resume lines */}
                <div className="space-y-1.5 pt-1 opacity-75">
                  <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
                  <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                  <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded w-4/6" />
                </div>

                {/* Extracted badges inside mockup */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 text-[11px] rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-medium">
                    ✓ React.js
                  </span>
                  <span className="px-2 py-0.5 text-[11px] rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-medium">
                    ✓ TypeScript
                  </span>
                  <span className="px-2 py-0.5 text-[11px] rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-medium">
                    ✓ Node.js
                  </span>
                  <span className="px-2 py-0.5 text-[11px] rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-medium">
                    + Missing: Kubernetes
                  </span>
                </div>
              </div>

              {/* Quick floating stat pills */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 text-center">
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Action Verbs</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white">14 Strong</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 text-center">
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Measurable Scale</p>
                  <p className="text-lg font-black text-brand-600 dark:text-brand-400">6 Metrics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
