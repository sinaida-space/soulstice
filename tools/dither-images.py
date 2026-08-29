#!/usr/bin/env python3
# Soulstice — turn source images into 1-bit ordered-dither PNGs: red (#cd0000)
# pixels on transparent, matching the sinaida.eu duotone dither. The UI picks
# one at random on load; hover/tap inverts it in CSS (mask XOR), so only this
# single red-on-transparent asset is needed per image.
#
#   python3 tools/dither-images.py
#
# Scans assets/<set>/src/*.png and writes assets/<set>/1.png, 2.png, ...
# (sorted by source filename). Sets in use: hero (welcome), path (mode select).

import os
import glob
from PIL import Image

ASSET_ROOT = "assets"
DITHER_WIDTH = 384        # dither is computed at this width...
UPSCALE = 3               # ...then nearest-neighbour blown up, so each dot is
                          # a solid 3px block that survives the mask resample.
GAMMA = 0.62              # <1 lifts the mid tones so faint fields still dot
RED = (205, 0, 0)         # --red

# 8x8 Bayer matrix, normalised to 0..1 thresholds.
BAYER8 = [
    [0, 48, 12, 60, 3, 51, 15, 63],
    [32, 16, 44, 28, 35, 19, 47, 31],
    [8, 56, 4, 52, 11, 59, 7, 55],
    [40, 24, 36, 20, 43, 27, 39, 23],
    [2, 50, 14, 62, 1, 49, 13, 61],
    [34, 18, 46, 30, 33, 17, 45, 29],
    [10, 58, 6, 54, 9, 57, 5, 53],
    [42, 26, 38, 22, 41, 25, 37, 21],
]
BAYER_N = 64


def intensity(im):
    # These images are red on black, so the red channel carries the signal.
    # Mix in luminance so faint bluish stars still register a few dots.
    r, g, b = im.split()
    px_r, px_g, px_b = r.load(), g.load(), b.load()
    w, h = im.size
    out = Image.new("L", (w, h))
    po = out.load()
    for y in range(h):
        for x in range(w):
            rr, gg, bb = px_r[x, y], px_g[x, y], px_b[x, y]
            lum = 0.30 * rr + 0.59 * gg + 0.11 * bb
            val = 0.75 * rr + 0.25 * lum
            # lift the mid tones so faint fields still leave dots
            val = 255.0 * (val / 255.0) ** GAMMA
            po[x, y] = int(max(0, min(255, val)))
    return out


def dither(im):
    w, h = im.size
    src = im.load()
    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    po = out.load()
    for y in range(h):
        row = BAYER8[y % 8]
        for x in range(w):
            threshold = (row[x % 8] + 0.5) / BAYER_N * 255.0
            if src[x, y] > threshold:
                po[x, y] = (RED[0], RED[1], RED[2], 255)
    return out


def process(path, out_path):
    im = Image.open(path).convert("RGB")
    w, h = im.size
    dh = max(1, int(round(h * DITHER_WIDTH / float(w))))
    im = im.resize((DITHER_WIDTH, dh), Image.LANCZOS)
    im = dither(intensity(im))
    im = im.resize((DITHER_WIDTH * UPSCALE, dh * UPSCALE), Image.NEAREST)
    im.save(out_path, optimize=True)
    kb = os.path.getsize(out_path) / 1024.0
    print("wrote %s  %dx%d  %.0f KB" % (out_path, im.size[0], im.size[1], kb))


def main():
    src_dirs = sorted(glob.glob(os.path.join(ASSET_ROOT, "*", "src")))
    if not src_dirs:
        raise SystemExit("no assets/<set>/src directories found")
    for src_dir in src_dirs:
        out_dir = os.path.dirname(src_dir)
        paths = sorted(glob.glob(os.path.join(src_dir, "*.png")))
        if not paths:
            print("skip %s (no source images)" % src_dir)
            continue
        for i, p in enumerate(paths, start=1):
            process(p, os.path.join(out_dir, "%d.png" % i))


if __name__ == "__main__":
    main()
