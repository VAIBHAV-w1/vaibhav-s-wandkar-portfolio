/**
 * Finalised skill list. Do not add skills that are not listed here.
 * `usedIn` references project slugs from projects.ts and only lists projects
 * where the repository actually shows the skill in use.
 */
export interface Skill {
  name: string
  usedIn?: string[]
  note?: string
}

export interface SkillGroup {
  id: string
  label: string
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    label: 'Programming Languages',
    skills: [
      { name: 'Python', usedIn: ['deepvision', 'cropify', 'resume-screening', 'lost-and-found', 'hospital-management'] },
      { name: 'Java', note: 'DSA workshop and Java practice repositories on GitHub.' },
      { name: 'JavaScript', usedIn: ['cybershield', 'deepvision', 'lost-and-found', 'hospital-management'] },
      { name: 'SQL', usedIn: ['deepvision'] },
    ],
  },
  {
    id: 'ai',
    label: 'AI / ML',
    skills: [
      { name: 'OpenCV', usedIn: ['deepvision'] },
      { name: 'Scikit-learn', usedIn: ['cropify', 'resume-screening'] },
      { name: 'Generative AI', usedIn: ['cybershield'] },
    ],
  },
  {
    id: 'web',
    label: 'Web Development',
    skills: [
      { name: 'HTML', usedIn: ['roam-rover', 'hospital-management', 'lost-and-found'] },
      { name: 'CSS', usedIn: ['roam-rover', 'hospital-management', 'lost-and-found'] },
      { name: 'Django', usedIn: ['deepvision', 'lost-and-found', 'hospital-management'] },
      { name: 'Streamlit' },
    ],
  },
  {
    id: 'data',
    label: 'Databases & Cloud',
    skills: [
      { name: 'MySQL' },
      { name: 'SQLite', usedIn: ['deepvision', 'lost-and-found', 'hospital-management'] },
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
    id: 'design',
    label: 'UI / UX',
    skills: [{ name: 'Figma' }],
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
      { name: 'Object-Oriented Programming' },
      { name: 'Operating Systems' },
      { name: 'Computer Networks' },
      { name: 'DBMS' },
    ],
  },
]
