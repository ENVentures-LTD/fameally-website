"""Build the printable planner and original typographic social layouts.

Requires ReportLab, Pillow and Poppler's pdftoppm on PATH.
Run from any directory: python scripts/build-planner-assets.py
"""
from pathlib import Path
import subprocess

from PIL import Image, ImageDraw, ImageFont
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets' / 'printable-planner'
PDF_DIR = ROOT / 'output' / 'pdf'
ASSETS.mkdir(parents=True, exist_ok=True)
PDF_DIR.mkdir(parents=True, exist_ok=True)
URL = 'https://fameally.com/articles/printable-weekly-meal-planner-vs-meal-planning-app.html'
INK, PURPLE, MUTED = '#351342', '#672182', '#6f6277'
BG, LILAC, LINE = '#fbf8ff', '#f0e4fa', '#c8b6d0'
REGULAR = ROOT / 'assets' / 'Inter-Regular.ttf'
HEADING = ROOT / 'assets' / 'SourceSans3-Medium.ttf'
pdfmetrics.registerFont(TTFont('Inter', str(REGULAR)))
pdfmetrics.registerFont(TTFont('Source', str(HEADING)))


def build_pdf():
    path = PDF_DIR / 'fameally-weekly-dinner-planner.pdf'
    c = canvas.Canvas(str(path), pagesize=A4)
    w, h = A4
    c.setTitle('Your weekly dinner planner | Fameally')
    c.setAuthor('Fameally')
    c.setSubject('A free Monday to Sunday dinner planner with shopping checklist')

    def text(x, y, value, size=10, font='Inter', colour=INK):
        c.setFillColor(HexColor(colour))
        c.setFont(font, size)
        c.drawString(x, y, value)

    def line(x1, y1, x2, y2):
        c.setStrokeColor(HexColor(LINE))
        c.setLineWidth(.6)
        c.line(x1, y1, x2, y2)

    c.drawImage(str(ROOT / 'assets' / 'fameally-icon-512.png'), 36, h-68, 30, 30, mask='auto')
    text(76, h-58, 'Fameally', 18, 'Source', PURPLE)
    text(36, h-105, 'Your weekly dinner planner', 27, 'Source')
    text(36, h-127, 'A little plan. More room for real life.', 11, colour=MUTED)
    text(36, h-158, 'Week commencing', 10, 'Source')
    line(130, h-160, 310, h-160)
    text(350, h-158, 'Shopping day', 10, 'Source')
    line(421, h-160, w-36, h-160)

    top, left, width, row = h-180, 36, w-72, 43
    c.setFillColor(HexColor(LILAC))
    c.rect(left, top-26, width, 26, fill=1, stroke=0)
    text(left+10, top-17, 'DAY', 9, 'Source')
    text(left+100, top-17, 'DINNER', 9, 'Source')
    text(left+352, top-17, 'BUSY NIGHT / NOTES', 9, 'Source')
    for i, day in enumerate(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']):
        y = top-26-i*row
        text(left+10, y-26, day, 10, 'Source')
        line(left, y-row, left+width, y-row)
    bottom = top-26-7*row
    line(left+88, top-26, left+88, bottom)
    line(left+340, top-26, left+340, bottom)
    text(36, bottom-20, 'Leave a night flexible. A cupboard or freezer dinner counts, too.', 9, colour=MUTED)

    section_y = bottom-51
    text(36, section_y, 'Use up first', 15, 'Source', PURPLE)
    text(300, section_y, 'Shopping checklist', 15, 'Source', PURPLE)
    for i in range(5):
        y = section_y-28-i*25
        line(36, y, 269, y)
        c.setStrokeColor(HexColor(MUTED))
        c.rect(301, y+1, 9, 9, stroke=1, fill=0)
        line(319, y, w-36, y)
    line(36, 68, w-36, 68)
    text(36, 49, 'Want to save meals and build your list from the plan?', 9, 'Source')
    text(36, 34, 'Find the guide and Fameally app at fameally.com', 9, colour=PURPLE)
    c.linkURL(URL, (34, 29, w-34, 60), relative=0, thickness=0)
    c.showPage()
    c.save()
    subprocess.run(['pdftoppm', '-singlefile', '-scale-to', '1000', '-png', str(path), str(ASSETS / 'planner-preview')], check=True)
    return path


def font(size, heading=False):
    return ImageFont.truetype(str(HEADING if heading else REGULAR), size)


def build_graphic(size, filename):
    w, h = size
    im = Image.new('RGB', size, BG)
    d = ImageDraw.Draw(im)
    landscape = w > h
    pad = 60
    d.ellipse((w-340, -170, w+300, 470), fill=LILAC)
    icon = Image.open(ROOT / 'assets' / 'fameally-icon-512.png').convert('RGBA').resize((46, 46), Image.Resampling.LANCZOS)
    im.paste(icon, (pad, 46), icon)
    d.text((pad+60, 45), 'Fameally', font=font(34, True), fill=PURPLE)
    d.text((pad, 122), 'PLAN THE WEEK YOUR WAY', font=font(19), fill=PURPLE)
    title = ['Paper planner', 'or meal planning app?'] if landscape else ['Paper planner', 'or meal', 'planning app?']
    y = 166
    title_size, line_height = (57, 64) if landscape else (86, 91)
    for value in title:
        d.text((pad, y), value, font=font(title_size, True), fill=INK)
        y += line_height
    subtitle = ['Find what fits your family.', 'Free weekly dinner planner included.']
    y += 17
    for value in subtitle:
        d.text((pad, y), value, font=font(23 if landscape else 28), fill=MUTED)
        y += 36 if landscape else 43

    # Original page composition using the real printable and app screen.
    planner = Image.open(ASSETS / 'planner-preview.png').convert('RGB')
    screen = Image.open(ROOT / 'assets' / 'screenshot-plan-week.jpg').convert('RGB')
    if landscape:
        pw, px, py = 270, 734, 148
        sw, sx, sy = 155, 973, 245
    else:
        pw, px, py = (450, 110, 625) if h == 1500 else (420, 125, 592)
        sw, sx, sy = (250, 590, 702) if h == 1500 else (246, 630, 650)
    ph, sh = round(pw*planner.height/planner.width), round(sw*screen.height/screen.width)
    d.rounded_rectangle((px-10, py-10, px+pw+10, py+ph+10), radius=13, fill=LINE)
    im.paste(planner.resize((pw, ph), Image.Resampling.LANCZOS), (px, py))
    d.rounded_rectangle((sx-9, sy-9, sx+sw+9, sy+sh+9), radius=24, fill=INK)
    im.paste(screen.resize((sw, sh), Image.Resampling.LANCZOS), (sx, sy))
    d = ImageDraw.Draw(im)
    cy = h-91
    d.rounded_rectangle((pad, cy-9, pad+365, cy+48), radius=28, fill=PURPLE)
    d.text((pad+24, cy+3), 'Read the guide · fameally.com', font=font(21), fill='white')
    im.save(ASSETS / filename, optimize=True)


if __name__ == '__main__':
    print(build_pdf().relative_to(ROOT))
    for size, name in [((1200, 630), 'social-landscape.png'), ((1080, 1350), 'social-instagram.png'), ((1000, 1500), 'social-pinterest.png')]:
        build_graphic(size, name)
        print((ASSETS / name).relative_to(ROOT))
