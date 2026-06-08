"""
Generate all pipe tile sprites as PNG files using Python PIL/Pillow.
Run this once to produce all needed sprite PNGs for the Cocos project.
"""
from PIL import Image, ImageDraw
import os

OUT = "/home/claude/pipe-rescue/assets/sprites"
os.makedirs(OUT, exist_ok=True)

SIZE = 128  # tile size in pixels
BG_ALPHA = 0  # transparent background
PIPE_W = 28   # pipe stroke width
PIPE_COLOR = (41, 182, 246, 255)     # blue pipe
PIPE_ACTIVE = (76, 175, 80, 255)     # green when on path
START_COLOR = (56, 142, 60, 255)     # dark green start
GOAL_COLOR  = (251, 192, 45, 255)    # gold goal
BORDER_COLOR = (25, 118, 210, 255)   # tile border
BG_TILE = (13, 71, 161, 30)         # faint bg


def new_tile(color=None):
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    # tile background
    draw.rounded_rectangle([4, 4, SIZE-4, SIZE-4], radius=14, fill=(30, 60, 120, 200), outline=BORDER_COLOR, width=3)
    return img, draw

def center():
    return SIZE // 2, SIZE // 2

# ── STRAIGHT pipe (horizontal) ──────────────────────────────────────────────
img, draw = new_tile()
cx, cy = center()
draw.rectangle([0, cy - PIPE_W//2, SIZE, cy + PIPE_W//2], fill=PIPE_COLOR)
img.save(f"{OUT}/pipe_straight.png")

# ── ELBOW pipe (top → right, i.e. L-shape) ──────────────────────────────────
img, draw = new_tile()
cx, cy = center()
# vertical part (top half)
draw.rectangle([cx - PIPE_W//2, 0, cx + PIPE_W//2, cy + PIPE_W//2], fill=PIPE_COLOR)
# horizontal part (right half)
draw.rectangle([cx - PIPE_W//2, cy - PIPE_W//2, SIZE, cy + PIPE_W//2], fill=PIPE_COLOR)
# smooth corner
draw.ellipse([cx - PIPE_W//2, cy - PIPE_W//2, cx + PIPE_W//2, cy + PIPE_W//2], fill=PIPE_COLOR)
img.save(f"{OUT}/pipe_elbow.png")

# ── T-junction pipe ─────────────────────────────────────────────────────────
img, draw = new_tile()
cx, cy = center()
# horizontal full
draw.rectangle([0, cy - PIPE_W//2, SIZE, cy + PIPE_W//2], fill=PIPE_COLOR)
# vertical bottom
draw.rectangle([cx - PIPE_W//2, cy - PIPE_W//2, cx + PIPE_W//2, SIZE], fill=PIPE_COLOR)
img.save(f"{OUT}/pipe_tee.png")

# ── CROSS pipe ──────────────────────────────────────────────────────────────
img, draw = new_tile()
cx, cy = center()
draw.rectangle([0, cy - PIPE_W//2, SIZE, cy + PIPE_W//2], fill=PIPE_COLOR)
draw.rectangle([cx - PIPE_W//2, 0, cx + PIPE_W//2, SIZE], fill=PIPE_COLOR)
img.save(f"{OUT}/pipe_cross.png")

# ── DEAD END pipe (open on one side, top) ───────────────────────────────────
img, draw = new_tile()
cx, cy = center()
draw.rectangle([cx - PIPE_W//2, 0, cx + PIPE_W//2, cy], fill=PIPE_COLOR)
draw.ellipse([cx - PIPE_W//2, cy - PIPE_W//2, cx + PIPE_W//2, cy + PIPE_W//2], fill=PIPE_COLOR)
img.save(f"{OUT}/pipe_dead.png")

# ── EMPTY tile ───────────────────────────────────────────────────────────────
img, draw = new_tile()
img.save(f"{OUT}/pipe_empty.png")

# ── START marker ─────────────────────────────────────────────────────────────
img, draw = new_tile()
cx, cy = center()
# draw water drop / source circle
draw.ellipse([cx-36, cy-36, cx+36, cy+36], fill=START_COLOR, outline=(200, 230, 200, 255), width=4)
# "S" label using a simple cross
draw.rectangle([cx - PIPE_W//2, 0, cx + PIPE_W//2, cy], fill=(150, 230, 150, 200))
draw.rectangle([0, cy - PIPE_W//2, cx + PIPE_W//2, cy + PIPE_W//2], fill=(150, 230, 150, 200))
img.save(f"{OUT}/pipe_start.png")

# ── GOAL marker ──────────────────────────────────────────────────────────────
img, draw = new_tile()
cx, cy = center()
draw.ellipse([cx-36, cy-36, cx+36, cy+36], fill=GOAL_COLOR, outline=(255, 240, 150, 255), width=4)
draw.rectangle([cx - PIPE_W//2, cy, cx + PIPE_W//2, SIZE], fill=(255, 230, 100, 200))
draw.rectangle([cx - PIPE_W//2, cy - PIPE_W//2, SIZE, cy + PIPE_W//2], fill=(255, 230, 100, 200))
img.save(f"{OUT}/pipe_goal.png")

# ── ACTIVE versions (green glow) ─────────────────────────────────────────────
for name in ["straight", "elbow", "tee", "cross", "dead"]:
    base = Image.open(f"{OUT}/pipe_{name}.png").convert("RGBA")
    img2 = Image.new("RGBA", (SIZE, SIZE), (0,0,0,0))
    draw2 = ImageDraw.Draw(img2)
    draw2.rounded_rectangle([4, 4, SIZE-4, SIZE-4], radius=14, fill=(20, 80, 30, 220), outline=(76, 175, 80, 255), width=4)
    # tint original pipe pixels green
    pixels = base.load()
    for y in range(SIZE):
        for x in range(SIZE):
            r, g, b, a = pixels[x, y]
            if a > 100 and g > r and g > b:  # already green-ish
                img2.paste(base, (0, 0), base)
                break
        else:
            continue
        break
    # simpler: just overlay green tint
    tinted = Image.new("RGBA", (SIZE, SIZE), (0,0,0,0))
    tinted_draw = ImageDraw.Draw(tinted)
    tinted_draw.rounded_rectangle([4, 4, SIZE-4, SIZE-4], radius=14, fill=(20, 80, 30, 220), outline=(76, 175, 80, 255), width=4)
    orig_draw = ImageDraw.Draw(base)
    # swap blue channels to green in base
    px = base.load()
    for y in range(SIZE):
        for x in range(SIZE):
            r, g, b, a = px[x, y]
            if a > 50:
                px[x, y] = (min(r, 80), min(g + 120, 255), min(b, 80), a)
    result = Image.alpha_composite(tinted, base)
    result.save(f"{OUT}/pipe_{name}_active.png")

# ── BACKGROUND ───────────────────────────────────────────────────────────────
W, H = 540, 960
bg = Image.new("RGBA", (W, H), (10, 20, 60, 255))
bg_draw = ImageDraw.Draw(bg)
# grid pattern
for i in range(0, W, 40):
    bg_draw.line([(i, 0), (i, H)], fill=(30, 50, 100, 80), width=1)
for j in range(0, H, 40):
    bg_draw.line([(0, j), (W, j)], fill=(30, 50, 100, 80), width=1)
# vignette
from PIL import ImageFilter
bg.save(f"{OUT}/background.png")

# ── BUTTON ───────────────────────────────────────────────────────────────────
btn = Image.new("RGBA", (360, 100), (0, 0, 0, 0))
btn_draw = ImageDraw.Draw(btn)
btn_draw.rounded_rectangle([0, 0, 360, 100], radius=20, fill=(33, 150, 243, 255), outline=(100, 200, 255, 255), width=3)
btn.save(f"{OUT}/button_blue.png")

btn2 = Image.new("RGBA", (360, 100), (0, 0, 0, 0))
btn2_draw = ImageDraw.Draw(btn2)
btn2_draw.rounded_rectangle([0, 0, 360, 100], radius=20, fill=(76, 175, 80, 255), outline=(150, 230, 150, 255), width=3)
btn2.save(f"{OUT}/button_green.png")

print("All sprites generated successfully!")
import os
for f in sorted(os.listdir(OUT)):
    print(f"  {OUT}/{f}")
