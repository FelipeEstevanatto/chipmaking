"""Generate docs/public/assets/wafer-identification.svg.

The wafer outlines need real arc geometry (a flat is a chord that replaces an arc), so the
path data is computed here rather than hand-written. The output is ASCII-only and uses
*only* numeric character references plus the five predefined XML entities (&amp; &lt; &gt;
&quot; &apos;): named entities such as &deg; or &aacute; do not exist in XML and make the
whole SVG fail to parse. See the "Figuras" section of README.md.
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


W, H = 1120, 660
PRIMARY = (90.0, 24.0)     # at the bottom, drawn wide so it is obvious
SEC_HALF = 13.0

configs = [
    ('P', f'{LT}111{GT}', None, f'sem flat secund{ACUTE}rio'),
    ('N', f'{LT}111{GT}', 45.0, f'secund{ACUTE}rio a 45{DEG}'),
    ('P', f'{LT}100{GT}', 90.0, f'secund{ACUTE}rio a 90{DEG}'),
    ('N', f'{LT}100{GT}', 180.0, f'secund{ACUTE}rio a 180{DEG}'),
]
CXS = [140, 400, 660, 920]
CY, R = 168.0, 64.0

cxc, cyc, rc = 200.0, 478.0, 92.0
NW = 10.0     # notch half-width at the rim
ND = 26.0     # notch depth, exaggerated: the true depth is 0.33 % of the radius

out = []
add = out.append
add(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img">')
add('  <title>How to read a silicon wafer: the primary and secondary flats used up to 150 mm, '
    'and the orientation notch that replaces them on 200 mm and 300 mm wafers</title>')
add('  <style>')
add('    .t { font: 600 13px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; fill: #1a202c; }')
add('    .h { font: 600 14px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; fill: #1a202c; }')
add('    .s { font: 11.5px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; fill: #4a5568; }')
add('    .m { font: 600 12px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; fill: #2d3748; }')
add('    .note { font: 11.5px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; fill: #4a5568; }')
add('    .wafer { fill: #edf2f7; stroke: #2d3748; stroke-width: 1.8; }')
add('    .prim { stroke: #c05621; stroke-width: 5; fill: none; stroke-linecap: round; }')
add('    .sec { stroke: #2b6cb0; stroke-width: 5; fill: none; stroke-linecap: round; }')
add('    .cut { fill: #ffffff; stroke: #2d3748; stroke-width: 1.8; }')
add('    .dash { stroke: #718096; stroke-width: 1.3; fill: none; stroke-dasharray: 5 4; }')
add('    .vin { fill: none; stroke: #2d3748; stroke-width: 2.6; stroke-linejoin: round; }')
add('    .box { fill: #ffffff; stroke: #cbd5e0; stroke-width: 1.2; }')
add('  </style>')

# ------------------------------------------------------- flats (150 mm and below)
add(f'  <text class="h" x="30" y="30">Wafers with flats {MDASH} 150 mm and smaller</text>')
add('  <text class="s" x="30" y="50">The primary flat sits at the bottom. When a secondary flat is present, '
    'its angle from the primary encodes orientation and doping type together.</text>')

for (typ, orient, sec_at, desc), cx in zip(configs, CXS):
    flats = [PRIMARY] if sec_at is None else [PRIMARY, (90.0 + sec_at, SEC_HALF)]
    add(f'  <path class="wafer" d="{outline(cx, CY, R, flats)}" />')
    add(f'  <path class="prim" d="{flat_line(cx, CY, R, *PRIMARY)}" />')
    if sec_at is not None:
        add(f'  <path class="sec" d="{flat_line(cx, CY, R, 90.0 + sec_at, SEC_HALF)}" />')
    add(f'  <text class="t" x="{cx}" y="78" text-anchor="middle">{typ} {orient}</text>')
    add(f'  <text class="s" x="{cx}" y="266" text-anchor="middle">{desc}</text>')

add('  <text class="s" x="30" y="300">The primary flat is parallel to a {110} plane, so it fixes the crystal '
    'reference the exposure tools align to.</text>'.replace('{110}', f'{LT}110{GT}'))

add('  <line class="prim" x1="30" y1="322" x2="58" y2="322" />')
add('  <text class="s" x="66" y="326">primary flat</text>')
add('  <line class="sec" x1="176" y1="322" x2="204" y2="322" />')
add(f'  <text class="s" x="212" y="326">secondary flat {MDASH} orientation + doping type</text>')

# ------------------------------------------------------- notch (200 / 300 mm)
add(f'  <text class="h" x="30" y="364">Wafers with a notch {MDASH} 200 mm and 300 mm</text>')

ly = cyc + math.sqrt(rc * rc - NW * NW)
apex_y = ly - ND
add(f'  <circle class="wafer" cx="{fmt(cxc)}" cy="{fmt(cyc)}" r="{fmt(rc)}" />')
add(f'  <path class="cut" d="M {fmt(cxc - NW)},{fmt(ly)} L {fmt(cxc)},{fmt(apex_y)} '
    f'L {fmt(cxc + NW)},{fmt(ly)} L {fmt(cxc + NW)},{fmt(ly + 5)} L {fmt(cxc - NW)},{fmt(ly + 5)} Z" />')
add(f'  <text class="t" x="{fmt(cxc)}" y="596" text-anchor="middle">one notch, at the bottom</text>')
add(f'  <text class="s" x="{fmt(cxc)}" y="614" text-anchor="middle">it marks the {LT}110{GT} axis and nothing else</text>')

# magnified inset of the notch profile
add('  <rect class="box" x="430" y="400" width="200" height="160" rx="6" />')
add('  <text class="s" x="530" y="420" text-anchor="middle">notch, magnified</text>')
add('  <path class="vin" d="M 470,450 L 520,500 L 570,450" />')
add('  <line class="dash" x1="462" y1="450" x2="578" y2="450" />')
add('  <text class="s" x="578" y="442" text-anchor="end">wafer edge</text>')
add('  <line class="dash" x1="520" y1="450" x2="520" y2="500" />')
add('  <text class="m" x="528" y="480">1,00 mm</text>')
add(f'  <text class="m" x="520" y="516" text-anchor="middle">90{DEG}</text>')
add(f'  <text class="s" x="530" y="536" text-anchor="middle">the V is ground to a 90{DEG} included</text>')
add('  <text class="s" x="530" y="552" text-anchor="middle">angle, 1,00 mm deep (SEMI M1)</text>')

# annotation column
ax = 664
add(f'  <text class="t" x="{ax}" y="418">What the notch tells you</text>')
add(f'  <text class="s" x="{ax}" y="442">Its axis is aligned to {LT}110{GT} within {PM}1{DEG}, so the tools know how the</text>')
add(f'  <text class="s" x="{ax}" y="460">lattice sits under the pattern. That is all it encodes.</text>')
add(f'  <text class="t" x="{ax}" y="492">What it does not tell you</text>')
add(f'  <text class="s" x="{ax}" y="516">A notched wafer has no secondary fiducial, so the notch carries no</text>')
add(f'  <text class="s" x="{ax}" y="534">doping type. P or N comes from the certificate, or from the laser mark</text>')
add('  <text class="s" x="664" y="552">on the back: SEMI T7, with an optional A/N field.</text>')

add(f'  <text class="note" x="30" y="644">Not to scale: the notch is drawn far larger than life. At its true size it is '
    f'1,00 mm deep on a 300 mm wafer {MDASH} about 0,3 % of the radius.</text>')
add('</svg>')

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, 'w', encoding='ascii', errors='strict', newline='\n') as fh:
    fh.write('\n'.join(out) + '\n')
print(f'wrote {OUT} ({len(out)} lines)')
