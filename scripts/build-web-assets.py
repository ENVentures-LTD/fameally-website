"""Rebuild responsive screenshots and the social preview from existing brand assets.

Requires Pillow. Run from any directory: python scripts/build-web-assets.py
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

assets = Path(__file__).resolve().parents[1] / "assets"
with Image.open(assets / "fameally-icon-512.png") as brand:
    brand.resize((80, 80), Image.Resampling.LANCZOS).save(assets / "fameally-mark.webp", quality=90, method=6)
    brand.resize((32, 32), Image.Resampling.LANCZOS).save(assets / "favicon-32.png", optimize=True)
with Image.open(assets / "printable-planner/planner-preview.png") as planner:
    for width in (360, 708):
        planner.resize((width, round(planner.height * width / planner.width)), Image.Resampling.LANCZOS).save(
            assets / f"printable-planner/planner-preview-{width}.webp", quality=92, method=6)
for source in assets.glob("screenshot-*.jpg"):
    with Image.open(source) as original:
        for width in (320, 640, 900):
            height = round(original.height * width / original.width)
            original.resize((width, height), Image.Resampling.LANCZOS).save(
                source.with_name(f"{source.stem}-{width}.webp"), quality=84, method=6
            )

# A deterministic brand composition, using the actual app screens.
canvas = Image.new("RGB", (1200, 630), "#fcfaf7")
draw = ImageDraw.Draw(canvas)
font = assets / "SourceSans3-Medium.ttf"
def text(position, value, size, fill="#29242c"):
    draw.text(position, value, font=ImageFont.truetype(str(font), size), fill=fill)

icon = Image.open(assets / "fameally-icon-512.png").convert("RGBA")
icon.thumbnail((52, 52), Image.Resampling.LANCZOS)
canvas.paste(icon, (64, 55), icon)
text((130, 55), "Fameally", 38)
text((64, 180), "Meal planning.", 66)
text((64, 251), "Shopping lists.", 66)
text((64, 322), "Better together.", 66, "#672182")
text((64, 480), "For the week ahead.", 27, "#625c64")
text((64, 525), "fameally.com", 25, "#672182")
draw.rounded_rectangle((700, 40, 1155, 590), radius=16, fill="#e9e1ed")
for name, pos in [("plan-week", (730, 80)), ("shopping-list", (945, 128))]:
    shot = Image.open(assets / f"screenshot-{name}.jpg").convert("RGB")
    shot.thumbnail((180, 392), Image.Resampling.LANCZOS)
    x, y = pos
    draw.rounded_rectangle((x-5, y-5, x+shot.width+5, y+shot.height+5), radius=17, fill="#302633")
    mask = Image.new("L", shot.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, shot.width, shot.height), radius=13, fill=255)
    canvas.paste(shot, pos, mask)
canvas.save(assets / "fameally-social.jpg", quality=90, optimize=True)
print("Built responsive screenshots, brand icons, planner previews and the 1200 x 630 social preview.")
