# Cloudflare rate limit rules

Apply in Cloudflare Dashboard → Security → WAF → Rate limiting rules
(or Security Rules, depending on plan UI).

## Rule 1 — Auth endpoints

- Name: Portal auth throttle
- Match: URI Path contains `/login` OR `/signup` OR path contains `auth`
- With: same IP
- Rate: 20 requests per 1 minute
- Action: Block for 10 minutes

## Rule 2 — Readiness / webhook abuse

- Name: Readiness and form throttle
- Match: URI Path contains `readiness` OR hostname is marketing site AND path contains form/webhook paths you use (Make/HubSpot)
- With: same IP
- Rate: 30 requests per 1 minute
- Action: Managed Challenge or Block 5 minutes

## Rule 3 — General API (if exposed)

- Name: API burst limit
- Match: URI Path starts with `/api`
- With: same IP
- Rate: 60 requests per 1 minute
- Action: Block 5 minutes

Adjust paths to match your live routes after checking Network tab on login and readiness submit.
