const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { sanitizeText, countWords } = require('../utils/textSanitizer');

/**
 * Extracts clean plain text from uploaded PDF, DOCX, or TXT files.
 * @param {Object} file - Multer file object
 * @returns {Promise<{ text: string, wordCount: number, characterCount: number, fileName: string }>}
 */
async function extractTextFromFile(file) {
  if (!file || !file.buffer) {
    throw new Error('No valid file buffer received for text extraction.');
  }

  const fileName = file.originalname || 'unknown-document';
  const ext = fileName.toLowerCase().split('.').pop();
  let extractedRaw = '';

  try {
    if (ext === 'pdf' || file.mimetype === 'application/pdf') {
      if (pdfParse && typeof pdfParse.PDFParse === 'function') {
        // pdf-parse v2.x class API
        const parser = new pdfParse.PDFParse({ data: file.buffer });
        const pdfData = await parser.getText();
        extractedRaw = pdfData?.text || '';
        if (typeof parser.destroy === 'function') {
          await parser.destroy();
        }
      } else if (typeof pdfParse === 'function') {
        // pdf-parse v1.x callable function API
        const pdfData = await pdfParse(file.buffer, { max: 0 });
        extractedRaw = pdfData?.text || '';
      } else {
        throw new Error('PDF parsing library could not be initialized.');
      }
    } else if (
      ext === 'docx' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const mammothResult = await mammoth.extractRawText({ buffer: file.buffer });
      extractedRaw = mammothResult.value || '';
    } else if (
      ext === 'txt' ||
      file.mimetype === 'text/plain'
    ) {
      extractedRaw = file.buffer.toString('utf-8');
    } else {
      throw new Error(`Unsupported file format (.${ext}). Please upload a PDF, DOCX, or TXT file.`);
    }
  } catch (err) {
    console.error(`Error during file parsing for ${fileName}:`, err.message);
    if (err.message && err.message.includes('password')) {
      throw new Error('This PDF is password-protected. Please remove the password and try again.');
    }
    throw new Error(`Failed to extract text from ${fileName}: ${err.message}`);
  }

  const text = sanitizeText(extractedRaw);

  if (!text || text.length < 30) {
    throw new Error(
      'The uploaded file does not contain readable text. It may be a scanned image or an empty document. Please upload a text-based resume.'
    );
  }

  return {
    fileName,
    text,
    wordCount: countWords(text),
    characterCount: text.length,
  };
}

module.exports = {
  extractTextFromFile,
};
