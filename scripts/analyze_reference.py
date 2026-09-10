#!/usr/bin/env python3
"""
Analiza un video de referencia (el "estilo" de edición) y extrae:
  - Timestamps de corte (detección de escenas con ffmpeg)
  - Duración de cada plano
  - Transcripción del audio con timestamps (Whisper), si hay voz
  - Metadata técnica (fps, resolución, duración total)

Uso:
  python3 scripts/analyze_reference.py media/reference/mi_video.mp4

Salida:
  media/reference/<nombre>.style.json
"""
import json
import subprocess
import sys
from pathlib import Path

SCENE_THRESHOLD = 0.28  # sensibilidad de detección de corte (0-1, más bajo = más cortes)


def ffprobe_metadata(video_path: str) -> dict:
    cmd = [
        "ffprobe", "-v", "quiet", "-print_format", "json",
        "-show_format", "-show_streams", video_path,
    ]
    out = subprocess.run(cmd, capture_output=True, text=True, check=True).stdout
    data = json.loads(out)
    vstream = next(s for s in data["streams"] if s["codec_type"] == "video")
    has_audio = any(s["codec_type"] == "audio" for s in data["streams"])
    num, den = vstream["r_frame_rate"].split("/")
    fps = round(int(num) / int(den), 3)
    return {
        "duration": float(data["format"]["duration"]),
        "width": int(vstream["width"]),
        "height": int(vstream["height"]),
        "fps": fps,
        "has_audio": has_audio,
    }


def detect_cuts(video_path: str, threshold: float = SCENE_THRESHOLD) -> list:
    """Devuelve los timestamps (segundos) donde ffmpeg detecta un corte de escena."""
    cmd = [
        "ffmpeg", "-i", video_path,
        "-filter:v", f"select='gt(scene,{threshold})',showinfo",
        "-f", "null", "-",
    ]
    proc = subprocess.run(cmd, capture_output=True, text=True)
    cuts = [0.0]
    for line in proc.stderr.splitlines():
        if "pts_time:" in line and "showinfo" in line:
            try:
                pts = line.split("pts_time:")[1].split()[0]
                cuts.append(round(float(pts), 3))
            except (IndexError, ValueError):
                continue
    return sorted(set(cuts))


def shots_from_cuts(cuts: list, total_duration: float) -> list:
    bounds = cuts + [round(total_duration, 3)]
    shots = []
    for start, end in zip(bounds[:-1], bounds[1:]):
        dur = round(end - start, 3)
        if dur <= 0:
            continue
        shots.append({"start": start, "end": end, "duration": dur})
    return shots


def transcribe(video_path: str) -> list:
    """Transcribe el audio con Whisper y devuelve segmentos con timestamps.
    Si falla (sin audio, sin voz, etc.) devuelve lista vacía en vez de romper."""
    try:
        import whisper
    except ImportError:
        print("  (whisper no disponible, se omite transcripción)", file=sys.stderr)
        return []
    try:
        model = whisper.load_model("base")
        result = model.transcribe(video_path, verbose=False)
        return [
            {
                "start": round(seg["start"], 2),
                "end": round(seg["end"], 2),
                "text": seg["text"].strip(),
            }
            for seg in result.get("segments", [])
        ]
    except Exception as exc:  # noqa: BLE001
        print(f"  (transcripción falló: {exc})", file=sys.stderr)
        return []


def main():
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(1)

    video_path = sys.argv[1]
    if not Path(video_path).exists():
        print(f"No existe: {video_path}", file=sys.stderr)
        sys.exit(1)

    print(f"Analizando {video_path} ...")
    meta = ffprobe_metadata(video_path)
    print(f"  duración={meta['duration']:.2f}s  fps={meta['fps']}  {meta['width']}x{meta['height']}")

    print("  detectando cortes de escena...")
    cuts = detect_cuts(video_path)
    shots = shots_from_cuts(cuts, meta["duration"])
    print(f"  {len(shots)} planos detectados, duración promedio {meta['duration']/max(len(shots),1):.2f}s")

    transcript = []
    if meta["has_audio"]:
        print("  transcribiendo audio (whisper)...")
        transcript = transcribe(video_path)
        print(f"  {len(transcript)} segmentos de texto")

    style = {
        "source": str(video_path),
        "metadata": meta,
        "cuts": cuts,
        "shots": shots,
        "transcript": transcript,
    }

    out_path = Path(video_path).with_suffix("").with_suffix(".style.json")
    out_path.write_text(json.dumps(style, indent=2, ensure_ascii=False))
    print(f"OK -> {out_path}")


if __name__ == "__main__":
    main()
