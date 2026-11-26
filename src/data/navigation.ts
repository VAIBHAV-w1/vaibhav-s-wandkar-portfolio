export interface NavItem {
  id: string
  label: string
  index: string
}

export const navItems: NavItem[] = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'work', label: 'Work', index: '02' },
  { id: 'skills', label: 'Skills', index: '03' },
  { id: 'experience', label: 'Experience', index: '04' },
  { id: 'education', label: 'Education', index: '05' },
  { id: 'contact', label: 'Contact', index: '06' },
]
