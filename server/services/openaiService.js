const OpenAI = require('openai');
const { analyzeResumeLocally } = require('./localAnalyzerService');
const { validateAnalysisResult } = require('../utils/validator');

let openaiClient = null;

function getOpenAIClient() {
  if (!openaiClient && process.env.OPENAI_API_KEY) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
}

const ANALYSIS_SCHEMA_PROMPT = `
You must evaluate the candidate's resume objectively. If a Job Description is provided, analyze the resume strictly against it.

CRITICAL INSTRUCTIONS:
1. Do NOT invent or hallucinate experience, qualifications, projects, companies, or skills that are not present in the resume.
2. Clearly distinguish between information extracted from the resume and AI-generated recommendations.
3. Calculate genuine, realistic scores between 0 and 100 based on quality, impact, section depth, and alignment.
4. Output MUST be a valid JSON object conforming strictly to this structure:

{
  "overallScore": number (0-100),
  "atsScore": number (0-100),
  "jobMatchScore": number (0-100, or general score if no JD provided),
  "skillsMatch": number (0-100),
  "keywordMatch": number (0-100),
  "candidate": {
    "name": string,
    "email": string or null,
    "phone": string or null,
    "location": string or null,
    "linkedin": string or null,
    "github": string or null,
    "summary": string,
    "education": [string],
    "experience": [string],
    "skills": [string]
  },
  "strengths": [string],
  "weaknesses": [string],
  "matchingSkills": [string],
  "missingSkills": [string],
  "matchingKeywords": [string],
  "missingKeywords": [string],
  "importantKeywords": [string],
  "sectionAnalysis": {
    "summary": { "score": number, "good": [string], "improvements": [string] },
    "skills": { "score": number, "good": [string], "improvements": [string] },
    "experience": { "score": number, "good": [string], "improvements": [string] },
    "education": { "score": number, "good": [string], "improvements": [string] },
    "projects": { "score": number, "good": [string], "improvements": [string] },
    "certifications": { "score": number, "good": [string], "improvements": [string] },
    "achievements": { "score": number, "good": [string], "improvements": [string] }
  },
  "recommendations": [
    {
      "priority": "High" | "Medium" | "Low",
      "title": string,
      "description": string,
      "example": string
    }
  ]
}
`;

/**
 * Performs resume analysis via OpenAI API or fallback local analyzer.
 * @param {string} resumeText
 * @param {string} jobDescription
 * @param {string} fileName
 * @returns {Promise<Object>}
 */
async function analyzeResume(resumeText, jobDescription = '', fileName = 'resume.pdf') {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey.startsWith('sk-placeholder')) {
    console.log('[ResumeAI] No OpenAI API Key detected. Utilizing intelligent local analyzer (Demo Mode).');
    const localResult = analyzeResumeLocally(resumeText, jobDescription, fileName);
    return validateAnalysisResult(localResult);
  }

  try {
    const client = getOpenAIClient();
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

    const userPrompt = `
RESUME CONTENT:
---
${resumeText.slice(0, 15000)}
---

TARGET JOB DESCRIPTION:
---
${jobDescription && jobDescription.trim().length > 0 ? jobDescription.slice(0, 5000) : 'None provided. Perform a comprehensive general ATS and career quality analysis.'}
---

Perform the evaluation and return the JSON object.`;

    const response = await client.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'system',
          content: ANALYSIS_SCHEMA_PROMPT,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Empty response from OpenAI API.');
    }

    const parsed = JSON.parse(content);
    parsed.isDemoMode = false;
    return validateAnalysisResult(parsed);
  } catch (err) {
    console.warn(`[ResumeAI] OpenAI API call failed (${err.message}). Falling back to local analyzer.`);
    const fallbackResult = analyzeResumeLocally(resumeText, jobDescription, fileName);
    return validateAnalysisResult(fallbackResult);
  }
}

module.exports = {
  analyzeResume,
};
