# Deployment and operations

## Architecture decision

PoseWear is a static application plus one request-forwarding endpoint. Cloudflare Pages serves the generated catalogs, detail pages, PWA files and images; Pages Functions runs `functions/api/proxy.js`. There is no database, queue, durable job or non-HTTP runtime requirement, so Railway is not used.

## Build and local verification

```bash
npm install
./scripts/fetch-authorized-sources.sh
npm run build
npx playwright install chromium
npm run serve
```

In a second terminal:

```bash
npm test
npm run test:e2e
```

## Dedicated Pages project

This branch targets only `posewear-en-sw`; it must not be pointed at the upstream `posewear` project or another existing project.

```bash
npx wrangler whoami
npx wrangler pages project list
npx wrangler pages project create posewear-en-sw --production-branch main
npm run deploy:preview
npm run deploy
```

`wrangler.jsonc` pins compatibility date `2026-11-22` and `nodejs_compat`. No secrets are compiled into the build. Provider credentials are supplied by each user in the browser.

## Proxy controls

- Only same-origin browser requests with Origin/Referer evidence are accepted.
- Official providers are allowlisted; custom relays require an explicit header and standard HTTPS.
- Only supported `images/edits`, `images/generations`, and Gemini `models/:generateContent` paths pass.
- URL credentials, private IPv4 targets and IPv6 literals are rejected.
- Declared request bodies above 25 MiB are rejected.
- Rate counts are hashed and stored briefly in the Cloudflare Cache API; this is approximate and per-PoP.
- Add an account-level Cloudflare rate limiting rule for `/api/proxy` when a global atomic limit is required.
- The function does not log, retain or inspect API keys, request bodies or returned images in application code.

## Post-deployment checks

1. `GET /`, `/manifest.webmanifest`, `/build-info.json`, and one local image return 200.
2. Static detail routes such as `/pose/std_P001/` open the correct modal.
3. `/api/proxy` rejects a request without same-origin evidence with 403.
4. Both EN and SW persist after refresh.
5. Run `U=https://<deployment> npm run test:e2e` against preview and production.
6. Test mobile viewport, PWA manifest/service worker, direct routes, and response security headers.

Live provider generation requires the account owner's own provider credentials. Automated tests mock providers and cover success, 401, 429, 5xx, timeout, cancel, safety block, multi-output, comparison, history, retry and download behavior without exposing credentials.
