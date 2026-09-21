"""Generate docs/public/assets/wafer-identification.svg.

Two things are handled here that are easy to get wrong by hand:

1. **Outline geometry.** A flat is a chord that replaces an arc, so the wafer paths are
   computed with real trigonometry rather than hand-written path data.

2. **Legibility.** The zoom overlay in `ZoomableImage` is a dark lightbox backdrop, so an
   SVG with a transparent background renders dark-on-dark once enlarged. The diagram
   therefore paints its own opaque white stage as its first child, which also makes it
   readable when the .svg file is opened directly. Text is kept at high contrast (no grey)
   and at sizes that survive being scaled down into the prose column.

The output is ASCII-only and uses *only* numeric character references plus the five
predefined XML entities (&amp; &lt; &gt; &quot; &apos;): named entities such as &deg; do
not exist in XML and make the whole SVG fail to parse. See the "Figuras" section of
README.md.
"""
import math
import os

OUT = os.path.join('docs', 'public', 'assets', 'wafer-identification.svg')

DEG = '&#176;'
MDASH = '&#8212;'
PM = '&#177;'
LT = '&lt;'
GT = '&gt;'
ACUTE = '&#225;'   # a-acute, for "secundário"

W, H = 1120, 690
PAPER = '#ffffff'
INK = '#1a202c'
INK_SOFT = '#2d3748'
INK_MONO = '#1d2430'


def pt(cx, cy, r, deg):
    a = math.radians(deg)
    return cx + r * math.cos(a), cy + r * math.sin(a)


def fmt(v):
    s = f'{v:.2f}'.rstrip('0').rstrip('.')
    return s if s else '0'


def outline(cx, cy, r, flats):
    """Closed path for a wafer with `flats` = [(screen_angle, half_angle), ...].

    Screen angles increase clockwise (y points down), so traversing with sweep-flag=1
    walks the long way round from the first flat's trailing edge back to its leading
    edge, cutting a straight chord across each flat on the way.
    """
    flats = sorted(flats)
    if not flats:
        x0, y0 = pt(cx, cy, r, 0)
        x1, y1 = pt(cx, cy, r, 180)
        return (f'M {fmt(x0)},{fmt(y0)} '
                f'A {fmt(r)},{fmt(r)} 0 1 1 {fmt(x1)},{fmt(y1)} '
                f'A {fmt(r)},{fmt(r)} 0 1 1 {fmt(x0)},{fmt(y0)} Z')

    def at(deg):
        x, y = pt(cx, cy, r, deg)
        return f'{fmt(x)},{fmt(y)}'

    first = flats[0]
    parts = [f'M {at(first[0] + first[1])}']
    for idx in range(len(flats)):
        cur_end = flats[idx][0] + flats[idx][1]
        if idx + 1 < len(flats):
            nxt_start = flats[idx + 1][0] - flats[idx + 1][1]
            nxt_end = flats[idx + 1][0] + flats[idx + 1][1]
            large = 1 if nxt_start - cur_end > 180 else 0
            parts.append(f'A {fmt(r)},{fmt(r)} 0 {large} 1 {at(nxt_start)}')
            parts.append(f'L {at(nxt_end)}')
        else:
            wrap = first[0] - first[1] + 360
            large = 1 if wrap - cur_end > 180 else 0
            parts.append(f'A {fmt(r)},{fmt(r)} 0 {large} 1 {at(wrap)}')
    parts.append('Z')
    return ' '.join(parts)


def flat_line(cx, cy, r, angle, half):
    x0, y0 = pt(cx, cy, r, angle - half)
    x1, y1 = pt(cx, cy, r, angle + half)
    return f'M {fmt(x0)},{fmt(y0)} L {fmt(x1)},{fmt(y1)}'


PRIMARY = (90.0, 24.0)     # at the bottom, drawn wide so it is obvious
SEC_HALF = 13.0

configs = [
    ('P', f'{LT}111{GT}', None, f'sem flat secund{ACUTE}rio'),
    ('N', f'{LT}111{GT}', 45.0, f'secund{ACUTE}rio a 45{DEG}'),
    ('P', f'{LT}100{GT}', 90.0, f'secund{ACUTE}rio a 90{DEG}'),
    ('N', f'{LT}100{GT}', 180.0, f'secund{ACUTE}rio a 180{DEG}'),
]
CXS = [140, 400, 660, 920]
CY, R = 196.0, 62.0

cxc, cyc, rc = 200.0, 500.0, 90.0
NW = 10.0     # notch half-width at the rim
ND = 26.0     # notch depth, exaggerated: the true depth is 0.33 % of the radius

