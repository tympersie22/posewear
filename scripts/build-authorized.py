#!/usr/bin/env python3
"""Build PoseWear from redistributable/authorized upstream sources.

This builder deliberately does not run PoseWear's legacy bulk downloader.  The
original pose/outfit galleries prohibit automated bulk downloads and image
redistribution.  Instead it imports:

* Shisei images/data (CC0 images/data; Apache-2.0 code)
* AI Portrait Gallery metadata/thumbnails from the pinned mirror (CC0 images)
* CharaDB metadata (CC0) with source-hosted images (not redistributed)
* PoseWear's ICT-FaceKit expression renders (MIT-derived, rendered upstream)

Dependency directories may be overridden with POSEWEAR_*_SOURCE variables.
"""
from __future__ import annotations

import hashlib
import json
import os
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
SHISEI = Path(os.environ.get("POSEWEAR_SHISEI_SOURCE", ROOT.parent / "shisei"))
PORTRAITS = Path(os.environ.get("POSEWEAR_PORTRAIT_SOURCE", ROOT.parent / "portrait-source"))
CHARADB = Path(os.environ.get("POSEWEAR_CHARADB_SOURCE", ROOT.parent / "charadb-source"))
EXPRESSIONS = Path(os.environ.get("POSEWEAR_EXPRESSION_SOURCE", ROOT / "expressions" / "packs"))
SITE = os.environ.get("POSEWEAR_SITE", "https://posewear-en-sw.pages.dev").rstrip("/")
SOURCE_COMMITS = {
    "posewear": "70f48e7eec0472496b3b662e8ae1bf696eb79de6",
    "shisei": "6e22358bab73c51eeae0615030635ace199169f8",
    "portrait": "9e4c88ad74297ec4cea503d04e959c65b01dde06",
    "charadb": "7fe2e4b009ad6d85496101e929ac8528cb21d357",
}

VIEW = {
    "front": ("Front", "Mbele"),
    "diag": ("Three-quarter", "Nusu upande"),
    "side": ("Side", "Ubavuni"),
    "back": ("Back", "Nyuma"),
    "above": ("From above", "Kutoka juu"),
    "below": ("From below", "Kutoka chini"),
    "eye": ("Eye level", "Usawa wa macho"),
    "tq": ("Three-quarter", "Nusu upande"),
    "high": ("High angle", "Pembe ya juu"),
    "low": ("Low angle", "Pembe ya chini"),
    "three_quarter": ("Three-quarter", "Nusu upande"),
}
SERIES = {
    "std": ("Standard full body", "Mwili mzima wa kawaida"),
    "upper": ("Upper body", "Sehemu ya juu ya mwili"),
    "sexy": ("Suggestive full body", "Mwili mzima wa kuvutia"),
    "duo": ("Two-person", "Watu wawili"),
}
POSE_KIND = {
    "std": ("Single-person pose", "Mkao wa mtu mmoja"),
    "upper": ("Upper-body pose", "Mkao wa sehemu ya juu"),
    "sexy": ("Suggestive pose", "Mkao wa kuvutia"),
    "duo": ("Two-person pose", "Mkao wa watu wawili"),
}
POSE_SW = {
    "Sitting": "Kukaa", "Standing": "Kusimama", "Kneeling": "Kupiga magoti",
    "Lying": "Kulala", "Squatting": "Kuchuchumaa", "Upper body": "Sehemu ya juu",
}
HAIR_SW = {
    "hairstyle": "mtindo wa nywele", "bangs": "nywele za mbele", "hair color": "rangi ya nywele",
    "hair accessory": "pambo la nywele", "eye color": "rangi ya macho", "eye shape": "umbo la macho",
}
CHARA_HOST = "https://charadb-2fi.pages.dev"


def read_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, value) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")


def copy_file(source: Path, target: Path) -> None:
    if not source.is_file():
        raise FileNotFoundError(source)
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, target)


def copy_view(source_kind: str, variant: str, filename: str, prefix: str) -> tuple[str, str]:
    thumb = f"{prefix}/t/{filename}"
    image = f"{prefix}/i/{filename}"
    copy_file(SHISEI / "images" / source_kind / variant / "w300" / filename, DIST / thumb)
    copy_file(SHISEI / "images" / source_kind / variant / "w900" / filename, DIST / image)
    return thumb, image


