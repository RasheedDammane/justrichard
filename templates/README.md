# 📦 Templates AllThaiLux

Ce dossier contient les templates/modèles du catalogue immobilier.

## 📄 Fichiers

### 1. `catalog-template.html`
Template de la page catalogue consolidée avec :
- ✅ Carte Google Maps interactive
- ✅ Simulateur de rendement locatif
- ✅ Statistiques (prix moyen, prix/m²)
- ✅ Grille de propriétés avec images
- ✅ Liens WhatsApp directs

### 2. `generate-catalog-template.py`
Script Python pour générer le catalogue à partir des data.json

### 3. `generate-pages-template.py`
Script Python pour générer les pages individuelles de propriétés

## 🚀 Utilisation

Pour régénérer le catalogue :
```bash
cd scripts
python3 generate-catalog-simple.py
```

Cela va créer :
- `public/consolidated-properties.html` - Page catalogue
- `public/properties/[nom].html` - 129 pages individuelles

## 📊 Données Requises

Chaque propriété doit avoir un `data.json` avec :
```json
{
  "title": "Nom de la propriété",
  "price": "2850000",
  "price_per_sqm": "39054",
  "area": "73",
  "bedrooms": 2,
  "bathrooms": 2,
  "floors": 10,
  "location": {
    "area": "Jomtien",
    "city": "Pattaya",
    "latitude": 12.891076,
    "longitude": 100.885001
  },
  "images": ["image_0.webp", "image_1.webp"],
  "features": ["piscine", "gym"],
  "contact": {
    "phone": "+66917255313",
    "email": "contact@guide-immo-thailande.com",
    "whatsapp": "+66917255313"
  }
}
```

## 🎨 Personnalisation

Pour modifier le design :
1. Éditer `catalog-template.html` directement
2. Ou modifier les scripts Python et régénérer

## 🔑 API Google Maps

N'oublie pas de remplacer `YOUR_GOOGLE_API_KEY` par ta vraie clé API dans :
```html
<script src='https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_API_KEY'></script>
```

## 📞 Contact

- **WhatsApp** : +66917255313
- **Email** : contact@guide-immo-thailande.com
