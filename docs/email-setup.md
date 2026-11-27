# SMTP Email Delivery Setup (`api/contact.ts`)

The contact form posts directly to the same-origin Vercel serverless endpoint `POST /api/contact`, which validates requests and delivers email via Nodemailer over SMTP.

## 1. Environment Variables Required

Never expose SMTP credentials with a `VITE_` prefix and never commit `.env`.

| Variable | Description | Example |
| :--- | :--- | :--- |
| `SMTP_HOST` | Outgoing SMTP server hostname | `smtp.gmail.com`, `smtp.zoho.in`, `smtp-relay.brevo.com`, `email-smtp.ap-south-1.amazonaws.com` |
| `SMTP_PORT` | SMTP port (`587` STARTTLS or `465` SSL/TLS) | `587` or `465` |
| `SMTP_SECURE` | `'true'` for port `465` SSL/TLS, `'false'` for `587` STARTTLS | `false` |
| `SMTP_USER` | SMTP authentication username | Your SMTP login / mailbox user |
| `SMTP_PASS` | App Password / SMTP API secret / password | Provider App Password |
| `MAIL_FROM` | Verified sender address accepted by the SMTP relay | `"VSW Portfolio <no-reply@yourdomain>"` or verified mailbox |
| `MAIL_TO` | Destination inbox receiving portfolio inquiries | `vaibhavwandkar5@gmail.com` |

## 2. Obtaining Provider Credentials

- **Google Workspace / Gmail SMTP:** Enable 2-Step Verification on the Google account, create an **App Password** under Security settings, and use `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, `SMTP_SECURE=false` (or `465` / `true`). Use your Gmail address as both `SMTP_USER` and `MAIL_FROM`.
- **Transactional Relays (Brevo, Postmark, Zoho Mail, Amazon SES):** Generate an SMTP username + SMTP key/token inside the provider dashboard and verify your `MAIL_FROM` sender identity before testing.

## 3. Local Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Fill in `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, and `MAIL_TO` in `.env`.
3. Run the Vercel local dev server (`vercel dev`) so both the Vite frontend and `/api/contact` run together on `localhost`.

## 4. Production Setup in Vercel

1. Open your Vercel project → **Settings → Environment Variables**.
2. Add each variable (`SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, `MAIL_TO`) for **Production** (and Preview if desired).
3. Save and trigger a fresh **Redeploy** from **Deployments** (or push a new commit) so Serverless Functions pick up the new environment values.

## 5. Verifying Live Email Delivery

After configuring credentials and redeploying:
1. Open the live Contact section and submit a genuine message with your name, email, subject, and message body.
2. Confirm the server returns HTTP `200` (`Message sent successfully...`).
3. Confirm the notification arrives in `MAIL_TO` with `Reply-To` set to the visitor's email address.

## 6. Rotating Compromised Credentials

If an `SMTP_PASS` or API token is ever leaked or suspected exposed:
1. Immediately revoke or delete the old App Password / SMTP key in your email provider's dashboard.
2. Generate a new credential.
3. Update `SMTP_PASS` in Vercel **Environment Variables** and any local `.env`.
4. Redeploy on Vercel immediately and verify delivery again.
