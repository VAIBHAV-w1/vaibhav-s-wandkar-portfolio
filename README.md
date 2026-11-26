# Vaibhav S. Wandkar — Portfolio

Personal developer portfolio for **Vaibhav S. Wandkar** — **Python Developer | Django Full-Stack Developer | Software Engineer** (Computer Science & Design Engineering student at B.I.E.T., Davangere — VTU).

Built with React, TypeScript, Vite, Tailwind CSS v4, GSAP (`ScrollTrigger`), Motion for React, Lenis, Three.js (desktop ambient mesh), and self-hosted variable typography (`Inter Tight`, `Instrument Serif`, `JetBrains Mono`).

---

## Highlights

- **Brand Identity & Portrait**: Custom interactive **VW** geometric SVG monogram across navbar, loader, footer, favicon, and Open Graph preview, paired with a responsive WebP/JPEG studio portrait in the hero.
- **Python & Django Full-Stack Engineering**: Hero positioning, About narrative, dedicated **Django Full-Stack Capabilities** breakdown backed by repository code, and interactive skills cross-linking.
- **Exact 8-Project Showcase**:
  1. `01` **DeepVision** — Django 5.2 REST backend + OpenCV / YOLO11n / ByteTrack surveillance platform + React SPA (live demo verified)
  2. `02` **CyberShield** — Node.js / Express cybersecurity toolkit & threat dashboard
  3. `03` **Cropify** (`KisanAI`) — FastAPI + Scikit-learn agricultural advisory platform + React/TypeScript UI
  4. `04` **Decentralized Voting System** — Solidity / Hardhat / Express / Prisma hybrid blockchain voting platform
  5. `05` **Retino** — PyTorch Lightning diabetic retinopathy pipeline + FastAPI / React interface
  6. `06` **Lost and Found Tracking System** — Django 5.2 campus asset-recovery portal with Leaflet & gettext i18n
  7. `07` **AI-Based Resume Screening** — Flask + Scikit-learn TF-IDF NLP matcher (Internz Learn AI Internship)
  8. `08` **Hospital Management System** — Django 5.0.3 healthcare workflows, JSON endpoints & invoice generator
- **Dual Theme & Motion Accessibility**: Dark graphite (`#0d0e0c`) and warm ivory (`#f2efe6`) themes with OS detection, `localStorage` persistence (`vsw-theme`), View Transitions circular reveal, `prefers-reduced-motion` support, and desktop-only Three.js ambient geometry.
- **Routing, Contact & SEO**: Home (`/`), Privacy disclosure (`/privacy`), custom HTTP 404 page, spam-protected contact form (Web3Forms / FormSubmit), JSON-LD `Person` structured data, `robots.txt`, and dynamic `sitemap.xml`.

---

## Local Development

### Prerequisites

- Node.js 20+ (tested on Node.js v24.19.0)
- npm 10+

### Run Locally

```bash
git clone https://github.com/VAIBHAV-w1/vaibhav-s-wandkar-portfolio.git
cd vaibhav-s-wandkar-portfolio
npm install
npm run dev
```

### Typecheck, Build & Preview

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

- `VITE_SITE_URL`: Optional custom production domain used for `<link rel="canonical">`, `og:url`, and `sitemap.xml` (falls back automatically to `VERCEL_PROJECT_PRODUCTION_URL` on Vercel).
- `VITE_WEB3FORMS_ACCESS_KEY`: Optional Web3Forms public access key for contact form submissions.
- `VITE_FORMSUBMIT_ID`: Optional FormSubmit alias when Web3Forms is not configured.
