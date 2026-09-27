import React, { useState, useRef, useEffect } from 'react';
import { User, Mail, Phone, Globe, Link2, Calendar, FileText, Download, Printer, ShieldCheck, Sparkles, Copy, ChevronDown, Check } from 'lucide-react';
import { printAnalysisReport, downloadAnalysisMarkdown, downloadAnalysisJson, copyAnalysisSummaryToClipboard } from '../../services/exportReport';
import { useToast } from '../../context/ToastContext';

export default function OverviewCard({ analysis, onNewAnalysis }) {
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef(null);
  const { toastSuccess } = useToast();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setExportMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!analysis) return null;

  const candidate = analysis.candidate || {};
  const formattedDate = new Date(analysis.analyzedAt || Date.now()).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleCopy = async () => {
    const ok = await copyAnalysisSummaryToClipboard(analysis);
    if (ok) {
      setCopied(true);
      toastSuccess('Audit summary copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6 sm:p-7 transition">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Candidate & File Info */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {candidate.name || 'Candidate Resume'}
            </h1>

            {analysis.isDemoMode ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Demo Mode (Intelligent NLP)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                AI Verified (OpenAI)
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {analysis.fileName || 'Resume.pdf'}
              </span>
            </span>

            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{formattedDate}</span>
            </span>

            {candidate.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <a href={`mailto:${candidate.email}`} className="hover:text-brand-600 transition">
                  {candidate.email}
                </a>
              </span>
            )}

            {candidate.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{candidate.phone}</span>
              </span>
            )}

            {candidate.linkedin && (
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>{candidate.linkedin}</span>
              </span>
            )}

            {candidate.github && (
              <span className="flex items-center gap-1.5">
                <Link2 className="w-4 h-4 text-slate-700 dark:text-slate-300 shrink-0" />
                <span>{candidate.github}</span>
              </span>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 no-print relative" ref={menuRef}>
          {/* Copy Summary */}
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            title="Copy audit summary to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy Summary'}</span>
          </button>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              title="Export Report Options"
            >
              <Download className="w-4 h-4" />
              <span>Export Report</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${exportMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {exportMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95">
                <button
                  onClick={() => {
                    downloadAnalysisMarkdown(analysis);
                    setExportMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 transition"
                >
                  <FileText className="w-3.5 h-3.5 text-brand-500" />
                  <span>Download Markdown (.md)</span>
                </button>

                <button
                  onClick={() => {
                    downloadAnalysisJson(analysis);
                    setExportMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 transition"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Download JSON (.json)</span>
                </button>

                <button
                  onClick={() => {
                    printAnalysisReport();
                    setExportMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 transition"
                >
                  <Printer className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Print / Save PDF</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={printAnalysisReport}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            title="Print or save as PDF"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print</span>
          </button>

          <button
            onClick={onNewAnalysis}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition hover:scale-[1.02] active:scale-[0.98]"
          >
            <FileText className="w-4 h-4" />
            <span>Analyze Another</span>
          </button>
        </div>
      </div>
    </div>
  );
}
