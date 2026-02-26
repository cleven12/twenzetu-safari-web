#!/bin/bash
# Downloads all Unsplash images used in the project to src/images/
# Use: bash download-images.sh

DEST="src/images"
mkdir -p "$DEST"

PHOTOS=(
  "photo-1466721591366-2d5fba72006d"
  "photo-1504173010664-32509107de72"
  "photo-1507525428034-b723cf961d3e"
  "photo-1516026672322-bc52d61a55d5"
  "photo-1516426122078-c23e76319801"
  "photo-1519659528534-7fd733a832a0"
  "photo-1520483691742-bada60a1edd6"
  "photo-1535083783855-ade8a849ce28"
  "photo-1535941339077-2dd1c7963098"
  "photo-1547036967-23d11aacaee0"
  "photo-1559523161-0fc0d8b38a7a"
  "photo-1568393691622-c7ba131d63b4"
  "photo-1574492867640-10ba7b2e2b38"
  "photo-1575550959106-5a7defe28b56"
  "photo-1586348943529-beaae6c28db9"
  "photo-1590523277543-a94d2e4eb00b"
  "photo-1596040033229-a9821ebd058d"
  "photo-1609198092458-38a293c7ac4b"
  "photo-1619711678715-6c1eb47a3553"
  "photo-1621414050946-1b8b54914a61"
)

for PHOTO in "${PHOTOS[@]}"; do
  OUT="$DEST/${PHOTO}.jpg"
  if [ -f "$OUT" ]; then
    echo "Already exists: $OUT"
    continue
  fi
  echo "Downloading $PHOTO..."
  curl -sL "https://images.unsplash.com/${PHOTO}?w=1200&q=75&fm=jpg&fit=crop" -o "$OUT"
  echo "  Saved: $OUT ($(du -h "$OUT" | cut -f1))"
done

echo ""
echo "Done! All images saved to $DEST/"