out = []
add = out.append
add(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img">')
add('  <title>How to read a silicon wafer: the primary and secondary flats used up to 150 mm, '
    'and the orientation notch that replaces them on 200 mm and 300 mm wafers</title>')
add(f'  <rect width="{W}" height="{H}" fill="{PAPER}" />')
add('  <style>')
add(f'    .t {{ font: 600 15.5px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; fill: {INK}; }}')
add(f'    .h {{ font: 600 16.5px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; fill: {INK}; }}')
add(f'    .s {{ font: 14px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; fill: {INK_SOFT}; }}')
add(f'    .m {{ font: 600 14px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; fill: {INK_MONO}; }}')
add(f'    .note {{ font: 14px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; fill: {INK_SOFT}; }}')
add('    .wafer { fill: #eef2f7; stroke: #2d3748; stroke-width: 2; }')
add('    .prim { stroke: #b7470a; stroke-width: 5.5; fill: none; stroke-linecap: round; }')
add('    .sec { stroke: #1e5fa8; stroke-width: 5.5; fill: none; stroke-linecap: round; }')
add('    .cut { fill: #ffffff; stroke: #2d3748; stroke-width: 2; }')
add('    .dash { stroke: #5a6675; stroke-width: 1.4; fill: none; stroke-dasharray: 5 4; }')
add('    .vin { fill: none; stroke: #1a202c; stroke-width: 2.8; stroke-linejoin: round; }')
add('    .box { fill: none; stroke: #a9b4c2; stroke-width: 1.3; }')
add('  </style>')

# ------------------------------------------------------- flats (150 mm and below)
add(f'  <text class="h" x="28" y="32">Wafers with flats {MDASH} 150 mm and smaller</text>')
add('  <text class="s" x="28" y="56">The primary flat sits at the bottom and fixes the crystal reference.</text>')
add('  <text class="s" x="28" y="76">When a secondary flat exists, its angle reports orientation and doping type.</text>')

for (typ, orient, sec_at, desc), cx in zip(configs, CXS):
    flats = [PRIMARY] if sec_at is None else [PRIMARY, (90.0 + sec_at, SEC_HALF)]
    add(f'  <path class="wafer" d="{outline(cx, CY, R, flats)}" />')
    add(f'  <path class="prim" d="{flat_line(cx, CY, R, *PRIMARY)}" />')
    if sec_at is not None:
        add(f'  <path class="sec" d="{flat_line(cx, CY, R, 90.0 + sec_at, SEC_HALF)}" />')
    add(f'  <text class="t" x="{cx}" y="118" text-anchor="middle">{typ} {orient}</text>')
    add(f'  <text class="s" x="{cx}" y="292" text-anchor="middle">{desc}</text>')

add('  <line class="prim" x1="28" y1="326" x2="56" y2="326" />')
add(f'  <text class="s" x="64" y="330">primary flat {MDASH} crystal reference (parallel to a {LT}110{GT} plane)</text>')
add('  <line class="sec" x1="530" y1="326" x2="558" y2="326" />')
add(f'  <text class="s" x="566" y="330">secondary flat {MDASH} orientation + doping type</text>')

# ------------------------------------------------------- notch (200 / 300 mm)
add(f'  <text class="h" x="28" y="372">Wafers with a notch {MDASH} 200 mm and 300 mm</text>')

ly = cyc + math.sqrt(rc * rc - NW * NW)
apex_y = ly - ND
add(f'  <circle class="wafer" cx="{fmt(cxc)}" cy="{fmt(cyc)}" r="{fmt(rc)}" />')
add(f'  <path class="cut" d="M {fmt(cxc - NW)},{fmt(ly)} L {fmt(cxc)},{fmt(apex_y)} '
    f'L {fmt(cxc + NW)},{fmt(ly)} L {fmt(cxc + NW)},{fmt(ly + 5)} L {fmt(cxc - NW)},{fmt(ly + 5)} Z" />')
add(f'  <text class="t" x="{fmt(cxc)}" y="626" text-anchor="middle">one notch, at the bottom</text>')
add(f'  <text class="s" x="{fmt(cxc)}" y="650" text-anchor="middle">it marks the {LT}110{GT} axis and nothing else</text>')

# magnified inset of the notch profile
add('  <rect class="box" x="430" y="400" width="200" height="178" rx="6" />')
add('  <text class="s" x="530" y="422" text-anchor="middle">notch, magnified</text>')
add('  <path class="vin" d="M 478,458 L 530,510 L 582,458" />')
add('  <line class="dash" x1="470" y1="458" x2="594" y2="458" />')
add('  <text class="s" x="594" y="450" text-anchor="end">wafer edge</text>')
add('  <line class="dash" x1="530" y1="458" x2="530" y2="510" />')
add('  <text class="m" x="538" y="490">1,00 mm</text>')
add(f'  <text class="m" x="530" y="528" text-anchor="middle">90{DEG}</text>')
add(f'  <text class="s" x="530" y="550" text-anchor="middle">the V has a 90{DEG} included angle</text>')
add('  <text class="s" x="530" y="572" text-anchor="middle">1,00 mm deep (SEMI M1)</text>')

# annotation column
ax = 664
add(f'  <text class="t" x="{ax}" y="418">What the notch tells you</text>')
add(f'  <text class="s" x="{ax}" y="446">Its axis is aligned to {LT}110{GT} within {PM}1{DEG}, so the</text>')
add(f'  <text class="s" x="{ax}" y="464">tools know where the lattice rests under the pattern.</text>')
add(f'  <text class="s" x="{ax}" y="482">That is all it encodes.</text>')
add(f'  <text class="t" x="{ax}" y="516">What it does not tell you</text>')
add(f'  <text class="s" x="{ax}" y="544">A notched wafer has no secondary fiducial, so the</text>')
add(f'  <text class="s" x="{ax}" y="562">notch carries no doping type. P or N comes from the</text>')
add(f'  <text class="s" x="{ax}" y="580">certificate, or from the laser mark on the back:</text>')
add(f'  <text class="s" x="{ax}" y="598">SEMI T7, with an optional A/N field.</text>')

add(f'  <text class="note" x="28" y="676">Not to scale: the notch is drawn far larger than life. At its true size it is '
    f'1,00 mm deep on a 300 mm wafer {MDASH} about 0,3 % of the radius.</text>')
add('</svg>')

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, 'w', encoding='ascii', errors='strict', newline='\n') as fh:
    fh.write('\n'.join(out) + '\n')
print(f'wrote {OUT} ({len(out)} lines)')
