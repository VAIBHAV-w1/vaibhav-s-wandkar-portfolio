/**
 * Core personal identity & editorial narrative — verified against public
 * GitHub repositories (github.com/VAIBHAV-w1) and portfolio records.
 */
export const profile = {
  name: 'Vaibhav S. Wandkar',
  firstName: 'Vaibhav',
  middleInitial: 'S.',
  lastName: 'Wandkar',
  initials: 'VSW',
  location: 'Hubli, Karnataka, India',
  positioning: 'Python Developer | Django Full-Stack Developer | Software Engineer',
  headline: 'Building intelligent applications through thoughtful engineering.',
  intro:
    "I'm a Computer Science and Design undergraduate focused on Python, Django and full-stack software engineering — turning ideas into dependable systems with clean relational schemas and purposeful interfaces.",
  focusAreas: [
    { index: '01', label: 'Python & Django', detail: 'Full-stack architecture & server logic' },
    { index: '02', label: 'Database Systems', detail: 'Relational schemas with PostgreSQL, MySQL & SQLite' },
    { index: '03', label: 'Web Engineering', detail: 'Responsive interfaces & OTP/session auth' },
    { index: '04', label: 'AI & Security', detail: 'Computer vision, ML & web security' },
  ],
  education: {
    degree: 'B.E. Computer Science and Design',
    institution: 'Bapuji Institute of Engineering and Technology, Davangere',
    university: 'VTU',
    period: '2024 – Expected 2027',
  },
  languages: ['English', 'Hindi', 'Kannada', 'Marathi'],
  interests: [
    'Python & Django Backend Engineering',
    'Relational Database Architecture',
    'Applied AI & Computer Vision',
    'Application Security & VAPT',
    'Full-Stack Web Systems',
    'Cloud Deployment Workflows',
  ],
  exploring: [
    'Multi-camera AI & cloud inference runtimes',
    'PostgreSQL performance & REST security hardening',
    'Cross-browser accessibility & UI verification',
  ],
  about: {
    statement:
      'I build dependable, database-driven software with Python and Django — pairing structured backend architecture with interfaces designed for clarity.',
    background:
      'Studying both computer science and interaction design shapes how I plan data models alongside user workflows, building directly on my Diploma foundation in software and networking.',
    approach:
      'Across surveillance intelligence, campus recovery portals, healthcare scheduling and security tooling, I prioritize clean schema design, role-based access control, input validation and maintainable delivery — backed by internships across AI, cloud, Android UI and VAPT.',
  },
} as const
