# VSW — Vaibhav S. Wandkar Portfolio

Personal portfolio for **Vaibhav S. Wandkar (VSW)** — Computer Science and Design student focusing on **Python** and **Django** full-stack web development, alongside projects in AI, computer vision and cybersecurity.

Built with React, TypeScript, Vite, Tailwind CSS v4, GSAP, Motion for React, Lenis and a Vercel Node.js serverless SMTP backend (`api/contact.ts` with Nodemailer).

---

## Sections & Highlights

- **VSW Brand & Portrait**: Official circular **VSW** logo (`vsw-official-logo.webp`), compact cropped navbar emblem, simplified favicon/app-icon derivatives (`16px`–`180px`), Open Graph social preview, and studio portrait (`vaibhav-portrait-original.jpg` + `480w`/`782w` WebP).
- **8-Section Layout**: Hero · About · Projects (`01`–`08`) · Skills (7 clean groups) · Experience (4 internships) · Education · Certifications & Achievements · Contact.
- **Projects (`01`–`08`)**: DeepVision · CyberShield · Cropify · Decentralized Voting System · Retino · Lost and Found Tracking System · AI-Based Resume Screening · Hospital Management System (HAEGL Technologies internship-associated) — with verified ownership labels, repository links, and live demos where available.
- **Server-Side SMTP Contact (`api/contact.ts`)**: `POST /api/contact` validated endpoint with honeypot guard, IP rate limiting, duplicate-submit guard, header injection protection, same-origin CSP (`vercel.json`), and Nodemailer SMTP delivery. See [docs/email-setup.md](docs/email-setup.md).

---

## Local Development

```bash
git clone https://github.com/VAIBHAV-w1/vaibhav-s-wandkar-portfolio.git
cd vaibhav-s-wandkar-portfolio
npm install
npm run dev
```

### Verification Commands

```bash
npm run typecheck
npm run build
npm run preview
node tests/smtp-contact.test.mjs
```

---

## Environment Configuration

See `.env.example` and [docs/email-setup.md](docs/email-setup.md) for configuring `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, and `MAIL_TO` in Vercel Project Settings (never prefix SMTP secrets with `VITE_`).
