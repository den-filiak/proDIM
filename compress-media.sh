#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
echo "== Відео (mp4/mov) =="
find img -type f \( -iname "*.mp4" -o -iname "*.mov" \) -print0 | while IFS= read -r -d '' f; do
  tmp="/tmp/vid_out_$$.mp4"
  ffmpeg -y -nostdin -i "$f" -vf "scale=min(1280\,iw):-2" -c:v libx264 -crf 28 -preset veryfast -movflags +faststart -c:a aac -b:a 96k "$tmp" -loglevel error < /dev/null
  mv "$tmp" "$f"
  echo "стиснуто: $f"
done
echo "== Фото (jpg/png) =="
find img -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -print0 | while IFS= read -r -d '' f; do
  convert "$f" -resize "1920x1920>" -strip -quality 78 -sampling-factor 4:2:0 "$f"
done
find img -type f -iname "*.png" -print0 | while IFS= read -r -d '' f; do
  convert "$f" -resize "1920x1920>" -strip -define png:compression-level=9 "$f"
done
echo "Готово. Перевір розмір: du -sh img"
