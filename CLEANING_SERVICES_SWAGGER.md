# 📚 CLEANING SERVICES - DOCUMENTATION SWAGGER/API

**Date**: 26 Nov 2025
**Statut**: Documentation API complète

---

## 📋 ENDPOINTS DISPONIBLES

### **Total : 15 endpoints**
- Home Cleaning: 5 endpoints
- Furniture Cleaning: 5 endpoints
- Laundry: 5 endpoints

---

## 🏠 HOME CLEANING

### **1. GET /api/home-cleaning**
Liste tous les services de nettoyage à domicile

**Query Parameters** :
- `category` (string, optional) - Filtrer par catégorie
- `cityId` (string, optional) - Filtrer par ville
- `featured` (boolean, optional) - Services en vedette uniquement

**Response 200** :
```json
[
  {
    "id": "clx...",
    "type": "home",
    "name": "Basic Home Cleaning",
    "slug": "basic-home-cleaning",
    "description": "...",
    "shortDescription": "...",
    "category": "basic",
    "basePrice": 200,
    "currency": "AED",
    "pricePerSqm": 5,
    "minimumCharge": 150,
    "duration": "2-3 hours",
    "includedServices": ["Dusting", "Vacuuming", "Mopping"],
    "excludedServices": ["Deep carpet cleaning"],
    "equipment": ["Vacuum cleaner", "Mop"],
    "products": ["Eco-friendly detergents"],
    "options": [
      {
        "name": "Window Cleaning",
        "price": 50,
        "description": "Clean all windows",
        "required": false
      }
    ],
    "addons": [
      {
        "name": "Oven Cleaning",
        "price": 80,
        "description": "Deep clean oven"
      }
    ],
    "packages": [
      {
        "name": "Basic Package",
        "price": 200,
        "description": "Essential cleaning",
        "services": ["General cleaning"],
        "discount": 0
      }
    ],
    "availableDays": ["Monday", "Tuesday"],
    "availableHours": ["08:00-12:00"],
    "advanceBooking": 1,
    "cityId": "...",
    "countryId": "...",
    "serviceAreas": ["Dubai Marina"],
    "latitude": 25.0772,
    "longitude": 55.1398,
    "image": "...",
    "images": ["...", "..."],
    "video": "...",
    "tags": ["home-cleaning", "professional"],
    "requirements": ["Access to property"],
    "restrictions": ["No pets during cleaning"],
    "cancellationPolicy": "Free cancellation 24h before",
    "refundPolicy": "Full refund if cancelled 24h in advance",
    "termsConditions": "...",
    "phone": "+971...",
    "email": "...",
    "whatsapp": "+971...",
    "metaTitle": "...",
    "metaDescription": "...",
    "keywords": ["home cleaning dubai"],
    "isActive": true,
    "isFeatured": false,
    "isVerified": true,
    "isAvailable": true,
    "views": 0,
    "bookings": 0,
    "rating": 0,
    "reviewCount": 0,
    "createdAt": "2025-11-26T...",
    "updatedAt": "2025-11-26T...",
    "City": {
      "id": "...",
      "name": "Dubai"
    },
    "Country": {
      "id": "...",
      "name": "United Arab Emirates"
    },
    "_count": {
      "CleaningBooking": 0,
      "CleaningReview": 0
    }
  }
]
```

---

### **2. POST /api/home-cleaning**
Créer un nouveau service

**Authentication** : Required (ADMIN/MANAGER)

