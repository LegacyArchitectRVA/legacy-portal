# Security baseline — Legacy Architect RVA Portal

## Standards we keep

- Client controls their Secure Drive. We do not store passwords or full financial account numbers.
- Portal data is temporary working data for Life Manual facilitation.
- Purge client portal data within 72 hours of Life Manual delivery.
- Auth required for all client and admin routes (Convex Auth).
- No secrets in client-side source. Env vars only.

## Headers

Cloudflare security headers live in `public/_headers` and ship with every Pages deploy.

## After every Life Manual delivery

Use `docs/PURGE_CHECKLIST.md` until automated purge is live.

## Cloudflare checklist (manual, dashboard)

1. SSL/TLS mode: Full (strict)
2. Always Use HTTPS: On
3. Minimum TLS version: 1.2
4. Bot Fight Mode: On
5. WAF managed rules: On
6. Rate limiting: see docs/CLOUDFLARE_RATE_LIMITS.md

## Repo visibility

This portal repo should be **private**.
