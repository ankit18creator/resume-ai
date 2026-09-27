const { extractTextFromFile } = require('../services/extractorService');
const { validateFile } = require('../utils/validator');

async function handleExtractText(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file received. Please upload a PDF, DOCX, or TXT resume.',
      });
    }

    const validation = validateFile(req.file);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: validation.error,
      });
    }

    const extraction = await extractTextFromFile(req.file);

    return res.status(200).json({
      success: true,
      data: extraction,
    });
  } catch (error) {
    console.error('Extract text error:', error);
    return res.status(422).json({
      success: false,
      error: error.message || 'Failed to extract text from the uploaded resume.',
    });
  }
}

module.exports = {
  handleExtractText,
};
