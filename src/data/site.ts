import { social } from './social'

/**
 * Site-level configuration. The production URL is never hard-coded — see
 * vite.config.ts and .env.example.
 */
export const site = {
  url: __SITE_URL__,
  title: 'Vaibhav S. Wandkar — Software Developer · AI/ML · Cybersecurity',
  description:
    'Portfolio of Vaibhav S. Wandkar, a Computer Science and Design engineering student at BIET Davangere building software across AI/ML, computer vision, cybersecurity and web development.',
  privacyUpdated: '26 November 2026',
}

export type ContactProvider =
  | { kind: 'web3forms'; name: 'Web3Forms'; endpoint: string; accessKey: string; policy: string }
  | { kind: 'formsubmit'; name: 'FormSubmit'; endpoint: string; policy: string }

const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim()
const formSubmitId = import.meta.env.VITE_FORMSUBMIT_ID?.trim() || social.email.handle

export const contactProvider: ContactProvider = web3Key
  ? {
      kind: 'web3forms',
      name: 'Web3Forms',
      endpoint: 'https://api.web3forms.com/submit',
      accessKey: web3Key,
      policy: 'https://web3forms.com/privacy',
    }
  : {
      kind: 'formsubmit',
      name: 'FormSubmit',
      endpoint: `https://formsubmit.co/ajax/${encodeURIComponent(formSubmitId)}`,
      policy: 'https://formsubmit.co/privacy.pdf',
    }
