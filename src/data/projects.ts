/**
 * Project data — the single source of truth for the Work section.
 * Prioritized to foreground backend engineering, Python/Django systems,
 * database integration and application architecture while keeping all verified
 * projects accessible and accurately described.
 */

export type FilterId = 'backend' | 'ai' | 'security' | 'web' | 'iot' | 'research'

export const projectFilters: { id: 'all' | FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'backend', label: 'Backend & Django' },
  { id: 'security', label: 'Security' },
  { id: 'web', label: 'Web' },
  { id: 'ai', label: 'AI & Vision' },
  { id: 'iot', label: 'IoT' },
  { id: 'research', label: 'Research' },
]

export type ProjectStatus = 'Ongoing' | 'Completed' | 'Research' | 'Internship project'

export type ArtVariant =
  | 'vision'
  | 'shield'
  | 'field'
  | 'document'
  | 'quad'
  | 'device'
  | 'map'
  | 'pulse'
  | 'route'
  | 'feistel'

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
  status?: ProjectStatus
  context?: string
  summary: string
  description: string[]
  highlightsLabel: string
  highlights: string[]
  pending?: { label: string; items: string[] }
  stack: string[]
  repo?: string
  demo?: string
  linkNote?: string
  art: ArtVariant
  image?: ProjectImage
  featured?: boolean
}

const gh = (repo: string) => `https://github.com/VAIBHAV-w1/${repo}`

