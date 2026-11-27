import { social } from './social'

/**
 * Site-level configuration. The production URL is resolved from VITE_SITE_URL or
 * VERCEL_PROJECT_PRODUCTION_URL during the build.
 */
export const site = {
  url: __SITE_URL__,
  title: 'Vaibhav S. Wandkar | Python & Django Full-Stack Developer',
  description:
    'Portfolio of Vaibhav S. Wandkar (VSW) — Computer Science and Design student building web applications with Python and Django, alongside AI, computer vision and cybersecurity projects.',
  privacyUpdated: '27 November 2026',
  fallbackEmail: social.email.handle,
}
