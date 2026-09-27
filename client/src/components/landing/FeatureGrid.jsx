import React from 'react';
import { Cpu, CheckCheck, Target, SearchX, Lightbulb, BarChart3 } from 'lucide-react';

const FEATURES = [
  {
    icon: Cpu,
    title: 'AI Resume Analysis',
    description: 'Deep semantic evaluation of your experience, project impact, and professional trajectory powered by state-of-the-art LLM architecture.',
    badge: 'Core Engine',
    color: 'indigo',
  },
  {
    icon: CheckCheck,
    title: 'ATS Compatibility',
    description: 'Detects table parsing traps, custom font issues, non-standard section headers, and unreadable characters that trigger automatic ATS rejections.',
    badge: 'Compliance',
    color: 'emerald',
  },
  {
    icon: Target,
    title: 'Job Match Score',
    description: 'Calculates accurate alignment between your resume and specific job postings, breaking down exact requirements vs your demonstrated experience.',
    badge: 'Alignment',
    color: 'blue',
  },
  {
    icon: SearchX,
    title: 'Skill Gap Detection',
    description: 'Identifies high-priority technical skills, frameworks, and domain credentials required by the target role that are missing from your resume.',
    badge: 'Keywords',
    color: 'rose',
  },
  {
    icon: Lightbulb,
    title: 'Actionable Suggestions',
    description: 'Receive prioritized bullet-by-bullet improvement suggestions based on the proven Google XYZ formula: Accomplished [X] as measured by [Y] by doing [Z].',
    badge: 'Actionable',
    color: 'amber',
  },
  {
    icon: BarChart3,
    title: 'Resume Insights',
    description: 'Visual breakdowns and radar charts displaying section completeness, quantifiable metrics density, active verb frequency, and career seniority indicators.',
    badge: 'Analytics',
    color: 'violet',
  },
];

export default function FeatureGrid() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50/50 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs sm:text-sm uppercase tracking-widest font-bold text-brand-600 dark:text-brand-400 mb-2">
            Engineered for Job Hunters & Engineers
          </h2>
          <p className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Everything You Need to Beat the Filter
          </p>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Over 75% of resumes are discarded by Applicant Tracking Systems before a human recruiter reads them. ResumeAI equips you to pass with flying colors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-brand-500/40 dark:hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/70 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
