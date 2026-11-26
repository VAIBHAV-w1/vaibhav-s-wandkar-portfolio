/**
 * Project data — the single source of truth for the Work section.
 *
 * Verification notes (checked 26 Nov 2026):
 * - Repository links point to public repos on github.com/VAIBHAV-w1 that were confirmed to exist.
 * - Live demo links are only included when the URL responded successfully and is the
 *   official deployment named in the repository (README / repo homepage).
 *   · DeepVision → https://vsw-deepvision.vercel.app/ (README "Live website", HTTP 200)
 *   · CyberShield's listed homepage returned HTTP 404, so no demo is shown.
 *   · lostandfoundtrackingpublic's GitHub Pages URL only renders the README, so it is not a demo.
 * - Projects without a public repository simply omit `repo`. Add links here when available.
 */

export type FilterId = 'ai' | 'security' | 'web' | 'iot' | 'research'

export const projectFilters: { id: 'all' | FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI & Vision' },
  { id: 'security', label: 'Security' },
  { id: 'web', label: 'Web' },
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
    slug: 'deepvision',
    index: '01',
    title: 'DeepVision',
    category: 'AI / Intelligent Surveillance',
    filters: ['ai', 'security', 'web'],
    status: 'Ongoing',
    summary:
      'An AI surveillance and incident-monitoring platform: real-time detection and tracking on camera feeds, with every alert turned into an investigable incident.',
    description: [
      'DeepVision pairs a React single-page frontend with a Django backend and an embedded computer-vision pipeline. Frames are captured with OpenCV, objects are detected with YOLO11n on PyTorch and followed across frames with ByteTrack.',
      'Detections feed alerts, recordings and evidence. Each alert opens a forensic workspace where snapshots, video, case notes and the activity timeline stay scoped to that single incident.',
      'The frontend is deployed on Vercel. Because serverless platforms cannot reach physical cameras or sustain long-running inference, the camera workers and YOLO pipeline run on a dedicated edge / Docker host.',
    ],
    highlightsLabel: "What's built",
    highlights: [
      'React + Vite SOC-style frontend with dark and light modes, live on Vercel.',
      'Three camera modes: browser webcam, an edge gateway bridging OpenCV / DirectShow to YOLO11n + ByteTrack, and a synthetic calibration feed.',
      'Incident-scoped forensic workspace with evidence snapshots, recordings, notes and timeline.',
      'MP4 recording with HTTP range-request playback.',
      'Django session auth with PBKDF2 hashing, rate-limited 6-digit OTP verification and CSRF protection.',
      'SQLite store with 18 relational tables, plus PostgreSQL / Supabase schema and migration tooling.',
      'Hardened, non-root Docker image for the surveillance engine.',
    ],
    pending: {
      label: 'In progress',
      items: [
        'Moving the Django REST API to a persistent host (currently runs in a local Docker container).',
        'Supabase PostgreSQL database and storage — schema and migration are ready, cut-over pending.',
      ],
    },
    stack: ['Python', 'Django', 'React', 'Vite', 'OpenCV', 'YOLO11n', 'PyTorch', 'ByteTrack', 'SQLite', 'PostgreSQL', 'Docker', 'Vercel'],
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
    slug: 'cybershield',
    index: '02',
    title: 'CyberShield',
    category: 'Cybersecurity Toolkit',
    filters: ['security', 'web'],
    status: 'Completed',
    summary:
      'A cybersecurity toolkit that checks suspicious links, scores password strength and protects accounts with OTP-verified sign-in.',
    description: [
      'CyberShield brings everyday security checks into one web app. Paste a URL to have it analysed for phishing signals, test how strong a password really is, or generate a safer one.',
      'Accounts are protected with JWT-based authentication and an email-delivered one-time password, and an AI advisor answers security questions in plain language.',
    ],
    highlightsLabel: 'Features',
    highlights: [
      'Phishing URL detection — scan and analyse links for malicious or fraudulent patterns.',
      'Password toolkit — strength analysis and secure password generation.',
      'OTP-based authentication — JWT sessions with email-delivered OTP verification.',
      'AI cybersecurity advisor chat for security recommendations.',
      'Threat dashboard with honeypot monitoring.',
    ],
    stack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'JWT', 'Nodemailer', 'MongoDB'],
    repo: gh('CyberShield'),
    linkNote: 'The deployment listed on the repository is currently unavailable, so no live demo is linked.',
    art: 'shield',
    image: {
      src: '/projects/cybershield-1600.webp',
      srcSet: '/projects/cybershield-900.webp 900w, /projects/cybershield-1600.webp 1600w',
      width: 1600,
      height: 900,
      alt: 'CyberShield sign-in screen with a shield logo, email and password fields and a note that the session is protected by encryption.',
      caption: 'CyberShield — authentication screen.',
    },
    featured: true,
  },
  {
    slug: 'cropify',
    index: '03',
    title: 'Cropify',
    alias: 'KisanAI',
    category: 'Agricultural Technology / AI',
    filters: ['ai', 'web'],
    status: 'Ongoing',
    context: 'Team project',
    summary:
      'An agricultural advisory platform that turns soil, field and weather data into crop, fertility and irrigation recommendations.',
    description: [
      'Cropify (also developed under the name KisanAI) helps farmers make data-driven decisions. A FastAPI machine-learning server exposes trained scikit-learn models, and a React + TypeScript interface collects field inputs and presents the advice.',
      'Weather is pulled live from OpenWeatherMap by city name or GPS coordinates, so recommendations reflect current conditions rather than static assumptions.',
    ],
    highlightsLabel: "What's built",
    highlights: [
      'Crop recommendation — Random Forest classifier using N, P, K, pH and environmental factors.',
      'Soil fertility analysis — Random Forest regressor using NDVI, soil moisture and elevation.',
      'Irrigation advisory — classifier over 19 field parameters.',
      'Disease detection from user-uploaded crop images.',
      'Live weather integration via the OpenWeatherMap API.',
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
    featured: true,
  },
  {
    slug: 'resume-screening',
    index: '04',
    title: 'AI Resume Screening Tool',
    category: 'Artificial Intelligence / NLP',
    filters: ['ai'],
    status: 'Internship project',
    context: 'AI Internship · Internz Learn',
    summary: 'Extracts text from a resume and a job description, then scores how closely they match.',
    description: [
      'Built during the AI internship at Internz Learn. A Flask web app accepts a resume (PDF or DOCX) and a job description, extracts their text and measures how well they align.',
      'Matching uses TF-IDF vectors with English stop-words removed and cosine similarity from scikit-learn. NLTK, spaCy and a BERT extractive summariser are part of the project’s text-processing toolkit.',
    ],
    highlightsLabel: "What's built",
    highlights: [
      'Upload form for a resume and a job description.',
      'Document text extraction with pdfminer.six and python-docx.',
      'Resume-to-job match score using TF-IDF + cosine similarity.',
    ],
    stack: ['Python', 'Flask', 'Scikit-learn', 'NLTK', 'spaCy', 'BERT', 'pdfminer.six', 'python-docx'],
    repo: gh('Ai-Resume-Screening'),
    art: 'document',
  },
  {
    slug: 'visionguard-kc',
    index: '05',
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
    slug: 'medidispense',
    index: '06',
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
    slug: 'lost-and-found',
    index: '07',
    title: 'BIET Lost & Found System',
    category: 'Web Development',
    filters: ['web'],
    summary: 'A campus lost-and-found web app: report items, pin them on a map, and coordinate returns through private chat.',
    description: [
      'An academic Django application for managing lost and found items within the college. Users report lost or found belongings, mark where they were seen on an interactive map, and coordinate recovery through a private in-app chat.',
      'Reports are matched by proximity, and the interface is available in English, Hindi and Kannada.',
    ],
    highlightsLabel: 'Features',
    highlights: [
      'Interactive Leaflet maps with light and dark tiles.',
      'High-accuracy geolocation with Nominatim reverse geocoding.',
      'Automatic proximity matching for reports within a 10 km radius.',
      'Private user-to-user chat to verify and coordinate recovery.',
      'English, Hindi and Kannada localisation; email-delivered OTP authentication.',
    ],
    stack: ['Python', 'Django', 'SQLite', 'JavaScript', 'Leaflet.js', 'gettext i18n'],
    repo: gh('lostandfoundtrackingpublic'),
    art: 'map',
  },
  {
    slug: 'hospital-management',
    index: '08',
    title: 'Hospital Management System',
    category: 'Web Development',
    filters: ['web'],
    summary: 'A Django web app for doctors, patients and appointments — booking, dashboards and printable invoices.',
    description: [
      'An academic project covering core hospital workflows: patient registration and login, appointment booking, a doctor dashboard for upcoming schedules, and invoice generation from confirmed bookings.',
    ],
    highlightsLabel: 'Features',
    highlights: [
      'Appointment booking with an upcoming / completed dashboard filtered client-side.',
      'Printable invoices generated from successful bookings.',
      'Doctor dashboard for schedules.',
      'User registration, login and email change.',
      'JSON endpoints for appointment data (/api/appointments/, /api/latest_appointment/).',
    ],
    stack: ['Python', 'Django', 'SQLite', 'JavaScript', 'HTML', 'CSS'],
    repo: gh('Hospital-Management-System'),
    art: 'pulse',
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
