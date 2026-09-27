import React from 'react';
import {
  FileText,
  TrendingUp,
  Award,
  ShieldCheck,
  Target,
  Sparkles,
  ArrowRight,
  UploadCloud,
  CheckCircle2,
  Clock,
  Eye,
  Trash2,
  Download,
  AlertCircle,
  BarChart2,
  Briefcase
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { useHistory } from '../context/HistoryContext';
import { useTheme } from '../context/ThemeContext';
import { downloadAnalysisMarkdown } from '../services/exportReport';
import { SAMPLE_DATA_PRESETS } from '../utils/sampleData';

export default function DashboardPage({
  onNavigateAnalyze,
  onSelectAnalysis,
  onLoadSampleAndAnalyze,
}) {
  const { history, deleteAnalysis } = useHistory();
  const { isDark } = useTheme();

  // Compute summary stats
  const totalAudits = history.length;
  const avgOverallScore = totalAudits > 0
    ? Math.round(history.reduce((acc, curr) => acc + (curr.overallScore || 0), 0) / totalAudits)
    : 0;
  const avgAtsScore = totalAudits > 0
    ? Math.round(history.reduce((acc, curr) => acc + (curr.atsScore || 0), 0) / totalAudits)
    : 0;
  const highestScore = totalAudits > 0
    ? Math.max(...history.map((h) => h.overallScore || 0))
    : 0;

  // Prepare chart data (reverse chronological to chronological for progression)
  const chartData = [...history].reverse().map((item, index) => ({
    name: `Scan #${index + 1}`,
    candidate: item.candidate?.name || item.fileName,
    overall: item.overallScore || 0,
    ats: item.atsScore || 0,
    jobMatch: item.jobMatchScore || 0,
  }));

  const getScoreColor = (val) => {
    if (val >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (val >= 60) return 'text-amber-600 dark:text-amber-400';
    return 'text-rose-600 dark:text-rose-400';
  };

  const getBadgeClass = (score) => {
    if (score >= 80) return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';
    if (score >= 60) return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
    return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800';
  };

  const handleQuickSample = () => {
    const sample = SAMPLE_DATA_PRESETS[0];
    onLoadSampleAndAnalyze(sample);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-white via-brand-50/20 to-indigo-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-brand-950/20 p-6 sm:p-8 shadow-sm transition">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-100/70 dark:bg-brand-950/70 text-brand-700 dark:text-brand-300 border border-brand-200/80 dark:border-brand-800">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>Resume Intelligence Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Candidate Performance & Audit Overview
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              Track ATS score trends, identify high-priority skill gaps, and benchmark your resume against competitive industry expectations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onNavigateAnalyze}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-600/20 transition hover:scale-[1.02] active:scale-[0.98]"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Scan New Resume</span>
            </button>

            {totalAudits === 0 && (
              <button
                onClick={handleQuickSample}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 hover:bg-brand-100 dark:hover:bg-brand-900 transition"
              >
                <Sparkles className="w-4 h-4" />
                <span>Load Sample Profile</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Analyses */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Audits</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              {totalAudits}
            </span>
            <span className="text-xs text-slate-400">resumes stored</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Stored locally in browser session
          </p>
        </div>

        {/* Avg Overall Score */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Resume Score</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-black ${totalAudits > 0 ? getScoreColor(avgOverallScore) : 'text-slate-400'}`}>
              {totalAudits > 0 ? `${avgOverallScore}/100` : '--'}
            </span>
            <span className="text-xs text-slate-400">composite rating</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {avgOverallScore >= 80 ? 'Competitive tier (Top 15%)' : avgOverallScore >= 60 ? 'Solid foundation, room to optimize' : 'Needs enhancement'}
          </p>
        </div>

        {/* Avg ATS Score */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg ATS Score</span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-black ${totalAudits > 0 ? getScoreColor(avgAtsScore) : 'text-slate-400'}`}>
              {totalAudits > 0 ? `${avgAtsScore}%` : '--'}
            </span>
            <span className="text-xs text-slate-400">parsability rate</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Based on standard headings & layout
          </p>
        </div>

        {/* Highest Score */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Top Score Record</span>
            <div className="w-8 h-8 rounded-lg bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-black ${totalAudits > 0 ? getScoreColor(highestScore) : 'text-slate-400'}`}>
              {totalAudits > 0 ? `${highestScore}/100` : '--'}
            </span>
            <span className="text-xs text-slate-400">best resume</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Target threshold: 85+ for tier-1 roles
          </p>
        </div>
      </div>

      {/* Main Content Area: Chart + ATS Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Progression Chart (or Getting Started Guide if empty) */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Historical Score Progression
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              {totalAudits > 1 ? `${totalAudits} audits plotted` : 'Real-time trendline'}
            </span>
          </div>

          {totalAudits > 1 ? (
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="atsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#f1f5f9'} />
                  <XAxis dataKey="name" stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={11} />
                  <YAxis domain={[0, 100]} stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#0f172a' : '#ffffff',
                      borderColor: isDark ? '#334155' : '#e2e8f0',
                      borderRadius: '0.75rem',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="overall"
                    name="Composite Score"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#scoreGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="ats"
                    name="ATS Score"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#atsGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="py-10 px-6 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-brand-500 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {totalAudits === 1 ? '1 Audit Recorded' : 'No Resumes Analyzed Yet'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  {totalAudits === 1
                    ? 'Upload another iteration or target role to visualize your score progression and ATS trajectory.'
                    : 'Upload your PDF or DOCX resume to generate detailed scores, ATS audit metrics, and progression charts.'}
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={onNavigateAnalyze}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 transition"
                >
                  Analyze Resume
                </button>
                <button
                  onClick={handleQuickSample}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 transition"
                >
                  Try Sample Audit
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-500 inline-block" />
              Composite Score (Weighted)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              ATS Parsability
            </span>
          </div>
        </div>

        {/* Right: ATS Readiness Checklist */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              ATS Best Practices
            </h2>
          </div>

          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Single-Column Hierarchy</p>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">Multi-column layouts confuse older ATS parsers. Stick to standard vertical flow.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Quantifiable Metrics</p>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">Include %, $, and user scale (e.g. &apos;scaled to 250k users, cut latency 40%&apos;).</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Exact Keyword Alignment</p>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">Mirror the exact phrasing used in the job description to pass lexical scanners.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Standard Headings</p>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">Use conventional names: Experience, Education, Skills, Projects.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Analyses Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              Recent Resume Analyses
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your latest candidate evaluations stored locally
            </p>
          </div>

          {history.length > 0 && (
            <button
              onClick={() => onSelectAnalysis(history[0])}
              className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1"
            >
              <span>View Latest Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {history.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {history.slice(0, 6).map((item) => {
              const dateStr = new Date(item.savedAt || item.analyzedAt || Date.now()).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition space-y-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate max-w-[180px]">
                            {item.candidate?.name || 'Candidate'}
                          </h3>
                          <p className="text-xs text-slate-400 truncate max-w-[180px]">
                            {item.fileName}
                          </p>
                        </div>
                      </div>

                      <span className={`px-2 py-0.5 text-xs font-black rounded-md border ${getBadgeClass(item.overallScore)}`}>
                        {item.overallScore}/100
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
                      <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                        <span className="block text-[10px] uppercase font-bold text-slate-400">ATS</span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.atsScore}%</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                        <span className="block text-[10px] uppercase font-bold text-slate-400">Match</span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.jobMatchScore}%</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                        <span className="block text-[10px] uppercase font-bold text-slate-400">Skills</span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.skillsMatch}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <span className="text-slate-400">{dateStr}</span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => downloadAnalysisMarkdown(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        title="Export Markdown"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onSelectAnalysis(item)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold text-white bg-brand-600 hover:bg-brand-700 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Audit</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-3">
            <FileText className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              No analyses logged yet
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Scan your first resume to populate this dashboard with audit cards, ATS ratings, and recommendations.
            </p>
            <button
              onClick={onNavigateAnalyze}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 transition"
            >
              Analyze Resume Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
