"""
===============================================================================
🇪🇸 -> 🇫🇷 GÉNÉRATEUR AUTOMATIQUE DE SOUS-TITRES (ESPAGNOL -> FRANÇAIS)
===============================================================================
Ce script parcourt tous les fichiers vidéo (.mp4, .mov, .webm) du dossier `videos/`,
transcrit l'audio espagnol avec des horodatages précis (via faster-whisper, sans
avoir besoin d'installer ffmpeg séparément) et traduit chaque phrase en français
pour générer automatiquement les fichiers `.vtt` dans `subtitles/`.

Installation unique des dépendances :
    pip install faster-whisper deep-translator

Utilisation :
    python scripts/generate_subtitles.py
"""

import json
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
VIDEOS_DIR = ROOT_DIR / "videos"
SUBTITLES_DIR = ROOT_DIR / "subtitles"


def format_vtt_timestamp(seconds: float) -> str:
    hrs = int(seconds // 3600)
    mins = int((seconds % 3600) // 60)
    secs = seconds % 60
    return f"{hrs:02d}:{mins:02d}:{secs:06.3f}"


def main() -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    try:
        import av
        from faster_whisper import WhisperModel
        from deep_translator import GoogleTranslator

        _orig_av_open = av.open

        def _patched_av_open(*args, **kwargs):
            kwargs.pop("metadata_errors", None)
            return _orig_av_open(*args, **kwargs)

        av.open = _patched_av_open
    except ImportError:
        print("❌ Dépendances manquantes. Installez-les avec :")
        print("   pip install faster-whisper deep-translator")
        sys.exit(1)

    VIDEOS_DIR.mkdir(exist_ok=True)
    SUBTITLES_DIR.mkdir(exist_ok=True)

    video_files = sorted(
        [
            p
            for p in VIDEOS_DIR.iterdir()
            if p.is_file() and p.suffix.lower() in {".mp4", ".mov", ".webm", ".m4v"}
        ]
    )

    if not video_files:
        print(f"⚠️ Aucune vidéo trouvée dans {VIDEOS_DIR}")
        print("👉 Placez vos vidéos .mp4 dans le dossier 'videos/' puis relancez ce script.")
        return

    print("⏳ Chargement du modèle Whisper (small)...")
    model = WhisperModel("small", device="cpu", compute_type="int8")
    translator = GoogleTranslator(source="es", target="fr")

    all_generated = {}

    for video_path in video_files:
        stem = video_path.stem
        vtt_path = SUBTITLES_DIR / f"{stem}.fr.vtt"
        print(f"\n🎬 Transcription de : {video_path.name} (Espagnol)...")

        segments, _info = model.transcribe(
            str(video_path),
            language="es",
            beam_size=5,
            vad_filter=True,
        )

        cues = []
        vtt_lines = ["WEBVTT", ""]

        for idx, seg in enumerate(segments, start=1):
            es_text = seg.text.strip()
            if not es_text:
                continue

            try:
                fr_text = translator.translate(es_text)
            except Exception as err:
                print(f"   ⚠️ Erreur de traduction sur le segment #{idx}: {err}")
                fr_text = es_text

            start_ts = format_vtt_timestamp(seg.start)
            end_ts = format_vtt_timestamp(seg.end)

            vtt_lines.append(str(idx))
            vtt_lines.append(f"{start_ts} --> {end_ts}")
            vtt_lines.append(fr_text)
            vtt_lines.append("")

            cues.append(
                {
                    "start": round(seg.start, 2),
                    "end": round(seg.end, 2),
                    "fr": fr_text,
                    "es": es_text,
                }
            )
            print(f"   [{start_ts}] 🇪🇸 {es_text}")
            print(f"               🇫🇷 {fr_text}")

        vtt_path.write_text("\n".join(vtt_lines), encoding="utf-8")
        all_generated[stem] = cues
        print(f"✅ Fichier VTT enregistré : {vtt_path.relative_to(ROOT_DIR)}")

    # Sauvegarde aussi un aperçu JSON pratique pour copier-coller dans videos-data.js si souhaité
    json_out = SUBTITLES_DIR / "generated_cues.json"
    json_out.write_text(
        json.dumps(all_generated, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"\n🎉 Terminé ! Tous les sous-titres FR sont dans '{SUBTITLES_DIR.name}/'")
    print(f"📄 Résumé JSON bilingue (FR + ES) exporté dans : {json_out.relative_to(ROOT_DIR)}")


if __name__ == "__main__":
    main()
