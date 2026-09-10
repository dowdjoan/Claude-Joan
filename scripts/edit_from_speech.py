#!/usr/bin/env python3
"""
Edita un video "escuchando" el audio: detecta las pausas/silencios y corta
ahí, dejando solo las partes donde estás hablando, una atrás de la otra
(el clásico "jump cut" de podcast/talking-head: se saca el aire muerto).

No depende de bajar ningún modelo de transcripción (Whisper), así que
funciona aunque no haya red disponible para eso: usa detección de silencio
de ffmpeg sobre el audio real de tu video.

Uso:
  python3 scripts/edit_from_speech.py media/footage/tu_video.mp4 \
      [--noise -30dB] [--min-silence 0.35] [--min-speech 0.15] [--padding 0.08]

Salida:
  remotion/src/data/EditPlan.json
"""
import argparse
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

PUBLIC_FOOTAGE_DIR = Path("remotion/public/footage")


def ffprobe_meta(path: str) -> dict:
    cmd = [
        "ffprobe", "-v", "quiet", "-print_format", "json",
        "-show_format", "-show_streams", path,
    ]
    data = json.loads(subprocess.run(cmd, capture_output=True, text=True, check=True).stdout)
    vstream = next(s for s in data["streams"] if s["codec_type"] == "video")
    num, den = vstream["r_frame_rate"].split("/")
    fps = round(int(num) / int(den), 3)
    return {
        "duration": float(data["format"]["duration"]),
        "width": int(vstream["width"]),
        "height": int(vstream["height"]),
        "fps": fps,
    }


def detect_silences(path: str, noise: str, min_silence: float) -> list:
    """Devuelve lista de silencios [(start,end), ...] usando ffmpeg silencedetect."""
    cmd = [
        "ffmpeg", "-i", path,
        "-af", f"silencedetect=noise={noise}:d={min_silence}",
        "-f", "null", "-",
    ]
    proc = subprocess.run(cmd, capture_output=True, text=True)
    starts = [float(m) for m in re.findall(r"silence_start:\s*([\d.]+)", proc.stderr)]
    ends = [float(m) for m in re.findall(r"silence_end:\s*([\d.]+)", proc.stderr)]
    # silence_end siempre viene acompañado de su start; si terminan desparejos
    # (el clip termina en silencio) se ignora ese último tramo abierto.
    return list(zip(starts, ends[: len(starts)]))


def speech_segments_from_silences(silences: list, total_duration: float,
                                   min_speech: float, padding: float) -> list:
    """Invierte los silencios para obtener los tramos de habla, con un
    pequeño padding para no cortar la voz justo al ras."""
    bounds = [0.0]
    for s, e in silences:
        bounds.append(s)
        bounds.append(e)
    bounds.append(total_duration)

    segments = []
    for start, end in zip(bounds[0::2], bounds[1::2]):
        start = max(0.0, start - padding)
        end = min(total_duration, end + padding)
        if end - start >= min_speech:
            segments.append({"start": round(start, 3), "end": round(end, 3),
                              "duration": round(end - start, 3)})
    return segments


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("video")
    ap.add_argument("--noise", default="-30dB", help="Umbral de silencio (dB), default -30dB")
    ap.add_argument("--min-silence", type=float, default=0.35, help="Duración mínima de pausa a cortar (s)")
    ap.add_argument("--min-speech", type=float, default=0.15, help="Duración mínima de un tramo de habla para conservarlo (s)")
    ap.add_argument("--padding", type=float, default=0.08, help="Aire extra que se deja antes/después de cada tramo de habla (s)")
    args = ap.parse_args()

    video_path = Path(args.video)
    if not video_path.exists():
        print(f"No existe: {video_path}", file=sys.stderr)
        sys.exit(1)

    print(f"Analizando audio de {video_path} ...")
    meta = ffprobe_meta(str(video_path))
    print(f"  duración={meta['duration']:.2f}s  fps={meta['fps']}  {meta['width']}x{meta['height']}")

    silences = detect_silences(str(video_path), args.noise, args.min_silence)
    print(f"  {len(silences)} pausas detectadas")

    segments = speech_segments_from_silences(silences, meta["duration"], args.min_speech, args.padding)
    if not segments:
        print("No se detectó habla (¿el umbral de ruido es el correcto?). No se generó edit.", file=sys.stderr)
        sys.exit(1)

    kept = sum(s["duration"] for s in segments)
    print(f"  {len(segments)} tramos de habla conservados, {kept:.2f}s de {meta['duration']:.2f}s originales"
          f" ({kept/meta['duration']*100:.0f}%)")

    PUBLIC_FOOTAGE_DIR.mkdir(parents=True, exist_ok=True)
    dest = PUBLIC_FOOTAGE_DIR / video_path.name
    if not dest.exists() or dest.stat().st_mtime < video_path.stat().st_mtime:
        shutil.copy2(video_path, dest)

    clips = []
    for seg in segments:
        clips.append({
            "file": f"footage/{video_path.name}",
            "trimStart": seg["start"],
            "duration": seg["duration"],
            "durationInFrames": max(1, round(seg["duration"] * meta["fps"])),
        })

    out = {
        "fps": meta["fps"],
        "width": meta["width"],
        "height": meta["height"],
        "totalDurationInFrames": sum(c["durationInFrames"] for c in clips),
        "clips": clips,
    }

    out_dir = Path("remotion/src/data")
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / "EditPlan.json"
    out_path.write_text(json.dumps(out, indent=2, ensure_ascii=False))
    final_s = out["totalDurationInFrames"] / meta["fps"]
    print(f"OK -> {out_path} ({len(clips)} cortes, {final_s:.2f}s de video final)")


if __name__ == "__main__":
    main()
