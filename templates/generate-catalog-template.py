#!/usr/bin/env python3
"""Génère page catalogue avec carte et simulateur"""

import json
from pathlib import Path

PROPS_DIR = '../data/allthailux-scraper/output/properties'
PUBLIC = '../public'
IMG = '/properties-images'

def fmt(n):
    return f"{int(n):,}".replace(',', ' ') if n else '0'

# Charger
props = []
for d in Path(PROPS_DIR).iterdir():
    if d.is_dir() and (d / 'data.json').exists():
        with open(d / 'data.json', 'r') as f:
            data = json.load(f)
            data['folder'] = d.name
            props.append(data)

# Stats
total = len(props)
imgs = sum(len(p.get('images', [])) for p in props)
avg_price = sum(int(p.get('price', 0)) for p in props) / total
avg_sqm = sum(int(p.get('price_per_sqm', 0)) for p in props if p.get('price_per_sqm')) / len([p for p in props if p.get('price_per_sqm')])

# Markers
markers = []
for p in props:
    lat = p.get('location', {}).get('latitude')
    lng = p.get('location', {}).get('longitude')
    if lat and lng:
        title = p.get('title', '').replace("'", "\\'")
        price = fmt(p.get('price', 0))
        markers.append(f"{{lat:{lat},lng:{lng},title:'{title}',price:'{price} THB'}}")

markers_js = ',\n'.join(markers)

# Cards
cards = ''
for p in props:
    folder = p['folder']
    title = p.get('title', 'Propriété')
    price = fmt(p.get('price', 0))
    sqm_price = fmt(p.get('price_per_sqm', 0))
    area = p.get('area', 'N/A')
    beds = p.get('bedrooms', 'N/A')
    baths = p.get('bathrooms', 'N/A')
    city = p.get('location', {}).get('city', 'Pattaya')
    zone = p.get('location', {}).get('area', '')
    
    imgs_list = p.get('images', [])
    main_img = f"{IMG}/{folder}/{imgs_list[0]}" if imgs_list else ''
    img_count = len(imgs_list)
    
    wa = p.get('contact', {}).get('whatsapp', '+66917255313').replace('+', '')
    
    cards += f"""<div class='card'>
<div class='cm'><img src='{main_img}' alt='{title}' loading='lazy'/>
<div class='mi'>📸 {img_count}</div>
<div class='pc'>฿ {price}</div></div>
<div class='cb'>
<h3 class='ct'>{title}</h3>
<p class='m'>📍 {zone}, {city}</p>
<div class='pi'><div class='ps'>💰 {sqm_price} THB/m²</div></div>
<div class='si'>🛏️ {beds} • 🚿 {baths} • 📐 {area} m²</div>
<div class='ca'>
<a href='/properties/{folder}.html'>Voir détails</a>
<a href='https://wa.me/{wa}' class='bwa' target='_blank'>WhatsApp</a>
</div>
</div></div>"""

