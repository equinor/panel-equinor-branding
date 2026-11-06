#!/usr/bin/env bash
# Render the settled Juno SVGs to transparent PNGs for uploaders that reject SVG
# (the Keycloak theme's Theme customization accepts PNG/JPEG/WebP only).
# Uses headless Microsoft Edge/Chromium — no ImageMagick needed. Run from this folder (Git Bash).
set -e
EDGE="${EDGE:-/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe}"
SRC="$(cd "$(dirname "$0")" && pwd)"; OUT="$SRC/png"; TMP=$(mktemp -d); mkdir -p "$OUT"
render() { # name svg width height text-colour
  local name=$1 svg=$2 w=$3 h=$4 color=$5 html="$TMP/$1.html"
  { printf '<!doctype html><html><head><style>html,body{margin:0;background:transparent;color:%s}#w{width:%spx;height:%spx;display:flex;align-items:center;justify-content:center}#w svg{width:100%%;height:100%%}</style></head><body><div id="w">' "$color" "$w" "$h"
    cat "$SRC/$svg"; printf '</div></body></html>'; } > "$html"
  "$EDGE" --headless=new --disable-gpu --hide-scrollbars --default-background-color=00000000 \
    --window-size="$w,$h" --screenshot="$(cygpath -w "$OUT/$name.png")" "file:///$(cygpath -m "$html")" >/dev/null 2>&1 || true
  echo "wrote png/$name.png"
}
# Keycloak theme limits: logo ≤ 640x240 (cropped in-editor), browser icon ≤ 256x256.
render juno-o-mark-v3-light-512       juno-o-mark-v3-light.svg 512  512 "#262628"
render juno-o-mark-v3-dark-512        juno-o-mark-v3-dark.svg  512  512 "#f8f8f8"
render juno-o-mark-v3-light-256       juno-o-mark-v3-light.svg 256  256 "#262628"
render juno-lockup-v3-light-1068x480  juno-lockup-v3.svg       1068 480 "#262628"   # dark text, for light cards
render juno-lockup-v3-dark-1068x480   juno-lockup-v3.svg       1068 480 "#f8f8f8"   # light text, for dark cards
rm -rf "$TMP"
