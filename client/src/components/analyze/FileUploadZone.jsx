import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, X, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const MAX_FILE_SIZE_MB = 10;
const ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.doc', '.txt'];

export default function FileUploadZone({
  file,
  onFileSelect,
  onFileRemove,
  extractedText,
  isExtracting,
  extractionError,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef(null);
  const { toastError } = useToast();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndPassFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndPassFile(e.target.files[0]);
    }
  };

  const validateAndPassFile = (selectedFile) => {
    const fileName = selectedFile.name.toLowerCase();
    const hasValidExt = ALLOWED_EXTENSIONS.some((ext) => fileName.endsWith(ext));

    if (!hasValidExt) {
      toastError('Unsupported file format. Please upload a PDF (.pdf), Word document (.docx), or plain text file (.txt).');
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toastError(`File is too large (${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB). Maximum allowed size is ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    onFileSelect(selectedFile);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-bold text-slate-800 dark:text-slate-200">
          Upload Resume <span className="text-rose-500">*</span>
        </label>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          PDF, DOCX, TXT (Max {MAX_FILE_SIZE_MB}MB)
        </span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.doc,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* State A: File already selected */}
      {file ? (
        <div className="p-5 rounded-2xl border-2 border-brand-500/50 bg-brand-50/40 dark:bg-brand-950/20 shadow-sm transition">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
                  {file.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {formatFileSize(file.size)} • {file.name.split('.').pop().toUpperCase()} Document
                </p>
                {isExtracting ? (
                  <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-brand-600 dark:text-brand-400">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Extracting resume text with high-precision parser...</span>
                  </div>
                ) : extractedText ? (
                  <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Extracted {extractedText.trim().split(/\s+/).length} words ready for AI analysis</span>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {extractedText && (
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition"
                  title={showPreview ? 'Hide Extracted Text' : 'Preview Extracted Text'}
                >
                  {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={onFileRemove}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition"
                title="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Text preview accordion */}
          {showPreview && extractedText && (
            <div className="mt-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Extracted Raw Text Preview:
                </span>
                <span className="text-[11px] text-slate-400">
                  Cleaned & normalized for ATS
                </span>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 max-h-48 overflow-y-auto whitespace-pre-wrap">
                {extractedText}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* State B: Dropzone active/idle */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 sm:p-10 text-center transition-all duration-200 flex flex-col items-center justify-center ${
            isDragging
              ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 scale-[1.01]'
              : 'border-slate-300 dark:border-slate-700 hover:border-brand-400 dark:hover:border-brand-600 bg-slate-50/50 dark:bg-slate-900/30'
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4">
            <UploadCloud className="w-7 h-7" />
          </div>

          <h4 className="font-bold text-base text-slate-900 dark:text-white">
            Click to upload or drag & drop your resume
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Accepts PDF, DOCX, or TXT (Up to 10MB)
          </p>

          <div className="mt-4 flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              PDF
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              DOCX
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              TXT
            </span>
          </div>
        </div>
      )}

      {/* Extraction Error Alert */}
      {extractionError && (
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Extraction Failed: </span>
            {extractionError}
          </div>
        </div>
      )}
    </div>
  );
}
