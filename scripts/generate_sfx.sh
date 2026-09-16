#!/usr/bin/env bash
# Genera los efectos de sonido (click, whoosh, impact, riser) que usa el edit
# "Coach Fitness P2P" (remotion/src/coachEdit/SfxTrack.tsx).
#
# No se commitean como binarios (el repo ignora *.wav/*.mp3 a propósito),
# así que se regeneran acá con ffmpeg antes de renderizar. Son sonidos
# sintéticos simples (sine/noise), no samples con licencia.
#
# Uso:
#   ./scripts/generate_sfx.sh
set -euo pipefail
cd "$(dirname "$0")/.."

OUT=remotion/public/sfx
mkdir -p "$OUT"

ffmpeg -y -f lavfi -i "sine=frequency=1800:duration=0.05" \
  -af "afade=t=out:st=0.02:d=0.03,volume=0.6" "$OUT/click.wav" -loglevel error

ffmpeg -y -f lavfi -i "sine=frequency=1200:duration=0.06" \
  -af "afade=t=out:st=0.02:d=0.04,volume=0.55" "$OUT/click_soft.wav" -loglevel error

ffmpeg -y -f lavfi -i "sine=frequency=90:duration=0.18" -f lavfi -i "anoisesrc=d=0.18:c=pink:a=0.4" \
  -filter_complex "[0][1]amix=inputs=2:duration=first,afade=t=out:st=0.05:d=0.13,volume=0.7" \
  "$OUT/impact.wav" -loglevel error

ffmpeg -y -f lavfi -i "anoisesrc=d=0.35:c=white:a=0.5" \
  -af "bandpass=f=1200:width_type=h:w=1600,afade=t=in:st=0:d=0.08,afade=t=out:st=0.2:d=0.15,volume=0.5" \
  "$OUT/whoosh.wav" -loglevel error

ffmpeg -y -f lavfi -i "sine=frequency=300:duration=0.4" \
  -af "asetrate=44100*1.6,afade=t=in:st=0:d=0.05,afade=t=out:st=0.3:d=0.1,volume=0.35" \
  "$OUT/riser.wav" -loglevel error

echo "SFX generados en $OUT"
