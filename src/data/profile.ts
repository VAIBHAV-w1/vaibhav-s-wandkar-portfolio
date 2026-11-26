/**
 * Core personal identity & editorial narrative — synced with VaibhavSWandkarResume (2).pdf
 * and verified public GitHub repositories (github.com/VAIBHAV-w1).
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
    "I'm a Computer Science and Design undergraduate focused on Python, Django and full-stack development. I enjoy turning ideas into practical software through reliable backend systems, thoughtful interfaces and emerging technologies.",
  focusAreas: [
    { index: '01', label: 'Python & Django', detail: 'Full-stack architecture & server logic' },
    { index: '02', label: 'Database Systems', detail: 'Relational schemas with MySQL & SQLite' },
    { index: '03', label: 'Web Engineering', detail: 'Responsive interfaces & secure auth' },
    { index: '04', label: 'AI & Security', detail: 'Computer vision, ML & web security' },
  ],
  education: {
    degree: 'B.E. Computer Science and Design',
    institution: 'Bapuji Institute of Engineering and Technology, Davangere',
    university: 'VTU',
    period: '2024 – Expected 2027',
    score: 'CGPA: 7.78 / 10',
  },
  languages: ['English', 'Hindi', 'Kannada', 'Marathi'],
  interests: [
    'Python & Django Development',
    'Backend Architecture',
    'Full-Stack Application Development',
    'Database Design',
    'Artificial Intelligence & Machine Learning',
    'Computer Vision',
    'Cybersecurity',
  ],
  exploring: [
    'Production backend architecture',
    'Applied AI & computer vision systems',
    'Secure web application engineering',
    'Cloud deployment workflows',
  ],
  about: {
    statement:
      'I build dependable, database-driven software with Python and Django — bridging structured backend engineering with interfaces designed for everyday clarity.',
    background:
      'Currently pursuing a B.E. in Computer Science and Design at Bapuji Institute of Engineering and Technology, Davangere (expected 2027), I built my programming foundation through a Diploma in Computer Science and Engineering at K.L.E. Society’s Smt. C.I. Munavalli Polytechnic. Studying both design and systems engineering shapes how I plan data models alongside user flows.',
    approach:
      'Across projects spanning surveillance intelligence, campus recovery portals, hospital scheduling and web security, I focus on clean schema design, role-based access control, input validation and maintainable code — complemented by internships in AI, cloud infrastructure, Android UI and vulnerability assessment.',
  },
} as const
