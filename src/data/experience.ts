/**
 * Four verified internships, four certificates and five hackathon/project achievements.
 */
export interface ExperienceItem {
  role: string
  org: string
  period: string
  highlights: string[]
  relatedProject?: string
}

export const experience: ExperienceItem[] = [
  {
    role: 'Android App Development Intern',
    org: 'Corizo Edutech Pvt. Ltd.',
    period: 'May 2025 – June 2025',
    highlights: [
      'Built 5+ responsive Android UI screens across varied screen sizes and resolutions.',
      'Fixed activity lifecycle bugs across 3 app modules to stabilize screen navigation.',
    ],
  },
  {
    role: 'Cloud Computing Intern',
    org: 'Corizo Edutech Pvt. Ltd.',
    period: 'April 2025 – June 2025',
    highlights: [
      'Completed 10+ practical labs covering IaaS, PaaS, SaaS and virtualization.',
      'Configured 3 cloud deployment setups with team setup documentation.',
    ],
  },
  {
    role: 'Artificial Intelligence Intern',
    org: 'Internz Learn',
    period: 'November 2024 – December 2024',
    highlights: [
      'Cleaned and structured 10,000+ training records using Pandas and NumPy.',
      'Compared 4+ machine learning baselines and built the Flask TF-IDF resume screening app.',
    ],
    relatedProject: 'resume-screening',
  },
  {
    role: 'Cybersecurity Intern',
    org: 'HAEGL Technologies Pvt. Ltd.',
    period: 'January 2024 – April 2024',
    highlights: [
      'Ran web VAPT checks identifying SQL Injection, XSS and CSRF issues.',
      'Documented remediation steps across 15+ vulnerability findings.',
    ],
  },
]

export interface CertificationItem {
  title: string
  issuer: string
  year: string
  credentialType: string
}

export const certifications: CertificationItem[] = [
  {
    title: 'Android App Development',
    issuer: 'Corizo Edutech & Wipro DICE',
    year: '2025',
    credentialType: 'Certificate',
  },
  {
    title: 'Cloud Computing',
    issuer: 'Corizo Edutech',
    year: '2025',
    credentialType: 'Certificate',
  },
  {
    title: 'Artificial Intelligence',
    issuer: 'Internz Learn',
    year: '2024',
    credentialType: 'Certificate',
  },
  {
    title: 'Cybersecurity Internship Certification',
    issuer: 'HAEGL Technologies Pvt. Ltd.',
    year: '2024',
    credentialType: 'Certificate',
  },
]

export interface Achievement {
  event: string
  result: string
  year: string
  category: 'Hackathon' | 'Achievement'
}

export const achievements: Achievement[] = [
  { event: 'CodeFury 8.0', result: 'National-Level Finalist', year: '2025', category: 'Hackathon' },
  { event: 'Smart India Hackathon', result: 'Internal Round Qualifier', year: '2025', category: 'Hackathon' },
  { event: 'Build for Bengaluru Hackathon', result: 'Participant', year: '2025', category: 'Hackathon' },
  { event: 'CBIT Hacktoberfest', result: 'Participant', year: '2025', category: 'Hackathon' },
  {
    event: 'NAIN 2.0 Project Contributor',
    result: 'Smart Atmospheric Water Generation System',
    year: '2025',
    category: 'Achievement',
  },
]
