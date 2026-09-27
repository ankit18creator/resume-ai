/**
 * Utilities for cleaning, sanitizing, and validating extracted text.
 */

function sanitizeText(rawText) {
  if (!rawText || typeof rawText !== 'string') {
    return '';
  }

  return rawText
    // Remove NULL bytes and other non-printable control characters (keep standard \n, \r, \t)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Normalize line endings to \n
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    // Replace multiple empty lines with maximum 2 newlines
    .replace(/\n{3,}/g, '\n\n')
    // Normalize excessive horizontal whitespace
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function countWords(text) {
  if (!text || typeof text !== 'string') return 0;
  const words = text.trim().split(/\s+/);
  return words[0] === '' ? 0 : words.length;
}

module.exports = {
  sanitizeText,
  countWords,
};
