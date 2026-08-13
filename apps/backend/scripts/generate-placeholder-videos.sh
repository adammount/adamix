#!/usr/bin/env bash
set -euo pipefail

FFMPEG="${FFMPEG:-ffmpeg}"
SOURCE="${1:-}"
OUT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/uploads/videos"
NAME="${NAME:-placeholder}"
DURATION="${DURATION:-60}"

if [ -z "$SOURCE" ] || [ ! -f "$SOURCE" ]; then
	echo "Usage: FFMPEG=/path/to/ffmpeg $0 <source-video>" >&2
	exit 1
fi

for quality in 360p 480p 720p; do
	mkdir -p "$OUT_DIR/$quality"
done

encode() {
	local quality="$1"
	local height="$2"
	local crf="$3"
	local audio="$4"

	"$FFMPEG" -y -hide_banner -loglevel error \
		-t "$DURATION" -i "$SOURCE" \
		-vf "scale=-2:$height:flags=lanczos" \
		-c:v libx264 -preset slow -crf "$crf" -profile:v high -level 4.0 \
		-pix_fmt yuv420p -g 48 -sc_threshold 0 \
		-c:a aac -b:a "$audio" -ac 2 -movflags +faststart \
		"$OUT_DIR/$quality/$NAME.mp4"

	echo "$quality/$NAME.mp4 $(du -h "$OUT_DIR/$quality/$NAME.mp4" | cut -f1)"
}

encode 360p 360 30 64k
encode 480p 480 29 96k
encode 720p 720 28 128k

echo "Done: $OUT_DIR"
