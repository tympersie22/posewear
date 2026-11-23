# PoseWear — English / Kiswahili edition

This branch preserves PoseWear's reference galleries and multi-provider try-on studio while making English the first-visit default and Kiswahili an optional, persistent interface language.

It was reverse-engineered from upstream commit `70f48e7eec0472496b3b662e8ae1bf696eb79de6`. PoseWear code remains MIT licensed. Gallery rights are handled separately: the production build never downloads or republishes the restricted upstream pose/outfit collections.

## Included catalogs

| Gallery | Items | Production source |
|---|---:|---|
| Poses | 280 sets | Shisei original CC0 line art |
| Depth | 270 sets | Shisei original CC0 depth maps |
| Outfits | 427 | Shisei original CC0 images/data |
| Anime outfits | 440 | CharaDB CC0 metadata; images remain source-hosted |
| Portraits | 1,499 | AI Portrait Gallery CC0 thumbnails |
| Expressions | 36 sets / 180 views | PoseWear renders based on MIT-licensed ICT-FaceKit |
| Hair | 122 | CharaDB CC0 metadata; images remain source-hosted |
| Historical / scenes / lighting / props / furniture | 57 / 64 / 50 / 32 / 41 | Shisei original CC0 images/data |

The exact asset boundary, missing restricted collections and pinned source SHAs are in [docs/ASSET_RIGHTS.md](docs/ASSET_RIGHTS.md). Feature evidence is in [docs/FEATURE_PARITY.md](docs/FEATURE_PARITY.md).

## Reproducible build

Requirements: Git, Python 3.9+, Node.js 18+.

```bash
npm install
./scripts/fetch-authorized-sources.sh
npm run build
npm run serve
```

The source fetcher checks out exact commits beside this repository. Override the parent directory with `POSEWEAR_SOURCES_DIR`. The importer also accepts `POSEWEAR_SHISEI_SOURCE`, `POSEWEAR_PORTRAIT_SOURCE`, `POSEWEAR_CHARADB_SOURCE`, `POSEWEAR_EXPRESSION_SOURCE`, and `POSEWEAR_SITE`.

`npm run build` recreates `dist/`, imports authorized images and metadata, generates every gallery JSON file and static detail route, writes the PWA manifest and security headers, copies the Pages Function, and records counts in `dist/build-info.json`.

## Tests

```bash
npx playwright install chromium
npm run serve                       # terminal 1
npm test                            # terminal 2: upstream provider/gallery suites
npm run test:e2e                    # bilingual and cross-feature parity suite
```

Provider tests use mocks. No real API key is needed. Live-provider generation is intentionally not part of CI.

## Cloudflare Pages deployment

The dedicated project name is `posewear-en-sw`.

```bash
npx wrangler login                  # browser sign-in; never paste a token in chat
npx wrangler pages project create posewear-en-sw --production-branch main
npm run deploy:preview
npm run deploy
```

The app and `/api/proxy` run on Cloudflare Pages / Pages Functions. No Railway service is required. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for verification and security notes.

## Privacy and credentials

- API keys and provider settings stay in browser `localStorage`.
- Favourites, language, theme, filters and recent history stay in `localStorage`; generation history stays in IndexedDB.
- Direct mode calls a configured HTTPS provider from the browser.
- Proxy mode requires same-origin requests, standard HTTPS, allowed image API paths, a 25 MiB declared-body limit and approximate per-PoP rate limiting. It never intentionally logs or stores keys, bodies or images.
- Configure an account-level Cloudflare rate limiting rule for `/api/proxy` if an atomic global ceiling is required.

## Attribution

PoseWear code: Copyright 2026 PoseWear contributors, MIT. Third-party notices and asset terms are in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Preserve `LICENSE`, `LICENSES/`, and the attribution files when redistributing this branch.
