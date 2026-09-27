/**
 * Request and response schema validator.
 */

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'text/plain',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function validateFile(file) {
  if (!file) {
    return { valid: false, error: 'No file uploaded. Please upload a PDF, DOCX, or TXT resume.' };
  }

  const isAllowedMime = ALLOWED_MIME_TYPES.includes(file.mimetype) ||
    file.originalname.match(/\.(pdf|docx|doc|txt)$/i);

  if (!isAllowedMime) {
    return {
      valid: false,
      error: `Unsupported file format (${file.mimetype || 'unknown'}). Only PDF, DOCX, and TXT resumes are supported.`,
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds the 10MB limit. Current size: ${(file.size / (1024 * 1024)).toFixed(2)} MB.`,
    };
  }

  return { valid: true };
}

function clampScore(score, fallback = 70) {
  const num = Number(score);
  if (isNaN(num)) return fallback;
  return Math.max(0, Math.min(100, Math.round(num)));
}

function validateAnalysisResult(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Analysis result must be a non-empty object.');
  }

  const sanitized = {
    overallScore: clampScore(data.overallScore, 75),
    atsScore: clampScore(data.atsScore, 75),
    jobMatchScore: clampScore(data.jobMatchScore, 70),
    skillsMatch: clampScore(data.skillsMatch, 70),
    keywordMatch: clampScore(data.keywordMatch, 65),

    candidate: {
      name: data.candidate?.name || 'Candidate',
      email: data.candidate?.email || null,
      phone: data.candidate?.phone || null,
      location: data.candidate?.location || null,
      linkedin: data.candidate?.linkedin || null,
      github: data.candidate?.github || null,
      summary: data.candidate?.summary || '',
      education: Array.isArray(data.candidate?.education) ? data.candidate.education : [],
      experience: Array.isArray(data.candidate?.experience) ? data.candidate.experience : [],
      skills: Array.isArray(data.candidate?.skills) ? data.candidate.skills : [],
    },

    strengths: Array.isArray(data.strengths) ? data.strengths : [],
    weaknesses: Array.isArray(data.weaknesses) ? data.weaknesses : [],
    matchingSkills: Array.isArray(data.matchingSkills) ? data.matchingSkills : [],
    missingSkills: Array.isArray(data.missingSkills) ? data.missingSkills : [],
    matchingKeywords: Array.isArray(data.matchingKeywords) ? data.matchingKeywords : [],
    missingKeywords: Array.isArray(data.missingKeywords) ? data.missingKeywords : [],
    importantKeywords: Array.isArray(data.importantKeywords) ? data.importantKeywords : [],

    sectionAnalysis: {
      summary: {
        score: clampScore(data.sectionAnalysis?.summary?.score, 75),
        good: Array.isArray(data.sectionAnalysis?.summary?.good) ? data.sectionAnalysis.summary.good : [],
        improvements: Array.isArray(data.sectionAnalysis?.summary?.improvements) ? data.sectionAnalysis.summary.improvements : [],
      },
      skills: {
        score: clampScore(data.sectionAnalysis?.skills?.score, 80),
        good: Array.isArray(data.sectionAnalysis?.skills?.good) ? data.sectionAnalysis.skills.good : [],
        improvements: Array.isArray(data.sectionAnalysis?.skills?.improvements) ? data.sectionAnalysis.skills.improvements : [],
      },
      experience: {
        score: clampScore(data.sectionAnalysis?.experience?.score, 75),
        good: Array.isArray(data.sectionAnalysis?.experience?.good) ? data.sectionAnalysis.experience.good : [],
        improvements: Array.isArray(data.sectionAnalysis?.experience?.improvements) ? data.sectionAnalysis.experience.improvements : [],
      },
      education: {
        score: clampScore(data.sectionAnalysis?.education?.score, 85),
        good: Array.isArray(data.sectionAnalysis?.education?.good) ? data.sectionAnalysis.education.good : [],
        improvements: Array.isArray(data.sectionAnalysis?.education?.improvements) ? data.sectionAnalysis.education.improvements : [],
      },
      projects: {
        score: clampScore(data.sectionAnalysis?.projects?.score, 75),
        good: Array.isArray(data.sectionAnalysis?.projects?.good) ? data.sectionAnalysis.projects.good : [],
        improvements: Array.isArray(data.sectionAnalysis?.projects?.improvements) ? data.sectionAnalysis.projects.improvements : [],
      },
      certifications: {
        score: clampScore(data.sectionAnalysis?.certifications?.score, 70),
        good: Array.isArray(data.sectionAnalysis?.certifications?.good) ? data.sectionAnalysis.certifications.good : [],
        improvements: Array.isArray(data.sectionAnalysis?.certifications?.improvements) ? data.sectionAnalysis.certifications.improvements : [],
      },
      achievements: {
        score: clampScore(data.sectionAnalysis?.achievements?.score, 70),
        good: Array.isArray(data.sectionAnalysis?.achievements?.good) ? data.sectionAnalysis.achievements.good : [],
        improvements: Array.isArray(data.sectionAnalysis?.achievements?.improvements) ? data.sectionAnalysis.achievements.improvements : [],
      },
    },

    recommendations: Array.isArray(data.recommendations) ? data.recommendations.map((rec) => ({
      priority: ['High', 'Medium', 'Low'].includes(rec.priority) ? rec.priority : 'Medium',
      title: rec.title || 'General Recommendation',
      description: rec.description || '',
      example: rec.example || null,
    })) : [],

    isDemoMode: Boolean(data.isDemoMode),
    analyzedAt: data.analyzedAt || new Date().toISOString(),
  };

  return sanitized;
}

module.exports = {
  validateFile,
  clampScore,
  validateAnalysisResult,
  MAX_FILE_SIZE,
};
