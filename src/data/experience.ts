/**
 * Experience and recognition, exactly as supplied. No dates, certificates or titles
 * are added beyond what was provided.
 */
export interface ExperienceItem {
  role: string
  org: string
  kind?: string
  period?: string
  relatedProject?: string
}

export const experience: ExperienceItem[] = [
  { role: 'Data Science Intern', org: 'Unified Mentor', kind: 'Internship', period: 'Started Jan 2026' },
  { role: 'Cybersecurity Internship', org: 'HAEGL', kind: 'Internship' },
  { role: 'AI Internship', org: 'Internz Learn', kind: 'Internship', relatedProject: 'resume-screening' },
  { role: 'Android App Development', org: 'Corizo · Wipro DICE' },
  { role: 'Cloud Computing', org: 'Corizo' },
]

export interface Achievement {
  event: string
  result: string
}

export const achievements: Achievement[] = [
  { event: 'CodeFury 8.0', result: 'Finalist' },
  { event: 'Smart India Hackathon', result: 'Qualifier' },
  { event: 'Build for Bengaluru', result: 'Participant' },
]
