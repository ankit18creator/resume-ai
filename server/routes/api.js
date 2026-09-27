const express = require('express');
const multer = require('multer');
const { handleExtractText } = require('../controllers/extractController');
const { handleAnalyzeResume } = require('../controllers/analyzeController');
const { MAX_FILE_SIZE } = require('../utils/validator');

const router = express.Router();

// Configure multer memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});

// Extract text from uploaded document
router.post('/extract', upload.single('resume'), handleExtractText);

// Analyze resume (supports both JSON body and multipart file upload)
router.post('/analyze', upload.single('resume'), handleAnalyzeResume);

// Health check and environment probe
router.get('/health', (req, res) => {
  const hasOpenAiKey = Boolean(
    process.env.OPENAI_API_KEY &&
    process.env.OPENAI_API_KEY.trim() !== '' &&
    !process.env.OPENAI_API_KEY.startsWith('sk-placeholder')
  );

  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'ResumeAI Engine',
    openAiConfigured: hasOpenAiKey,
    mode: hasOpenAiKey ? 'AI Enhanced (OpenAI)' : 'Demo Mode (Intelligent Local NLP)',
  });
});

module.exports = router;
