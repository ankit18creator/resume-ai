const assert = require('assert');
const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');
const apiRoutes = require('../routes/api');
const { extractTextFromFile } = require('../services/extractorService');
const { analyzeResumeLocally } = require('../services/localAnalyzerService');
const { validateAnalysisResult } = require('../utils/validator');

console.log('🧪 Starting ResumeAI Comprehensive Automated Test Suite...\n');

let testsPassed = 0;
let testsTotal = 0;

function runTest(name, fn) {
  testsTotal++;
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    testsPassed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
  }
}

async function runAsyncTest(name, fn) {
  testsTotal++;
  try {
    await fn();
    console.log(`  ✅ PASS: ${name}`);
    testsPassed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
  }
}

async function main() {
  // 1. Text Extraction & Sanitization
  console.log('📦 Testing Text Extraction:');
  const samplePath = path.join(__dirname, '..', '..', 'samples', 'Full_Stack_Engineer_Resume.txt');
  const sampleContent = fs.readFileSync(samplePath, 'utf8');

  await runAsyncTest('Extract plain text from file buffer', async () => {
    const mockFile = {
      buffer: Buffer.from(sampleContent),
      originalname: 'Full_Stack_Engineer_Resume.txt',
      mimetype: 'text/plain',
      size: sampleContent.length,
    };
    const result = await extractTextFromFile(mockFile);
    assert.strictEqual(result.fileName, 'Full_Stack_Engineer_Resume.txt');
    assert(result.wordCount > 100, `Expected word count > 100, got ${result.wordCount}`);
    assert(result.text.includes('David Miller'), 'Expected text to include candidate name');
  });

  await runAsyncTest('Reject empty or tiny file buffer', async () => {
    const mockEmpty = {
      buffer: Buffer.from('Too short'),
      originalname: 'empty.txt',
      mimetype: 'text/plain',
    };
    let threw = false;
    try {
      await extractTextFromFile(mockEmpty);
    } catch (e) {
      threw = true;
    }
    assert(threw, 'Should throw error on unreadable or tiny text');
  });

  // 2. Intelligent Local NLP Analyzer
  console.log('\n🧠 Testing Intelligent Local NLP Analyzer:');
  const jdPath = path.join(__dirname, '..', '..', 'samples', 'Target_Job_Description.txt');
  const jdContent = fs.readFileSync(jdPath, 'utf8');

  runTest('Analyze resume against JD with dynamic scoring', () => {
    const result = analyzeResumeLocally(sampleContent, jdContent, 'David_Miller.pdf');

    // Dynamic non-hardcoded scores
    assert(typeof result.overallScore === 'number', 'overallScore must be a number');
    assert(result.overallScore > 0 && result.overallScore <= 100, 'overallScore must be between 1 and 100');
    assert(result.atsScore >= 70, `Expected ATS score >= 70, got ${result.atsScore}`);
    assert(result.jobMatchScore > 0, 'jobMatchScore must be computed');

    // Contact detection
    assert.strictEqual(result.candidate.name, 'David Miller');
    assert.strictEqual(result.candidate.email, 'david.miller.tech@gmail.com');
    assert(result.candidate.linkedin.includes('davidmiller-dev'), 'LinkedIn should be detected');
    assert(result.candidate.github.includes('davidmiller-tech'), 'GitHub should be detected');

    // Skills cross-matching
    assert(result.matchingSkills.length > 0, 'Must have matching skills');
    assert(result.matchingSkills.includes('React'), 'React should match');
    assert(result.matchingSkills.includes('Postgresql'), 'Postgresql should match');
    assert(result.missingSkills.includes('Kubernetes'), 'Kubernetes should be detected as missing');

    // Section Analysis
    assert(result.sectionAnalysis.summary.score > 0, 'Summary score must exist');
    assert(result.sectionAnalysis.skills.score > 0, 'Skills score must exist');
    assert(result.sectionAnalysis.experience.score > 0, 'Experience score must exist');

    // Prioritized Recommendations
    assert(result.recommendations.length > 0, 'Recommendations must not be empty');
    assert(['High', 'Medium', 'Low'].includes(result.recommendations[0].priority), 'Priority must be High, Medium, or Low');
  });

  runTest('Analyze resume without JD (standalone ATS quality audit)', () => {
    const standaloneResult = analyzeResumeLocally(sampleContent, '', 'David_Miller.pdf');
    assert(standaloneResult.overallScore > 0, 'Overall score must be computed without JD');
    assert(standaloneResult.atsScore >= 70, 'ATS score should still be evaluated');
    assert(standaloneResult.candidate.name === 'David Miller');
  });

  // 3. Schema Validator
  console.log('\n🛡️ Testing Schema Validator:');
  runTest('Validate and clamp score boundary values', () => {
    const validated = validateAnalysisResult({
      overallScore: 120, // should clamp to 100
      atsScore: -15,     // should clamp to 0
      candidate: { name: 'Test User' },
      recommendations: [{ priority: 'Unknown', title: 'Test', description: 'Desc' }],
    });
    assert.strictEqual(validated.overallScore, 100);
    assert.strictEqual(validated.atsScore, 0);
    assert.strictEqual(validated.recommendations[0].priority, 'Medium');
  });

  // 4. HTTP API Endpoints
  console.log('\n🌐 Testing Express API Endpoints:');
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api', apiRoutes);

  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(5055, resolve));

  try {
    // Test GET /api/health
    await runAsyncTest('GET /api/health responds with status 200 and mode', async () => {
      const res = await fetch('http://localhost:5055/api/health');
      assert.strictEqual(res.status, 200);
      const json = await res.json();
      assert.strictEqual(json.status, 'online');
      assert.strictEqual(json.service, 'ResumeAI Engine');
    });

    // Test POST /api/analyze with JSON
    await runAsyncTest('POST /api/analyze processes JSON payload', async () => {
      const res = await fetch('http://localhost:5055/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: sampleContent,
          jobDescription: jdContent,
          fileName: 'Test_Resume.txt',
        }),
      });
      assert.strictEqual(res.status, 200);
      const json = await res.json();
      assert(json.success, 'Response success must be true');
      assert(json.data.overallScore > 0, 'overallScore must be generated');
      assert(json.data.matchingSkills.length > 0, 'matchingSkills must be present');
    });

    // Test Error Handling on empty text
    await runAsyncTest('POST /api/analyze returns 400 for empty resumeText', async () => {
      const res = await fetch('http://localhost:5055/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: 'Too short',
        }),
      });
      assert.strictEqual(res.status, 400);
      const json = await res.json();
      assert.strictEqual(json.success, false);
      assert(json.error.includes('too short'), 'Error message should explain length requirement');
    });
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }

  // Summary
  console.log('\n=========================================');
  console.log(`📊 Test Results: ${testsPassed}/${testsTotal} Passed (${Math.round((testsPassed / testsTotal) * 100)}%)`);
  console.log('=========================================\n');

  if (testsPassed === testsTotal) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
