# 🚀 ResumeAI – Production-Grade AI Resume Analyzer & ATS Matcher

> **Analyze Your Resume. Beat the ATS. Land More Interviews.**  
> Built with React 19, Vite, Tailwind CSS, Recharts, Node.js + Express, and OpenAI GPT-4o-mini (with intelligent local NLP fallback).

[![License: MIT](https://img.shields.io/badge/License-MIT-indigo.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff.svg?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933.svg?logo=node.js)](https://nodejs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991.svg?logo=openai)](https://openai.com/)

---

## 📖 Overview

**ResumeAI** is a SaaS-style web application that analyzes resumes in **PDF**, **DOCX**, and **TXT** formats, benchmarked against real employer job descriptions.

Unlike basic keyword scanners, ResumeAI performs:
1. **Real Native Text Extraction**: Parses raw character streams from binary PDF and DOCX files without fake mock processing.
2. **Deterministic & Semantic ATS Scoring**: Evaluates header hierarchy, section completeness, contact validity, bullet structure, and formatting hurdles that cause ATS filters to discard candidate applications.
3. **Smart Job Description Matching**: Cross-references required skills, technologies, and keywords to identify exact matches, missing competencies, and alignment percentages.
4. **Actionable AI Recommendations**: Delivers prioritized, concrete before-and-after bullet rewrites using Google's XYZ formula (*Accomplished [X] as measured by [Y] by doing [Z]*).
5. **Intelligent Fallback (Demo Mode)**: Operates with or without an OpenAI API key. When no key is configured, an authentic local NLP engine tokenizes and computes dynamic scores based on actual resume content (never hardcoded!).
6. **Persistence & Export**: Client-side storage of previous analyses via `localStorage` and executive PDF/Markdown audit export.

### Pages Included
1. **Landing Page**: Value proposition, feature grid, interactive workflow, live demo launcher.
2. **Dashboard**: SaaS metrics overview, historical score progression chart (Recharts Area), recent scans, ATS best practices checklist.
3. **Analyze**: Drag-and-drop resume upload (PDF, DOCX, TXT), raw text preview modal, optional job description input with quick role presets, and animated scanner.
4. **Results**: Comprehensive audit breakdown with circular rating, 4 metric cards, competency radar chart, section bar distribution, skills gap badges, keyword analysis, strengths/weaknesses, prioritized actionable suggestions, and multi-format report export.
5. **History**: Searchable, sortable archive of previous audits in `localStorage` with quick view, export, and delete options.
6. **About**: In-depth explanation of ATS algorithms, scoring criteria, system architecture, and frequently asked questions.

---

## 📸 Screenshots & UI Preview

```
+------------------------------------------------------------------------------------------------+
|  ResumeAI Pro        [ Home ] [ Dashboard ] [ Analyze ] [ History (2) ] [ About ]       [ 🌙 ]  |
+------------------------------------------------------------------------------------------------+
|                                                                                                |
|   Analyze Your Resume. Beat the ATS. Land More Interviews.                                    |
|                                                                                                |
|   [ Upload Resume (PDF / DOCX) ]   -------->   [ Paste Job Description (Optional) ]            |
|                                                                                                |
|   +----------------------------------------------------------------------------------------+   |
|   |  OVERALL SCORE: 88/100   •   ATS: 92%   •   Job Match: 85%   •   Skills: 90%           |   |
|   +----------------------------------------------------------------------------------------+   |
|   |  Matching Skills: React, TypeScript, Node.js, PostgreSQL, Docker, AWS                  |   |
|   |  Missing Skills: Kubernetes, GraphQL                                                   |   |
|   |  Competency Radar Chart (6 Dimensions)  •  Section Quality Distribution                |   |
|   |  Actionable AI Recommendations: [High Priority] [Medium Priority]                      |   |
|   |  Export: [ Markdown (.md) ] [ JSON (.json) ] [ Print/PDF ] [ Copy Summary ]            |   |
|   +----------------------------------------------------------------------------------------+   |
+------------------------------------------------------------------------------------------------+
```

---

## ✨ Features

- **Document Processing**: Drag-and-drop upload supporting PDF, DOCX, and TXT files up to 10MB with live raw text preview and validation.
- **Job Description Parsing**: Match resumes against specific roles or analyze standalone for general ATS quality. Includes 1-click role presets (Full Stack, Frontend, DevOps).
- **Dynamic Scoring**: Computes genuine scores for Overall Quality, ATS Compatibility, Job Match, Skills Match, and Keyword Density.
- **Visual Analytics**: Interactive Recharts Radar Chart (6 Pillars: ATS Format, Keywords, Skills Depth, Experience, Summary, Education), Section Bar Chart, and Dashboard Progression Area Chart.
- **Section-by-Section Auditing**: Cards for Summary, Technical Skills, Experience, Education, Projects, Certifications, and Achievements with explicit "Good" vs "Needs Improvement" points.
- **Skills & Keyword Matrix**: Emerald and Rose badges highlighting matched and missing skills.
- **Prioritized Recommendations**: High, Medium, and Low priority badges with actionable rewrite suggestions.
- **History Management**: Automatically saves past analyses in `localStorage` with live search, multi-column sorting (date, score, ATS), view, delete, and clear-all controls.
- **Executive Report Export**: One-click printable PDF view, instant formatted Markdown audit download, JSON raw data download, and summary clipboard copy.
- **Dark Mode**: High-contrast, persistent dark/light theme toggle.
- **Zero Data Leakage**: Uploaded documents are processed in volatile server memory; no permanent storage on disk.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS, Lucide Icons, Recharts, Canvas Confetti |
| **Backend** | Node.js, Express.js, Multer (Memory Storage), CORS, Dotenv |
| **Document Extractors** | `pdf-parse` (PDF binary tree), `mammoth` (DOCX extraction) |
| **AI Engine** | OpenAI API (`gpt-4o-mini`), JSON Mode with validation schema |
| **Local Fallback Engine** | Heuristic NLP tokenizer, regex entity extractor, and keyword matrix |
| **Storage** | Client-side `localStorage` |

---

## 📂 Project Structure

```
resume-ai/
├── client/                     # Frontend (React + Vite + Tailwind)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/         # Navbar, Footer, ScoreCircle
│   │   │   ├── landing/        # HeroSection, FeatureGrid, HowItWorks
│   │   │   ├── analyze/        # FileUploadZone, JobDescriptionInput, SampleDataLoader
│   │   │   ├── dashboard/      # OverviewCard, MetricsGrid, ScoreVisualizer, SkillsComparison,
│   │   │   │                   # KeywordsBreakdown, StrengthsWeaknesses, SectionAnalysisCard,
│   │   │   │                   # ActionableRecommendations
│   │   │   └── history/        # HistoryTable, EmptyHistory
│   │   ├── context/            # ThemeContext, HistoryContext, ToastContext
│   │   ├── pages/              # HomePage, DashboardPage, AnalyzePage, ResultsPage, HistoryPage, AboutPage
│   │   ├── services/           # api.js, exportReport.js
│   │   ├── utils/              # sampleData.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                     # Backend (Node.js + Express)
│   ├── controllers/            # extractController.js, analyzeController.js
│   ├── routes/                 # api.js
│   ├── services/               # extractorService.js, openaiService.js, localAnalyzerService.js
│   ├── utils/                  # textSanitizer.js, validator.js, generateSamples.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── samples/                    # Ready-to-upload test resumes & job descriptions
│   ├── Alex_Morgan_Senior_FullStack_Resume.pdf     # Valid binary PDF resume
│   ├── Alex_Morgan_Senior_FullStack_Resume.docx    # Valid binary DOCX resume
│   ├── Full_Stack_Engineer_Resume.txt
│   └── Target_Job_Description.txt
├── package.json                # Monorepo root script runner (concurrently)
├── .env.example
├── .gitignore
└── README.md
```

---

## 🚀 Quickstart & Installation

### Prerequisites
- **Node.js**: v18.0.0 or later (v20+ recommended)
- **npm**: v9.0.0 or later

### 1. Clone or Navigate to the Repository
```bash
cd resume-ai
```

### 2. Install All Dependencies
You can install dependencies for the root, server, and client with:
```bash
npm run install-all
```
*(Or install manually in each folder:)*
```bash
# In server/
cd server && npm install

# In client/
cd ../client && npm install
```

---

## ⚙️ Environment Variables

The server includes a `.env.example` file located at `server/.env.example`.

Create your local `.env` file in `server/.env`:
```bash
cp server/.env.example server/.env
```

Edit `server/.env`:
```env
# Server Port
PORT=5000

# OpenAI API Key (Optional)
# If omitted, ResumeAI operates automatically in Demo Mode using local NLP!
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini

# Client Origin (CORS)
CLIENT_URL=http://localhost:5173
```

> **Note on Demo Mode:** If you do not supply an `OPENAI_API_KEY`, ResumeAI will seamlessly operate in **Demo Mode**. The local analyzer will actually tokenize and analyze the uploaded text, extracting email, phone, skills, quantifiable metrics, and matching with the job description. It generates real, computed scores—not static dummy data!

---

## 💻 Running the Application

### Option A: Run Both Client & Server Concurrently (Recommended)
From the root `resume-ai` directory:
```bash
npm run dev
```
- **Backend API**: `http://localhost:5000`
- **Frontend App**: `http://localhost:5173`

### Option B: Run Independently

**Terminal 1 (Backend Server):**
```bash
cd server
npm start
# Server will run on http://localhost:5000
```

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
# Client will run on http://localhost:5173
```

---

## 📡 API Documentation

### 1. Health Probe
- **Endpoint**: `GET /api/health`
- **Response**:
```json
{
  "status": "online",
  "timestamp": "2026-09-18T17:20:52.500Z",
  "service": "ResumeAI Engine",
  "openAiConfigured": true,
  "mode": "AI Enhanced (OpenAI)"
}
```

### 2. Extract Resume Text
- **Endpoint**: `POST /api/extract`
- **Body**: `multipart/form-data` with `resume` (PDF, DOCX, or TXT file)
- **Response**:
```json
{
  "success": true,
  "data": {
    "fileName": "Alex_Chen_Staff_Engineer.pdf",
    "text": "Alex Chen...",
    "wordCount": 524,
    "characterCount": 3810
  }
}
```

### 3. Analyze Resume
- **Endpoint**: `POST /api/analyze`
- **Body**: Accepts JSON or multipart file upload:
```json
{
  "resumeText": "Candidate resume text...",
  "jobDescription": "Target job description...",
  "fileName": "Resume.pdf"
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "overallScore": 88,
    "atsScore": 92,
    "jobMatchScore": 85,
    "skillsMatch": 90,
    "keywordMatch": 78,
    "candidate": {
      "name": "Alex Chen",
      "email": "alex.chen.dev@gmail.com",
      "phone": "(415) 890-3421",
      "linkedin": "linkedin.com/in/alexchen-dev",
      "github": "github.com/alexchen-code"
    },
    "strengths": ["Clear work history", "Strong quantifiable metrics"],
    "weaknesses": ["Missing Kubernetes keyword"],
    "matchingSkills": ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS"],
    "missingSkills": ["Kubernetes", "GraphQL"],
    "matchingKeywords": ["microservices", "scalable", "ci/cd"],
    "missingKeywords": ["kubernetes", "graphql"],
    "sectionAnalysis": {
      "summary": { "score": 85, "good": [...], "improvements": [...] },
      "skills": { "score": 95, "good": [...], "improvements": [...] },
      "experience": { "score": 88, "good": [...], "improvements": [...] }
    },
    "recommendations": [
      {
        "priority": "High",
        "title": "Integrate Core Job Description Skills",
        "description": "The job description highlights Kubernetes. If you have experience with this tool, integrate it into your bullets.",
        "example": "Example: Deployed scalable microservices on AWS EKS using Kubernetes and Helm charts."
      }
    ],
    "isDemoMode": false,
    "analyzedAt": "2026-09-18T17:21:06.805Z"
  }
}
```

---

## 🔒 Security & Privacy

- **No Server Document Retention**: Uploaded resumes are held only in memory buffers during the request lifecycle.
- **Sanitization**: All extracted text is sanitized of null bytes, control characters, and malformed UTF sequences.
- **Isolated Storage**: Saved history is held strictly in the user's browser `localStorage`.
- **Protected Secrets**: API keys are isolated on the server side and never exposed to the frontend bundle.

---

## 🔮 Future Roadmap

- [ ] AI-Powered One-Click Resume Rewrite (export revised `.docx`).
- [ ] Cover Letter Generator based on job description and resume gaps.
- [ ] Multi-resume comparison side-by-side.
- [ ] LinkedIn Profile URL direct scanner.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
