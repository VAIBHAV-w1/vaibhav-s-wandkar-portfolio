/**
 * Verified skill groups synced with portfolio repositories and internship records.
 * Each technology appears once to prevent duplication between the core Django spotlight
 * and the supporting 6-group skill matrix.
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
    summary: 'Modular multi-app Django layouts separating auth, domain models, views and media delivery.',
    evidence: 'DeepVision, Lost and Found Tracking System, Hospital Management System',
    projects: ['deepvision', 'lost-and-found', 'hospital-management'],
  },
  {
    id: 'models',
    title: 'Models & Relational Schemas',
    summary: 'CustomUser, Doctor, Appointment, item reports and 18-table surveillance schemas with PostgreSQL DDL.',
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
    title: 'Views, Templates, Forms & JSON APIs',
    summary: 'Validated server forms, printable HTML invoices, P2P messaging and /api/ JSON endpoints.',
    evidence: 'Hospital Management (/api/appointments/), Lost & Found, DeepVision',
    projects: ['hospital-management', 'lost-and-found', 'deepvision'],
  },
]

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages-web',
    label: 'Languages & Web UI',
    skills: [
      { name: 'Java', note: 'Tripillar DSA workshop and Java practice repositories on GitHub.' },
      { name: 'TypeScript', usedIn: ['cropify', 'decentralized-voting'] },
      { name: 'JavaScript', usedIn: ['lost-and-found', 'hospital-management', 'cybershield'] },
      { name: 'HTML5', usedIn: ['lost-and-found', 'hospital-management'] },
      { name: 'CSS3', usedIn: ['lost-and-found', 'hospital-management'] },
      { name: 'React', usedIn: ['deepvision', 'cybershield', 'cropify'] },
    ],
  },
  {
    id: 'cloud-delivery',
    label: 'Cloud & Platforms',
    skills: [
      { name: 'PostgreSQL', usedIn: ['deepvision', 'decentralized-voting'] },
      { name: 'Supabase', usedIn: ['deepvision', 'cybershield'] },
      { name: 'Cloud Computing', note: 'Corizo Edutech Cloud Computing Internship (IaaS, PaaS, SaaS, virtualization).' },
      { name: 'Render', usedIn: ['deepvision'] },
      { name: 'Vercel', usedIn: ['deepvision'] },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI / ML & Vision',
    skills: [
      { name: 'OpenCV', usedIn: ['deepvision'] },
      { name: 'PyTorch', usedIn: ['deepvision', 'retino'] },
      { name: 'FastAPI', usedIn: ['cropify', 'retino'] },
      { name: 'Scikit-learn', usedIn: ['cropify', 'retino', 'resume-screening'] },
      { name: 'NumPy', usedIn: ['cropify', 'deepvision'] },
      { name: 'Generative AI', usedIn: ['cybershield'] },
    ],
  },
  {
    id: 'cybersecurity',
    label: 'Cybersecurity & VAPT',
    skills: [
      { name: 'Kali Linux', note: 'Security assessment environment used during VAPT coursework and internship labs.' },
      { name: 'Burp Suite', note: 'Web request interception and parameter security testing.' },
      { name: 'Nmap', note: 'Host discovery and service enumeration during security audits.' },
      { name: 'SQL Injection', note: 'VAPT testing and remediation reporting during HAEGL Cybersecurity Internship.' },
      { name: 'XSS & CSRF Testing', note: 'Web vulnerability assessment and framework defenses in HAEGL & Django builds.' },
    ],
  },
  {
    id: 'tools',
    label: 'Developer Tools',
    skills: [
      { name: 'Git', note: 'Version control across every project repository.' },
      { name: 'GitHub', note: 'Public source hosting for every repository linked in this portfolio.' },
      { name: 'VS Code', note: 'Primary development editor across Python, TypeScript and React projects.' },
      { name: 'Jupyter Notebook', usedIn: ['retino'] },
      { name: 'Figma', note: 'Interface wireframing and component layout planning.' },
    ],
  },
  {
    id: 'core-cs',
    label: 'Core CS Foundations',
    skills: [
      { name: 'Data Structures & Algorithms', note: 'DSA workshop and Java practice repositories on GitHub.' },
      { name: 'OOP', note: 'Object-oriented design in Java, Python and Django model hierarchies.' },
      { name: 'Operating Systems', note: 'Process scheduling, memory management and threading foundations.' },
      { name: 'Computer Networks', note: 'TCP/IP, HTTP/REST and port-level diagnostics.' },
      { name: 'DBMS', note: 'Normalization, constraints, indexing and relational transactions.' },
    ],
  },
]
