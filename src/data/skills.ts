/**
 * Finalised skill list. Do not add unverified skills or proficiency percentages.
 * Python & Django backend technologies lead the hierarchy, while all other
 * verified skills remain organized and cross-linked to projects.
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

export const primaryBackendGroup: SkillGroup = {
  id: 'backend-primary',
  label: 'Primary — Backend Development',
  skills: [
    {
      name: 'Python',
      featured: true,
      usedIn: ['lost-and-found', 'hospital-management', 'deepvision', 'cropify', 'resume-screening'],
      note: 'Core language across Django web platforms, FastAPI ML services, Flask apps and computer vision pipelines.',
    },
    {
      name: 'Django',
      featured: true,
      usedIn: ['lost-and-found', 'hospital-management', 'deepvision'],
      note: 'ORM data modelling, authentication, REST endpoints, template views and PostgreSQL/SQLite persistence.',
    },
    {
      name: 'SQL',
      usedIn: ['deepvision', 'lost-and-found', 'hospital-management'],
      note: 'Relational schema design, queries, migrations and PostgreSQL / SQLite data integrity.',
    },
    {
      name: 'SQLite',
      usedIn: ['lost-and-found', 'hospital-management', 'deepvision'],
      note: 'Embedded relational persistence across Django web and surveillance platforms.',
    },
    {
      name: 'MySQL',
      note: 'Relational database design, querying and schema normalization.',
    },
  ],
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    label: 'Programming Languages',
    skills: [
      { name: 'Python', usedIn: ['lost-and-found', 'hospital-management', 'deepvision', 'cropify', 'resume-screening'] },
      { name: 'Java', note: 'DSA workshop and Java practice repositories on GitHub.' },
      { name: 'JavaScript', usedIn: ['cybershield', 'deepvision', 'lost-and-found', 'hospital-management'] },
      { name: 'SQL', usedIn: ['deepvision', 'lost-and-found', 'hospital-management'] },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend Development',
    skills: [
      { name: 'HTML', usedIn: ['roam-rover', 'hospital-management', 'lost-and-found'] },
      { name: 'CSS', usedIn: ['roam-rover', 'hospital-management', 'lost-and-found'] },
      { name: 'JavaScript', usedIn: ['cybershield', 'deepvision', 'lost-and-found', 'hospital-management'] },
    ],
  },
  {
    id: 'data',
    label: 'Databases & Cloud',
    skills: [
      { name: 'MySQL' },
      { name: 'SQLite', usedIn: ['lost-and-found', 'hospital-management', 'deepvision'] },
      { name: 'Supabase', usedIn: ['deepvision', 'cybershield'] },
      { name: 'Vercel', usedIn: ['deepvision'] },
    ],
  },
  {
    id: 'tools',
    label: 'Developer Tools',
    skills: [
      { name: 'Git', note: 'Every repository linked on this page.' },
      { name: 'GitHub', note: 'Every repository linked on this page.' },
      { name: 'VS Code' },
      { name: 'Jupyter Notebook' },
    ],
  },
  {
    id: 'ai',
    label: 'AI & Machine Learning',
    skills: [
      { name: 'OpenCV', usedIn: ['deepvision'] },
      { name: 'Scikit-learn', usedIn: ['cropify', 'resume-screening'] },
      { name: 'Generative AI', usedIn: ['cybershield'] },
    ],
  },
  {
    id: 'security',
    label: 'Cybersecurity',
    skills: [{ name: 'Kali Linux' }, { name: 'Burp Suite' }, { name: 'Nmap' }, { name: 'SQL Injection' }],
  },
  {
    id: 'core',
    label: 'Core Computer Science',
    skills: [
      { name: 'Data Structures & Algorithms', note: 'DSA workshop repository on GitHub.' },
      { name: 'OOP' },
      { name: 'Operating Systems' },
      { name: 'Computer Networks' },
      { name: 'DBMS' },
    ],
  },
  {
    id: 'design',
    label: 'UI / UX & Prototyping',
    skills: [{ name: 'Figma' }, { name: 'Streamlit' }],
  },
]
