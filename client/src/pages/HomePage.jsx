import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import FeatureGrid from '../components/landing/FeatureGrid';
import HowItWorks from '../components/landing/HowItWorks';
import { SAMPLE_DATA_PRESETS } from '../utils/sampleData';

export default function HomePage({ onNavigateAnalyze, onLoadSampleAndAnalyze }) {
  const handleQuickDemo = () => {
    // Load the first sample (Senior Full Stack Engineer)
    const sample = SAMPLE_DATA_PRESETS[0];
    onLoadSampleAndAnalyze(sample);
  };

  return (
    <div className="space-y-4">
      <HeroSection
        onGetStarted={() => onNavigateAnalyze()}
        onLoadSample={handleQuickDemo}
      />
      <FeatureGrid />
      <HowItWorks onStart={() => onNavigateAnalyze()} />
    </div>
  );
}
