import React from 'react';
import ScoreCircle from '../common/ScoreCircle';
import { ShieldCheck, Target, Award, Key, ArrowUpRight } from 'lucide-react';

export default function MetricsGrid({ analysis }) {
  if (!analysis) return null;

  const { overallScore, atsScore, jobMatchScore, skillsMatch, keywordMatch } = analysis;

  const cards = [
    {
      title: 'ATS Compatibility',
      score: atsScore,
      icon: ShieldCheck,
      color: 'emerald',
      description: 'Parsability, structure & standard header adherence',
    },
    {
      title: 'Job Match',
      score: jobMatchScore,
      icon: Target,
      color: 'indigo',
      description: 'Semantic & qualification alignment with target role',
    },
    {
      title: 'Skills Match',
      score: skillsMatch,
      icon: Award,
      color: 'blue',
      description: 'Presence of required technical competencies',
    },
    {
      title: 'Keyword Match',
      score: keywordMatch,
      icon: Key,
      color: 'violet',
      description: 'Frequency & density of job description keywords',
    },
  ];

  const getScoreColor = (val) => {
    if (val >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (val >= 60) return 'text-amber-600 dark:text-amber-400';
    return 'text-rose-600 dark:text-rose-400';
  };

  const getProgressColor = (val) => {
    if (val >= 80) return 'bg-emerald-500';
    if (val >= 60) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Big Hero Circular Score Card */}
      <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Composite Resume Score
        </span>
        <ScoreCircle
          score={overallScore}
          max={100}
          label="Overall Career Rating"
          sublabel="Weighted composite score"
        />
      </div>

      {/* 4 Key Pillar Stat Cards */}
      <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-5 flex flex-col justify-between transition hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {card.title}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-black tracking-tight ${getScoreColor(card.score)}`}>
                    {card.score}%
                  </span>
                  <span className="text-xs text-slate-400 font-medium">/ 100</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${getProgressColor(card.score)}`}
                    style={{ width: `${Math.min(100, Math.max(5, card.score))}%` }}
                  />
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 leading-normal">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
