import React from 'react';
import { UploadCloud, FileText, Sparkles, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: UploadCloud,
    title: 'Upload Resume',
    description: 'Drag and drop your PDF or DOCX resume. Our high-precision extractor strips out formatting bottlenecks and extracts raw readable structure.',
  },
  {
    step: '02',
    icon: FileText,
    title: 'Add Job Description',
    description: 'Paste the target job description or role requirements. You can also analyze standalone to evaluate general resume and ATS health.',
  },
  {
    step: '03',
    icon: Sparkles,
    title: 'Get AI Analysis',
    description: 'Receive instant 0-100 scores, ATS pass/fail indicators, missing keyword lists, and prioritized before-and-after bullet point rewrites.',
  },
];

export default function HowItWorks({ onStart }) {
  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm uppercase tracking-widest font-bold text-brand-600 dark:text-brand-400">
            Frictionless Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mt-1">
            How ResumeAI Works
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Three simple steps to transform your resume into an interview magnet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 transition hover:shadow-lg"
              >
                {/* Step badge */}
                <span className="absolute top-5 right-5 text-2xl font-black text-slate-200 dark:text-slate-800 select-none">
                  {item.step}
                </span>

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-brand-500/20 mb-6">
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-500/25 transition active:scale-95"
          >
            <span>Start Your Free Scan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