**Request Body** :
```json
{
  "name": "Basic Home Cleaning",
  "slug": "basic-home-cleaning",
  "description": "Professional home cleaning service",
  "shortDescription": "Quick and efficient cleaning",
  "category": "basic",
  "subCategory": "residential",
  "basePrice": 200,
  "currency": "AED",
  "pricePerSqm": 5,
  "minimumCharge": 150,
  "duration": "2-3 hours",
  "includedServices": ["Dusting", "Vacuuming"],
  "excludedServices": ["Deep carpet cleaning"],
  "equipment": ["Vacuum cleaner"],
  "products": ["Eco-friendly detergents"],
  "options": [],
  "addons": [],
  "packages": [],
  "availableDays": ["Monday", "Tuesday"],
  "availableHours": ["08:00-12:00"],
  "advanceBooking": 1,
  "cityId": "clx...",
  "countryId": "clx...",
  "serviceAreas": ["Dubai Marina"],
  "latitude": 25.0772,
  "longitude": 55.1398,
  "image": "https://...",
  "images": [],
  "video": "",
  "tags": ["home-cleaning"],
  "requirements": ["Access to property"],
  "restrictions": ["No pets"],
  "cancellationPolicy": "Free cancellation 24h before",
  "refundPolicy": "Full refund",
  "termsConditions": "...",
  "phone": "+971...",
  "email": "info@...",
  "whatsapp": "+971...",
  "metaTitle": "Basic Home Cleaning Dubai",
  "metaDescription": "Professional home cleaning...",
  "keywords": ["home cleaning"],
  "isActive": true,
  "isFeatured": false,
  "isVerified": true,
  "isAvailable": true
}
```

**Response 201** :
```json
{
  "id": "clx...",
  "type": "home",
  "name": "Basic Home Cleaning",
  ...
}
```

**Response 400** :
```json
{
  "error": "Missing required fields"
}
// or
{
  "error": "Slug already exists"
}
```

**Response 401** :
```json
{
  "error": "Unauthorized"
}
```

---

### **3. GET /api/home-cleaning/[id]**
Récupérer un service spécifique

**Path Parameters** :
- `id` (string, required) - ID du service

**Response 200** :
```json
{
  "id": "clx...",
  "type": "home",
  "name": "Basic Home Cleaning",
  ...,
  "CleaningBooking": [
    {
      "id": "...",
      "bookingNumber": "HC-2025-001",
      "customerName": "John Doe",
      "serviceDate": "2025-12-01T...",
      "status": "confirmed"
    }
  ],
  "CleaningReview": [
    {
      "id": "...",
      "rating": 5,
      "comment": "Excellent service!",
      "reviewerName": "Jane Doe"
    }
  ],
  "_count": {
    "CleaningBooking": 5,
    "CleaningReview": 3
  }
}
```

**Response 404** :
```json
{
  "error": "Service not found"
}
```

**Side Effect** : Incrémente le compteur de vues

---

### **4. PUT /api/home-cleaning/[id]**
Modifier un service existant

**Authentication** : Required (ADMIN/MANAGER)

**Path Parameters** :
- `id` (string, required) - ID du service

**Request Body** : Identique à POST (tous les champs)

**Response 200** :
```json
{
  "id": "clx...",
  "type": "home",
  "name": "Updated Name",
  ...
}
```

**Response 400** :
```json
{
  "error": "Slug already exists"
}
```

**Response 404** :
```json
{
  "error": "Service not found"
}
```

**Response 401** :
```json
{
  "error": "Unauthorized"
}
```

---

### **5. DELETE /api/home-cleaning/[id]**
Supprimer un service

**Authentication** : Required (ADMIN only)

**Path Parameters** :
- `id` (string, required) - ID du service

**Response 200** :
```json
{
  "message": "Service deleted successfully"
}
```

**Response 400** :
```json
{
  "error": "Cannot delete service with existing bookings. Set to inactive instead."
}
```

**Response 404** :
```json
{
  "error": "Service not found"
}
```

**Response 401** :
```json
{
  "error": "Unauthorized"
}
```

---

## 🛋️ FURNITURE CLEANING

### **Endpoints identiques à Home Cleaning**

Base URL : `/api/furniture-cleaning`

**Différence** : `type: "furniture"`

