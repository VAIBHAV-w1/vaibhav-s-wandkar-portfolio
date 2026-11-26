/**
 * Verified skill groups synced strictly with VaibhavSWandkarResume (2).pdf
 * and repository evidence. Zero unverified additions or proficiency bars.
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
      note: 'Relational ORM models, authentication, role-based views, templates, CRUD workflows and database persistence.',
    },
    {
      name: 'SQL',
      usedIn: ['deepvision', 'lost-and-found', 'hospital-management'],
      note: 'Relational schema design, PostgreSQL / SQLite DDL, querying and sequence migration.',
    },
    {
      name: 'SQLite',
      usedIn: ['deepvision', 'decentralized-voting', 'lost-and-found', 'hospital-management'],
      note: 'Embedded relational persistence across Django web and surveillance platforms.',
    },
    {
      name: 'MySQL',
      usedIn: ['lost-and-found'],
      note: 'Relational schema design, SQL querying and PyMySQL integration.',
    },
  ],
}

export const djangoCapabilities: DjangoCapability[] = [
  {
    id: 'arch',
    title: 'Application Architecture & Routing',
    summary: 'Modular multi-app Django project layouts separating auth, domain models, views and media services.',
    evidence: 'DeepVision, Lost and Found Tracking System, Hospital Management System',
    projects: ['deepvision', 'lost-and-found', 'hospital-management'],
  },
  {
    id: 'models',
    title: 'Models & Relational Schemas',
    summary: 'CustomUser, Doctor, Appointment, Item report and 18-table surveillance schemas with PostgreSQL DDL.',
    evidence: 'DeepVision, Lost and Found Tracking System, Hospital Management System',
    projects: ['deepvision', 'hospital-management', 'lost-and-found'],
  },
  {
    id: 'auth',
    title: 'Authentication & Security',
    summary: 'PBKDF2 password hashing, signed-cookie sessions, XSS & CSRF protection and email OTP verification.',
    evidence: 'DeepVision, Lost and Found Tracking System, Hospital Management System',
    projects: ['deepvision', 'lost-and-found', 'hospital-management'],
  },
  {
    id: 'apis',
    title: 'Views, Templates, Forms & Data Flows',
    summary: 'Server-rendered forms with validation, printable HTML invoices, P2P messaging and JSON endpoints.',
    evidence: 'Hospital Management (/api/appointments/), Lost & Found, DeepVision',
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
      { name: 'SQL', usedIn: ['deepvision', 'lost-and-found', 'hospital-management'] },
    ],
  },
  {
    id: 'web-development',
    label: 'Web Development',
    skills: [
      { name: 'HTML', usedIn: ['lost-and-found', 'hospital-management', 'deepvision'] },
      { name: 'CSS', usedIn: ['lost-and-found', 'hospital-management', 'deepvision'] },
      { name: 'Django', usedIn: ['deepvision', 'lost-and-found', 'hospital-management'] },
      { name: 'Streamlit' },
    ],
  },
  {
    id: 'databases-cloud',
    label: 'Databases & Cloud',
    skills: [
      { name: 'MySQL', usedIn: ['lost-and-found'] },
      { name: 'SQLite', usedIn: ['deepvision', 'decentralized-voting', 'lost-and-found', 'hospital-management'] },
      { name: 'Supabase', usedIn: ['deepvision', 'cybershield'] },
      { name: 'Cloud Computing', note: 'Corizo Edutech Cloud Computing Internship (IaaS, PaaS, SaaS, virtualization).' },
      { name: 'Vercel', usedIn: ['deepvision'] },
    ],
  },
  {
    id: 'tools',
    label: 'Developer Tools',
    skills: [
      { name: 'Git', note: 'Version control across every project repository.' },
      { name: 'GitHub', note: 'Every repository linked on this portfolio.' },
      { name: 'VS Code' },
      { name: 'Jupyter Notebook', usedIn: ['retino'] },
      { name: 'Figma' },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI / ML',
    skills: [
      { name: 'OpenCV', usedIn: ['deepvision'] },
      { name: 'Scikit-learn', usedIn: ['cropify', 'retino', 'resume-screening'] },
      { name: 'Pandas', usedIn: ['cropify', 'retino'] },
      { name: 'NumPy', usedIn: ['cropify', 'retino', 'deepvision'] },
      { name: 'Generative AI', usedIn: ['cybershield'] },
    ],
  },
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    skills: [
      { name: 'Kali Linux' },
      { name: 'Burp Suite' },
      { name: 'Nmap' },
      { name: 'SQL Injection', note: 'VAPT testing and remediation reporting during HAEGL Cybersecurity Internship.' },
      { name: 'XSS', note: 'Web vulnerability assessment and remediation during HAEGL Internship & Hospital Management System.' },
      { name: 'CSRF', note: 'CSRF vulnerability testing & Django protection in HAEGL Internship, DeepVision & Hospital Management.' },
    ],
  },
  {
    id: 'core-cs',
    label: 'Core CS',
    skills: [
      { name: 'Data Structures and Algorithms', note: 'DSA workshop repository on GitHub.' },
      { name: 'OOP' },
      { name: 'Operating Systems' },
      { name: 'Computer Networks' },
      { name: 'DBMS' },
    ],
  },
]
