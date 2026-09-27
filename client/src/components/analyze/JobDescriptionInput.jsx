import React from 'react';
import { Briefcase, Trash2, CheckCircle, Info } from 'lucide-react';

const SAMPLE_JDS = [
  {
    role: 'Full Stack Engineer',
    text: `Job Title: Senior Full Stack Engineer
Location: Remote / San Francisco, CA
Experience: 5+ years

Key Responsibilities:
- Design, build, and maintain scalable web services and responsive client web applications using React, TypeScript, Node.js, and PostgreSQL.
- Build resilient RESTful and GraphQL APIs, integrate microservices, and manage distributed systems on AWS (ECS, Lambda, S3, RDS).
- Optimize high-throughput PostgreSQL queries, Redis caching layers, and database migrations.
- Collaborate with product designers and engineering leads following Agile and CI/CD best practices with Docker, Kubernetes, and GitHub Actions.

Requirements:
- Strong proficiency in JavaScript, TypeScript, React, Node.js, Express, and modern CSS/Tailwind.
- Proven experience with relational databases (PostgreSQL/MySQL) and caching (Redis).
- Hands-on cloud deployment experience with AWS, Docker containers, and automated testing (Jest, Cypress).
- Exceptional problem-solving skills, system architecture design, and communicative teamwork.`
  },
  {
    role: 'Frontend Specialist',
    text: `Job Title: Senior Frontend React Developer
Location: Remote
Experience: 4+ years

Requirements & Tech Stack:
- Expert in modern JavaScript (ES6+), TypeScript, React 18+, HTML5, and Tailwind CSS.
- Deep understanding of state management (Redux, Zustand, Context API), responsive layouts, and web performance optimization (Lighthouse 95+).
- Experience consuming RESTful & GraphQL APIs and writing end-to-end unit and integration tests (Jest, React Testing Library, Playwright).
- Passion for crafting accessible, delightful UX with clean code and design systems.`
  },
  {
    role: 'DevOps & Cloud',
    text: `Job Title: Cloud & DevOps Infrastructure Engineer
Location: Remote
Requirements:
- 4+ years managing cloud infrastructure on AWS or GCP.
- Deep expertise with Docker containerization, Kubernetes (EKS/GKE), Terraform, and Helm.
- Production experience building and securing CI/CD pipelines (GitHub Actions, GitLab CI).
- Strong Linux systems administration, bash scripting, monitoring with Prometheus/Grafana, and cloud security compliance.`
  }
];

export default function JobDescriptionInput({ value, onChange, onClear }) {
  const charCount = value ? value.length : 0;
  const wordCount = value && value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            Target Job Description <span className="text-xs font-normal text-slate-400">(Optional)</span>
          </label>
        </div>

        {charCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-500 transition font-medium"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear text</span>
          </button>
        )}
      </div>

      {/* Quick JD Preset Chips */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mr-1">
          Quick Fill Sample JD:
        </span>
        {SAMPLE_JDS.map((jd, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onChange(jd.text)}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-brand-950/60 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-300 border border-slate-200 dark:border-slate-700 transition"
          >
            + {jd.role}
          </button>
        ))}
      </div>

      <div className="relative">
        <textarea
          rows={7}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste the target job description or requirements here to enable keyword matching, skill gap detection, and alignment scoring..."
          className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition resize-y"
        />

        {/* Floating counter */}
        <div className="absolute bottom-3 right-4 flex items-center gap-3 text-xs text-slate-400 bg-white/90 dark:bg-slate-900/90 px-2 py-0.5 rounded-md backdrop-blur-sm">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} characters</span>
        </div>
      </div>

      <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
        <Info className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
        <p>
          <span className="font-semibold text-slate-800 dark:text-slate-200">Optional:</span> You can analyze a resume without a job description to perform a general ATS quality audit. Adding a job description enables exact skill gap detection and job match percentage.
        </p>
      </div>
    </div>
  );
}
