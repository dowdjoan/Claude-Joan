#!/usr/bin/env python3
"""
Toma el style.json generado por analyze_reference.py (el ritmo de cortes del
video de referencia) y tu material crudo (media/footage/*) y arma un plan de
edición (EditPlan.json) que Remotion usa para renderizar el video final con
el mismo ritmo de cortes.

Estrategia (simple, determinística):
  - Para cada plano ("shot") del video de referencia, se toma un clip de tu
    material crudo con la misma duración, avanzando de forma secuencial y
    rotando entre los archivos disponibles en media/footage/.
  - El offset dentro de cada clip crudo avanza para no repetir siempre el
    mismo segmento.

Uso:
  python3 scripts/build_edit.py media/reference/mi_video.style.json media/footage/

Salida:
  remotion/src/data/EditPlan.json
"""
import json
import shutil
import subprocess
import sys
from pathlib import Path

VIDEO_EXTS = {".mp4", ".mov", ".mkv", ".m4v", ".avi"}
PUBLIC_FOOTAGE_DIR = Path("remotion/public/footage")


def ffprobe_duration(path: str) -> float:
    cmd = ["ffprobe", "-v", "quiet", "-show_entries", "format=duration",
           "-of", "default=noprint_wrappers=1:nokey=1", path]
    out = subprocess.run(cmd, capture_output=True, text=True, check=True).stdout
    return float(out.strip())


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)

    style_path = Path(sys.argv[1])
    footage_dir = Path(sys.argv[2])

    style = json.loads(style_path.read_text())
    shots = style["shots"]
    fps = style["metadata"]["fps"]

    footage_files = sorted(
        p for p in footage_dir.iterdir() if p.suffix.lower() in VIDEO_EXTS
    )
    if not footage_files:
        print(f"No hay videos en {footage_dir}", file=sys.stderr)
        sys.exit(1)

    print(f"{len(footage_files)} clips de material crudo encontrados")

    # Remotion sirve archivos estáticos desde remotion/public/, así que
    # copiamos (o actualizamos) el material crudo ahí para poder referenciarlo
    # con staticFile() en la composición.
    PUBLIC_FOOTAGE_DIR.mkdir(parents=True, exist_ok=True)
    for clip in footage_files:
        dest = PUBLIC_FOOTAGE_DIR / clip.name
        if not dest.exists() or dest.stat().st_mtime < clip.stat().st_mtime:
            shutil.copy2(clip, dest)

    durations = {str(p): ffprobe_duration(str(p)) for p in footage_files}

    # cursor de lectura por archivo, para no repetir siempre desde el segundo 0
    cursors = {str(p): 0.0 for p in footage_files}

    plan = []
    idx = 0
    for shot in shots:
        needed = shot["duration"]
        clip = footage_files[idx % len(footage_files)]
        clip_key = str(clip)
        clip_dur = durations[clip_key]

        offset = cursors[clip_key]
        if offset + needed > clip_dur:
            offset = 0.0  # reinicia si se acaba el clip

        plan.append({
            "file": f"footage/{clip.name}",
            "trimStart": round(offset, 3),
            "duration": round(min(needed, clip_dur - offset), 3),
            "durationInFrames": max(1, round(needed * fps)),
        })

        cursors[clip_key] = offset + needed
        idx += 1

    out = {
        "fps": fps,
        "width": style["metadata"]["width"],
        "height": style["metadata"]["height"],
        "totalDurationInFrames": sum(s["durationInFrames"] for s in plan),
        "clips": plan,
    }

    out_dir = Path("remotion/src/data")
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / "EditPlan.json"
    out_path.write_text(json.dumps(out, indent=2, ensure_ascii=False))
    print(f"OK -> {out_path} ({len(plan)} planos, {out['totalDurationInFrames']} frames)")


if __name__ == "__main__":
    main()
