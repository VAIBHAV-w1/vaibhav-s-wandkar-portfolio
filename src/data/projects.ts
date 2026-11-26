/**
 * Centralized project showcase — ordered strictly 01 → 08 as specified.
 * Never sort automatically by date, category or technology.
 *
 * Verification status (checked against github.com/VAIBHAV-w1):
 * - 01 DeepVision: Django >=5.2,<5.3, React + Vite, OpenCV, YOLO11n, PyTorch, ByteTrack, SQLite + PostgreSQL/Supabase DDL. Live demo HTTP 200 at https://vsw-deepvision.vercel.app/.
 * - 02 CyberShield: Node.js, Express, React 18, Vite, Tailwind CSS, MongoDB, Supabase, JWT, Nodemailer. Listed Vercel URL returned 404, so no live demo is shown.
 * - 03 Cropify: Python, FastAPI 0.135.3, Uvicorn, Scikit-learn 1.6.1, NumPy, SciPy, React 19, TypeScript, Vite, Tailwind CSS, Leaflet. Collaborative repo.
 * - 04 Decentralized Voting System: Solidity, Hardhat, Ethers.js, Node.js, Express, Prisma (SQLite/PostgreSQL), Socket.io, React 19, TypeScript, Tailwind CSS. Fork/collaborative repo.
 * - 05 Retino: Python, PyTorch, PyTorch Lightning, FastAPI, Uvicorn, Gradio, Scikit-learn, React 19, Vite. Fork/study repo; upstream demo omitted.
 * - 06 Lost and Found Tracking System: Python 3.11, Django >=5.2.6, SQLite, HTML, CSS, JavaScript, Leaflet.js, gettext i18n.
 * - 07 AI-Based Resume Screening: Python, Flask, Scikit-learn, NLTK, spaCy, BERT extractive summarizer, pdfminer.six, python-docx.
 * - 08 Hospital Management System: Python, Django 5.0.3, SQLite, HTML, CSS, JavaScript.
 */

export type FilterId = 'django-backend' | 'ai-vision' | 'security' | 'web' | 'blockchain'

export const projectFilters: { id: 'all' | FilterId; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'django-backend', label: 'Django & Backend' },
  { id: 'ai-vision', label: 'AI & Vision' },
  { id: 'security', label: 'Security' },
  { id: 'web', label: 'Web' },
  { id: 'blockchain', label: 'Blockchain' },
]

export type ProjectStatus = 'Ongoing' | 'Completed' | 'Research' | 'Internship project'

export type ArtVariant = 'vision' | 'shield' | 'field' | 'vote' | 'retino' | 'map' | 'document' | 'pulse'

export interface ProjectImage {
  src: string
  srcSet: string
  width: number
  height: number
  alt: string
  caption: string
}

export interface Project {
  slug: string
  index: string
  title: string
  alias?: string
  category: string
  filters: FilterId[]
  status: ProjectStatus
  period?: string
  context?: string
  visualType: 'screenshot' | 'illustration'
  summary: string
  description: string[]
  contribution: string
  highlightsLabel: string
  highlights: string[]
  pending?: { label: string; items: string[] }
  stack: string[]
  repo: string
  demo?: string
  linkNote?: string
  art: ArtVariant
  image?: ProjectImage
}

const gh = (repo: string) => `https://github.com/VAIBHAV-w1/${repo}`