export const projects: Project[] = [
  {
    slug: 'cybershield',
    index: '01',
    title: 'CyberShield',
    category: 'Backend & Cybersecurity Toolkit',
    filters: ['backend', 'security', 'web'],
    status: 'Completed',
    summary:
      'A full-stack cybersecurity toolkit featuring RESTful authentication with email OTP verification, phishing URL scanning, password strength evaluation and threat monitoring.',
    description: [
      'CyberShield brings everyday security checks together behind an authenticated API backend. Users sign in with JWT-backed sessions and email-delivered OTP verification, scan suspicious URLs for phishing patterns, evaluate password strength or query an AI security advisor.',
      'The backend handles user schema persistence, bcrypt credential hashing, rate-limited Express routes, file encryption utilities and email OTP delivery.',
    ],
    highlightsLabel: 'Backend & Security Features',
    highlights: [
      'JWT-based user authentication integrated with email-delivered OTP verification.',
      'REST API routes for phishing URL scanning, password analysis and file encryption.',
      'Rate-limiting, Helmet security headers and bcryptjs password hashing.',
      'Threat monitoring dashboard with honeypot alerts and AI security advisor.',
    ],
    stack: ['Node.js', 'Express', 'MongoDB', 'Supabase', 'JWT', 'React', 'Tailwind CSS'],
    repo: gh('CyberShield'),
    linkNote: 'The deployment listed on the repository is currently unavailable, so no live demo is linked.',
    art: 'shield',
    image: {
      src: '/projects/cybershield-1600.webp',
      srcSet: '/projects/cybershield-900.webp 900w, /projects/cybershield-1600.webp 1600w',
      width: 1600,
      height: 900,
      alt: 'CyberShield sign-in screen with a shield logo, email and password fields and a note that the session is protected by encryption.',
      caption: 'CyberShield — authentication portal.',
    },
    featured: true,
  },
  {
    slug: 'lost-and-found',
    index: '02',
    title: 'BIET Lost & Found System',
    category: 'Django Backend / Web Application',
    filters: ['backend', 'web'],
    status: 'Completed',
    summary:
      'A Django 5.2 campus asset-recovery platform with SQLite persistence, geospatial proximity matching within 10 km, email OTP authentication and private user-to-user chat.',
    description: [
      'Built in Python and Django 5.2 as a database-driven web application for reporting and recovering lost or found items on campus. Users pin locations on an interactive Leaflet map, resolve addresses via Nominatim reverse geocoding and coordinate handovers through isolated internal messaging.',
      'The Django backend drives relational item/user/chat models in SQLite, proximity matching calculations, email-delivered OTP 2FA and English/Hindi/Kannada gettext localisation.',
    ],
    highlightsLabel: 'Backend & Platform Features',
    highlights: [
      'Django 5.2 + Python 3.11 backend with relational SQLite models and media handling.',
      'Trigonometric proximity matching pairing lost and found reports within a 10 km radius.',
      'Email-delivered OTP two-factor authentication and isolated P2P recovery chat.',
      'Interactive Leaflet mapping with high-accuracy GPS and Nominatim reverse geocoding.',
      'English, Hindi and Kannada localisation via GNU gettext catalogs.',
    ],
    stack: ['Python', 'Django', 'SQLite', 'JavaScript', 'HTML', 'CSS', 'Leaflet.js'],
    repo: gh('lostandfoundtrackingpublic'),
    art: 'map',
    featured: true,
  },
  {
    slug: 'hospital-management',
    index: '03',
    title: 'Hospital Management System',
    category: 'Django Backend / Healthcare Web App',
    filters: ['backend', 'web'],
    status: 'Completed',
    summary:
      'A Django 5.0 web application managing doctors, patients and medical appointments with custom user models, doctor schedule views, JSON API endpoints and printable invoices.',
    description: [
      'An academic healthcare platform powered by Python and Django 5.0.3. It implements relational models for CustomUser, Doctor and Appointment records in SQLite alongside dedicated portals for patient booking and doctor schedule management.',
      'The backend serves both server-rendered templates and JSON endpoints (/api/appointments/, /api/latest_appointment/) to power real-time client-side filtering between upcoming and completed visits.',
    ],
    highlightsLabel: 'Backend & Application Features',
    highlights: [
      'Django 5.0.3 architecture with CustomUser, Doctor and Appointment relational models.',
      'REST JSON endpoints (/api/appointments/, /api/latest_appointment/) for dynamic dashboards.',
      'Dedicated doctor dashboard for managing upcoming appointment schedules.',
      'Secure registration, login and email update flows plus printable dynamic invoices.',
    ],
    stack: ['Python', 'Django', 'SQLite', 'HTML', 'CSS', 'JavaScript'],
    repo: gh('Hospital-Management-System'),
    art: 'pulse',
    featured: true,
  },
  {
    slug: 'deepvision',
    index: '04',
    title: 'DeepVision',
    category: 'Python / Django Surveillance & AI',
    filters: ['backend', 'ai', 'security', 'web'],
    status: 'Ongoing',
    summary:
      'A decoupled surveillance platform pairing a Django 5.2 REST backend and 18-table relational database with a Python computer-vision pipeline (OpenCV, YOLO11n, ByteTrack) and React SPA.',
    description: [
      'DeepVision separates a Vercel-hosted React frontend from a Django 5.2 backend and an in-process Python surveillance core. OpenCV captures frames while YOLO11n on PyTorch and ByteTrack detect and track targets across frames.',
      'The Django layer manages 18 relational tables across SQLite and Supabase PostgreSQL migration tooling, signed-cookie sessions, PBKDF2 password hashing, rate-limited 6-digit OTP verification, HTTP 206 range-request MP4 playback and incident-scoped forensic case files.',
    ],
    highlightsLabel: "What's built",
    highlights: [
      'Django 5.2 REST API & surveillance core with 18 relational tables (SQLite + Supabase PostgreSQL DDL/migration script).',
      'PBKDF2 password hashing, signed-cookie sessions, CSRF protection and rate-limited 6-digit OTP verification.',
      'Three camera modes: browser webcam, OpenCV/DirectShow edge bridge to YOLO11n + ByteTrack, and synthetic calibration feed.',
      'Incident-scoped forensic workspace with evidence snapshots, MP4 range playback, case notes and timeline.',
      'Hardened, non-root Docker container and Vercel-deployed React SPA.',
    ],
    pending: {
      label: 'In progress',
      items: [
        'Moving the Django REST API to a persistent host (currently runs in a local Docker container).',
        'Supabase PostgreSQL database and storage — schema and migration tooling ready, cut-over pending.',
      ],
    },
    stack: ['Python', 'Django', 'SQLite', 'PostgreSQL', 'Supabase', 'OpenCV', 'YOLO11n', 'React', 'Docker', 'Vercel'],
    repo: gh('DeepVision'),
    demo: 'https://vsw-deepvision.vercel.app/',
    art: 'vision',
    image: {
      src: '/projects/deepvision-1600.webp',
      srcSet: '/projects/deepvision-900.webp 900w, /projects/deepvision-1600.webp 1600w',
      width: 1600,
      height: 900,
      alt: 'DeepVision sign-in screen showing the "AI-Based Intelligent Surveillance System" title with live monitoring, object detection, anomaly detection and security alert features.',
      caption: 'DeepVision — sign-in screen of the deployed frontend.',
    },
    featured: true,
  },
  {
    slug: 'cropify',
    index: '05',
    title: 'Cropify',
    alias: 'KisanAI',
    category: 'Python Backend / Agricultural AI',
    filters: ['backend', 'ai', 'web'],
    status: 'Ongoing',
    context: 'Team project',
    summary:
      'A Python FastAPI and React platform that combines Scikit-learn models with live OpenWeatherMap telemetry for crop, soil fertility and irrigation recommendations.',
    description: [
      'Cropify (also developed under the name KisanAI) exposes trained Scikit-learn models behind a modular FastAPI backend with structured routers and external weather service integration.',
      'A React + TypeScript interface collects soil nutrients, field metrics and uploaded crop images so farmers receive actionable crop, fertility and irrigation guidance.',
    ],
    highlightsLabel: "What's built",
    highlights: [
      'FastAPI backend with modular ML routers and OpenWeatherMap API service integration.',
      'Crop recommendation — Random Forest classifier using N, P, K, pH and environmental factors.',
      'Soil fertility analysis — Random Forest regressor using NDVI, soil moisture and elevation.',
      'Irrigation advisory classifier across 19 field parameters plus crop disease upload workflow.',
    ],
    pending: {
      label: 'Planned',
      items: [
        'Deep-learning based disease detection.',
        'IoT sensor integration and satellite / remote-sensing support.',
        'Multilingual voice assistant for rural accessibility.',
      ],
    },
    stack: ['Python', 'FastAPI', 'Scikit-learn', 'Pandas', 'NumPy', 'React', 'TypeScript', 'Vite'],
    repo: gh('Cropify'),
    art: 'field',
  },
  {
    slug: 'resume-screening',
    index: '06',
    title: 'AI Resume Screening Tool',
    category: 'Python / NLP Web Application',
    filters: ['backend', 'ai'],
    status: 'Internship project',
    context: 'AI Internship · Internz Learn',
    summary: 'A Python Flask web app that extracts text from PDF/DOCX resumes and scores similarity against job descriptions.',
    description: [
      'Built during the AI internship at Internz Learn. A Flask server accepts uploaded PDF or DOCX resumes alongside a job description, extracts clean text using pdfminer.six and python-docx, and computes a match score.',
      'Matching uses TF-IDF vectorization with English stop-word filtering and cosine similarity from Scikit-learn, supported by NLTK, spaCy and BERT extractive summarization.',
    ],
    highlightsLabel: "What's built",
    highlights: [
      'Flask upload and scoring routes for resumes and job descriptions.',
      'Document parsing pipeline with pdfminer.six and python-docx.',
      'Resume-to-job match scoring using TF-IDF + cosine similarity.',
    ],
    stack: ['Python', 'Flask', 'Scikit-learn', 'NLTK', 'spaCy', 'BERT', 'pdfminer.six', 'python-docx'],
    repo: gh('Ai-Resume-Screening'),
    art: 'document',
  },
  {
    slug: 'medidispense',
    index: '07',
    title: 'MediDispense',
    category: 'IoT / Embedded Systems',
    filters: ['iot'],
    summary: 'An automated medicine dispenser built around ESP32 hardware, firmware and connected-device workflows.',
    description: [
      'MediDispense automates medicine dispensing with ESP32-based hardware. The project spans the physical device, its firmware and the connected-device workflow around it.',
    ],
    highlightsLabel: 'Scope',
    highlights: ['ESP32-based dispensing hardware.', 'Device firmware.', 'Connected-device workflows.'],
    stack: ['ESP32', 'Embedded firmware', 'IoT'],
    linkNote: 'Detailed documentation and repository have not been published yet.',
    art: 'device',
  },
  {
    slug: 'visionguard-kc',
    index: '08',
    title: 'VisionGuard-KC',
    category: 'Medical AI / Computer Vision',
    filters: ['ai', 'research'],
    status: 'Research',
    summary: 'Research into classifying keratoconus from Pentacam four-map (Quad-Map) corneal scans.',
    description: [
      'A research-oriented project exploring how deep learning can support keratoconus classification from Pentacam Quad-Map analysis, where four corneal maps are read together.',
      'The architecture below is the proposed research design. It is presented as research work, not as a finished or deployed system.',
    ],
    highlightsLabel: 'Proposed architecture',
    highlights: [
      'Four map-specific CNN branches — one per Pentacam map.',
      'Hybrid feature fusion across the branches.',
      'CBAM (Convolutional Block Attention Module) attention.',
      'Multi-class classification head.',
      'Grad-CAM visualisation to explain predictions.',
    ],
    stack: ['CNN', 'Feature fusion', 'CBAM attention', 'Grad-CAM'],
    linkNote: 'Research in progress — no public repository yet.',
    art: 'quad',
  },
  {
    slug: 'roam-rover',
    index: '09',
    title: 'Roam Rover',
    category: 'Travel / Frontend Development',
    filters: ['web'],
    summary: 'A travel-themed website built with hand-written HTML and CSS.',
    description: ['Roam Rover is a travel-oriented website project developed using HTML and CSS — an exercise in layout, structure and visual presentation without frameworks.'],
    highlightsLabel: 'Focus',
    highlights: ['Semantic page structure in HTML.', 'Layout and styling written in plain CSS.'],
    stack: ['HTML', 'CSS'],
    linkNote: 'No public repository yet.',
    art: 'route',
  },
  {
    slug: 'feistel-cipher',
    index: '10',
    title: 'Generic Feistel Cipher',
    category: 'Cryptography / Network Security',
    filters: ['security'],
    summary: 'An academic implementation demonstrating the structure of a generic Feistel cipher.',
    description: [
      'A cryptography project demonstrating a generic Feistel network: a block is split into two halves, and each round applies a round function with a round key to one half, combines it with the other, and swaps them.',
      'The same structure runs in reverse with the round keys in the opposite order to decrypt — the property that makes Feistel networks a foundation of block-cipher design.',
    ],
    highlightsLabel: 'Concepts demonstrated',
    highlights: ['Block splitting into left and right halves.', 'Round function with per-round keys.', 'Decryption by reversing the key order.'],
    stack: ['Cryptography', 'Network Security'],
    linkNote: 'No public repository yet.',
    art: 'feistel',
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
