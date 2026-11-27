/**
 * Academic qualifications, institutions and education timelines.
 */
export interface EducationItem {
  stage: string
  qualification: string
  institution: string
  place: string
  period: string
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
    affiliation: 'VTU',
    current: true,
  },
  {
    stage: 'Diploma',
    qualification: 'Diploma in Computer Science and Engineering',
    institution: "K.L.E. Society's Smt. C.I. Munavalli Polytechnic, Hubli",
    place: 'Hubli',
    period: '2021 – 2024',
  },
  {
    stage: 'Secondary',
    qualification: 'SSLC',
    institution: 'Chetan Public School, Hubli',
    place: 'Hubli',
    period: '2020 – 2021',
  },
]
