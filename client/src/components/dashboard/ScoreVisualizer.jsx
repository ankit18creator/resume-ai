import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import { BarChart3, PieChart } from 'lucide-react';

export default function ScoreVisualizer({ analysis }) {
  const { isDark } = useTheme();
  if (!analysis) return null;

  const sections = analysis.sectionAnalysis || {};

  // Data for Radar Chart (6 core evaluation pillars)
  const radarData = [
    { pillar: 'ATS Format', score: analysis.atsScore || 75, fullMark: 100 },
    { pillar: 'Keywords', score: analysis.keywordMatch || 70, fullMark: 100 },
    { pillar: 'Skills Match', score: analysis.skillsMatch || 80, fullMark: 100 },
    { pillar: 'Experience', score: sections.experience?.score || 75, fullMark: 100 },
    { pillar: 'Summary', score: sections.summary?.score || 70, fullMark: 100 },
    { pillar: 'Education', score: sections.education?.score || 85, fullMark: 100 },
  ];

  // Data for Section Comparison Bar Chart
  const barData = [
    { name: 'Summary', score: sections.summary?.score || 60 },
    { name: 'Skills', score: sections.skills?.score || 75 },
    { name: 'Experience', score: sections.experience?.score || 70 },
    { name: 'Education', score: sections.education?.score || 85 },
    { name: 'Projects', score: sections.projects?.score || 65 },
    { name: 'Certs', score: sections.certifications?.score || 60 },
    { name: 'Awards', score: sections.achievements?.score || 60 },
  ];

  const gridColor = isDark ? '#334155' : '#e2e8f0';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Radar Chart: Core Pillars */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Career Competency Radar
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            6 Dimensions
          </span>
        </div>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid stroke={gridColor} />
              <PolarAngleAxis dataKey="pillar" tick={{ fill: textColor, fontSize: 12, fontWeight: 600 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={gridColor} tick={{ fill: textColor, fontSize: 10 }} />
              <Radar
                name="Candidate Score"
                dataKey="score"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.45}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-2">
          Balanced shape indicates strong multi-dimensional ATS and recruiter appeal.
        </p>
      </div>

      {/* Bar Chart: Section-by-Section Distribution */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Section Quality Distribution
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Benchmark: 80+
          </span>
        </div>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} />
              <YAxis domain={[0, 100]} stroke={textColor} fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#0f172a' : '#ffffff',
                  borderColor: isDark ? '#334155' : '#e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  color: isDark ? '#f8fafc' : '#0f172a',
                }}
                formatter={(value) => [`${value} / 100`, 'Section Score']}
              />
              <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                {barData.map((entry, index) => {
                  let barFill = '#10b981'; // green >= 80
                  if (entry.score < 60) barFill = '#f43f5e'; // red
                  else if (entry.score < 80) barFill = '#f59e0b'; // amber
                  return <Cell key={`cell-${index}`} fill={barFill} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-2">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> 80-100 Strong
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" /> 60-79 Average
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" /> &lt;60 Needs Work
          </span>
        </div>
      </div>
    </div>
  );
}
