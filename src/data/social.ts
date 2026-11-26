/**
 * Contact & social links verified from VaibhavSWandkarResume (2).pdf and github.com/VAIBHAV-w1.
 */
export const social = {
  github: {
    label: 'GitHub',
    handle: 'VAIBHAV-w1',
    href: 'https://github.com/VAIBHAV-w1',
  },
  linkedin: {
    label: 'LinkedIn',
    handle: 'vaibhavswandkar',
    href: 'https://www.linkedin.com/in/vaibhavswandkar/',
  },
  email: {
    label: 'Email',
    handle: 'vaibhavwandkar5@gmail.com',
    href: 'mailto:vaibhavwandkar5@gmail.com',
  },
  phone: {
    label: 'Phone',
    handle: '+91 8296835142',
    href: 'tel:+918296835142',
  },
  location: 'Hubli, Karnataka, India',
} as const

export const socialList = [social.github, social.linkedin] as const
