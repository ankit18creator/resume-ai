const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

const SAMPLES_DIR = path.resolve(__dirname, '../../samples');

if (!fs.existsSync(SAMPLES_DIR)) {
  fs.mkdirSync(SAMPLES_DIR, { recursive: true });
}

// 1. Generate Valid PDF Resume
function generateSamplePdf() {
  const pdfFilePath = path.join(SAMPLES_DIR, 'Alex_Morgan_Senior_FullStack_Resume.pdf');
  
  const textLines = [
    'Alex Morgan',
    'Senior Full Stack & Cloud Software Engineer',
    'Email: alex.morgan@email.com | Phone: (555) 234-5678 | San Francisco, CA',
    'LinkedIn: linkedin.com/in/alexmorgan-dev | GitHub: github.com/alexmorgan-tech',
    '',
    'PROFESSIONAL SUMMARY',
    'Results-driven Senior Full Stack Engineer with 7+ years of experience designing and scaling resilient cloud applications, distributed microservices, and modern responsive user interfaces. Proven track record of reducing latency by 45% and mentoring junior engineers in best practices.',
    '',
    'CORE TECHNICAL SKILLS',
    'Languages & Frameworks: JavaScript, TypeScript, React, Node.js, Express, Python, Django, HTML5, CSS3, Tailwind CSS, Next.js',
    'Databases & Caching: PostgreSQL, MongoDB, Redis, MySQL, Elasticsearch',
    'Cloud & DevOps: AWS (ECS, Lambda, S3, RDS), Docker, Kubernetes, CI/CD, GitHub Actions, Terraform, Nginx',
    'Methodologies: Agile, Scrum, Microservices Architecture, TDD, RESTful APIs, GraphQL, System Design, Jest, Cypress',
    '',
    'PROFESSIONAL WORK EXPERIENCE',
    'TechFlow Solutions - San Francisco, CA',
    'Lead Full Stack Engineer (2021 - Present)',
    '- Architected and deployed multi-tenant SaaS application serving over 250,000 active monthly enterprise users with 99.98% uptime.',
    '- Spearheaded transition from monolith to containerized Docker & Kubernetes microservices on AWS, lowering cloud infrastructure costs by 32%.',
    '- Optimized slow relational database queries and integrated Redis caching layer, decreasing p99 response times from 850ms to 120ms.',
    '- Mentored 6 software engineers and introduced automated GitHub Actions CI/CD workflows, shortening sprint delivery cycles by 40%.',
    '',
    'NextGen Systems - Austin, TX',
    'Software Engineer (2018 - 2021)',
    '- Developed and maintained critical customer-facing dashboard features using React, Redux, Node.js, and PostgreSQL.',
    '- Designed and implemented secure RESTful endpoints and OAuth 2.0 authentication protocols protecting sensitive user records.',
    '- Increased automated unit and integration test coverage from 52% to 88% using Jest and Cypress.',
    '',
    'EDUCATION & CREDENTIALS',
    'University of California, Berkeley - B.S. in Computer Science (GPA: 3.8 / 4.0)',
    'Certifications: AWS Certified Solutions Architect Associate (2023), Certified Kubernetes Administrator (CKA, 2022)'
  ];

  let streamBody = 'BT\n/F1 12 Tf\n50 750 Td\n14 TL\n';
  for (const line of textLines) {
    if (line === '') {
      streamBody += 'T*\n';
    } else {
      const escaped = line.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
      streamBody += `(${escaped}) '\n`;
    }
  }
  streamBody += 'ET\n';

  const streamLength = Buffer.byteLength(streamBody, 'utf-8');

  const pdfDoc = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length ${streamLength} >>
stream
${streamBody}endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000240 00000 n 
0000000311 00000 n 
trailer
<< /Root 1 0 R /Size 6 >>
startxref
${400 + streamLength}
%%EOF
`;

  fs.writeFileSync(pdfFilePath, pdfDoc, 'utf-8');
  console.log('✅ Generated sample PDF:', pdfFilePath);
}

// 2. Generate Valid DOCX Resume
async function generateSampleDocx() {
  const docxFilePath = path.join(SAMPLES_DIR, 'Alex_Morgan_Senior_FullStack_Resume.docx');
  const zip = new JSZip();

  zip.file(
    '[Content_Types].xml',
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`
  );

  zip.file(
    '_rels/.rels',
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`
  );

  zip.file(
    'word/_rels/document.xml.rels',
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>`
  );

  const paragraphs = [
    'Alex Morgan',
    'Senior Full Stack & Cloud Software Engineer',
    'Email: alex.morgan@email.com | Phone: (555) 234-5678 | San Francisco, CA',
    'LinkedIn: linkedin.com/in/alexmorgan-dev | GitHub: github.com/alexmorgan-tech',
    '',
    'PROFESSIONAL SUMMARY',
    'Results-driven Senior Full Stack Engineer with 7+ years of experience designing and scaling resilient cloud applications, distributed microservices, and modern responsive user interfaces. Proven track record of reducing latency by 45% and mentoring junior engineers in best practices.',
    '',
    'CORE TECHNICAL SKILLS',
    'Languages & Frameworks: JavaScript, TypeScript, React, Node.js, Express, Python, Django, HTML5, CSS3, Tailwind CSS, Next.js',
    'Databases & Caching: PostgreSQL, MongoDB, Redis, MySQL, Elasticsearch',
    'Cloud & DevOps: AWS (ECS, Lambda, S3, RDS), Docker, Kubernetes, CI/CD, GitHub Actions, Terraform, Nginx',
    'Methodologies: Agile, Scrum, Microservices Architecture, TDD, RESTful APIs, GraphQL, System Design, Jest, Cypress',
    '',
    'PROFESSIONAL WORK EXPERIENCE',
    'TechFlow Solutions - San Francisco, CA',
    'Lead Full Stack Engineer (2021 - Present)',
    '- Architected and deployed multi-tenant SaaS application serving over 250,000 active monthly enterprise users with 99.98% uptime.',
    '- Spearheaded transition from monolith to containerized Docker & Kubernetes microservices on AWS, lowering cloud infrastructure costs by 32%.',
    '- Optimized slow relational database queries and integrated Redis caching layer, decreasing p99 response times from 850ms to 120ms.',
    '- Mentored 6 software engineers and introduced automated GitHub Actions CI/CD workflows, shortening sprint delivery cycles by 40%.',
    '',
    'NextGen Systems - Austin, TX',
    'Software Engineer (2018 - 2021)',
    '- Developed and maintained critical customer-facing dashboard features using React, Redux, Node.js, and PostgreSQL.',
    '- Designed and implemented secure RESTful endpoints and OAuth 2.0 authentication protocols protecting sensitive user records.',
    '- Increased automated unit and integration test coverage from 52% to 88% using Jest and Cypress.',
    '',
    'EDUCATION & CREDENTIALS',
    'University of California, Berkeley - B.S. in Computer Science (GPA: 3.8 / 4.0)',
    'Certifications: AWS Certified Solutions Architect Associate (2023), Certified Kubernetes Administrator (CKA, 2022)'
  ];

  const bodyXml = paragraphs
    .map((p) => `<w:p><w:r><w:t>${p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</w:t></w:r></w:p>`)
    .join('');

  zip.file(
    'word/document.xml',
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${bodyXml}
  </w:body>
</w:document>`
  );

  const buffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync(docxFilePath, buffer);
  console.log('✅ Generated sample DOCX:', docxFilePath);
}

async function main() {
  try {
    generateSamplePdf();
    await generateSampleDocx();
    console.log('✨ All sample resume files generated successfully!');
  } catch (err) {
    console.error('❌ Sample generator error:', err);
  }
}

main();
