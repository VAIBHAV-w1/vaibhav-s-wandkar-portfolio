/**
 * Project showcase — fixed order 01 through 08.
 * Card summaries describe what each project does; modals explain the problem,
 * implemented functionality, personal contribution and verified technology stack.
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
  problem: string
  implemented: string[]
  contribution: string
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
      'A surveillance web application combining a Django backend and relational database with OpenCV, YOLO object detection, multi-object tracking and CLIP scene classification.',
    problem:
      'Reviewing raw CCTV streams manually makes it slow to spot restricted-zone intrusions, record alert clips and link follow-up evidence to specific incidents.',
    implemented: [
      'Django backend with role-based access control, PBKDF2 authentication, OTP verification and PostgreSQL/SQLite persistence across 18 tables.',
      'OpenCV frame processing using YOLO26/YOLO11n detection (OpenVINO and ONNX Runtime), BoT-SORT/ByteTrack tracking and CLIP scene analysis.',
      'Incident case workflow storing alert snapshots and MP4 recordings with HTTP 206 byte-range playback.',
      'Decoupled React + Vite interface hosted on Vercel connected to a Render-deployed Django backend.',
    ],
    contribution:
      'I designed and built the Django database models, authentication and RBAC endpoints, Python detection/tracking worker, React frontend and deployment setup.',
    stack: ['Python', 'Django', 'PostgreSQL', 'Supabase', 'SQLite', 'OpenCV', 'YOLO26', 'CLIP', 'React', 'Vite', 'Vercel'],
    repo: gh('DeepVision'),
    demo: 'https://vsw-deepvision.vercel.app/',
    art: 'vision',
    image: {
      src: '/projects/deepvision-1600.webp',
      srcSet: '/projects/deepvision-900.webp 900w, /projects/deepvision-1600.webp 1600w',
      width: 1600,
      height: 900,
      alt: 'DeepVision sign-in screen showing the surveillance interface.',
      caption: 'UI Screenshot — DeepVision login and overview screen.',
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
      'A security utility app providing phishing URL scanning, password strength checks, basic file encryption and OTP-verified login.',
    problem:
      'Users often rely on separate unverified web tools to inspect suspicious URLs, check password strength or encrypt files.',
    implemented: [
      'Node.js and Express API with JWT sessions, Nodemailer email OTP verification and bcryptjs password hashing.',
      'Phishing URL inspection, password strength analysis and file encryption tools with MongoDB and Supabase persistence.',
      'Helmet security headers, request rate limiting and a security advisor dashboard built with React and Tailwind CSS.',
    ],
    contribution:
      'I built the Express routes, authentication flow, security utility endpoints and React frontend interface.',
    stack: ['Node.js', 'Express', 'React 18', 'Vite', 'Tailwind CSS', 'MongoDB', 'Supabase', 'JWT', 'Nodemailer'],
    repo: gh('CyberShield'),
    linkNote: 'The older Vercel URL in the repository returns HTTP 404, so only the GitHub repository is linked.',
    art: 'shield',
    image: {
      src: '/projects/cybershield-1600.webp',
      srcSet: '/projects/cybershield-900.webp 900w, /projects/cybershield-1600.webp 1600w',
      width: 1600,
      height: 900,
      alt: 'CyberShield authentication portal screenshot.',
      caption: 'UI Screenshot — CyberShield login screen.',
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
      'A crop advisory platform using a Python FastAPI server, Scikit-learn models and live weather readings to suggest crops, soil fertility scores and irrigation schedules.',
    problem:
      'Selecting suitable crops and irrigation timing requires combining local soil metrics (N, P, K, pH, moisture) with current weather conditions.',
    implemented: [
      'FastAPI and Uvicorn ML service integrating OpenWeatherMap temperature, humidity and rainfall readings.',
      'Random Forest classifiers and regressors predicting crop fit, soil fertility from NDVI/elevation metrics and irrigation needs.',
      'React + TypeScript web interface with interactive Leaflet field views and a crop image upload flow.',
    ],
    contribution:
      'Worked as part of a team contributing to FastAPI routes, Scikit-learn prediction endpoints, weather API wiring and React frontend integration.',
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
      'A hybrid voting platform linking an Express and Prisma database layer with Ethereum Sepolia smart contracts and live Socket.io tally updates.',
    problem:
      'Electronic voting prototypes need voter identity verification without exposing individual ballot choices or permitting duplicate votes.',
    implemented: [
      'Express + Prisma backend managing SHA-256 OTP authentication, JWT sessions and Zod request validation.',
      'Solidity smart contracts compiled with Hardhat and invoked via Ethers.js v6 to record immutable ballots on Ethereum Sepolia.',
      'Voter identity decoupled from ballots via keccak256 hashes, paired with live tally charts over Socket.io.',
    ],
    contribution:
      'Maintained and studied this forked collaborative project, focusing on the Express/Prisma backend structure, contract integration and React client.',
    stack: ['Solidity', 'Hardhat', 'Ethers.js', 'Node.js', 'Express', 'Prisma', 'SQLite', 'PostgreSQL', 'Socket.io', 'React 19', 'TypeScript'],
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
      'A diabetic retinopathy classification study built around PyTorch Lightning training scripts, image preprocessing pipelines and a FastAPI inference wrapper.',
    problem:
      'Automated screening from retinal fundus photographs requires consistent image cropping, dataset splitting and reproducible model training.',
    implemented: [
      'Multiprocessing image preparation pipeline to crop, resize and split retinal fundus datasets.',
      'PyTorch Lightning training workflow with TensorBoard logging and Gradio/FastAPI inference scripts.',
      'Prototype React + Vite web client wired to the local inference backend.',
    ],
    contribution:
      'Forked and adapted this research codebase to study PyTorch Lightning vision training alongside FastAPI model serving and a React UI wrapper.',
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
      'A Django 5.2 campus lost-and-found portal featuring Leaflet geolocation maps, 10 km proximity matching, email OTP login and English/Hindi/Kannada support.',
    problem:
      'Lost campus items are usually posted across scattered chat groups without structured location matching or safe owner verification.',
    implemented: [
      'Django 5.2 relational models for users, lost/found item reports, uploaded photos and isolated verification messages.',
      'Trigonometric proximity check matching newly reported items within a 10 km radius on interactive Leaflet maps.',
      'Email-based OTP two-factor login and GNU gettext localization for English, Hindi and Kannada.',
    ],
    contribution:
      'I built the Django models, views and templates, 10 km matching helper, P2P verification chat, OTP auth flow, Leaflet map integration and translation catalogs.',
    stack: ['Python', 'Django 5.2', 'SQLite', 'HTML', 'CSS', 'JavaScript', 'Leaflet.js', 'gettext i18n'],
    repo: gh('lostandfoundtrackingpublic'),
    linkNote: 'The linked GitHub Pages site contains documentation; the Django app runs locally.',
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
      'A Flask web app built during the Internz Learn AI internship to extract text from PDF/DOCX resumes and rank matches against a job description with TF-IDF.',
    problem:
      'Manually screening batches of PDF and Word resumes against a role description is repetitive and time-consuming.',
    implemented: [
      'Flask upload endpoint accepting PDF and DOCX files paired with a target job description.',
      'Text extraction pipeline built with pdfminer.six and python-docx, normalized with NLTK/spaCy helpers.',
      'Candidate similarity scoring and ranking using Scikit-learn TfidfVectorizer and cosine similarity.',
    ],
    contribution:
      'Implemented the Flask upload/scoring routes, PDF/DOCX text extraction pipeline and TF-IDF ranking logic during the Internz Learn internship.',
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
    ownership: 'HAEGL Technologies Pvt. Ltd. — Internship Project',
    visualType: 'illustration',
    summary:
      'A Django 5.0.3 healthcare web application completed as an HAEGL Technologies Pvt. Ltd. internship project for managing patient appointments, doctor schedules and printable invoices.',
    problem:
      'Clinics need a single workflow to coordinate patient registrations, doctor schedules and appointment billing without manual paperwork.',
    implemented: [
      'Django 5.0.3 relational models for CustomUser, Doctor and Appointment records backed by SQLite.',
      'Doctor dashboard and JSON endpoints (/api/appointments/, /api/latest_appointment/) to filter upcoming and completed visits.',
      'Session authentication with CSRF/XSS safeguards and printable HTML appointment invoices.',
    ],
    contribution:
      'Built during my HAEGL Technologies Pvt. Ltd. internship engagement, implementing Django 5.0.3 models (CustomUser, Doctor, Appointment), user authentication, appointment JSON endpoints, the doctor schedule dashboard and printable invoice templates.',
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

export const otherRepos: OtherRepo[] = [
  {
    name: 'Tripillar-DSA-Workshop-2026',
    note: 'Java data structures and algorithms exercises organized by workshop day.',
    language: 'Java',
    href: gh('Tripillar-DSA-Workshop-2026'),
  },
  {
    name: 'Java-Practise',
    note: 'Core Java syntax and problem-solving practice programs.',
    language: 'Java',
    href: gh('Java-Practise'),
  },
  {
    name: 'hellomaven',
    note: 'Starter Java Maven project with an Azure Pipelines YAML build file.',
    language: 'Java',
    href: gh('hellomaven'),
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
