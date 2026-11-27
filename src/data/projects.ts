/**
 * Centralized project showcase — strictly ordered 01 → 08.
 * Never sort automatically by date, category or technology.
 * Authorship/ownership, repository stacks and demo availability are verified directly
 * from github.com/VAIBHAV-w1 manifests and source files.
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
  ownership: string
  period?: string
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
    category: 'Django & Computer Vision Surveillance',
    filters: ['django-backend', 'ai-vision', 'security', 'web'],
    status: 'Ongoing',
    ownership: 'Own Implementation',
    period: 'Mar 2026 – Ongoing',
    visualType: 'screenshot',
    summary:
      'An AI surveillance and SOC incident-monitoring platform pairing a Django REST backend and relational schema with OpenCV, YOLO26 / YOLO11n, BoT-SORT tracking and CLIP scene understanding.',
    description: [
      'DeepVision connects a Vercel-hosted React interface with a Django backend (deployed on Render) and a local Python computer-vision engine. Live video frames run through OpenCV, Ultralytics YOLO26 / YOLO11n (OpenVINO & ONNX Runtime), multi-object tracking and CLIP semantic scene classification.',
      'The backend enforces signed-cookie sessions, PBKDF2 password hashing, role-based access control, HTTP 206 MP4 evidence playback, health/uptime ingestion and incident-scoped forensic case files backed by PostgreSQL (Supabase) and SQLite.',
    ],
    contribution:
      'Solely designed and built the Django backend architecture, relational schema and PostgreSQL migration tooling, PBKDF2/OTP auth & RBAC controls, OpenCV/YOLO/CLIP surveillance worker loop, React SPA and cloud deployment setup.',
    highlightsLabel: 'Implemented Capabilities',
    highlights: [
      'Django REST backend with 18 relational tables, RBAC enforcement and Supabase PostgreSQL schema DDL.',
      'PBKDF2 password hashing, signed-cookie sessions, CSRF guards and rate-limited OTP workflows.',
      'Real-time detection and tracking via YOLO26s/n ONNX (OpenVINO/ORT), ByteTrack/BoT-SORT and CLIP scene analysis.',
      'Incident-scoped forensic workspace with snapshots, HTTP 206 MP4 range playback, notes and timeline.',
      'Synchronized React SPA on Vercel, backend service on Render and automated uptime/security workflows.',
    ],
    pending: {
      label: 'In Progress',
      items: [
        'Validating upstream video feature extraction parity before integrating any new temporal anomaly models.',
        'Hardening long-running edge camera stream reliability and media retention controls.',
      ],
    },
    stack: ['Python', 'Django', 'PostgreSQL', 'Supabase', 'SQLite', 'OpenCV', 'YOLO26', 'CLIP', 'React', 'Vite', 'Render', 'Vercel'],
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
    category: 'Cybersecurity Toolkit & Web Application',
    filters: ['django-backend', 'security', 'web'],
    status: 'Completed',
    ownership: 'Own Implementation',
    period: 'Jan 2026 – Apr 2026',
    visualType: 'screenshot',
    summary:
      'A full-stack cybersecurity toolkit offering phishing URL detection, password strength evaluation, file encryption and OTP-authenticated security dashboards.',
    description: [
      'CyberShield brings everyday digital safety checks together behind an authenticated Node.js and Express backend. Users verify accounts with JWT sessions and email-delivered OTPs before running URL phishing scans, checking password strength or consulting an AI security advisor.',
      'The backend enforces rate-limiting, Helmet security headers, bcryptjs credential hashing and data persistence using MongoDB and Supabase.',
    ],
    contribution:
      'Built the Express backend routes, JWT and Nodemailer OTP authentication flow, phishing and password analysis tools, file encryption helpers and React + Tailwind CSS interface.',
    highlightsLabel: 'Implemented Features',
    highlights: [
      'JWT-based authentication paired with email-delivered OTP verification.',
      'Phishing URL scanner, password strength evaluator and file encryption endpoints.',
      'Rate-limiting, Helmet security headers and bcryptjs password hashing.',
      'Threat monitoring dashboard with honeypot alerts and AI security advisor chat.',
    ],
    stack: ['Node.js', 'Express', 'React 18', 'Vite', 'Tailwind CSS', 'MongoDB', 'Supabase', 'JWT', 'Nodemailer'],
    repo: gh('CyberShield'),
    linkNote: 'The Vercel URL listed in the repository returns HTTP 404, so no live demo link is displayed.',
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
    category: 'Python FastAPI & Agricultural ML',
    filters: ['django-backend', 'ai-vision', 'web'],
    status: 'Ongoing',
    ownership: 'Collaborative Project',
    period: 'Mar 2026 – Ongoing',
    visualType: 'illustration',
    summary:
      'An agricultural advisory platform connecting a FastAPI machine-learning server and live weather data with a React + TypeScript interface for crop, soil and irrigation guidance.',
    description: [
      'Cropify pairs a Python FastAPI server (cropify-ml-server) with a React + TypeScript web interface (cropify-web-interface). Pre-trained Scikit-learn models generate crop recommendations, soil fertility estimates and irrigation guidance.',
      'Live temperature, humidity and rainfall readings from OpenWeatherMap are combined with soil and field parameters so advisories reflect current local conditions.',
    ],
    contribution:
      'Collaborative team build contributing to the FastAPI backend routers, Scikit-learn prediction pipelines, weather API integration and React + TypeScript interface.',
    highlightsLabel: 'Implemented Features',
    highlights: [
      'FastAPI (0.135.3) + Uvicorn ML backend with modular routers and OpenWeatherMap API integration.',
      'Random Forest crop recommendation classifier using N, P, K, pH and environmental inputs.',
      'Random Forest soil fertility regressor driven by NDVI, soil moisture and elevation.',
      'Irrigation advisory classifier across 19 field metrics plus crop disease upload workflow.',
    ],
    pending: {
      label: 'Planned Enhancements',
      items: [
        'Deep-learning based crop disease recognition.',
        'IoT sensor telemetry, satellite imagery support and multilingual voice guidance.',
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
    ownership: 'Forked Collaborative Repository',
    visualType: 'illustration',
    summary:
      'A hybrid voting platform pairing an Express + Prisma backend and SHA-256 OTP authentication with Ethereum Sepolia smart contracts and real-time Socket.io tallying.',
    description: [
      'The Decentralized Voting System combines a TypeScript Node.js/Express backend (using Prisma ORM over SQLite/PostgreSQL, Zod validation and JWT + SHA-256 OTP sessions) with Solidity smart contracts deployed on Ethereum Sepolia via Hardhat and Ethers.js.',
      'Voter identities are separated from cast ballots via keccak256 hashing, one-person-one-vote constraints are enforced across both database locks and smart-contract state, and results update live over Socket.io.',
    ],
    contribution:
      'Forked collaborative team repository studied and maintained for its Express + Prisma API architecture, Solidity voting contract integration, Socket.io live updates and React + TypeScript client.',
    highlightsLabel: 'System Capabilities',
    highlights: [
      'Immutable ballot recording on Ethereum (Sepolia) via Solidity smart contracts and Ethers.js v6.',
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
    ownership: 'Forked Study & Prototype',
    visualType: 'illustration',
    summary:
      'A diabetic retinopathy detection pipeline combining PyTorch Lightning transfer learning, multiprocessing dataset preparation, FastAPI inference and a React + Vite frontend.',
    description: [
      'Retino explores scalable image preprocessing and transfer-learning pipelines for classifying diabetic retinopathy severity from retinal fundus photographs using PyTorch and PyTorch Lightning.',
      'Alongside model training scripts and a Jupyter research notebook, the repository includes FastAPI and Gradio inference bindings plus a React + Vite frontend workspace.',
    ],
    contribution:
      'Forked and adapted research repository exploring PyTorch Lightning training workflows alongside FastAPI inference and a React + Vite web wrapper.',
    highlightsLabel: 'Pipeline Components',
    highlights: [
      'Multiprocessing fundus image cropping, resizing and train/validation dataset splitting.',
      'PyTorch Lightning training pipeline with TensorBoard metric logging.',
      'FastAPI + Uvicorn and Gradio model inference entry points.',
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
    ownership: 'Own Implementation',
    period: 'Apr 2025 – May 2025',
    visualType: 'illustration',
    summary:
      'A Django 5.2 campus asset-recovery portal with SQLite persistence, Leaflet geolocation, 10 km proximity matching, email OTP authentication, P2P chat and multilingual i18n.',
    description: [
      'Built in Python 3.11 and Django 5.2 to help campus communities report, search and recover lost or found belongings. Users mark locations on an interactive Leaflet map with Nominatim reverse geocoding and attach photo evidence.',
      'The Django backend drives relational models for reports, users and isolated verification chats, trigonometric proximity matching within a 10 km radius, email-delivered OTP 2FA and GNU gettext catalogs in English, Hindi and Kannada.',
    ],
    contribution:
      'Designed and built the Django 5.2 data models, forms, views, proximity matching logic, private P2P recovery chat, OTP two-factor authentication, Leaflet map integration and multilingual catalogs.',
    highlightsLabel: 'Django & Platform Features',
    highlights: [
      'Django 5.2 + Python 3.11 backend with relational SQLite models and media handling.',
      'Automated trigonometric proximity matching linking reports within a 10 km radius.',
      'Interactive Leaflet mapping with GPS geolocation and Nominatim reverse geocoding.',
      'Isolated user-to-user chat and email-delivered OTP two-factor authentication.',
      'English, Hindi and Kannada localisation powered by polib / GNU gettext i18n.',
    ],
    stack: ['Python', 'Django 5.2', 'SQLite', 'HTML', 'CSS', 'JavaScript', 'Leaflet.js', 'gettext i18n'],
    repo: gh('lostandfoundtrackingpublic'),
    linkNote: 'GitHub Pages on this repo renders project documentation; the Django application runs locally.',
    art: 'map',
  },
  {
    slug: 'resume-screening',
    index: '07',
    title: 'AI-Based Resume Screening',
    category: 'Python & NLP Web Application',
    filters: ['django-backend', 'ai-vision'],
    status: 'Internship project',
    ownership: 'Internz Learn AI Internship',
    period: 'Nov 2024 – Dec 2024',
    visualType: 'illustration',
    summary:
      'A Python Flask web application that extracts text from PDF and DOCX resumes and ranks candidate similarity against a job description using TF-IDF cosine similarity.',
    description: [
      'Developed during the Artificial Intelligence internship at Internz Learn. A Flask server accepts uploaded PDF or DOCX resumes alongside a job description, extracts text with pdfminer.six and python-docx, and computes a match score.',
      'Scoring uses Scikit-learn TfidfVectorizer and cosine similarity to rank candidates across 500+ resumes, supported by NLTK, spaCy and BERT extractive summarization dependencies.',
    ],
    contribution:
      'Implemented the Flask upload and evaluation routes, PDF/DOCX text extraction utilities and TF-IDF cosine similarity ranking pipeline.',
    highlightsLabel: 'Implemented Features',
    highlights: [
      'Flask upload and evaluation routes supporting PDF and DOCX resumes.',
      'Structured document parsing via pdfminer.six and python-docx.',
      'Automated candidate match scoring with Scikit-learn TF-IDF and cosine similarity.',
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
    status: 'Internship project',
    ownership: 'Internship-Associated · HAEGL Technologies Pvt. Ltd.',
    visualType: 'illustration',
    summary:
      'A Django 5.0.3 healthcare management application associated with my HAEGL Technologies Pvt. Ltd. internship experience for patient appointments, doctor schedules and printable invoices.',
    description: [
      'Completed in association with my internship experience at HAEGL Technologies Pvt. Ltd., this Django 5.0.3 application coordinates patient appointments, records and doctor schedules using CustomUser, Doctor and Appointment models backed by SQLite.',
      'Alongside user authentication, doctor schedule dashboards and printable booking invoices, Django serves JSON endpoints (/api/appointments/, /api/latest_appointment/) for client-side filtering between upcoming and completed visits.',
    ],
    contribution:
      'Internship-associated implementation with HAEGL Technologies Pvt. Ltd. covering Django 5.0.3 models (CustomUser, Doctor, Appointment), registration/login workflows, JSON appointment APIs, doctor schedule management and printable HTML invoices.',
    highlightsLabel: 'Implemented Functionality',
    highlights: [
      'Django 5.0.3 relational models for CustomUser, Doctor and Appointment records.',
      'JSON endpoints (/api/appointments/, /api/latest_appointment/) for real-time schedule filtering.',
      'Dedicated doctor dashboard to review and manage upcoming appointments.',
      'Authenticated patient/doctor views, CSRF safeguards and printable appointment invoices.',
    ],
    stack: ['Python', 'Django 5.0.3', 'SQLite', 'HTML5', 'CSS3', 'JavaScript'],
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
