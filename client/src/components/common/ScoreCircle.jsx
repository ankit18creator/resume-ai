import React, { useEffect, useState } from 'react';

export default function ScoreCircle({
  score = 0,
  max = 100,
  size = 170,
  strokeWidth = 14,
  label = 'Overall Score',
  sublabel = '',
}) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Math.min(max, Math.max(0, score));
    const duration = 900;
    const stepTime = 15;
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedScore(end);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score, max]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / max) * circumference;

  // Determine color scheme
  let strokeColor = 'text-emerald-500';
  let badgeText = 'ATS Ready & Strong';
  let badgeBg = 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';

  if (score < 60) {
    strokeColor = 'text-rose-500';
    badgeText = 'Needs Optimization';
    badgeBg = 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800';
  } else if (score < 80) {
    strokeColor = 'text-amber-500';
    badgeText = 'Good Baseline';
    badgeBg = 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
  }

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-100 dark:text-slate-800 transition-colors"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${strokeColor} transition-all duration-700 ease-out`}
            fill="transparent"
          />
        </svg>

        {/* Center label */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            {animatedScore}
          </span>
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            / {max}
          </span>
        </div>
      </div>

      <div className="mt-3 text-center">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">{label}</h3>
        {sublabel && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sublabel}</p>
        )}
        <div className="mt-2">
          <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full border ${badgeBg}`}>
            {badgeText}
          </span>
        </div>
      </div>
    </div>
  );
}
