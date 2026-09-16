#!/usr/bin/env bash
# Aplica velocidad 1.10x al render final (video + audio, sin cambiar el
# pitch de forma perceptible ya que atempo hace pitch-correction).
# Paso estándar después de `npx remotion render` para todos los edits.
#
# Uso:
#   ./scripts/speed_up_render.sh remotion/out/mi_video.mp4 [velocidad]
#
# Si no pasás velocidad, usa 1.10 por default.
set -euo pipefail

IN="$1"
SPEED="${2:-1.10}"
OUT="${IN%.mp4}_${SPEED}x.mp4"

ffmpeg -y -i "$IN" \
  -filter_complex "[0:v]setpts=PTS/${SPEED}[v];[0:a]atempo=${SPEED}[a]" \
  -map "[v]" -map "[a]" \
  -c:v libx264 -crf 18 -preset medium -c:a aac -b:a 160k \
  "$OUT" -loglevel error

echo "Listo -> $OUT"
