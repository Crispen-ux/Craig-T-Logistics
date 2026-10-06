# Craig-T Logistics
npm install && cp .env.example .env.local && npm run dev
Edit lib/config.js for branding. Set WhatsApp number, Resend and Cloudflare Turnstile keys in .env.local.
NEXT_PUBLIC_SITE_URL is the production origin used for metadata, robots and sitemap.
Set NEXT_PUBLIC_GA_ID (GA4 measurement ID) to enable analytics. It loads only after the visitor accepts analytics cookies, and stops if they withdraw consent.
Run `npm run build` before deploying; /api/lead is the only server route.
