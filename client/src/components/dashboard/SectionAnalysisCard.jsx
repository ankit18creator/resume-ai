import React from 'react';
import {
  FileText,
  Code,
  Briefcase,
  GraduationCap,
  FolderGit2,
  CheckCircle,
  Trophy,
  Check,
  ArrowUpRight,
  HelpCircle,
} from 'lucide-react';

const SECTION_METADATA = {
  summary: {
    title: 'Professional Summary',
    icon: FileText,
    description: 'Header elevator pitch summarizing career seniority & specialty',
  },
  skills: {
    title: 'Technical Skills',
    icon: Code,
    description: 'Programming languages, frameworks, cloud tooling & databases',
  },
  experience: {
    title: 'Work Experience',
    icon: Briefcase,
    description: 'Chronological employment, quantifiable results & scale',
  },
  education: {
    title: 'Education',
    icon: GraduationCap,
    description: 'Academic degrees, university, graduation dates & honors',
  },
  projects: {
    title: 'Projects',
    icon: FolderGit2,
    description: 'Hands-on applications, repositories, production links & stack',
  },
  certifications: {
    title: 'Certifications',
    icon: CheckCircle,
    description: 'Industry-standard cloud, security & domain credentials',
  },
  achievements: {
    title: 'Achievements',
    icon: Trophy,
    description: 'Key awards, honors, hackathons, publications & impact',
  },
};

export default function SectionAnalysisCard({ sectionKey, data }) {
  if (!data) return null;
  const meta = SECTION_METADATA[sectionKey] || {
    title: sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1),
    icon: FileText,
    description: 'Section evaluation',
  };

  const Icon = meta.icon;
  const score = data.score || 0;

  const getScoreColor = (val) => {
    if (val >= 80) return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800';
    if (val >= 60) return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800';
    return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800';
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm flex flex-col justify-between transition hover:border-slate-300 dark:hover:border-slate-700">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {meta.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                {meta.description}
              </p>
            </div>
          </div>

          <div className={`px-2.5 py-1 rounded-xl text-xs font-black border ${getScoreColor(score)}`}>
            {score} / 100
          </div>
        </div>

        {/* What is Good */}
        <div className="space-y-2 mb-4">
          <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> What Is Working Well
          </span>
          {(!data.good || data.good.length === 0) ? (
            <p className="text-xs text-slate-400 italic">No standout elements detected.</p>
          ) : (
            <ul className="space-y-1.5">
              {data.good.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <span className="text-emerald-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* What can be improved */}
        <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[11px] uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> What Can Be Improved
          </span>
          {(!data.improvements || data.improvements.length === 0) ? (
            <p className="text-xs text-slate-400 italic">No critical recommendations.</p>
          ) : (
            <ul className="space-y-1.5">
              {data.improvements.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <span className="text-amber-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
