import { Sparkles, Shield, Lock, Heart, ExternalLink, Globe } from 'lucide-react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white">
                Resume<span className="text-brand-600 dark:text-brand-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Production-grade AI resume auditor & ATS compatibility analyzer. Designed for engineers, tech talent, and job seekers aiming for elite career opportunities.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                Zero Data Retention
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setActivePage('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('analyze');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition"
                >
                  Analyze Resume
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('history');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition"
                >
                  Analysis History
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition"
                >
                  About & Methodology
                </button>
              </li>
            </ul>
          </div>

          {/* Features Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-4">
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>ATS Parser Compatibility</li>
              <li>Job Description Keyword Match</li>
              <li>Action Verb & Metric Auditing</li>
              <li>Dynamic Section Quality Scoring</li>
              <li>Prioritized Bullet Point Rewrites</li>
              <li>Executive PDF Report Export</li>
            </ul>
          </div>

          {/* Security & Privacy */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-4">
              Privacy Promise
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
              Uploaded resumes are extracted in volatile memory during your session. We do not maintain any persistent server database of your documents. History is saved strictly in your browser’s local storage.
            </p>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-500" />
              <span>Client-Side Local Storage Encrypted</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} ResumeAI. Built for developers and modern professionals.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> & React
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
