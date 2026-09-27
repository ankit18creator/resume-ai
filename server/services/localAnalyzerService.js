/**
 * Intelligent Local NLP & Rule-Based Heuristic Analyzer.
 * Generates genuine, dynamic scores and tailored recommendations
 * based on actual resume text and job description matching.
 */

const COMMON_SKILLS = [
  // Languages
  'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'golang', 'go', 'rust', 'ruby', 'php',
  'swift', 'kotlin', 'sql', 'html', 'css', 'html5', 'css3', 'bash', 'shell', 'r', 'scala',
  // Frameworks & Libraries
  'react', 'react.js', 'vue', 'vue.js', 'angular', 'next.js', 'node.js', 'node', 'express', 'express.js',
  'django', 'flask', 'fastapi', 'spring', 'spring boot', 'asp.net', 'ruby on rails', 'tailwind', 'tailwind css',
  'bootstrap', 'redux', 'graphql', 'rest api', 'restful', 'pytorch', 'tensorflow', 'scikit-learn', 'pandas', 'numpy',
  // Cloud & DevOps
  'aws', 'amazon web services', 'azure', 'google cloud', 'gcp', 'docker', 'kubernetes', 'k8s', 'terraform',
  'ci/cd', 'github actions', 'jenkins', 'linux', 'nginx', 'helm', 'ansible', 'microservices', 'serverless',
  // Databases & Storage
  'postgresql', 'postgres', 'mysql', 'mongodb', 'redis', 'elasticsearch', 'sqlite', 'dynamodb', 'cassandra', 'firebase',
  // Methodologies & Tools
  'git', 'github', 'gitlab', 'agile', 'scrum', 'jira', 'unit testing', 'jest', 'cypress', 'tdd', 'system design',
  'oauth', 'websockets', 'kafka', 'rabbitmq', 'data structures', 'algorithms'
];

const ACTION_VERBS = [
  'spearheaded', 'developed', 'architected', 'engineered', 'implemented', 'optimized', 'orchestrated',
  'streamlined', 'designed', 'built', 'led', 'managed', 'mentored', 'scaled', 'delivered', 'automated',
  'revamped', 'deployed', 'collaborated', 'analyzed', 'reduced', 'increased', 'accelerated', 'established'
];

function extractContactInfo(text) {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/i;
  const phoneRegex = /(?:(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/;
  const linkedinRegex = /(?:linkedin\.com\/in\/[\w-]+)/i;
  const githubRegex = /(?:github\.com\/[\w-]+)/i;

  const emailMatch = text.match(emailRegex);
  const phoneMatch = text.match(phoneRegex);
  const linkedinMatch = text.match(linkedinRegex);
  const githubMatch = text.match(githubRegex);

  // Attempt to extract candidate name from the first few lines
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  let candidateName = 'Candidate';
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i];
    // Avoid lines that look like contact info or section headers
    if (
      !line.includes('@') &&
      !line.match(/\d{3}/) &&
      !line.toLowerCase().includes('resume') &&
      !line.toLowerCase().includes('curriculum') &&
      line.length >= 3 &&
      line.length <= 40 &&
      !line.includes('http')
    ) {
      candidateName = line;
      break;
    }
  }

  return {
    name: candidateName,
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
    linkedin: linkedinMatch ? linkedinMatch[0] : null,
    github: githubMatch ? githubMatch[0] : null,
  };
}

function detectSections(text) {
  const lower = text.toLowerCase();
  return {
    summary: lower.includes('summary') || lower.includes('profile') || lower.includes('objective') || lower.includes('about me'),
    experience: lower.includes('experience') || lower.includes('employment') || lower.includes('work history'),
    education: lower.includes('education') || lower.includes('academic') || lower.includes('degree') || lower.includes('university'),
    skills: lower.includes('skills') || lower.includes('technologies') || lower.includes('competencies') || lower.includes('stack'),
    projects: lower.includes('projects') || lower.includes('personal projects') || lower.includes('key initiatives'),
    certifications: lower.includes('certification') || lower.includes('licenses') || lower.includes('credentials'),
    achievements: lower.includes('achievement') || lower.includes('awards') || lower.includes('honors') || lower.includes('publications'),
  };
}

function extractSkills(text) {
  const lower = text.toLowerCase();
  const detected = [];
  for (const skill of COMMON_SKILLS) {
    // Exact word boundary matching or escaped boundary for special chars like c++
    const escaped = skill.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
    const regex = new RegExp(`(^|[^a-zA-Z0-9#+])${escaped}(?![a-zA-Z0-9#+])`, 'i');
    if (regex.test(lower)) {
      // Normalize skill name to display format
      const display = skill
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      if (!detected.includes(display)) {
        detected.push(display);
      }
    }
  }
  return detected;
}

