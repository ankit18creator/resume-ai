import React from 'react';
import {
  Sparkles,
  Shield,
  Cpu,
  Layers,
  Code2,
  Database,
  Lock,
  Target,
  ArrowRight,
} from 'lucide-react';

export default function AboutPage({ onNavigateAnalyze }) {
  const techStack = [
    { name: 'React 19 & Vite', category: 'Frontend Framework', desc: 'Blazing fast single-page client with instant HMR' },
    { name: 'Tailwind CSS', category: 'Styling', desc: 'Modern responsive utility styling with full dark mode persistence' },
    { name: 'Node.js & Express', category: 'Backend Engine', desc: 'Secure, high-concurrency API server with error boundary' },
    { name: 'PDF-Parse & Mammoth', category: 'Text Extraction', desc: 'Native binary parsing of PDF and DOCX document trees' },
    { name: 'OpenAI API & GPT-4o-mini', category: 'AI Intelligence', desc: 'Deep semantic analysis with strict JSON schema enforcement' },
    { name: 'Deterministic Local NLP', category: 'Offline Engine', desc: 'Fallback heuristic rule engine for instant zero-dependency demo scans' },
    { name: 'Recharts', category: 'Visual Analytics', desc: 'Dynamic radar, bar, and progress visual analytics' },
    { name: 'localStorage', category: 'Data Privacy', desc: 'Ephemeral client-side persistence with zero server tracking' },
  ];

  const workflowSteps = [
    {
      title: '1. Document Normalization & Parsing',
      desc: 'When you upload a PDF or DOCX file, ResumeAI reads the binary byte stream, extracts raw textual content, cleans non-printable Unicode characters, and validates sentence structures.',
    },
    {
      title: '2. Heuristic Pattern & Entity Recognition',
      desc: 'Our lexical parser detects essential contact points (email, phone, LinkedIn, GitHub), standard section headings (Experience, Skills, Education, Projects), and quantifiable metrics (%, $, numbers, user scale).',
    },
    {
      title: '3. Job Description Semantic Cross-Matching',
      desc: 'The engine tokenizes employer expectations and matches exact technical skills, libraries, and seniority keywords against your resume to isolate matching competencies and missing high-priority skills.',
    },
    {
      title: '4. Multi-Pillar Scoring & Actionable Suggestions',
      desc: 'Synthesizes findings into 5 key metrics (Overall, ATS, Job Match, Skills, Keywords) and produces concrete, prioritized before/after rewrite examples.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero statement */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300">
          <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
          <span>Mission & Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          About ResumeAI
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          <strong className="text-brand-600 dark:text-brand-400">ResumeAI</strong> is an AI-powered resume analysis tool that helps users understand how their resume aligns with a job description and identifies areas for improvement.
        </p>
      </div>

      {/* How Analysis Works */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              How Analysis Works
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Inside our 4-phase ATS auditing pipeline
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workflowSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 space-y-2"
            >
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Technology Stack
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Modern, modular, production-grade architecture
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techStack.map((tech, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-1.5"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {tech.category}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {tech.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Note */}
      <div className="rounded-3xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20 p-7 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-emerald-950 dark:text-emerald-100">
              Privacy & Security Note
            </h2>
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              Your career data belongs solely to you
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            • <strong>Ephemeral Processing:</strong> Uploaded resume files are held in temporary memory buffers only during extraction and are immediately discarded. No resumes are written to long-term server disk.
          </p>
          <p>
            • <strong>Local-Only Persistence:</strong> Analysis history and scores are stored exclusively in your browser’s <code>localStorage</code>. Clearing your browser cache or clicking "Clear All History" permanently deletes all records.
          </p>
          <p>
            • <strong>Zero Training Retention:</strong> Resume content sent to OpenAI API is evaluated statelessly and is never used to train generalized foundation models under standard enterprise API terms.
          </p>
        </div>
      </div>

      {/* CTA Footer in About */}
      <div className="text-center pt-4">
        <button
          onClick={onNavigateAnalyze}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/25 transition active:scale-95"
        >
          <span>Try ResumeAI Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
