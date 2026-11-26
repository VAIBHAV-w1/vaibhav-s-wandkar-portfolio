/**
 * Academic timeline verified directly from VaibhavSWandkarResume (2).pdf.
 */
export interface EducationItem {
  stage: string
  qualification: string
  institution: string
  place: string
  period: string
  score: string
  affiliation?: string
  current?: boolean
}

export const education: EducationItem[] = [
  {
    stage: 'Undergraduate',
    qualification: 'B.E. Computer Science and Design',
    institution: 'Bapuji Institute of Engineering and Technology, Davangere',
    place: 'Davangere',
    period: '2024 – Expected 2027',
    score: 'CGPA: 7.78 / 10',
    affiliation: 'VTU',
    current: true,
  },
  {
    stage: 'Diploma',
    qualification: 'Diploma in Computer Science and Engineering',
    institution: "K.L.E. Society's Smt. C.I. Munavalli Polytechnic",
    place: 'Hubli',
    period: '2021 – 2024',
    score: '77.3%',
  },
  {
    stage: 'Secondary',
    qualification: 'SSLC',
    institution: 'Chetan Public School',
    place: 'Hubli',
    period: '2020 – 2021',
    score: '62.24%',
  },
]
