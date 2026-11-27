/**
 * Public contact & social links (email, location, GitHub, LinkedIn).
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
  location: 'Hubli, Karnataka, India',
} as const

export const socialList = [social.github, social.linkedin] as const
