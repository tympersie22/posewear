# Asset rights and import record

## Audit boundary

The upstream repository was cloned from <https://github.com/atuizz/posewear> and pinned at `70f48e7eec0472496b3b662e8ae1bf696eb79de6`. Its `LICENSE` applies MIT to code. Its README expressly says the MIT licence does not cover the gallery assets and identifies the pose/outfit/anime/depth collections as owned by @giaaibusi without an open redistribution licence.

The production build does not run upstream `scripts/fetch-assets.py`, does not scrape those sites, and does not include their images. This is why its authorized counts differ from the original hosted catalog while the gallery/studio feature architecture remains intact.

## Reproducible authorized inputs

| Local dependency | Commit | Imported rights | Import behavior |
|---|---|---|---|
| `../shisei` | `6e22358bab73c51eeae0615030635ace199169f8` | Original images and Shisei-authored data: CC0 1.0 | Local `w300` thumbnails and `w900` images copied into `dist/`; restricted inherited pose names/classes are replaced with neutral titles |
| `../portrait-source` | `9e4c88ad74297ec4cea503d04e959c65b01dde06` | AI Portrait Gallery images: CC0 1.0 | 1,499 thumbnails copied locally; no bulk full-resolution mirror |
| `../charadb-source` | `7fe2e4b009ad6d85496101e929ac8528cb21d357` | Metadata: CC0; images: reference use only, no redistribution | Metadata becomes PoseWear JSON; image URLs remain on the source host |
| `expressions/packs` | carried from PoseWear upstream expression branch | PoseWear render rights; ICT-FaceKit MIT | Source renders copied locally with manifests and licence notices |

Run:

```bash
./scripts/fetch-authorized-sources.sh
npm run build
```

The fetcher validates all three Git SHAs. `scripts/build-authorized.py` fails closed when a required source file is absent, deletes and recreates `dist`, writes all catalog JSON deterministically, copies only authorized local assets, creates static detail entry points, and emits `dist/build-info.json`.

## Current production catalog

`build-info.json` build ID `e122647953de` was produced from:

- 280 pose sets and 270 depth sets;
- 427 outfits and 57 historical outfits;
- 440 anime outfits and 122 hair entries (source-hosted images);
- 1,499 portraits;
- 36 expression sets / 180 views;
- 64 scenes, 50 lighting references, 32 props and 41 furniture references.

No placeholder card is counted. Entries without an authorized view are omitted. CharaDB entries are explicitly marked `ext: 1`, `source: CharaDB`, and `license: CC0 metadata; source-hosted image`.

## Collections awaiting permission

| Collection | Rights holder | Missing authorization |
|---|---|---|
| AI Pose Gallery and depth counterpart | ギア / @giaaibusi | Permission to copy, transform, host and redistribute images and the excluded catalog taxonomy |
| AI Costume Gallery | @giaaibusi | Permission to copy, host and redistribute the full image collection |
| AI Costume Anime Gallery / COSTUME-ANIME-DB | @giaaibusi | Permission to copy, host and redistribute the full image collection |

The importer has separate catalog-writing functions and stable PoseWear schemas, so an authorized source can be added without redesigning the UI. Do not populate these slots from scraped or unlicensed copies.
