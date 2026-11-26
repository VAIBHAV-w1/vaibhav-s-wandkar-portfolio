# Vaibhav S. Wandkar — Portfolio

Personal developer portfolio for **Vaibhav S. Wandkar** (Computer Science & Design Engineering student at Bapuji Institute of Engineering and Technology, Davangere — VTU).

Built with React, TypeScript, Vite, Tailwind CSS v4, GSAP (`ScrollTrigger`), Motion for React, Lenis, Three.js, and self-hosted variable typography (`Inter Tight`, `Instrument Serif`, `JetBrains Mono`).

---

## Features

- **Editorial Design & Dual Theme**: Graphite dark theme and warm ivory light theme with an electric-lime accent, OS preference detection on first visit, `localStorage` persistence (`vsw-theme`), and circular View Transitions API switching.
- **Interactive 3D Hero Scene**: Lazy-loaded Three.js wireframe geometry with pointer parallax, theme-reactive materials, `IntersectionObserver` pausing when off-screen, WebGL resource disposal, and an accessible SVG fallback when WebGL is unavailable or reduced motion is enabled.
- **Project Showcase & Case Studies**: Category filters (`All`, `AI & Vision`, `Security`, `Web`, `IoT`, `Research`), dedicated flagship layout for DeepVision, bespoke SVG editorial art for non-screenshot projects, verified GitHub/demo links, and keyboard-accessible project modals (`Escape`, `ArrowLeft`, `ArrowRight`).
- **Interactive Skills Cross-Linking**: Grouped skills matrix linking directly to the projects where each technology is used (without fabricated proficiency bars).
- **Experience & Education**: Verified internships, training programs, hackathon milestones, and academic timeline.
- **Functional Contact Form & Privacy Disclosure**: Client-side validation, honeypot and dwell-time spam checks, live delivery via Web3Forms or FormSubmit, direct email copy/mailto fallback, and a dedicated `/privacy` disclosure route.
- **Accessibility & SEO**: Skip link, semantic landmarks, `prefers-reduced-motion` support, focus-visible rings, self-hosted fonts, Open Graph / Twitter metadata, JSON-LD `Person` schema, `robots.txt`, and dynamic `sitemap.xml` generation.

---

## Project Structure

```text
vaibhav_s_wandkar_portfolio/
├── public/
│   ├── projects/               # Optimized WebP project previews (900w, 1600w)
│   ├── apple-touch-icon.png
│   ├── favicon.svg
│   ├── og-image.png
│   └── site.webmanifest
├── src/
│   ├── animations/             # GSAP ScrollTrigger setup & reveal hooks
│   ├── components/             # Navbar, HeroScene, ProjectModal, ProjectArt, CustomCursor, etc.
│   ├── data/                   # Centralized profile, projects, skills, experience, education, social
│   ├── hooks/                  # useTheme, useLenis, useReducedMotion, useActiveSection, useRouter
│   ├── pages/                  # PrivacyPage (/privacy)
│   ├── sections/               # Hero, About, Projects, Skills, Experience, Education, Contact, Footer
│   ├── styles/                 # Tailwind v4 theme tokens and global styles
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```

---

## Local Development

### Prerequisites

- Node.js 20+ (tested on Node.js v24.19.0)
- npm 10+

### Installation & Run

```bash
git clone https://github.com/VAIBHAV-w1/vaibhav-s-wandkar-portfolio.git
cd vaibhav-s-wandkar-portfolio
npm install
npm run dev
```

### Typecheck & Production Build

```bash
npm run typecheck
npm run build
npm run preview
```

---

## Environment Configuration

Copy `.env.example` to `.env` (never commit `.env`):

```ini
VITE_SITE_URL=
VITE_WEB3FORMS_ACCESS_KEY=
VITE_FORMSUBMIT_ID=
```

- `VITE_SITE_URL`: Optional custom production domain used for `<link rel="canonical">`, `og:url`, and `sitemap.xml`. On Vercel, this falls back automatically to `VERCEL_PROJECT_PRODUCTION_URL`.
- `VITE_WEB3FORMS_ACCESS_KEY`: Optional Web3Forms public access key for contact form submissions.
- `VITE_FORMSUBMIT_ID`: Optional FormSubmit alias when Web3Forms is not configured.

---

## Deployment (Vercel)

`vercel.json` is pre-configured with Vite build settings, SPA rewrites (`/(.*) -> /index.html`), immutable asset caching, and security headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`).

1. Push the repository to GitHub.
2. Import the project in Vercel (`Framework Preset: Vite`).
3. Optionally set `VITE_SITE_URL` / `VITE_WEB3FORMS_ACCESS_KEY` in Vercel Environment Variables.
4. Deploy.
