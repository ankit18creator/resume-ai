/**
 * Sample resumes and job descriptions for instant testing and demonstration.
 */

export const SAMPLE_DATA_PRESETS = [
  {
    id: 'fullstack',
    title: 'Senior Full Stack Engineer',
    category: 'Engineering',
    fileName: 'Alex_Chen_Staff_Engineer.pdf',
    resumeText: `Alex Chen
San Francisco, CA | alex.chen.dev@gmail.com | (415) 890-3421
linkedin.com/in/alexchen-dev | github.com/alexchen-code

PROFESSIONAL SUMMARY
Senior Full Stack Engineer with 6+ years of experience building resilient distributed web systems, high-throughput microservices, and modern frontend interfaces. Architected cloud-native services processing 10M+ daily operations while decreasing p99 latency by 38%. Proficient in React, TypeScript, Node.js, and AWS.

WORK EXPERIENCE
Senior Software Engineer | Stripe-backed FinTech Platform (2022 – Present)
- Spearheaded the redesign of the core transaction settlement engine using Node.js, TypeScript, and PostgreSQL, scaling payment capacity to $25M monthly volume.
- Reduced frontend bundle size by 44% and improved Google Lighthouse performance from 62 to 96 across React customer portals.
- Architected automated CI/CD deployment pipelines on AWS ECS and Docker, reducing release cycle time from 3 hours to 12 minutes.
- Mentored 5 mid-level software engineers on clean architecture, unit testing with Jest, and resilient system design.

Software Engineer | CloudScale Systems (2019 – 2022)
- Engineered scalable RESTful and GraphQL APIs using Express.js and MongoDB, serving over 1.2M active mobile and web clients.
- Implemented multi-tier Redis caching infrastructure, cutting database read loads by 52%.
- Collaborated in cross-functional Agile/Scrum teams to ship 14 major product feature milestones on schedule.

EDUCATION
B.S. in Computer Science | University of California, Berkeley (2015 – 2019)
- Honors: Dean's Honor List, Magna Cum Laude. Coursework: Distributed Systems, Algorithms, Database Internals.

SKILLS
Languages: JavaScript, TypeScript, Python, SQL, HTML5, CSS3, Bash
Frameworks & Libraries: React, Next.js, Node.js, Express, Redux, Tailwind CSS, Jest
Cloud & Databases: AWS (ECS, S3, RDS, Lambda), Docker, PostgreSQL, Redis, MongoDB, GraphQL
Tools & Methodologies: Git, GitHub Actions, CI/CD, Agile, Scrum, Microservices, REST APIs

PROJECTS
HyperMetrics: Real-time distributed telemetry dashboard built with React, WebSockets, and Redis. Starred by 850+ developers on GitHub.
DevVault: Open-source secret management CLI written in Go and Node.js with automated Docker test suites.
`,
    jobDescription: `We are seeking an exceptional Senior Full Stack Engineer to join our Core Platform team.

Responsibilities:
- Build and maintain mission-critical web applications and APIs using React, TypeScript, Node.js, and PostgreSQL.
- Architect scalable microservices deployed on AWS using Docker and Kubernetes.
- Drive engineering excellence through automated testing (Jest/Cypress), CI/CD pipelines, and code reviews.
- Collaborate closely with product managers, designers, and infrastructure teams.

Requirements:
- 5+ years of software engineering experience in modern JavaScript/TypeScript ecosystems.
- Deep expertise in React, Node.js, and relational databases (PostgreSQL preferred).
- Hands-on experience with containerization (Docker), orchestration (Kubernetes), and AWS cloud services.
- Familiarity with GraphQL, Redis, and message queues (Kafka or RabbitMQ) is a strong plus.
- Bachelor's degree in Computer Science or equivalent practical experience.
`,
  },
  {
    id: 'devops',
    title: 'Cloud & DevOps Engineer',
    category: 'Cloud / Infrastructure',
    fileName: 'Maya_Patel_DevOps_Resume.pdf',
    resumeText: `Maya Patel
Seattle, WA | maya.patel.cloud@outlook.com | (206) 555-0194
linkedin.com/in/mayapatel-cloud | github.com/mayapatel-ops

PROFESSIONAL SUMMARY
DevOps & Cloud Infrastructure Engineer with 4+ years specializing in automated cloud migrations, Kubernetes cluster orchestration, and Infrastructure-as-Code (Terraform). Cut enterprise AWS infrastructure spend by 28% while achieving 99.99% uptime across production workloads.

PROFESSIONAL EXPERIENCE
DevOps Engineer | Nexus Cloud Technologies (2021 – Present)
- Automated provisioning of multi-region AWS environments using Terraform and Ansible, managing over 200 EC2 instances and EKS clusters.
- Configured end-to-end GitOps delivery workflows with ArgoCD and GitHub Actions, enabling 40+ daily deployments with zero downtime.
- Deployed comprehensive observability stack using Prometheus, Grafana, and ELK, reducing Mean Time to Detection (MTTD) by 60%.
- Conducted regular security audits and implemented AWS IAM least-privilege policies and Vault secret rotation.

Systems Administrator | Apex Solutions (2019 – 2021)
- Managed hybrid Linux and Windows server environments supporting 800+ internal employees.
- Scripted automated backup and disaster recovery procedures using Python and Bash, saving 15 hours of manual sysadmin effort weekly.

EDUCATION
B.S. in Information Technology | University of Washington (2015 – 2019)

SKILLS
Cloud: AWS (EKS, EC2, VPC, S3, CloudFront), Google Cloud Platform (GCP)
DevOps & IaC: Terraform, Docker, Kubernetes, Helm, Ansible, GitHub Actions, Jenkins
Monitoring & Tools: Prometheus, Grafana, Datadog, Linux, Bash, Python, Git, Nginx
Certifications: AWS Certified Solutions Architect – Associate (2023), CKA (Certified Kubernetes Administrator)
`,
    jobDescription: `Lead Cloud Infrastructure Engineer needed to drive global cloud resilience.

Key Requirements:
- 4+ years managing cloud infrastructure on AWS or GCP.
- Expert knowledge of Kubernetes (EKS/GKE), Docker, and Helm charts.
- Strong mastery of Infrastructure as Code using Terraform.
- Proficiency in Python and Bash scripting for systems automation.
- Proven experience setting up CI/CD pipelines (GitHub Actions, GitLab CI) and monitoring with Prometheus/Grafana.
`,
  },
  {
    id: 'junior',
    title: 'Junior Web Developer (Improvement Example)',
    category: 'Junior / Entry',
    fileName: 'Jordan_Taylor_Junior_Dev.pdf',
    resumeText: `Jordan Taylor
Austin, TX | jordan.t.dev@email.com
github.com/jordantaylor

OBJECTIVE
Motivated software developer looking for a junior developer position at an innovative tech company.

EXPERIENCE
Web Developer Intern | Austin Tech Startup (Summer 2023)
- Worked on company website using HTML, CSS, and basic JavaScript.
- Fixed various bugs and updated text content.
- Helped the team with daily standups.

Freelance Web Developer (2022 – 2023)
- Built landing pages for local small businesses using WordPress and HTML.
- Communicated with clients regarding design preferences.

EDUCATION
B.A. in Digital Media | Texas State University (2023)

SKILLS
HTML, CSS, JavaScript, WordPress, Git, Photoshop
`,
    jobDescription: `Junior Frontend Developer:
Seeking a developer with knowledge of React, Modern JavaScript (ES6+), CSS/Tailwind, and Git.
Candidates should have experience building interactive web applications, utilizing REST APIs, and writing clean, maintainable code.
`,
  },
];
