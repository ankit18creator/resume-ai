import React, { useState, useMemo } from 'react';
import { Eye, Trash2, Calendar, FileText, Download, ShieldCheck, Target, ArrowRight, Search, ArrowUpDown, Filter } from 'lucide-react';
import { downloadAnalysisMarkdown, downloadAnalysisJson } from '../../services/exportReport';

export default function HistoryTable({ history, onView, onDelete, onClearAll }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');

  const getScoreBadge = (score) => {
    if (score >= 80) return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';
    if (score >= 60) return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
    return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800';
  };

  // Filter & Sort
  const filteredAndSorted = useMemo(() => {
    let result = history.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      const name = (item.candidate?.name || '').toLowerCase();
      const file = (item.fileName || '').toLowerCase();
      const skills = (item.candidate?.skills || []).join(' ').toLowerCase();
      return name.includes(q) || file.includes(q) || skills.includes(q);
    });

    return result.sort((a, b) => {
      if (sortBy === 'date-desc') {
        return new Date(b.savedAt || b.analyzedAt || 0) - new Date(a.savedAt || a.analyzedAt || 0);
      }
      if (sortBy === 'date-asc') {
        return new Date(a.savedAt || a.analyzedAt || 0) - new Date(b.savedAt || b.analyzedAt || 0);
      }
      if (sortBy === 'score-desc') {
        return (b.overallScore || 0) - (a.overallScore || 0);
      }
      if (sortBy === 'score-asc') {
        return (a.overallScore || 0) - (b.overallScore || 0);
      }
      if (sortBy === 'ats-desc') {
        return (b.atsScore || 0) - (a.atsScore || 0);
      }
      return 0;
    });
  }, [history, searchQuery, sortBy]);

  return (
    <div className="space-y-4">
      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by candidate name, filename, or skills..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sort selector & Clear button */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="score-desc">Overall Score (High-Low)</option>
              <option value="score-asc">Overall Score (Low-High)</option>
              <option value="ats-desc">ATS Score (High-Low)</option>
            </select>
          </div>

          {history.length > 1 && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all analysis history? This cannot be undone.')) {
                  onClearAll();
                }
              }}
              className="text-xs text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 font-semibold px-2 py-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Showing count */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-500 dark:text-slate-400">
        <span>
          Showing {filteredAndSorted.length} of {history.length} saved audits
        </span>
      </div>

      {/* Table for Desktop / Cards for Mobile */}
      {filteredAndSorted.length > 0 ? (
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <th className="py-3.5 px-5">Resume & Candidate</th>
                  <th className="py-3.5 px-5">Date</th>
                  <th className="py-3.5 px-5 text-center">Resume Score</th>
                  <th className="py-3.5 px-5 text-center">ATS Score</th>
                  <th className="py-3.5 px-5 text-center">Job Match</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {filteredAndSorted.map((item) => {
                  const dateStr = new Date(item.savedAt || item.analyzedAt || Date.now()).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  });

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition group"
                    >
                      {/* Resume / Candidate */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white truncate max-w-xs">
                              {item.candidate?.name || item.fileName}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-xs">
                              {item.fileName}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-5 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {dateStr}
                      </td>

                      {/* Resume Score */}
                      <td className="py-4 px-5 text-center whitespace-nowrap">
                        <span className={`inline-block px-2.5 py-1 text-xs font-black rounded-lg border ${getScoreBadge(item.overallScore)}`}>
                          {item.overallScore} / 100
                        </span>
                      </td>

                      {/* ATS Score */}
                      <td className="py-4 px-5 text-center whitespace-nowrap">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          {item.atsScore}%
                        </span>
                      </td>

                      {/* Job Match */}
                      <td className="py-4 px-5 text-center whitespace-nowrap">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          {item.jobMatchScore}%
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onView(item)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg text-white bg-brand-600 hover:bg-brand-700 transition"
                            title="View detailed dashboard analysis"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Analysis</span>
                          </button>

                          <button
                            onClick={() => downloadAnalysisMarkdown(item)}
                            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            title="Download Markdown Report"
                          >
                            <Download className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete analysis for ${item.candidate?.name || item.fileName}?`)) {
                                onDelete(item.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            title="Delete this analysis"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3">
          <Search className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            No audits match &quot;{searchQuery}&quot;
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Try searching for a different keyword or clear your search filter.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 hover:bg-brand-100 transition"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}
