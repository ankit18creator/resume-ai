const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const apiRoutes = require('./routes/api');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || origin.startsWith('http://localhost:')) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api', apiRoutes);

// Root greeting
app.get('/', (req, res) => {
  res.json({
    name: 'ResumeAI Backend API',
    version: '1.0.0',
    status: 'running',
    docs: '/api/health',
  });
});

// Multer and general error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File size exceeds the 10MB limit. Please upload a smaller file.',
      });
    }
    return res.status(400).json({
      success: false,
      error: `File upload error: ${err.message}`,
    });
  }

  if (err) {
    console.error('Unhandled server error:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Internal server error occurred.',
    });
  }

  next();
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 ResumeAI Server is running on port ${PORT}`);
  console.log(`📍 Endpoint: http://localhost:${PORT}/api`);
  console.log(`🔑 OpenAI Key: ${process.env.OPENAI_API_KEY ? 'Configured ✅' : 'Missing (Operating in Demo Mode) ⚠️'}`);
  console.log(`=========================================`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please terminate the process or configure PORT in .env.`);
  } else {
    console.error('❌ Server startup error:', err);
  }
});