def pose_catalog():
    poses, depths = [], []
    for raw in read_json(SHISEI / "data/catalog.json"):
        angles = []
        for key, filename in raw.get("views", {}).items():
            if not filename:
                continue
            thumb, image = copy_view("line", "", filename, "p")
            en, sw = VIEW.get(key, (key.replace("_", " ").title(), key))
            angles.append({"zh": en, "en": en.lower(), "sw": sw, "t": thumb, "i": image, "o": image})
        if not angles:
            continue
        line_en, line_sw = SERIES.get(raw.get("series"), (raw.get("series", "Reference"), "Rejeleo"))
        pose_kind = POSE_KIND.get(raw.get("series"), ("Pose reference", "Rejeleo la mkao"))
        description = raw.get("desc_en") or f"Multi-angle mannequin reference {raw['id']}"
        item = {
            "id": raw["id"], "no": raw["id"], "line": line_en, "lineEn": line_en.lower(), "lineSw": line_sw,
            "cat": pose_kind[0], "catSw": pose_kind[1],
            "ti": f"Shisei pose {raw['id']}", "zh": f"Shisei pose {raw['id']}",
            "en": description, "sw": "", "ja": "", "angles": angles,
            "source": "Shisei", "license": "CC0-1.0",
        }
        if raw.get("rating") != "general":
            item["a"] = 1
        poses.append(item)

        map_angles = []
        for key, filename in raw.get("maps", {}).items():
            if not filename:
                continue
            p300 = SHISEI / "images/depth/w300" / filename
            p900 = SHISEI / "images/depth/w900" / filename
            if not p300.is_file() or not p900.is_file():
                continue
            thumb = f"d/t/{filename}"
            image = f"d/i/{filename}"
            copy_file(p300, DIST / thumb)
            copy_file(p900, DIST / image)
            en, sw = VIEW.get(key, (key.replace("_", " ").title(), key))
            map_angles.append({"zh": en, "en": en.lower(), "sw": sw, "t": thumb, "i": image, "o": image})
        if map_angles:
            depth = dict(item)
            depth["angles"] = map_angles
            depth["source"] = "Shisei depth maps"
            depths.append(depth)
    return poses, depths


def category_names(stem: str):
    data = read_json(SHISEI / f"data/{stem}-src/_categories.json")
    return {key: value["name"]["en"] for key, value in data.items()}


def simple_catalog(stem: str, source_kind: str, variant: str, prefix: str, *, only=None, exclude=None):
    cats = category_names(stem)
    raw = read_json(SHISEI / f"data/{stem}s.json")
    retired = set(raw.get("retired") or [])
    output = []
    for item in raw["items"]:
        if item["id"] in retired or (only and item.get("cat") not in only) or (exclude and item.get("cat") in exclude):
            continue
        views = [(key, filename) for key, filename in (item.get("views") or {}).items() if filename]
        if not views:
            continue
        key, filename = next((entry for entry in views if entry[0] == "front"), views[0])
        thumb, image = copy_view(source_kind, variant, filename, prefix)
        category = cats.get(item.get("cat"), item.get("group_en") or "Reference")
        out = {
            "id": item["id"], "cat": category, "catEn": category, "catSw": "",
            "kw": item.get("desc_en") or item.get("keep_en") or "",
            "ti": item.get("name_en") or item["id"], "tiSw": "",
            "zh": item.get("desc_en") or item.get("name_en") or item["id"],
            "en": item.get("desc_en") or item.get("name_en") or item["id"], "sw": "",
            "t": thumb, "m": image, "i": image, "o": image,
            "source": "Shisei", "license": "CC0-1.0",
        }
        if item.get("rating") != "general":
            out["a"] = 1
        output.append(out)
    return output


def multi_catalog(stem: str, source_kind: str, variant: str, prefix: str, *, only=None):
    cats = category_names(stem)
    data_path = SHISEI / f"data/{stem}s.json"
    if not data_path.is_file():
        data_path = SHISEI / f"data/{stem}.json"
    raw = read_json(data_path)
    retired = set(raw.get("retired") or [])
    output = []
    for item in raw["items"]:
        if item["id"] in retired or (only and item.get("cat") not in only):
            continue
        angles = []
        for key, filename in (item.get("views") or {}).items():
            if not filename:
                continue
            thumb, image = copy_view(source_kind, variant, filename, prefix)
            en, sw = VIEW.get(key, (key.replace("_", " ").title(), key))
            angles.append({"zh": en, "en": en.lower(), "sw": sw, "t": thumb, "i": image, "o": image})
        if not angles:
            continue
        category = cats.get(item.get("cat"), item.get("group_en") or "Reference")
        group = item.get("era_en") or item.get("group_en") or category
        output.append({
            "id": item["id"], "no": item["id"], "cat": category, "catEn": category,
            "line": group, "lineEn": group, "era": group,
            "ti": item.get("name_en") or item["id"], "tiSw": "", "zh": item.get("name_en") or item["id"],
            "en": item.get("desc_en") or item.get("name_en") or item["id"], "sw": "",
            "ja": item.get("name_ja", ""), "angles": angles,
            "source": "Shisei", "license": "CC0-1.0",
        })
    return output


