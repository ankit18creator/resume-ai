/**
 * Frontend API client communicating with ResumeAI backend.
 */

const API_BASE = '/api';

export async function checkServerHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, { method: 'GET' });
    if (!res.ok) {
      throw new Error(`Server returned status ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn('Health check failed:', err.message);
    return {
      status: 'offline',
      openAiConfigured: false,
      mode: 'Offline / Standalone Fallback',
    };
  }
}

export async function extractResumeText(file) {
  if (!file) {
    throw new Error('Please select a file to extract text from.');
  }

  const formData = new FormData();
  formData.append('resume', file);

  try {
    const res = await fetch(`${API_BASE}/extract`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to extract text from the file.');
    }

    return data.data;
  } catch (err) {
    console.error('Extraction API error:', err);
    throw new Error(err.message || 'Unable to connect to the extraction service.');
  }
}

export async function analyzeResume({ file, resumeText, jobDescription = '', fileName = 'resume.pdf' }) {
  try {
    let res;

    // Direct file upload analysis
    if (file) {
      const formData = new FormData();
      formData.append('resume', file);
      if (jobDescription) {
        formData.append('jobDescription', jobDescription);
      }

      res = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        body: formData,
      });
    } else if (resumeText) {
      // Analysis of extracted/pasted text
      res = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
          fileName,
        }),
      });
    } else {
      throw new Error('No resume provided for analysis. Upload a file or provide text.');
    }

    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Resume analysis failed. Please try again.');
    }

    return json.data;
  } catch (err) {
    console.error('Analyze API error:', err);
    throw new Error(err.message || 'Network error occurred while analyzing the resume.');
  }
}
