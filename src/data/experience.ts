/**
 * Verified internships (4 unique entries), certifications and hackathon milestones.
 * Certifications keep a dedicated structure so they do not duplicate internship timeline descriptions.
 */
export interface ExperienceItem {
  role: string
  org: string
  period: string
  summary: string
  highlights: string[]
  relatedProject?: string
}

export const experience: ExperienceItem[] = [
  {
    role: 'Android App Development Intern',
    org: 'Corizo Edutech Pvt. Ltd.',
    period: 'May 2025 – June 2025',
    summary: 'Built responsive mobile interfaces and stabilized Android navigation flows across varied screen dimensions.',
    highlights: [
      'Designed and implemented 5+ responsive Android UI screens tailored for multiple device sizes and resolutions.',
      'Diagnosed and resolved activity lifecycle issues across 3 application modules, improving navigation stability.',
    ],
  },
  {
    role: 'Cloud Computing Intern',
    org: 'Corizo Edutech Pvt. Ltd.',
    period: 'April 2025 – June 2025',
    summary: 'Worked hands-on with core cloud service models, virtualization and repeatable environment setup.',
    highlights: [
      'Applied IaaS, PaaS, SaaS and virtualization workflows across 10+ practical cloud lab exercises.',
      'Configured 3 cloud deployment environments and authored standardized setup documentation.',
    ],
  },
  {
    role: 'Artificial Intelligence Intern',
    org: 'Internz Learn',
    period: 'November 2024 – December 2024',
    summary: 'Prepared structured training datasets and benchmarked machine learning models for predictive accuracy.',
    highlights: [
      'Cleaned and structured 10,000+ records using Pandas and NumPy to improve downstream model quality.',
      'Evaluated and compared 4+ machine learning models to identify the strongest predictive baseline.',
    ],
    relatedProject: 'resume-screening',
  },
  {
    role: 'Cybersecurity Intern',
    org: 'HAEGL Technologies Pvt. Ltd.',
    period: 'January 2024 – April 2024',
    summary: 'Conducted web application vulnerability assessments and documented practical remediation steps.',
    highlights: [
      'Executed vulnerability assessment and penetration testing (VAPT) across web applications, identifying SQL Injection, XSS and CSRF flaws.',
      'Authored remediation reports covering 15+ findings with actionable fixes to harden application security.',
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
    credentialType: 'Industry Program Credential',
  },
  {
    title: 'Cloud Computing',
    issuer: 'Corizo Edutech',
    year: '2025',
    credentialType: 'Completion Certificate',
  },
  {
    title: 'Artificial Intelligence',
    issuer: 'Internz Learn',
    year: '2024',
    credentialType: 'Program Certificate',
  },
  {
    title: 'Cybersecurity Internship Certification',
    issuer: 'HAEGL Technologies Pvt. Ltd.',
    year: '2024',
    credentialType: 'Internship Completion',
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