def portrait_catalog():
    source = (PORTRAITS / "assets/data.js").read_text(encoding="utf-8")
    match = re.search(r"window\.FACE_ITEMS\s*=\s*(\[.*\]);\s*$", source, re.S)
    if not match:
        raise RuntimeError("Could not parse portrait-source/assets/data.js")
    items = json.loads(match.group(1))
    lengths = [("Short hair", "Nywele fupi"), ("Medium-short hair", "Nywele fupi-kati"),
               ("Medium-long hair", "Nywele ndefu-kati"), ("Long hair", "Nywele ndefu")]
    counts = {0: 0, 1: 0}
    output = []
    for item in items:
        counts[item["s"]] += 1
        sec = ("Face", "Uso") if item["s"] == 0 else ("Styling", "Mtindo")
        length = lengths[item["l"]]
        number = ("F" if item["s"] == 0 else "S") + str(counts[item["s"]]).zfill(3)
        filename = f"{item['i']}.webp"
        path = f"r/t/{filename}"
        copy_file(PORTRAITS / "assets/thumb" / filename, DIST / path)
        prompt = f"adult fictional person, {length[0].lower()}, consistent facial features, face reference"
        output.append({
            "id": item["i"], "no": number, "sec": sec[0], "secSw": sec[1], "len": length[0], "lenSw": length[1],
            "st": "", "ti": f"{sec[0]} reference {number}", "tiSw": f"Rejeleo la {sec[1].lower()} {number}",
            "zh": prompt, "en": prompt, "sw": "", "ja": item.get("t", ""),
            "t": path, "m": path, "i": path, "o": "", "w": item["w"], "h": item["h"], "ext": 1,
            "source": "AI Portrait Gallery", "license": "CC0-1.0",
        })
    return output


def charadb_catalogs():
    raw = read_json(CHARADB / "data/items_public.json")
    hair_raw = [item for item in raw if item["set"] == "hair"]
    children = {}
    for item in hair_raw:
        if item.get("sub") == "style_color":
            children.setdefault(item.get("parent"), []).append(item)
    hair = []
    for style in [item for item in hair_raw if item.get("sub") == "style"]:
        variants = [style] + sorted(children.get(style["id"], []), key=lambda value: value["id"])
        angles = [{"zh": variant.get("color") or "Variant", "en": variant.get("color") or "variant", "sw": "",
                   "t": f"{CHARA_HOST}/thumb/{variant['id']}.webp", "i": f"{CHARA_HOST}/img/{variant['id']}.jpg", "o": ""}
                  for variant in variants]
        hair.append({"id": style["id"], "no": style["id"], "cat": "Hairstyle", "catEn": "Hairstyle",
                     "line": "Hairstyle", "lineEn": "hairstyle", "ti": style["tags"], "zh": style["tags"],
                     "en": style["tags"], "sw": "", "ja": style.get("jp", ""), "kw": style["tags"],
                     "angles": angles, "ext": 1, "source": "CharaDB", "license": "CC0 metadata; source-hosted image"})
    sub_names = {"bangs": "Bangs", "color": "Hair color", "acc": "Hair accessory", "eye": "Eye reference"}
    for item in hair_raw:
        if item.get("sub") not in sub_names:
            continue
        category = sub_names[item["sub"]]
        url_id = item["id"]
        hair.append({"id": url_id, "cat": category, "catEn": category, "ti": item["tags"], "zh": item["tags"],
                     "en": item["tags"], "sw": "", "ja": item.get("jp", ""), "kw": item["tags"],
                     "t": f"{CHARA_HOST}/thumb/{url_id}.webp", "m": f"{CHARA_HOST}/img/{url_id}.jpg",
                     "i": f"{CHARA_HOST}/img/{url_id}.jpg", "o": "", "ext": 1,
                     "source": "CharaDB", "license": "CC0 metadata; source-hosted image"})

    outfit_cats = {
        "制服・学生": "School uniforms", "春夏カジュアル": "Spring & summer casual", "秋冬カジュアル": "Autumn & winter casual",
        "職業・コスプレ": "Occupations & cosplay", "水着": "Swimwear", "ファンタジー": "Fantasy",
        "ドレス・パーティー": "Dresses & party", "イベント・季節": "Events & seasonal", "通勤・オフィス": "Office",
        "和服": "Kimono", "スポーツ": "Sports", "ルームウェア・パジャマ": "Loungewear & pajamas",
        "ロリータ・地雷系": "Lolita & jirai", "アイドル・ステージ": "Idol & stage", "ミリタリー・SF": "Military & sci-fi",
    }
    anime = []
    for item in [value for value in raw if value["set"] == "outfit"]:
        category = outfit_cats.get(item["cat"], "Anime outfit")
        title = " · ".join(part.strip() for part in item["tags"].split(",")[:3])
        anime.append({"id": f"charadb-{item['id']}", "cat": category, "catEn": category, "kw": item["tags"],
                      "ti": title or item["id"], "zh": item["tags"], "en": item["tags"], "sw": "", "ja": item.get("jp", ""),
                      "t": f"{CHARA_HOST}/thumb/{item['id']}.webp", "m": f"{CHARA_HOST}/img/{item['id']}.jpg",
                      "i": f"{CHARA_HOST}/img/{item['id']}.jpg", "o": "", "ext": 1,
                      "source": "CharaDB", "license": "CC0 metadata; source-hosted image"})
    return hair, anime