html = f"""<!doctype html>
<html lang='fr'>
<head>
<meta charset='utf-8'/>
<meta name='viewport' content='width=device-width,initial-scale=1'/>
<title>Catalogue - {total} Propriétés Pattaya</title>
<style>
*{{box-sizing:border-box;margin:0;padding:0}}
body{{font:16px/1.5 system-ui;background:#fff;color:#0f172a}}
.container{{max-width:1400px;margin:0 auto;padding:16px}}
.hdr{{background:#f8fafc;border-bottom:1px solid #e2e8f0;padding:20px 0}}
.hdr h1{{margin:0;font-size:28px}}
.stats{{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;padding:30px;border-radius:12px;margin:20px 0;text-align:center}}
.stats h2{{margin:0 0 20px 0;font-size:24px}}
.sg{{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:20px}}
.sc{{background:rgba(255,255,255,0.2);padding:20px;border-radius:10px;backdrop-filter:blur(10px)}}
.sc h3{{margin:0;font-size:32px;font-weight:700}}
.sc p{{margin:8px 0 0 0;opacity:0.9}}
.ms{{background:#fff;border-radius:12px;padding:20px;margin:20px 0;box-shadow:0 2px 10px rgba(0,0,0,.1)}}
.ms h2{{margin:0 0 15px 0}}
#map{{width:100%;height:500px;border-radius:8px}}
.sim{{background:linear-gradient(135deg,#f8fafc 0%,#e2e8f0 100%);border-radius:20px;padding:30px;margin:30px 0;box-shadow:0 10px 30px rgba(0,0,0,0.1)}}
.sh{{text-align:center;margin-bottom:30px}}
.sh h2{{margin:0 0 10px 0;font-size:28px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent}}
.sg2{{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;margin-bottom:25px}}
.ig{{display:flex;flex-direction:column;gap:8px}}
.ig label{{font-weight:600;color:#374151;font-size:14px}}
.iw{{position:relative}}
.iw input{{width:100%;padding:12px 50px 12px 15px;border:2px solid #e5e7eb;border-radius:10px;font-size:16px;background:#fff}}
.iw input:focus{{outline:none;border-color:#667eea;box-shadow:0 0 0 3px rgba(102,126,234,0.1)}}
.is{{position:absolute;right:15px;top:12px;color:#9ca3af;font-weight:500;font-size:14px}}
.sa{{text-align:center;margin:25px 0}}
.bs{{background:linear-gradient(135deg,#10b981 0%,#059669 100%);color:#fff;border:none;padding:15px 40px;border-radius:12px;font-size:16px;font-weight:600;cursor:pointer;box-shadow:0 10px 25px rgba(16,185,129,0.3)}}
.bs:hover{{transform:translateY(-2px);box-shadow:0 15px 35px rgba(16,185,129,0.4)}}
.sr{{display:none;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;margin-top:30px}}
.sr.show{{display:grid}}
.rc{{background:#fff;border-radius:15px;padding:20px;box-shadow:0 5px 15px rgba(0,0,0,0.08)}}
.rc:hover{{transform:translateY(-5px)}}
.ri{{font-size:32px;margin-bottom:10px}}
.rct h4{{margin:0 0 8px 0;font-size:14px;color:#64748b}}
.rv{{font-size:24px;font-weight:700;color:#0ea5e9}}
.rc.g .rv{{color:#10b981}}
.rc.n .rv{{color:#667eea}}
.rc.c .rv{{color:#f59e0b}}
.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;margin:20px 0}}
.card{{border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;background:#fff;transition:transform .2s;box-shadow:0 2px 5px rgba(0,0,0,.05)}}
.card:hover{{transform:translateY(-4px);box-shadow:0 10px 25px rgba(0,0,0,.1)}}
.cm{{aspect-ratio:16/9;position:relative;background:#eee}}
.cm img{{width:100%;height:100%;object-fit:cover}}
.cb{{padding:15px}}
.ct{{margin:0 0 8px 0;font-size:17px;font-weight:600}}
.m{{color:#64748b;margin:0 0 8px 0;font-size:14px}}
.pi{{margin:10px 0}}
.ps{{font-size:14px;color:#64748b}}
.si{{font-size:14px;color:#64748b;margin:10px 0}}
.ca{{display:flex;gap:8px;margin-top:12px}}
.ca a{{color:#fff;background:#0ea5e9;padding:10px 12px;border-radius:6px;text-decoration:none;font-size:14px;flex:1;text-align:center}}
.ca a:hover{{background:#0369a1}}
.bwa{{background:#25D366!important}}
.bwa:hover{{background:#20b858!important}}
.mi{{position:absolute;top:8px;right:8px;background:rgba(0,0,0,0.7);color:#fff;font-size:12px;padding:6px 10px;border-radius:999px}}
.pc{{position:absolute;bottom:8px;left:8px;background:rgba(0,0,0,.7);color:#fff;font-weight:700;padding:8px 12px;border-radius:10px}}
</style>
<script src='https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_API_KEY'></script>
</head>
<body>
<header class='hdr'><div class='container'><h1>🏢 Catalogue Immobilier - Pattaya</h1></div></header>
<div class='container'>
<div class='stats'>
<h2>📊 Statistiques</h2>
<div class='sg'>
<div class='sc'><h3>{total}</h3><p>Biens</p></div>
<div class='sc'><h3>{imgs}</h3><p>Images</p></div>
<div class='sc'><h3>฿{fmt(int(avg_price))}</h3><p>Prix moyen</p></div>
<div class='sc'><h3>฿{fmt(int(avg_sqm))}</h3><p>Prix/m²</p></div>
</div>
</div>

<div class='ms'>
<h2>🗺️ Carte des Biens</h2>
<div id='map'></div>
</div>

<div class='sim'>
<div class='sh'><h2>💰 Simulateur de Rendement</h2><p>Calculez votre rentabilité</p></div>
<div class='sg2'>
<div class='ig'><label>Prix d'achat</label><div class='iw'><input type='number' id='bp' placeholder='2500000'/><span class='is'>THB</span></div></div>
<div class='ig'><label>Loyer mensuel</label><div class='iw'><input type='number' id='mr' placeholder='15000'/><span class='is'>THB</span></div></div>
<div class='ig'><label>Charges mensuelles</label><div class='iw'><input type='number' id='mc' placeholder='2000'/><span class='is'>THB</span></div></div>
<div class='ig'><label>Taux d'occupation</label><div class='iw'><input type='number' id='or' placeholder='80' min='0' max='100'/><span class='is'>%</span></div></div>
</div>
<div class='sa'><button class='bs' onclick='calc()'>🧮 Calculer</button></div>
<div class='sr' id='res'>
<div class='rc g'><div class='ri'>📈</div><div class='rct'><h4>Rendement Brut</h4><div class='rv' id='gy'>-</div></div></div>
<div class='rc n'><div class='ri'>💎</div><div class='rct'><h4>Rendement Net</h4><div class='rv' id='ny'>-</div></div></div>
<div class='rc c'><div class='ri'>💰</div><div class='rct'><h4>Cash-flow Annuel</h4><div class='rv' id='cf'>-</div></div></div>
<div class='rc'><div class='ri'>📅</div><div class='rct'><h4>Revenu Mensuel Net</h4><div class='rv' id='mi'>-</div></div></div>
</div>
</div>

<div class='grid'>{cards}</div>
</div>

<script>
function initMap(){{
const c={{lat:12.93,lng:100.88}};
const m=new google.maps.Map(document.getElementById('map'),{{zoom:13,center:c}});
const iw=new google.maps.InfoWindow();
const markers=[{markers_js}];
markers.forEach(mk=>{{
const mm=new google.maps.Marker({{position:{{lat:mk.lat,lng:mk.lng}},map:m,title:mk.title}});
mm.addListener('click',()=>{{
iw.setContent(`<div style="padding:10px"><h3 style="margin:0 0 5px 0">${{mk.title}}</h3><p style="margin:0;color:#0ea5e9;font-weight:600">${{mk.price}}</p></div>`);
iw.open(m,mm);
}});
}});
}}
window.onload=initMap;

function calc(){{
const bp=parseFloat(document.getElementById('bp').value)||0;
const mr=parseFloat(document.getElementById('mr').value)||0;
const mc=parseFloat(document.getElementById('mc').value)||0;
const or=parseFloat(document.getElementById('or').value)/100||0.8;
if(bp<=0||mr<=0){{alert('Prix et loyer requis');return;}}
const ar=mr*12*or;
const ac=mc*12;
const nai=ar-ac;
const mni=nai/12;
const gy=(ar/bp)*100;
const ny=(nai/bp)*100;
document.getElementById('gy').textContent=gy.toFixed(2)+'%';
document.getElementById('ny').textContent=ny.toFixed(2)+'%';
document.getElementById('cf').textContent=nai.toLocaleString('fr-FR')+' THB';
document.getElementById('mi').textContent=mni.toLocaleString('fr-FR')+' THB';
document.getElementById('res').classList.add('show');
}}
</script>
</body>
</html>"""

with open(f'{PUBLIC}/consolidated-properties.html', 'w') as f:
    f.write(html)

print('✅ consolidated-properties.html créé')
print(f'📊 {total} propriétés')
print(f'🗺️ {len(markers)} markers Google Maps')
