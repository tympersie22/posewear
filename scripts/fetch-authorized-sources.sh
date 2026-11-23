#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
sources_root="${POSEWEAR_SOURCES_DIR:-$(dirname "$root")}" 

fetch_full() {
  local directory="$1" url="$2" sha="$3"
  if [[ ! -d "$directory/.git" ]]; then
    git clone --no-checkout "$url" "$directory"
  fi
  git -C "$directory" fetch --depth 1 origin "$sha"
  git -C "$directory" checkout --detach "$sha"
  test "$(git -C "$directory" rev-parse HEAD)" = "$sha"
}

fetch_sparse() {
  local directory="$1" url="$2" sha="$3" patterns="$4"
  if [[ ! -d "$directory/.git" ]]; then
    git clone --filter=blob:none --no-checkout "$url" "$directory"
  fi
  git -C "$directory" sparse-checkout init --no-cone
  printf '%s\n' $patterns | git -C "$directory" sparse-checkout set --no-cone --stdin
  git -C "$directory" fetch --depth 1 origin "$sha"
  git -C "$directory" checkout --detach "$sha"
  test "$(git -C "$directory" rev-parse HEAD)" = "$sha"
}

fetch_full "$sources_root/shisei" \
  https://github.com/wquguru/shisei.git \
  6e22358bab73c51eeae0615030635ace199169f8

fetch_sparse "$sources_root/portrait-source" \
  https://github.com/Atom-kkk/AI-Face-Resource-Library.git \
  9e4c88ad74297ec4cea503d04e959c65b01dde06 \
  'assets/data.js assets/thumb/'

fetch_sparse "$sources_root/charadb-source" \
  https://github.com/taki-ttt/charadb.git \
  7fe2e4b009ad6d85496101e929ac8528cb21d357 \
  'LICENSE README.md data/items_public.json'

printf 'Authorized PoseWear sources are pinned under %s\n' "$sources_root"
