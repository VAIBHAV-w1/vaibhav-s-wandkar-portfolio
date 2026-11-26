/**
 * Internships, certifications and achievements verified directly from VaibhavSWandkarResume (2).pdf.
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
    period: 'May 2025 – Jun 2025',
    highlights: [
      'Designed and developed 5+ responsive Android UI screens for multiple device sizes and resolutions.',
      'Resolved activity lifecycle bugs across 3 application modules, improving navigation stability and reducing app crashes.',
    ],
  },
  {
    role: 'Cloud Computing Intern',
    org: 'Corizo Edutech Pvt. Ltd.',
    period: 'Apr 2025 – Jun 2025',
    highlights: [
      'Applied cloud computing concepts including IaaS, PaaS, SaaS, virtualization and deployment workflows through 10+ practical lab exercises.',
      'Configured 3 cloud deployment environments and created clear documentation to standardize deployment steps for the team.',
    ],
  },
  {
    role: 'Artificial Intelligence Intern',
    org: 'Internz Learn',
    period: 'Nov 2024 – Dec 2024',
    highlights: [
      'Evaluated and compared 4+ machine learning models for predictive analysis to select the best-performing model based on accuracy.',
      'Cleaned and prepared 10,000+ structured records using Pandas and NumPy to improve data quality for model training.',
    ],
    relatedProject: 'resume-screening',
  },
  {
    role: 'Cybersecurity Intern',
    org: 'HAEGL Technologies Pvt. Ltd.',
    period: 'Jan 2024 – Apr 2024',
    highlights: [
      'Performed vulnerability assessment and penetration testing (VAPT) on web applications and identified SQL Injection, XSS and CSRF vulnerabilities.',
      'Prepared detailed remediation reports covering 15+ vulnerabilities with actionable recommendations to strengthen application security.',
    ],
  },
]

export interface CertificationItem {
  title: string
  issuer: string
  year: string
}

export const certifications: CertificationItem[] = [
  { title: 'Artificial Intelligence', issuer: 'Internz Learn', year: '2024' },
  { title: 'Cybersecurity Internship Certification', issuer: 'HAEGL Technologies Pvt. Ltd.', year: '2024' },
  { title: 'Cloud Computing', issuer: 'Corizo Edutech', year: '2025' },
  { title: 'Android App Development', issuer: 'Corizo Edutech and Wipro DICE', year: '2025' },
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
