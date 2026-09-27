const { analyzeResume } = require('../services/openaiService');
const { extractTextFromFile } = require('../services/extractorService');
const { validateFile } = require('../utils/validator');
const { sanitizeText } = require('../utils/textSanitizer');

async function handleAnalyzeResume(req, res) {
  try {
    let resumeText = '';
    let fileName = 'resume.pdf';
    const jobDescription = sanitizeText(req.body?.jobDescription || '');

    // Case 1: Direct file upload via multipart/form-data
    if (req.file) {
      const validation = validateFile(req.file);
      if (!validation.valid) {
        return res.status(400).json({ success: false, error: validation.error });
      }
      const extraction = await extractTextFromFile(req.file);
      resumeText = extraction.text;
      fileName = extraction.fileName;
    } 
    // Case 2: Pre-extracted resume text sent as JSON
    else if (req.body?.resumeText) {
      resumeText = sanitizeText(req.body.resumeText);
      fileName = req.body.fileName || 'resume.txt';
    }

    if (!resumeText || resumeText.trim().length < 30) {
      return res.status(400).json({
        success: false,
        error: 'Resume text is empty or too short for a meaningful analysis. Please upload a valid resume.',
      });
    }

    const analysisResult = await analyzeResume(resumeText, jobDescription, fileName);

    return res.status(200).json({
      success: true,
      data: {
        fileName,
        ...analysisResult,
      },
    });
  } catch (error) {
    console.error('Analyze resume error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'An unexpected error occurred during resume analysis.',
    });
  }
}

module.exports = {
  handleAnalyzeResume,
};