**Endpoints** :
1. `GET /api/furniture-cleaning`
2. `POST /api/furniture-cleaning`
3. `GET /api/furniture-cleaning/[id]`
4. `PUT /api/furniture-cleaning/[id]`
5. `DELETE /api/furniture-cleaning/[id]`

---

## 👔 LAUNDRY

### **Endpoints identiques à Home Cleaning**

Base URL : `/api/laundry`

**Différence** : `type: "laundry"`

**Endpoints** :
1. `GET /api/laundry`
2. `POST /api/laundry`
3. `GET /api/laundry/[id]`
4. `PUT /api/laundry/[id]`
5. `DELETE /api/laundry/[id]`

---

## 🔐 AUTHENTIFICATION

### **Méthode** : NextAuth.js (session-based)

**Rôles requis** :
- `POST`, `PUT` : ADMIN ou MANAGER
- `DELETE` : ADMIN uniquement
- `GET` : Public (pas d'auth requise)

**Headers** :
```
Cookie: next-auth.session-token=...
```

---

## 📊 CODES DE RÉPONSE

| Code | Description |
|------|-------------|
| 200  | Succès |
| 201  | Créé avec succès |
| 400  | Requête invalide |
| 401  | Non authentifié |
| 403  | Non autorisé |
| 404  | Non trouvé |
| 500  | Erreur serveur |

---

## 🧪 EXEMPLES CURL

### **Lister les services**
```bash
curl http://localhost:3100/api/home-cleaning
```

### **Filtrer par catégorie**
```bash
curl "http://localhost:3100/api/home-cleaning?category=basic"
```

### **Services en vedette**
```bash
curl "http://localhost:3100/api/home-cleaning?featured=true"
```

### **Créer un service (avec auth)**
```bash
curl -X POST http://localhost:3100/api/home-cleaning \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{
    "name": "Test Service",
    "slug": "test-service",
    "description": "Test description",
    "basePrice": 200,
    "cityId": "clx...",
    "countryId": "clx..."
  }'
```

### **Modifier un service**
```bash
curl -X PUT http://localhost:3100/api/home-cleaning/clx... \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{
    "name": "Updated Name",
    ...
  }'
```

### **Supprimer un service**
```bash
curl -X DELETE http://localhost:3100/api/home-cleaning/clx... \
  -H "Cookie: next-auth.session-token=..."
```

---

## 📝 NOTES

### **Champs requis (POST/PUT)**
- `name`
- `slug`
- `basePrice`
- `cityId`
- `countryId`

### **Champs auto-générés**
- `id` (cuid)
- `type` (défini par l'endpoint)
- `createdAt`
- `updatedAt`
- `views` (défaut: 0)
- `bookings` (défaut: 0)
- `rating` (défaut: 0)
- `reviewCount` (défaut: 0)

### **Champs JSON**
- `includedServices`: string[]
- `excludedServices`: string[]
- `equipment`: string[]
- `products`: string[]
- `options`: {name, price, description, required}[]
- `addons`: {name, price, description}[]
- `packages`: {name, price, description, services[], discount}[]
- `tags`: string[]
- `keywords`: string[]
- `availableDays`: string[]
- `availableHours`: string[]
- `serviceAreas`: string[]
- `requirements`: string[]
- `restrictions`: string[]
- `images`: string[]

---

## 🚀 POSTMAN COLLECTION

### **Importer dans Postman**

```json
{
  "info": {
    "name": "Cleaning Services API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Home Cleaning",
      "item": [
        {
          "name": "List Services",
          "request": {
            "method": "GET",
            "url": "{{baseUrl}}/api/home-cleaning"
          }
        },
        {
          "name": "Create Service",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/api/home-cleaning",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Test\",\n  \"slug\": \"test\",\n  \"basePrice\": 200,\n  \"cityId\": \"...\",\n  \"countryId\": \"...\"\n}"
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3100"
    }
  ]
}
```

---

**📚 DOCUMENTATION API COMPLÈTE ! ✨**

**15 endpoints documentés avec exemples et codes de réponse.**