export const projects: Project[] = [
  {
    slug: 'deepvision',
    index: '01',
    title: 'DeepVision',
    category: 'Django / Python AI Surveillance',
    filters: ['django-backend', 'ai-vision', 'security', 'web'],
    status: 'Ongoing',
    period: 'Mar 2026 – Ongoing',
    visualType: 'screenshot',
    summary:
      'A decoupled intelligent surveillance platform pairing a Django 5.2 REST backend and 18-table relational database with an OpenCV + YOLO11n + ByteTrack vision pipeline and React SPA.',
    description: [
      'DeepVision separates a Vercel-hosted React single-page interface from a Django 5.2 backend and an in-process Python computer-vision core. Frames captured via OpenCV / DirectShow are processed with YOLO11n on PyTorch and tracked across frames using ByteTrack.',
      'The Django layer manages 18 relational tables across SQLite and Supabase PostgreSQL migration tooling, signed-cookie sessions, PBKDF2 password hashing, rate-limited 6-digit OTP verification, HTTP 206 MP4 range playback and incident-scoped forensic case files.',
    ],
    contribution:
      'Designed and implemented the Django 5.2 application architecture, relational schema and SQLite-to-PostgreSQL migration pipeline, PBKDF2/OTP authentication, OpenCV/YOLO11n/ByteTrack worker loop, React SPA and hardened Docker deployment.',
    highlightsLabel: 'Implemented Capabilities',
    highlights: [
      'Django 5.2 REST gateway with 18 relational tables and Supabase PostgreSQL schema DDL + migration script.',
      'PBKDF2 password hashing, signed-cookie sessions, CSRF protection and rate-limited 6-digit OTP verification.',
      'Three camera modes: browser webcam, OpenCV/DirectShow edge bridge to YOLO11n + ByteTrack, and synthetic calibration feed.',
      'Incident-scoped forensic workspace with evidence snapshots, MP4 range playback, notes and timeline.',
      'Hardened non-root Docker container and Vercel-deployed React SPA.',
    ],
    pending: {
      label: 'In Progress',
      items: [
        'Moving the Django REST gateway from local Docker to a persistent cloud host.',
        'Completing production cut-over to Supabase PostgreSQL and storage buckets.',
      ],
    },
    stack: ['Python', 'Django 5.2', 'SQLite', 'PostgreSQL', 'Supabase', 'OpenCV', 'YOLO11n', 'PyTorch', 'ByteTrack', 'React', 'Vite', 'Docker', 'Vercel'],
    repo: gh('DeepVision'),
    demo: 'https://vsw-deepvision.vercel.app/',
    art: 'vision',
    image: {
      src: '/projects/deepvision-1600.webp',
      srcSet: '/projects/deepvision-900.webp 900w, /projects/deepvision-1600.webp 1600w',
      width: 1600,
      height: 900,
      alt: 'DeepVision sign-in screen showing the AI-Based Intelligent Surveillance System interface.',
      caption: 'Actual application screenshot — DeepVision login & feature overview.',
    },
  },
  {
    slug: 'cybershield',
    index: '02',
    title: 'CyberShield',
    category: 'Cybersecurity Toolkit & Backend API',
    filters: ['django-backend', 'security', 'web'],
    status: 'Completed',
    period: 'Jan 2026 – Apr 2026',
    visualType: 'screenshot',
    summary:
      'A full-stack cybersecurity toolkit with Express REST APIs, JWT + email OTP authentication, phishing URL scanning, password strength evaluation and threat monitoring.',
    description: [
      'CyberShield consolidates practical security utilities behind an authenticated Node.js and Express backend. Users verify accounts via email-delivered OTPs and JWT sessions before accessing phishing link analysis, password strength checks, file encryption tools and an AI security advisor.',
      'The backend enforces rate-limiting, Helmet security headers, bcryptjs credential hashing and database persistence with MongoDB and Supabase.',
    ],
    contribution:
      'Built the Express API routes, JWT + Nodemailer OTP authentication flow, password and phishing analysis endpoints, file encryption helpers and React + Tailwind CSS dashboard.',
    highlightsLabel: 'Implemented Features',
    highlights: [
      'JWT-based authentication integrated with email-delivered OTP verification.',
      'Phishing URL scanner, password strength analyser and file encryption endpoints.',
      'Rate-limiting, Helmet security headers and bcryptjs credential hashing.',
      'Threat monitoring dashboard with honeypot alerts and AI security advisor.',
    ],
    stack: ['Node.js', 'Express', 'React 18', 'Vite', 'Tailwind CSS', 'MongoDB', 'Supabase', 'JWT', 'Nodemailer'],
    repo: gh('CyberShield'),
    linkNote: 'The Vercel deployment URL listed on the repository currently returns HTTP 404, so no live demo is linked.',
    art: 'shield',
    image: {
      src: '/projects/cybershield-1600.webp',
      srcSet: '/projects/cybershield-900.webp 900w, /projects/cybershield-1600.webp 1600w',
      width: 1600,
      height: 900,
      alt: 'CyberShield authentication portal screenshot showing shield branding and sign-in form.',
      caption: 'Actual application screenshot — CyberShield authentication portal.',
    },
  },
  {
    slug: 'cropify',
    index: '03',
    title: 'Cropify',
    alias: 'KisanAI',
    category: 'Python FastAPI / Agricultural AI',
    filters: ['django-backend', 'ai-vision', 'web'],
    status: 'Ongoing',
    period: 'Mar 2026 – Ongoing',
    context: 'Team project',
    visualType: 'illustration',
    summary:
      'A Python FastAPI and React + TypeScript advisory platform turning soil nutrients, field telemetry and live weather data into crop, fertility and irrigation guidance.',
    description: [
      'Cropify pairs a FastAPI machine-learning server (cropify-ml-server) with a React + TypeScript interface (cropify-web-interface). Pre-trained Scikit-learn models serve crop recommendations, soil fertility regression and irrigation advisories.',
      'The backend integrates with OpenWeatherMap by city name or GPS coordinates so recommendations adapt to live temperature, humidity and rainfall conditions.',
    ],
    contribution:
      'Collaborative team build contributing to the FastAPI ML endpoints, Scikit-learn model integration and React + TypeScript advisory interface.',
    highlightsLabel: 'Implemented Features',
    highlights: [
      'FastAPI (0.135.3) + Uvicorn ML backend with modular routers and external weather service integration.',
      'Crop recommendation Random Forest classifier using N, P, K, pH and environmental metrics.',
      'Soil fertility Random Forest regressor using NDVI, soil moisture and elevation.',
      'Irrigation advisory classifier across 19 field parameters plus disease upload workflow.',
    ],
    pending: {
      label: 'Planned Enhancements',
      items: [
        'Deep-learning based crop disease detection.',
        'IoT sensor integration, satellite support and multilingual voice assistant.',
      ],
    },
    stack: ['Python', 'FastAPI', 'Uvicorn', 'Scikit-learn', 'NumPy', 'SciPy', 'React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Leaflet'],
    repo: gh('Cropify'),
    art: 'field',
  },
  {
    slug: 'decentralized-voting',
    index: '04',
    title: 'Decentralized Voting System',
    category: 'Blockchain & Full-Stack Web',
    filters: ['blockchain', 'security', 'web'],
    status: 'Completed',
    context: 'Collaborative repository',
    visualType: 'illustration',
    summary:
      'A hybrid blockchain voting platform combining an Express + Prisma backend and SHA-256 OTP authentication with Ethereum Sepolia smart contracts and real-time Socket.io tallying.',
    description: [
      'The Decentralized Voting System pairs a TypeScript Node.js/Express backend (with Prisma ORM over SQLite/PostgreSQL, Zod validation and JWT + SHA-256 OTP sessions) with Solidity smart contracts on Ethereum Sepolia via Hardhat and Ethers.js.',
      'Voters are decoupled from ballots via keccak256 cryptographic hashing, one-person-one-vote constraints are enforced at both database and contract layers, and live vote tallies stream via Socket.io and Chart.js.',
    ],
    contribution:
      'Forked and studied team repository featuring Express + Prisma backend APIs, Solidity smart contract voting logic, Socket.io live updates and React + TypeScript client.',
    highlightsLabel: 'System Capabilities',
    highlights: [
      'Immutable vote storage on Ethereum (Sepolia) via Solidity smart contracts and Ethers.js v6.',
      'One-person-one-vote enforcement across Prisma database locks and smart-contract mapping.',
      'Passwordless SHA-256 OTP + JWT authentication and keccak256 voter-ballot decoupling.',
      'Real-time election tallies via Socket.io and Chart.js admin controls.',
    ],
    stack: ['Solidity', 'Hardhat', 'Ethers.js', 'Node.js', 'Express', 'Prisma', 'SQLite', 'PostgreSQL', 'Socket.io', 'React 19', 'TypeScript', 'Tailwind CSS'],
    repo: gh('Decentralized_Voting_System'),
    art: 'vote',
  },
  {
    slug: 'retino',
    index: '05',
    title: 'Retino',
    category: 'Medical AI / Diabetic Retinopathy',
    filters: ['ai-vision', 'web'],
    status: 'Research',
    context: 'Deep learning study & full-stack wrapper',
    visualType: 'illustration',
    summary:
      'A diabetic retinopathy detection pipeline built around PyTorch Lightning transfer learning, multiprocessing dataset preparation, FastAPI inference and a React + Vite frontend.',
    description: [
      'Retino explores scalable preprocessing and transfer-learning pipelines for grading diabetic retinopathy severity from retinal fundus images using PyTorch, PyTorch Lightning and pretrained vision backbones.',
      'Alongside the training scripts and Jupyter notebook pipeline, the repository includes FastAPI/Gradio inference bindings and a React + Vite frontend directory.',
    ],
    contribution:
      'Maintained fork combining PyTorch Lightning training workflows with FastAPI inference services and a React + Vite web interface for retinal classification experiments.',
    highlightsLabel: 'Pipeline Components',
    highlights: [
      'Multiprocessing image cropping, resizing and train/validation dataset splitting scripts.',
      'PyTorch Lightning model training with TensorBoard metric tracking.',
      'FastAPI + Uvicorn and Gradio inference entry points.',
      'React 19 + Vite frontend scaffolding with Axios and React Router.',
    ],
    stack: ['Python', 'PyTorch', 'PyTorch Lightning', 'FastAPI', 'Uvicorn', 'Gradio', 'Scikit-learn', 'React 19', 'Vite'],
    repo: gh('Retino-'),
    art: 'retino',
  },
  {
    slug: 'lost-and-found',
    index: '06',
    title: 'Lost and Found Tracking System',
    category: 'Django 5.2 Full-Stack Application',
    filters: ['django-backend', 'web'],
    status: 'Completed',
    period: 'Apr 2025 – May 2025',
    visualType: 'illustration',
    summary:
      'A Django 5.2 asset-recovery platform with SQLite persistence, Leaflet geolocation, 10 km proximity matching, email OTP authentication, P2P chat and multilingual i18n.',
    description: [
      'Built in Python 3.11 and Django 5.2 to help campus communities report and recover lost or found items. Reporters pin coordinates on an interactive Leaflet map with Nominatim reverse geocoding and attach photo evidence.',
      'The Django backend implements relational models for reports, users and isolated user-to-user messaging, trigonometric proximity matching within 10 km, email-delivered OTP two-factor authentication and GNU gettext translation catalogs in English, Hindi and Kannada.',
    ],
    contribution:
      'Engineered the Django models, forms, views, P2P messaging flow, 10 km proximity matching logic, OTP 2FA, Leaflet map integration and multilingual translation catalogs.',
    highlightsLabel: 'Django & Platform Features',
    highlights: [
      'Django 5.2 + Python 3.11 backend with relational SQLite database and media uploads.',
      'Automated proximity matching pairing lost and found reports within a 10 km radius.',
      'Interactive Leaflet mapping with GPS geolocation and Nominatim reverse geocoding.',
      'Isolated user-to-user verification chat and email-delivered OTP two-factor authentication.',
      'English, Hindi and Kannada localisation via polib / GNU gettext i18n.',
    ],
    stack: ['Python', 'Django 5.2', 'SQLite', 'HTML', 'CSS', 'JavaScript', 'Leaflet.js', 'gettext i18n'],
    repo: gh('lostandfoundtrackingpublic'),
    linkNote: 'GitHub Pages on this repo renders documentation only; full Django app runs locally.',
    art: 'map',
  },
  {
    slug: 'resume-screening',
    index: '07',
    title: 'AI-Based Resume Screening',
    category: 'Python / NLP Web Application',
    filters: ['django-backend', 'ai-vision'],
    status: 'Internship project',
    period: 'Nov 2024 – Dec 2024',
    context: 'AI Internship · Internz Learn',
    visualType: 'illustration',
    summary:
      'A Python Flask web application that extracts text from uploaded PDF and DOCX resumes and computes TF-IDF cosine similarity against a target job description (500+ resumes ranked).',
    description: [
      'Developed during the Internz Learn AI internship. A Flask server provides an upload form accepting PDF/DOCX resumes and job descriptions, extracts structured text with pdfminer.six and python-docx, and computes a candidate match score.',
      'Text normalization and similarity scoring are powered by Scikit-learn TfidfVectorizer and cosine_similarity alongside NLTK, spaCy and BERT extractive summarization dependencies.',
    ],
    contribution:
      'Implemented the Flask routing and templates, PDF/DOCX text extraction helpers and TF-IDF cosine similarity scoring pipeline.',
    highlightsLabel: 'Implemented Features',
    highlights: [
      'Flask upload and evaluation routes for PDF and DOCX resume files.',
      'Document text extraction via pdfminer.six and python-docx.',
      'Resume-to-job match scoring with Scikit-learn TF-IDF and cosine similarity.',
    ],
    stack: ['Python', 'Flask', 'Scikit-learn', 'NLTK', 'spaCy', 'BERT', 'pdfminer.six', 'python-docx'],
    repo: gh('Ai-Resume-Screening'),
    art: 'document',
  },
  {
    slug: 'hospital-management',
    index: '08',
    title: 'Hospital Management System',
    category: 'Django 5.0 Full-Stack Application',
    filters: ['django-backend', 'web'],
    status: 'Completed',
    period: 'Oct 2023 – Dec 2023',
    visualType: 'illustration',
    summary:
      'A Django 5.0.3 healthcare web application with custom user/doctor/appointment models, booking workflows, doctor schedule dashboards, JSON APIs and printable invoices.',
    description: [
      'Built with Python and Django 5.0.3 to coordinate hospital operations between patients and doctors. The backend defines CustomUser, Doctor and Appointment models backed by SQLite with registration, login and email update flows.',
      'Alongside server-rendered views and printable dynamic invoices, Django exposes JSON endpoints (/api/appointments/, /api/latest_appointment/) powering real-time JavaScript filtering between upcoming and completed visits.',
    ],
    contribution:
      'Built the Django models, authentication views, appointment booking CRUD workflows, doctor schedule dashboard, JSON API endpoints and printable HTML invoice generator.',
    highlightsLabel: 'Django & Full-Stack Features',
    highlights: [
      'Django 5.0.3 architecture with CustomUser, Doctor and Appointment relational models.',
      'REST JSON endpoints (/api/appointments/, /api/latest_appointment/) for live schedule filtering.',
      'Dedicated doctor dashboard to review and manage upcoming appointments.',
      'Secure registration/login workflows and automatic printable booking invoices.',
    ],
    stack: ['Python', 'Django 5.0.3', 'SQLite', 'HTML', 'CSS', 'JavaScript'],
    repo: gh('Hospital-Management-System'),
    art: 'pulse',
  },
]

export interface OtherRepo {
  name: string
  note: string
  language: string
  href: string
}

/** Smaller public repositories, verified on GitHub. */
export const otherRepos: OtherRepo[] = [
  {
    name: 'Tripillar-DSA-Workshop-2026',
    note: 'Data structures & algorithms exercises from a seven-day workshop, organised day by day.',
    language: 'Java',
    href: gh('Tripillar-DSA-Workshop-2026'),
  },
  {
    name: 'Java-Practise',
    note: 'A collection of Java practice programs.',
    language: 'Java',
    href: gh('Java-Practise'),
  },
  {
    name: 'hellomaven',
    note: 'A starter Maven project with an Azure Pipelines configuration.',
    language: 'Java',
    href: gh('hellomaven'),
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
