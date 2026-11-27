import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { profile } from './src/data/profile.ts'
import { social } from './src/data/social.ts'

/**
 * The production domain is never hard-coded. It is resolved from:
 *  1. VITE_SITE_URL (set it in .env or in your hosting dashboard), or
 *  2. VERCEL_PROJECT_PRODUCTION_URL, which Vercel injects automatically at build time.
 * When neither exists, canonical / og:url tags and the sitemap are simply omitted.
 */
function resolveSiteUrl(env: Record<string, string>) {
  const explicit = env.VITE_SITE_URL || process.env.VITE_SITE_URL || ''
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  return (explicit || (vercel ? `https://${vercel}` : '')).replace(/\/+$/, '')
}

const ROUTES = ['/', '/privacy']

function siteMeta(siteUrl: string): Plugin {
  return {
    name: 'vsw-site-meta',
    transformIndexHtml(html) {
      const tags: string[] = []
      if (siteUrl) {
        tags.push(`<link rel="canonical" href="${siteUrl}/" />`, `<meta property="og:url" content="${siteUrl}/" />`)
      }
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.name,
        alternateName: 'VSW',
        ...(siteUrl ? { url: `${siteUrl}/` } : {}),
        jobTitle: 'Python & Django Full-Stack Developer',
        description: profile.intro,
        email: `mailto:${social.email.handle}`,
        sameAs: [social.github.href, social.linkedin.href],
        affiliation: {
          '@type': 'CollegeOrUniversity',
          name: 'Bapuji Institute of Engineering and Technology (BIET), Davangere',
        },
        knowsAbout: profile.interests,
        knowsLanguage: profile.languages,
      }
      tags.push(`<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`)
      const ogImage = siteUrl ? `${siteUrl}/og-image.png` : '/og-image.png'
      return html.replace('<!--SITE_META-->', tags.join('\n    ')).replaceAll('%OG_IMAGE%', ogImage)
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', ...(siteUrl ? ['', `Sitemap: ${siteUrl}/sitemap.xml`] : [])]
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') + '\n' })
      if (siteUrl) {
        const today = new Date().toISOString().slice(0, 10)
        const urls = ROUTES.map(
          (r) => `  <url>\n    <loc>${siteUrl}${r}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
        ).join('\n')
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        })
      }
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = resolveSiteUrl(env)
  return {
    plugins: [react(), tailwindcss(), siteMeta(siteUrl)],
    define: {
      __SITE_URL__: JSON.stringify(siteUrl),
    },
    build: {
      target: 'es2022',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 700,
    },
  }
})
