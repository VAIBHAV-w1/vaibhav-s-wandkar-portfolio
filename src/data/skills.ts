/**
 * Verified technical skills organized into 7 clear groups without duplication.
 */
export interface SkillGroup {
  id: string
  label: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'programming',
    label: 'Programming',
    skills: ['Python', 'Java', 'SQL'],
  },
  {
    id: 'web-development',
    label: 'Web Development',
    skills: ['HTML', 'CSS', 'Django', 'Streamlit'],
  },
  {
    id: 'databases-cloud',
    label: 'Databases & Cloud',
    skills: ['MySQL', 'SQLite', 'Supabase', 'Cloud Computing', 'Vercel'],
  },
  {
    id: 'tools',
    label: 'Developer Tools',
    skills: ['Git', 'GitHub', 'VS Code', 'Jupyter Notebook', 'Figma'],
  },
  {
    id: 'ai-ml',
    label: 'AI / ML',
    skills: ['OpenCV', 'Scikit-learn', 'Pandas', 'NumPy', 'Generative AI'],
  },
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    skills: ['Kali Linux', 'Burp Suite', 'Nmap', 'SQL Injection', 'XSS', 'CSRF'],
  },
  {
    id: 'core-cs',
    label: 'Core CS',
    skills: ['Data Structures & Algorithms', 'OOP', 'Operating Systems', 'Computer Networks', 'DBMS'],
  },
]
