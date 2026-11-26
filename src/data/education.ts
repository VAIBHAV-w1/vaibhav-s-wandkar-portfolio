/** Dates and scores are intentionally omitted until verified. */
export interface EducationItem {
  stage: string
  qualification: string
  institution: string
  place: string
  affiliation?: string
  current?: boolean
}

export const education: EducationItem[] = [
  {
    stage: 'Undergraduate',
    qualification: 'Bachelor of Engineering — Computer Science and Design',
    institution: 'Bapuji Institute of Engineering and Technology (BIET)',
    place: 'Davangere',
    affiliation: 'VTU',
    current: true,
  },
  {
    stage: 'Diploma',
    qualification: 'Diploma in Computer Science',
    institution: "KLE Society's Smt. C.I. Munavalli Polytechnic",
    place: 'Hubli',
  },
  {
    stage: 'Secondary',
    qualification: 'SSLC',
    institution: 'Chetan Public School',
    place: 'Hubli',
  },
]