def expression_catalog():
    output = []
    for pack in ("general", "adult"):
        manifest_path = EXPRESSIONS / pack / "manifest.json"
        if not manifest_path.is_file():
            continue
        entries = read_json(manifest_path)["entries"]
        groups = {}
        for entry in entries:
            groups.setdefault(entry["group"], []).append(entry)
        for group, variants in groups.items():
            angles = []
            for entry in variants:
                source = EXPRESSIONS / pack / entry["source"]
                if not source.is_file():
                    continue
                target = f"e/i/{pack}-{source.name}"
                copy_file(source, DIST / target)
                en, sw = VIEW.get(entry["angle"], (entry["angle"].replace("_", " ").title(), entry["angle"]))
                angles.append({"zh": en, "en": en.lower(), "sw": sw, "t": target, "i": target, "o": target})
            if not angles:
                continue
            entry = variants[0]
            output.append({"id": f"{pack}-{group}", "no": group, "cat": "Adult" if pack == "adult" else "General",
                           "emo": "Adult" if pack == "adult" else "General", "int": "Reference",
                           "line": "Expression", "lineEn": "expression", "ti": entry["name_en"], "zh": entry["name_en"],
                           "en": entry["prompt_en"], "sw": "", "ja": "", "angles": angles,
                           "a": 1 if pack == "adult" else 0, "source": "PoseWear ICT-FaceKit renders", "license": "MIT-derived"})
    return output


def static_redirect(kind: str, item_id: str) -> None:
    target = DIST / kind / item_id / "index.html"
    target.parent.mkdir(parents=True, exist_ok=True)
    safe_id = json.dumps(item_id)
    target.write_text(
        "<!doctype html><meta charset=utf-8><meta name=viewport content='width=device-width,initial-scale=1'>"
        f"<title>Open in PoseWear</title><script>location.replace('/#{kind}/'+encodeURIComponent({safe_id}))</script>"
        f"<p><a href='/#{kind}/{item_id}'>Open this reference in PoseWear</a></p>", encoding="utf-8")


