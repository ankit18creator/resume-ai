import React, { useState } from 'react';
import FileUploadZone from '../components/analyze/FileUploadZone';
import JobDescriptionInput from '../components/analyze/JobDescriptionInput';
import SampleDataLoader from '../components/analyze/SampleDataLoader';
import { extractResumeText, analyzeResume } from '../services/api';
import { useToast } from '../context/ToastContext';
import { useHistory } from '../context/HistoryContext';
import { Sparkles, ArrowRight, Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function AnalyzePage({
  onAnalysisComplete,
  preloadedData,
}) {
  const [file, setFile] = useState(preloadedData?.file || null);
  const [extractedText, setExtractedText] = useState(preloadedData?.resumeText || '');
  const [jobDescription, setJobDescription] = useState(preloadedData?.jobDescription || '');
  const [fileName, setFileName] = useState(preloadedData?.fileName || '');

  const [isExtracting, setIsExtracting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [extractionError, setExtractionError] = useState(null);
  const [analysisStep, setAnalysisStep] = useState('');

  const { toastSuccess, toastError, toastWarning, toastInfo } = useToast();
  const { saveAnalysis } = useHistory();

  const handleFileSelect = async (selectedFile) => {
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setExtractionError(null);
    setIsExtracting(true);

    try {
      const result = await extractResumeText(selectedFile);
      setExtractedText(result.text);
      toastSuccess(`Extracted ${result.wordCount} words from ${selectedFile.name}`);
    } catch (err) {
      console.error('File extraction error:', err);
      setExtractionError(err.message || 'Failed to extract text from file.');
      toastError(err.message || 'Extraction failed');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleFileRemove = () => {
    setFile(null);
    setExtractedText('');
    setFileName('');
    setExtractionError(null);
  };

  const handleSelectPreset = (preset) => {
    // Create a virtual text file or direct text assignment
    const mockBlob = new Blob([preset.resumeText], { type: 'text/plain' });
    const mockFile = new File([mockBlob], preset.fileName, { type: 'text/plain' });

    setFile(mockFile);
    setFileName(preset.fileName);
    setExtractedText(preset.resumeText);
    setJobDescription(preset.jobDescription);
    setExtractionError(null);

    toastInfo(`Loaded "${preset.title}" preset data`);
  };

  const handleStartAnalysis = async () => {
    if (!extractedText || extractedText.trim().length < 30) {
      toastWarning('Please upload a valid resume with readable text first.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisStep('Initiating ATS lexical scanner...');

    try {
      const stepTimer1 = setTimeout(() => {
        setAnalysisStep('Cross-referencing technical skills & domain competencies...');
      }, 700);

      const stepTimer2 = setTimeout(() => {
        setAnalysisStep('Evaluating quantifiable impact, verbs & section structure...');
      }, 1500);

      const result = await analyzeResume({
        resumeText: extractedText,
        jobDescription: jobDescription.trim(),
        fileName: fileName || file?.name || 'Uploaded_Resume.pdf',
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      // Save to history
      const savedRecord = saveAnalysis(result);
      toastSuccess('Resume analysis completed successfully!');

      // Navigate to Results page
      onAnalysisComplete(savedRecord);
    } catch (err) {
      console.error('Analysis error:', err);
      toastError(err.message || 'An error occurred during analysis.');
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Title & Introduction */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Audit & Match Your Resume
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Upload your resume in PDF or DOCX format, optionally paste your target job description, and let our AI engine evaluate your interview readiness.
        </p>
      </div>

      {/* Quick Presets Loader */}
      <SampleDataLoader onSelectPreset={handleSelectPreset} />

      {/* Analysis Input Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Step 1: Resume Upload */}
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold">
              1
            </span>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Resume Document
            </h2>
          </div>

          <FileUploadZone
            file={file}
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
            extractedText={extractedText}
            isExtracting={isExtracting}
            extractionError={extractionError}
          />
        </div>

        {/* Step 2: Job Description */}
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold">
              2
            </span>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Target Role & Alignment
            </h2>
          </div>

          <JobDescriptionInput
            value={jobDescription}
            onChange={setJobDescription}
            onClear={() => setJobDescription('')}
          />
        </div>
      </div>

      {/* Trigger Button & Status */}
      <div className="flex flex-col items-center justify-center pt-4 space-y-3">
        <button
          type="button"
          disabled={!extractedText || isExtracting || isAnalyzing}
          onClick={handleStartAnalysis}
          className={`relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl font-bold text-base text-white shadow-xl transition-all duration-200 active:scale-95 ${
            !extractedText || isExtracting || isAnalyzing
              ? 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-600 hover:from-brand-700 hover:to-indigo-700 shadow-brand-500/30 hover:shadow-brand-500/40'
          }`}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing Resume...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Analyze Resume</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        {isAnalyzing && (
          <div className="text-center animate-fadeIn">
            <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">
              {analysisStep || 'Evaluating candidate qualifications...'}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Generating section scores and ATS audit...
            </p>
          </div>
        )}

        {!extractedText && (
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
            Upload a resume or select a preset above to begin.
          </p>
        )}
      </div>
    </div>
  );
}
