/**
 * Verified skill groups & Django full-stack engineering capabilities.
 * Zero unverified skills or fake proficiency percentages.
 */
export interface Skill {
  name: string
  featured?: boolean
  usedIn?: string[]
  note?: string
}

export interface SkillGroup {
  id: string
  label: string
  skills: Skill[]
}

export interface DjangoCapability {
  id: string
  title: string
  summary: string
  evidence: string
  projects: string[]
}

export const primaryBackendGroup: SkillGroup = {
  id: 'backend-primary',
  label: 'Primary — Python & Django Full-Stack',
  skills: [
    {
      name: 'Python',
      featured: true,
      usedIn: ['deepvision', 'cropify', 'retino', 'lost-and-found', 'resume-screening', 'hospital-management'],
      note: 'Core language across Django full-stack web apps, FastAPI ML services, Flask apps and computer vision pipelines.',
    },
    {
      name: 'Django',
      featured: true,
      usedIn: ['deepvision', 'lost-and-found', 'hospital-management'],
      note: 'Relational ORM models, authentication, REST endpoints, server templates, CRUD workflows and database persistence.',
    },
    {
      name: 'SQL',
      usedIn: ['deepvision', 'lost-and-found', 'hospital-management'],
      note: 'Relational schema design, PostgreSQL / SQLite DDL, querying and sequence migration.',
    },
    {
      name: 'SQLite',
      usedIn: ['deepvision', 'decentralized-voting', 'lost-and-found', 'hospital-management'],
      note: 'Embedded relational storage powering Django portals and local surveillance telemetry.',
    },
    {
      name: 'MySQL',
      note: 'Relational schema design, SQL querying and PyMySQL integration.',
    },
  ],
}

export const djangoCapabilities: DjangoCapability[] = [
  {
    id: 'arch',
    title: 'Application Architecture & Routing',
    summary: 'Modular multi-app Django project layouts separating auth, domain models, views and media services.',
    evidence: 'DeepVision (8 apps), Lost & Found (tracker), Hospital Management (Hospital)',
    projects: ['deepvision', 'lost-and-found', 'hospital-management'],
  },
  {
    id: 'models',
    title: 'Models & Relational Schemas',
    summary: 'CustomUser, Doctor, Appointment, Item report and 18-table surveillance schemas with PostgreSQL DDL.',
    evidence: 'DeepVision, Lost & Found Tracking System, Hospital Management System',
    projects: ['deepvision', 'hospital-management', 'lost-and-found'],
  },
  {
    id: 'auth',
    title: 'Authentication & Security',
    summary: 'PBKDF2 password hashing, signed-cookie sessions, CSRF guards and rate-limited email OTP verification.',
    evidence: 'DeepVision & Lost and Found Tracking System',
    projects: ['deepvision', 'lost-and-found'],
  },
  {
    id: 'apis',
    title: 'Views, Templates, Forms & APIs',
    summary: 'Server-rendered forms with validation, printable HTML invoices, P2P messaging and JSON REST endpoints.',
    evidence: 'Hospital Management (/api/appointments/), Lost & Found, DeepVision REST layer',
    projects: ['hospital-management', 'lost-and-found', 'deepvision'],
  },
]

export const skillGroups: SkillGroup[] = [
  {
    id: 'programming',
    label: 'Programming',
    skills: [
      { name: 'Python', usedIn: ['deepvision', 'cropify', 'retino', 'lost-and-found', 'resume-screening', 'hospital-management'] },
      { name: 'Java', note: 'Tripillar DSA workshop and Java practice repositories on GitHub.' },
      { name: 'JavaScript', usedIn: ['cybershield', 'deepvision', 'lost-and-found', 'hospital-management'] },
      { name: 'SQL', usedIn: ['deepvision', 'lost-and-found', 'hospital-management'] },
    ],
  },
  {
    id: 'backend-web',
    label: 'Backend & Web',
    skills: [
      { name: 'Django', usedIn: ['deepvision', 'lost-and-found', 'hospital-management'] },
      { name: 'Python', usedIn: ['deepvision', 'cropify', 'lost-and-found', 'resume-screening', 'hospital-management'] },
      { name: 'HTML', usedIn: ['lost-and-found', 'hospital-management', 'deepvision'] },
      { name: 'CSS', usedIn: ['lost-and-found', 'hospital-management', 'deepvision'] },
      { name: 'JavaScript', usedIn: ['cybershield', 'deepvision', 'lost-and-found', 'hospital-management'] },
      { name: 'Streamlit' },
    ],
  },
  {
    id: 'databases-cloud',
    label: 'Databases & Cloud',
    skills: [
      { name: 'MySQL' },
      { name: 'SQLite', usedIn: ['deepvision', 'decentralized-voting', 'lost-and-found', 'hospital-management'] },
      { name: 'Supabase', usedIn: ['deepvision', 'cybershield'] },
      { name: 'Vercel', usedIn: ['deepvision'] },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI & Machine Learning',
    skills: [
      { name: 'OpenCV', usedIn: ['deepvision'] },
      { name: 'Scikit-learn', usedIn: ['cropify', 'retino', 'resume-screening'] },
      { name: 'Generative AI', usedIn: ['cybershield'] },
    ],
  },
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    skills: [{ name: 'Kali Linux' }, { name: 'Burp Suite' }, { name: 'Nmap' }, { name: 'SQL Injection' }],
  },
  {
    id: 'tools',
    label: 'Developer Tools',
    skills: [
      { name: 'Git', note: 'Version control across every project repository.' },
      { name: 'GitHub', note: 'Every repository linked on this portfolio.' },
      { name: 'VS Code' },
      { name: 'Jupyter Notebook', usedIn: ['retino'] },
    ],
  },
  {
    id: 'core-cs',
    label: 'Core CS',
    skills: [
      { name: 'Data Structures and Algorithms', note: 'DSA workshop repository on GitHub.' },
      { name: 'Object-Oriented Programming' },
      { name: 'Operating Systems' },
      { name: 'Computer Networks' },
      { name: 'DBMS' },
    ],
  },
]
