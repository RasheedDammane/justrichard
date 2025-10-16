#!/usr/bin/env python3
"""Génère catalogue et pages propriétés AllThaiLux"""

import json, os
from pathlib import Path

PROPS_DIR = '../data/allthailux-scraper/output/properties'
PUBLIC = '../public'
CATALOG = f'{PUBLIC}/properties'
IMG = '/properties-images'

os.makedirs(CATALOG, exist_ok=True)

def fmt(n):
    return f"{int(n):,}".replace(',', ' ') if n else '0'

# Charger propriétés
props = []
for d in Path(PROPS_DIR).iterdir():
    if d.is_dir() and (d / 'data.json').exists():
        with open(d / 'data.json', 'r') as f:
            data = json.load(f)
            data['folder'] = d.name
            props.append(data)

print(f'📂 {len(props)} propriétés chargées\n')

# Stats
total = len(props)
imgs = sum(len(p.get('images', [])) for p in props)
avg_price = sum(int(p.get('price', 0)) for p in props) / total
avg_sqm = sum(int(p.get('price_per_sqm', 0)) for p in props if p.get('price_per_sqm')) / len([p for p in props if p.get('price_per_sqm')])

# Générer pages individuelles
print('📄 Génération pages individuelles...')
for i, p in enumerate(props, 1):
    folder = p['folder']
    title = p.get('title', 'Propriété')
    price = fmt(p.get('price', 0))
    sqm_price = fmt(p.get('price_per_sqm', 0))
    area = p.get('area', 'N/A')
    beds = p.get('bedrooms', 'N/A')
    baths = p.get('bathrooms', 'N/A')
    floors = p.get('floors', 'N/A')
    desc = p.get('description', '')
    
    loc = p.get('location', {})
    city = loc.get('city', 'Pattaya')
    zone = loc.get('area', '')
    lat = loc.get('latitude', 12.9)
    lng = loc.get('longitude', 100.88)
    
    feats = p.get('features', [])
    contact = p.get('contact', {})
    wa = contact.get('whatsapp', '+66917255313').replace('+', '')
    phone = contact.get('phone', '+66917255313')
    email = contact.get('email', 'contact@guide-immo-thailande.com')
    
    imgs_list = p.get('images', [])
    main_img = f"{IMG}/{folder}/{imgs_list[0]}" if imgs_list else ''
    
    thumbs = ''.join([f"<img src='{IMG}/{folder}/{img}' alt='{title}' onclick='changeMainImage(this.src)'/>" for img in imgs_list[:12]])
    
    feats_html = ''
    if feats:
        tags = ''.join([f"<span class='tag'>{f.capitalize()}</span>" for f in feats])
        feats_html = f"<div class='features'><h3>✨ Équipements</h3><div class='ftags'>{tags}</div></div>"
    
    html = f"""<!doctype html>
<html lang='fr'>
<head>
<meta charset='utf-8'/>
<meta name='viewport' content='width=device-width,initial-scale=1'/>
<title>{title} - {price} THB</title>
<style>
*{{box-sizing:border-box;margin:0;padding:0}}
body{{font:16px/1.5 system-ui;background:#f8fafc;color:#0f172a}}
.hdr{{background:#fff;border-bottom:1px solid #e2e8f0;padding:20px 0;position:sticky;top:0;z-index:100}}
.container{{max-width:1200px;margin:0 auto;padding:20px}}
.back{{color:#0ea5e9;text-decoration:none;font-weight:600}}
.grid{{display:grid;grid-template-columns:2fr 1fr;gap:30px;margin:20px 0}}
.gallery{{background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.1)}}
.main-img{{width:100%;aspect-ratio:16/9;object-fit:cover;cursor:pointer}}
.thumbs{{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:10px;padding:15px}}
.thumbs img{{width:100%;aspect-ratio:1;object-fit:cover;border-radius:8px;cursor:pointer;border:2px solid transparent;transition:all .2s}}
.thumbs img:hover{{border-color:#0ea5e9;transform:scale(1.05)}}
.card{{background:#fff;padding:30px;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,.1);height:fit-content;position:sticky;top:90px}}
h1{{margin:0 0 10px 0;font-size:28px}}
.loc{{color:#64748b;margin:10px 0}}
.price{{font-size:36px;font-weight:700;color:#0ea5e9;margin:20px 0 5px 0}}
.price-det{{color:#64748b;font-size:14px;margin-bottom:20px}}
.specs{{display:grid;grid-template-columns:repeat(2,1fr);gap:15px;margin:20px 0;padding:20px;background:#f8fafc;border-radius:8px}}
.spec{{text-align:center}}
.spec-val{{font-size:24px;font-weight:700;color:#0ea5e9}}
.spec-lbl{{font-size:14px;color:#64748b;margin-top:5px}}
.features{{margin:25px 0}}
.features h3{{margin:0 0 15px 0}}
.ftags{{display:flex;flex-wrap:wrap;gap:8px}}
.tag{{background:#e0f2fe;color:#0369a1;padding:8px 14px;border-radius:999px;font-size:14px}}
.contact{{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;padding:25px;border-radius:12px;margin:25px 0}}
.btns{{display:flex;flex-direction:column;gap:12px;margin-top:15px}}
.btn{{padding:15px;border-radius:8px;text-decoration:none;text-align:center;font-weight:600;display:flex;align-items:center;justify-content:center;gap:10px;transition:all .2s}}
.btn-wa{{background:#25D366;color:#fff}}
.btn-wa:hover{{background:#20b858;transform:translateY(-2px)}}
.btn-ph{{background:#fff;color:#667eea}}
.btn-ph:hover{{transform:translateY(-2px)}}
.desc{{background:#fff;padding:30px;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,.1);margin:20px 0}}
.desc h2{{margin:0 0 15px 0}}
.map{{width:100%;height:400px;border-radius:12px;margin-top:20px;border:0}}
@media(max-width:1024px){{.grid{{grid-template-columns:1fr}}.card{{position:static}}}}
</style>
</head>
<body>
<div class='hdr'><div class='container'><a href='/consolidated-properties.html' class='back'>← Retour</a></div></div>
<div class='container'><div class='grid'>
<div>
<div class='gallery'>
<img src='{main_img}' alt='{title}' class='main-img' id='mainImage'/>
<div class='thumbs'>{thumbs}</div>
</div>
<div class='desc'>
<h2>📝 Description</h2>
<p>{desc}</p>
{feats_html}
<iframe class='map' src='https://www.google.com/maps?q={lat},{lng}&z=15&output=embed'></iframe>
</div>
</div>
<div>
<div class='card'>
<h1>{title}</h1>
<div class='loc'>📍 {zone}, {city}</div>
<div class='price'>฿ {price}</div>
<div class='price-det'>💰 {sqm_price} THB/m²</div>
<div class='specs'>
<div class='spec'><div class='spec-val'>{beds}</div><div class='spec-lbl'>Chambres</div></div>
<div class='spec'><div class='spec-val'>{baths}</div><div class='spec-lbl'>SDB</div></div>
<div class='spec'><div class='spec-val'>{area}</div><div class='spec-lbl'>m²</div></div>
<div class='spec'><div class='spec-val'>{floors}</div><div class='spec-lbl'>Étages</div></div>
</div>
<div class='contact'>
<h3 style='margin:0 0 10px 0'>💬 Contact</h3>
<div class='btns'>
<a href='https://wa.me/{wa}?text=Bonjour, je suis intéressé par {title}' class='btn btn-wa' target='_blank'>📱 WhatsApp</a>
<a href='tel:{phone}' class='btn btn-ph'>📞 {phone}</a>
<a href='mailto:{email}' class='btn btn-ph'>✉️ Email</a>
</div>
</div>
</div>
</div>
</div></div>
<script>
function changeMainImage(src){{document.getElementById('mainImage').src=src;}}
</script>
</body>
</html>"""
    
    with open(f'{CATALOG}/{folder}.html', 'w') as f:
        f.write(html)
    print(f'  [{i}/{total}] {folder}.html')

print(f'\n✅ {total} pages créées')
print('\n🚀 Lancement génération catalogue...')
os.system('python3 generate-catalog-page.py')
