import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import OverviewCard from '../components/dashboard/OverviewCard';
import MetricsGrid from '../components/dashboard/MetricsGrid';
import ScoreVisualizer from '../components/dashboard/ScoreVisualizer';
import StrengthsWeaknesses from '../components/dashboard/StrengthsWeaknesses';
import SkillsComparison from '../components/dashboard/SkillsComparison';
import KeywordsBreakdown from '../components/dashboard/KeywordsBreakdown';
import ActionableRecommendations from '../components/dashboard/ActionableRecommendations';
import SectionAnalysisCard from '../components/dashboard/SectionAnalysisCard';
import { Sparkles, Layers, ArrowLeft } from 'lucide-react';

export default function ResultsPage({ analysis, onNewAnalysis, onBackToAnalyze }) {
  useEffect(() => {
    // Trigger celebratory confetti if score is high (>=80)
    if (analysis && analysis.overallScore >= 80) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {
        // ignore in non-browser environments
      }
    }
  }, [analysis]);

  if (!analysis) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <p className="text-sm text-slate-500">No active analysis found.</p>
        <button
          onClick={onNewAnalysis}
          className="px-5 py-2.5 rounded-xl font-bold text-white bg-brand-600 hover:bg-brand-700 transition"
        >
          Analyze a Resume Now
        </button>
      </div>
    );
  }

  const sections = analysis.sectionAnalysis || {};
  const sectionKeys = ['summary', 'skills', 'experience', 'education', 'projects', 'certifications', 'achievements'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Back Nav (no-print) */}
      <div className="flex items-center justify-between no-print">
        <button
          onClick={onBackToAnalyze}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Analyzer</span>
        </button>

        <span className="text-xs text-slate-400">
          Report ID: <span className="font-mono">{analysis.id || 'current-audit'}</span>
        </span>
      </div>

      {/* 1. Candidate Overview Card */}
      <OverviewCard analysis={analysis} onNewAnalysis={onNewAnalysis} />

      {/* 2. Top Metrics Grid: Circular Score + 4 Key Stat Cards */}
      <MetricsGrid analysis={analysis} />

      {/* 3. Visual Charts (Recharts Radar & Section Bar Distribution) */}
      <ScoreVisualizer analysis={analysis} />

      {/* 4. Strengths & Areas to Improve */}
      <StrengthsWeaknesses
        strengths={analysis.strengths || []}
        weaknesses={analysis.weaknesses || []}
      />

      {/* 5. Matching Skills & Missing Skills */}
      <SkillsComparison
        matchingSkills={analysis.matchingSkills || []}
        missingSkills={analysis.missingSkills || []}
      />

      {/* 6. Keyword Coverage Analysis */}
      <KeywordsBreakdown
        matchingKeywords={analysis.matchingKeywords || []}
        missingKeywords={analysis.missingKeywords || []}
        importantKeywords={analysis.importantKeywords || []}
      />

      {/* 7. Actionable AI Recommendations */}
      <ActionableRecommendations
        recommendations={analysis.recommendations || []}
      />

      {/* 8. Section-by-Section In-Depth Analysis Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              Detailed Section-by-Section Audit
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Comprehensive breakdown of each resume segment with concrete feedback
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sectionKeys.map((secKey) => (
            <SectionAnalysisCard
              key={secKey}
              sectionKey={secKey}
              data={sections[secKey]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
