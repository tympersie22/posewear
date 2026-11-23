# Third-party notices

This file separates the PoseWear code licence from catalog and image rights. It is not legal advice.

## PoseWear

- Upstream: <https://github.com/atuizz/posewear>
- Audited commit: `70f48e7eec0472496b3b662e8ae1bf696eb79de6`
- Code and upstream documentation: MIT, Copyright 2026 PoseWear contributors. See `LICENSE`.
- The MIT licence does **not** grant rights to upstream gallery images or third-party metadata.

## Shisei

- Source: <https://github.com/wquguru/shisei>
- Pinned commit: `6e22358bab73c51eeae0615030635ace199169f8`
- Imported: original line art, depth maps, costumes, historical outfits, scenes, lighting, props, furniture, and Shisei-authored descriptions.
- Images and Shisei's own data: CC0 1.0. Code/docs: Apache-2.0.
- Shisei's `NOTICE` excludes the older public pose catalog's selection, original numbering, names and categories from those licences. This build therefore emits neutral PoseWear titles/categories and does not import `name_*`, `class_*`, or `orig_id`.

## AI Portrait Gallery

- Original gallery: <https://ai-portrait-gallery.pages.dev/>, by @agi_aibusi.
- Pinned mirror used by the importer: <https://github.com/Atom-kkk/AI-Face-Resource-Library> at `9e4c88ad74297ec4cea503d04e959c65b01dde06`.
- Imported: 1,499 CC0 1.0 thumbnails and compact metadata.
- The build does not claim the mirror's MIT code licence covers images; image rights come from the gallery's CC0 notice.

## CharaDB

- Source: <https://github.com/taki-ttt/charadb>
- Pinned commit: `7fe2e4b009ad6d85496101e929ac8528cb21d357`
- Imported: CC0 metadata for 440 outfits and 122 grouped hair/eye entries.
- Images are **not** redistributed. The author permits reference use but prohibits redistribution/reposting/resale, including modified copies. Production cards use source-hosted URLs from <https://charadb-2fi.pages.dev/>.

## ICT-FaceKit expression renders

- The expression source renders were made in PoseWear's upstream expression work and are carried with their manifests and `THIRD_PARTY_LICENSES.txt` files.
- Underlying face model: ICT-FaceKit, MIT. The full licence text is in `LICENSES/ICT-FaceKit.txt`.
- Imported: 36 expression groups / 180 source views.

## Intentionally excluded collections

The following audited upstream collections are not included or mirrored because no redistribution licence was found:

- AI Pose Gallery / AI Pose Depth Gallery — rights holder ギア / @giaaibusi.
- AI Costume Gallery — rights holder @giaaibusi.
- AI Costume Anime Gallery / COSTUME-ANIME-DB — rights holder @giaaibusi.

Their gallery slots, JSON schemas, routes, filters and studio integration remain implemented. A rights holder can authorize a future import through `scripts/build-authorized.py`; until then these collections must not be presented as part of the production catalog.
