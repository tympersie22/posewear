# Feature-parity checklist

Baseline: upstream PoseWear commit `70f48e7eec0472496b3b662e8ae1bf696eb79de6`, audited from `src/app.js`, `src/studio.js`, `src/extras.js`, `src/sw.js`, `functions/api/proxy.js`, build scripts, data packs, and the original live app. `tests/v12.js` through `v16-proxy.mjs` provide the upstream regression harness; `tests/i18n-parity.mjs` covers the new language/content path.

| Area | Status | Evidence |
|---|---|---|
| 12 gallery/category tabs | Pass | Authorized build contains pose 280, depth 270, outfit 427, anime 440, portrait 1,499, expression 36, hair 122, historical 57, scene 64, light 50, prop 32, furniture 41; exact counts asserted by `i18n-parity.mjs` and `v15-modules.js` |
| Search, category/angle filters, sort, shuffle, favourites-first, popularity where present, random pick | Pass | Core logic retained in `src/app.js`; search/sort/random asserted in `i18n-parity.mjs`; filter/module coverage in `v12.js` and `v15-modules.js` |
| Detail modal, multi-angle navigation, direct/static routes, share links, downloads | Pass | Static entry pages generated for every imported item; detail/angle behavior in `v12.js` and `v15-modules.js`; direct route asserted in `i18n-parity.mjs` |
| Favourites and compatible import/export | Pass | Local key format unchanged; importer reads both legacy `收藏` and v2 `favorites`; round-trip asserted in `i18n-parity.mjs` |
| Recent history and prompt combinations | Pass | Original localStorage formats retained; recent asserted in `i18n-parity.mjs`; combination/gallery behavior in `v12.js`/`v13.js` |
| Studio reference selection and uploads | Pass | Person upload, portrait picker, outfit/anime library, pose, multi-angle, expression and generated-person mode retained; `v13.js`, `v14-xai.js`, `v15-modules.js` |
| Studio generation modes | Pass with mocks | OpenAI, Gemini, Seedream, custom OpenAI-compatible relay and xAI-compatible shapes retained; separate outputs/contact sheet, count/aspect/style/background/neutral rewrite/prompt language retained; provider tests use intercepted requests |
| Studio results, comparison, downloads and history | Pass | Before/after, multi-result thumbnails, ZIP, retry/cancel, use-as-source, IndexedDB history/delete/clear/undo covered in `v13.js` |
| Error handling | Pass with mocks | 401, 429, 5xx, timeout, safety blocks and invalid configuration covered in `v13.js`/`v14-xai.js`; proxy policy covered in `v16-proxy.mjs` |
| English default / Kiswahili optional | Pass | Default is English even on direct links; switch is visible; preference persists; interface language is independent from model-prompt language; EN/SW/no-CJK checks in `i18n-parity.mjs` |
| Dark mode, keyboard shortcuts, PWA/offline cache | Pass | Original features retained; dark/mobile checks in `v12.js`/`v13.js`; service worker cache updated for bilingual assets and every local catalog image prefix |
| Desktop and mobile layout | Pass | Desktop suites at 1366/1440 px; mobile checks at 390×844 and upstream small-target/sticky-action assertions |
| Asset importer and rights boundary | Pass | `fetch-authorized-sources.sh` pins source SHAs; `build-authorized.py` rebuilds all schemas/routes and fails on missing inputs; `ASSET_RIGHTS.md` records included and excluded rights |
| Pages Function and deployment config | Pass locally | `wrangler pages dev` compiles the Function and applies 14 header rules; proxy unit tests pass; public deployment is verified separately after account authentication |

## Known external checks

- No live provider charge was made. Provider success/failure checks use mocks because no user credentials were supplied; this is intentional and avoids putting secrets in source, builds or logs.
- CharaDB images remain on the rights holder's host and can fail if that host is unavailable; metadata and all UI integration remain local. They are not represented as locally hosted assets.
- The excluded @giaaibusi collections remain an explicit rights gap, not a hidden content gap. Their replacement galleries are populated with authorized material and the importer is ready for a future authorized source.
