# 📱 AJOUT DES LIENS SOCIAUX AU PROFIL UTILISATEUR

## 🎯 OBJECTIF
Ajouter les champs suivants au profil utilisateur:
- Liens réseaux sociaux (Facebook, Twitter, Instagram, LinkedIn, etc.)
- Nickname/Pseudo
- Site web personnel

## 📋 CHAMPS À AJOUTER

### Dans le modèle User (Prisma):

```prisma
model User {
  // ... champs existants ...
  
  // Informations sociales
  nickname        String?          // Pseudo/Surnom
  website         String?          // Site web personnel
  bio             String?  @db.Text // Biographie courte
  
  // Réseaux sociaux
  facebookUrl     String?
  twitterUrl      String?
  instagramUrl    String?
  linkedinUrl     String?
  githubUrl       String?
  youtubeUrl      String?
  tiktokUrl       String?
  
  // Ou alternative: JSON pour flexibilité
  socialLinks     Json?            // { facebook: "url", twitter: "url", ... }
}
```

## 🔧 IMPLÉMENTATION

### 1. Migration Prisma

```bash
# Ajouter les champs au schema.prisma
# Puis générer la migration
npx prisma migrate dev --name add_user_social_links
```

### 2. API Routes

**GET /api/user/profile**
- Récupérer le profil avec les liens sociaux

**PUT /api/user/profile**
- Mettre à jour les liens sociaux
- Validation des URLs

### 3. Interface Utilisateur

**Page de profil:**
- Afficher les liens sociaux avec icônes
- Formulaire d'édition
- Validation côté client

**Composants:**
- `SocialLinks.tsx` - Affichage des liens
- `SocialLinksEditor.tsx` - Édition des liens
- `SocialIcon.tsx` - Icônes des réseaux sociaux

## 📊 EXEMPLE DE DONNÉES

```json
{
  "id": "user-123",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "nickname": "johndoe",
  "website": "https://johndoe.com",
  "bio": "Développeur passionné par le web",
  "socialLinks": {
    "facebook": "https://facebook.com/johndoe",
    "twitter": "https://twitter.com/johndoe",
    "instagram": "https://instagram.com/johndoe",
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe"
  }
}
```

## ✅ AVANTAGES

1. **Flexibilité**: JSON permet d'ajouter facilement de nouveaux réseaux
2. **Validation**: URLs validées côté serveur
3. **Sécurité**: Sanitization des URLs
4. **UX**: Icônes cliquables sur le profil

## 🚀 PROCHAINES ÉTAPES

1. ✅ Finaliser le système de login (en cours)
2. Ajouter les champs au schema Prisma
3. Créer la migration
4. Implémenter les API routes
5. Créer les composants UI
6. Tests

---

**Voulez-vous que j'implémente cela maintenant ou après avoir résolu le problème de login?**