def main():
    for required in (SHISEI / "data/catalog.json", PORTRAITS / "assets/data.js", CHARADB / "data/items_public.json"):
        if not required.is_file():
            raise SystemExit(f"Missing authorized dependency: {required}")
    if DIST.exists():
        shutil.rmtree(DIST)
    shutil.copytree(ROOT / "src", DIST)
    shutil.copytree(ROOT / "functions", DIST / "functions")

    poses, depths = pose_catalog()
    costumes = simple_catalog("costume", "costume", "grey", "c", exclude={"HC"})
    dynasty = multi_catalog("costume", "costume", "grey", "y", only={"HC"})
    scenes = multi_catalog("scene", "scene", "plain", "s")
    lights = multi_catalog("light", "light", "plain", "l")
    props = multi_catalog("prop", "prop", "grey", "t")
    furniture = multi_catalog("furniture", "furniture", "grey", "f")
    portraits = portrait_catalog()
    hair, anime = charadb_catalogs()
    expressions = expression_catalog()
    catalogs = {
        "poses.json": poses, "depths.json": {"pack": {"source": "local", "siteName": "Shisei", "author": "wquguru",
            "authorUrl": "https://github.com/wquguru/shisei", "note": "CC0 depth maps imported from pinned Shisei."}, "items": depths},
        "costumes.json": costumes, "anime.json": anime, "portraits.json": portraits,
        "expressions.json": expressions, "hair.json": hair, "dynasties.json": dynasty,
        "scenes.json": scenes, "lights.json": lights, "props.json": props, "furniture.json": furniture,
    }
    for filename, data in catalogs.items():
        write_json(DIST / filename, data)

    # Keep the landing-page figures tied to the imported catalogs rather than
    # to upstream's historical hosted collection counts.
    index_path = DIST / "index.html"
    index = index_path.read_text(encoding="utf-8")
    figures = [
        len(poses), sum(len(item["angles"]) for item in poses), len(costumes), len(anime),
        len(portraits), len(expressions), len(dynasty), len(scenes), len(lights),
    ]
    figure_iter = iter(figures)
    index = re.sub(r'data-n="\d+"', lambda _: f'data-n="{next(figure_iter)}"', index, count=len(figures))
    index_path.write_text(index, encoding="utf-8")

    csp_images = "'self' data: blob: https://charadb-2fi.pages.dev"
    # Custom direct providers are an audited upstream feature, so connect-src
    # must permit user-configured HTTPS relays. The server proxy remains much
    # narrower and validates target hosts/paths separately.
    csp_connect = "'self' data: blob: https:"
    (DIST / "_headers").write_text(f"""/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src {csp_images}; connect-src {csp_connect}; worker-src 'self'; manifest-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
/api/*
  Cache-Control: no-store
/sw.js
  Cache-Control: no-cache
/*.json
  Cache-Control: public, max-age=3600, must-revalidate
/p/*
  Cache-Control: public, max-age=31536000, immutable
/d/*
  Cache-Control: public, max-age=31536000, immutable
/c/*
  Cache-Control: public, max-age=31536000, immutable
/r/*
  Cache-Control: public, max-age=31536000, immutable
/e/*
  Cache-Control: public, max-age=31536000, immutable
/y/*
  Cache-Control: public, max-age=31536000, immutable
/s/*
  Cache-Control: public, max-age=31536000, immutable
/l/*
  Cache-Control: public, max-age=31536000, immutable
/t/*
  Cache-Control: public, max-age=31536000, immutable
/f/*
  Cache-Control: public, max-age=31536000, immutable
""", encoding="utf-8")

    for kind, items in (("pose", poses), ("depth", depths), ("costume", costumes), ("anime", anime),
                        ("portrait", portraits), ("expr", expressions), ("hair", hair), ("dyn", dynasty),
                        ("scene", scenes), ("light", lights), ("prop", props), ("furn", furniture)):
        for item in items:
            static_redirect(kind, item["id"])

    manifest = read_json(DIST / "manifest.webmanifest")
    manifest.update({"name": "PoseWear — Reference Studio", "short_name": "PoseWear", "lang": "en",
                     "description": "Pose, outfit and portrait references with an AI try-on studio."})
    write_json(DIST / "manifest.webmanifest", manifest)

    summary = {name.removesuffix(".json"): len(value["items"] if isinstance(value, dict) else value)
               for name, value in catalogs.items()}
    digest = hashlib.sha256(json.dumps({"counts": summary, "sources": SOURCE_COMMITS}, sort_keys=True).encode())
    for path in (ROOT / "src/app.js", ROOT / "src/i18n.js", ROOT / "src/studio.js", Path(__file__)):
        digest.update(path.read_bytes())
    build_id = digest.hexdigest()[:12]
    (DIST / "build-info.json").write_text(json.dumps({"build": build_id, "site": SITE, "sources": SOURCE_COMMITS, "counts": summary}, indent=2), encoding="utf-8")
    print(json.dumps({"build": build_id, "counts": summary}, indent=2))


if __name__ == "__main__":
    main()