function extractKeywordsFromJD(jdText) {
  if (!jdText || jdText.trim().length === 0) return [];
  const lower = jdText.toLowerCase();
  const words = lower.match(/[a-zA-Z0-9+#.-]{3,}/g) || [];
  const stopWords = new Set([
    'with', 'that', 'this', 'from', 'have', 'will', 'your', 'about', 'team', 'work',
    'years', 'plus', 'role', 'must', 'should', 'able', 'responsibilities', 'qualifications',
    'requirements', 'looking', 'join', 'company', 'experience', 'knowledge', 'understanding',
    'working', 'environment', 'building', 'support', 'skills', 'including', 'across'
  ]);

  const freq = {};
  for (const w of words) {
    if (!stopWords.has(w) && w.length >= 3 && !/^\d+$/.test(w)) {
      freq[w] = (freq[w] || 0) + 1;
    }
  }

  // Also include domain skills in JD
  const jdSkills = extractSkills(jdText).map((s) => s.toLowerCase());
  for (const s of jdSkills) {
    freq[s] = (freq[s] || 0) + 5;
  }

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(([word]) => word);
}

function analyzeResumeLocally(resumeText, jobDescription = '', fileName = 'resume.pdf') {
  const contact = extractContactInfo(resumeText);
  const sections = detectSections(resumeText);
  const resumeSkills = extractSkills(resumeText);
  const lowerResume = resumeText.toLowerCase();
  const wordCount = resumeText.trim().split(/\s+/).length;

  // 1. Action Verbs & Metrics Analysis
  let actionVerbCount = 0;
  const foundVerbs = [];
  for (const verb of ACTION_VERBS) {
    const regex = new RegExp(`\\b${verb}\\b`, 'i');
    if (regex.test(lowerResume)) {
      actionVerbCount++;
      foundVerbs.push(verb);
    }
  }

  // Look for quantifiable impact (%, $, numbers, metrics)
  const metricsMatches = resumeText.match(/\b(\d+[\d,.]*\%|\$[\d,.]+[kmbKMB]?|\d+\+?\s*(users|clients|customers|requests|transactions|ms|seconds|minutes|hours|days|years|team members|engineers|microservices|servers))\b/gi) || [];
  const metricsCount = metricsMatches.length;

  // 2. ATS Score Calculation
  let atsScore = 55;
  if (contact.email) atsScore += 8;
  if (contact.phone) atsScore += 7;
  if (contact.linkedin || contact.github) atsScore += 5;

  if (sections.experience) atsScore += 8;
  if (sections.education) atsScore += 7;
  if (sections.skills) atsScore += 6;
  if (sections.summary) atsScore += 4;
  if (sections.projects) atsScore += 5;

  // Word count penalty / bonus
  if (wordCount >= 350 && wordCount <= 1000) {
    atsScore += 5;
  } else if (wordCount < 250) {
    atsScore -= 12;
  } else if (wordCount > 1400) {
    atsScore -= 8;
  }

  // Formatting penalty for excessive weird symbols
  const nonAsciiCount = (resumeText.match(/[^\x20-\x7E\t\n\r]/g) || []).length;
  if (nonAsciiCount > 50) {
    atsScore -= 8;
  }

  atsScore = Math.max(25, Math.min(98, Math.round(atsScore)));

  // 3. Job Match Analysis
  let jobMatchScore = 75;
  let skillsMatch = 75;
  let keywordMatch = 70;
  let matchingSkills = [];
  let missingSkills = [];
  let matchingKeywords = [];
  let missingKeywords = [];
  let importantKeywords = [];

  const hasJD = Boolean(jobDescription && jobDescription.trim().length > 20);

  if (hasJD) {
    const jdSkills = extractSkills(jobDescription);
    const jdKeywords = extractKeywordsFromJD(jobDescription);

    importantKeywords = jdKeywords.slice(0, 10).map((k) => k.toUpperCase());

    // Skills match
    const lowerResumeSkills = resumeSkills.map((s) => s.toLowerCase());
    for (const skill of jdSkills) {
      if (lowerResumeSkills.includes(skill.toLowerCase()) || lowerResume.includes(skill.toLowerCase())) {
        matchingSkills.push(skill);
      } else {
        missingSkills.push(skill);
      }
    }

    if (jdSkills.length > 0) {
      skillsMatch = Math.round((matchingSkills.length / jdSkills.length) * 100);
    } else {
      skillsMatch = Math.min(90, Math.round(resumeSkills.length * 6));
    }

    // Keyword match
    for (const kw of jdKeywords) {
      if (lowerResume.includes(kw.toLowerCase())) {
        matchingKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    }

    if (jdKeywords.length > 0) {
      keywordMatch = Math.round((matchingKeywords.length / jdKeywords.length) * 100);
    }

    jobMatchScore = Math.round(skillsMatch * 0.55 + keywordMatch * 0.45);
  } else {
    // If no JD, evaluate standard technical depth
    skillsMatch = Math.min(92, Math.max(45, Math.round(resumeSkills.length * 5.5)));
    keywordMatch = Math.min(88, Math.max(50, Math.round(actionVerbCount * 5 + metricsCount * 4)));
    jobMatchScore = Math.round(skillsMatch * 0.5 + keywordMatch * 0.5);
    matchingSkills = resumeSkills.slice(0, 10);
    missingSkills = ['Add Job Description to see missing skills'];
    matchingKeywords = foundVerbs.slice(0, 8);
    missingKeywords = ['Target specific job description keywords'];
    importantKeywords = ['Job Description Required'];
  }

  // 4. Overall Score Calculation
  const impactBonus = Math.min(15, metricsCount * 3) + Math.min(10, actionVerbCount * 1.5);
  let overallScore;

  if (hasJD) {
    overallScore = Math.round(jobMatchScore * 0.45 + atsScore * 0.35 + (impactBonus / 25) * 20);
  } else {
    overallScore = Math.round(atsScore * 0.55 + skillsMatch * 0.25 + (impactBonus / 25) * 20);
  }

  overallScore = Math.max(30, Math.min(96, overallScore));

  // 5. Strengths & Weaknesses
  const strengths = [];
  const weaknesses = [];

  if (sections.experience) strengths.push('Clear and identifiable professional experience section.');
  if (sections.education) strengths.push('Formal education credentials clearly detailed.');
  if (contact.email && contact.phone) strengths.push('Direct contact information (email and phone number) prominently available.');
  if (contact.linkedin || contact.github) strengths.push('Online professional profiles (LinkedIn/GitHub) present for portfolio validation.');
  if (metricsCount >= 3) {
    strengths.push(`Strong use of quantifiable metrics (${metricsCount} measurable outcomes detected).`);
  } else {
    weaknesses.push('Few quantifiable metrics found. Strengthen bullets with numbers, percentages, or scale.');
  }

  if (actionVerbCount >= 5) {
    strengths.push('Effective usage of dynamic action verbs across experience bullets.');
  } else {
    weaknesses.push('Relies on passive or generic phrasing. Begin bullet points with strong action verbs.');
  }

  if (resumeSkills.length >= 8) {
    strengths.push(`Rich skill catalog with ${resumeSkills.length} identified technical competencies.`);
  } else {
    weaknesses.push('Technical skills list is lean. Group skills into clear categories (Languages, Frameworks, Cloud, Tools).');
  }

  if (!sections.summary) weaknesses.push('Missing a targeted Professional Summary at the top of the resume.');
  if (wordCount < 300) weaknesses.push(`Resume is relatively brief (${wordCount} words). Add context to your impact and projects.`);
  if (wordCount > 1100) weaknesses.push(`Resume exceeds ideal length (${wordCount} words). Aim for a focused 1 to 2 pages.`);

  if (hasJD && missingSkills.length > 0) {
    weaknesses.push(`Missing ${missingSkills.length} key skills listed in the target job description.`);
  }

  // 6. Section Analysis
  const sectionAnalysis = {
    summary: {
      score: sections.summary ? 82 : 45,
      good: sections.summary
        ? ['Summary section found providing context on career trajectory.']
        : [],
      improvements: sections.summary
        ? ['Ensure summary highlights years of experience and top 3 domain specialties.']
        : ['Add a 3-4 sentence professional summary tailored to the target role.'],
    },
    skills: {
      score: Math.min(95, Math.max(50, resumeSkills.length * 6)),
      good: resumeSkills.length > 0
        ? [`Detected ${resumeSkills.length} key technical skills including ${resumeSkills.slice(0, 4).join(', ')}.`]
        : [],
      improvements: [
        'Organize skills by category: Languages, Frameworks/Libraries, Cloud & DevOps, Databases.',
        hasJD && missingSkills.length > 0 ? `Consider adding: ${missingSkills.slice(0, 3).join(', ')} if proficient.` : 'Keep skills updated to the latest industry standards.',
      ],
    },
    experience: {
      score: sections.experience ? (metricsCount >= 3 ? 88 : 72) : 40,
      good: sections.experience
        ? ['Chronological work history gives recruiters clear timeline context.', `${actionVerbCount} action verbs detected.`]
        : [],
      improvements: [
        metricsCount < 3
          ? 'Use the Google XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]".'
          : 'Maintain consistent bullet lengths and avoid orphan lines.',
        'Focus on business impact and scale rather than day-to-day task descriptions.',
      ],
    },
    education: {
      score: sections.education ? 88 : 50,
      good: sections.education
        ? ['Academic background is recognizable by ATS crawlers.']
        : [],
      improvements: sections.education
        ? ['Include graduation year, GPA (if > 3.5), relevant coursework, or academic honors.']
        : ['Add an Education section with institution name, degree, and graduation date.'],
    },
    projects: {
      score: sections.projects ? 85 : 60,
      good: sections.projects
        ? ['Project showcase demonstrates practical application of modern tooling.']
        : [],
      improvements: sections.projects
        ? ['Include live URLs, GitHub repositories, and tech stack tags for each project.']
        : ['Add 2-3 notable projects highlighting recent tech stack proficiencies.'],
    },
    certifications: {
      score: sections.certifications ? 85 : 55,
      good: sections.certifications
        ? ['Professional credentials validate specialized technical knowledge.']
        : [],
      improvements: sections.certifications
        ? ['List issuing organization and expiration/credential ID.']
        : ['Consider acquiring cloud or specialized certifications (e.g. AWS, Azure, CKA).'],
    },
    achievements: {
      score: sections.achievements ? 84 : 58,
      good: sections.achievements
        ? ['Awards and publications highlight standout personal performance.']
        : [],
      improvements: sections.achievements
        ? ['Highlight competition wins, patents, open-source contributions, or promotions.']
        : ['Integrate key career milestones and awards into your experience bullets.'],
    },
  };

  // 7. Actionable Recommendations
  const recommendations = [];

  if (hasJD && missingSkills.length > 0) {
    recommendations.push({
      priority: 'High',
      title: 'Integrate Core Job Description Skills',
      description: `The job description highlights ${missingSkills.slice(0, 4).join(', ')}. If you have experience with these tools, integrate them naturally into your experience bullet points and skills list.`,
      example: `Example: "Architected modern microservices utilizing ${missingSkills[0] || 'the target framework'} and deployed via containerized CI/CD pipelines."`,
    });
  }

  if (metricsCount < 4) {
    recommendations.push({
      priority: 'High',
      title: 'Quantify Bullet Points with Metrics',
      description: 'Recruiters and ATS favor quantifiable achievements over passive duty lists. Quantify team sizes, latency improvements, cost savings, or throughput.',
      example: 'Rewrite: "Helped optimize database queries" → "Refactored PostgreSQL indexing and queries, cutting API response latency by 42% across 1.2M daily requests."',
    });
  }

  if (!sections.summary) {
    recommendations.push({
      priority: 'Medium',
      title: 'Add a 3-Sentence Professional Summary',
      description: 'A punchy summary at the top helps human reviewers grasp your value proposition in under 6 seconds.',
      example: 'Example: "Results-driven Full Stack Engineer with 4+ years building high-throughput web applications in React and Node.js. Proven track record reducing system downtime and mentoring junior engineers."',
    });
  }

  recommendations.push({
    priority: 'Medium',
    title: 'Optimize ATS Header Hierarchy',
    description: 'Use standard, universally recognizable section headers (e.g., "Work Experience", "Education", "Skills") to ensure flawless parsing by legacy Applicant Tracking Systems.',
    example: 'Avoid fancy graphical headers, text boxes, tables, or column splits in your PDF layout.',
  });

  recommendations.push({
    priority: 'Low',
    title: 'Verify Hyperlinks and Profiles',
    description: 'Ensure all GitHub repositories, LinkedIn profile, and live portfolio URLs are clean and clickable in PDF export format.',
    example: 'Format: "github.com/username" or "linkedin.com/in/username" without tracking parameters.',
  });

  return {
    overallScore,
    atsScore,
    jobMatchScore,
    skillsMatch,
    keywordMatch,
    candidate: {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      location: null,
      linkedin: contact.linkedin,
      github: contact.github,
      summary: sections.summary ? 'Detected in resume' : 'No explicit summary section found',
      education: sections.education ? ['Detected in resume'] : [],
      experience: sections.experience ? ['Detected in resume'] : [],
      skills: resumeSkills,
    },
    strengths,
    weaknesses,
    matchingSkills: matchingSkills.length > 0 ? matchingSkills : resumeSkills.slice(0, 8),
    missingSkills,
    matchingKeywords: matchingKeywords.slice(0, 15),
    missingKeywords: missingKeywords.slice(0, 15),
    importantKeywords: importantKeywords.slice(0, 10),
    sectionAnalysis,
    recommendations,
    isDemoMode: true,
    analyzedAt: new Date().toISOString(),
  };
}

module.exports = {
  analyzeResumeLocally,
  extractSkills,
  extractContactInfo,
};
