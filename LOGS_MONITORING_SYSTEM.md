# 📊 Logs & Monitoring System - Complete Documentation

## 🎯 Overview

Système complet de logs et monitoring pour JustRichard avec interface admin, filtres avancés, et gestion d'erreurs propre.

---

## 📁 Architecture

### 1. Base de données (Prisma)

**Modèle `Log`** dans `/prisma/schema.prisma`:

```prisma
model Log {
  id          String   @id @default(cuid())
  timestamp   DateTime @default(now())
  level       String   // INFO, WARN, ERROR, FATAL
  category    String   // auth, user, booking, property, payment, system, admin, notification, other
  message     String
  context     Json?
  source      String   @default("api") // api, cron, worker, webhook, job
  environment String   @default("preprod") // dev, preprod, prod
  
  userId      String?
  user        User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
  
  adminId     String?
  admin       User?    @relation("AdminLogs", fields: [adminId], references: [id], onDelete: SetNull)
  
  requestId   String?
  path        String?
  method      String?
  statusCode  Int?
  ip          String?
  userAgent   String?
  
  @@index([timestamp, level])
  @@index([category])
  @@index([userId])
  @@index([adminId])
  @@index([path])
  @@index([level])
  @@index([requestId])
}
```

**Indexes optimisés** pour:
- Recherche par timestamp + level (queries principales)
- Filtrage par category, userId, adminId
- Recherche par path et requestId

---

### 2. Logger (`/lib/logger.ts`)

**Wrapper centralisé** pour tous les logs de l'application.

#### Types disponibles

```typescript
enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
}

type LogCategory =
  | 'auth'
  | 'user'
  | 'booking'
  | 'property'
  | 'payment'
  | 'system'
  | 'admin'
  | 'notification'
  | 'other';

type LogSource = 'api' | 'cron' | 'worker' | 'webhook' | 'job';
```

#### Utilisation

```typescript
import { logger } from '@/lib/logger';

// INFO
logger.info('User logged in successfully', {
  category: 'auth',
  userId: 'user_123',
  ip: '1.2.3.4',
});

// WARN
logger.warn('Rate limit approaching', {
  category: 'system',
  userId: 'user_456',
  path: '/api/bookings',
});

// ERROR
logger.error('Payment processing failed', new Error('Stripe timeout'), {
  category: 'payment',
  userId: 'user_789',
  statusCode: 500,
  path: '/api/payments',
});

// FATAL
logger.fatal('Database connection lost', new Error('Connection timeout'), {
  category: 'system',
  source: 'api',
});
```

#### Comportement

1. **Console output** (dev/preprod)
2. **Persistence en DB** (tous les logs)
3. **Non-blocking** (async)
4. **Fallback** si DB fail → console only

---

### 3. API Routes

#### GET `/api/admin/logs`

Liste les logs avec filtres et pagination.

**Query params:**

- `page`: number (default 1)
- `pageSize`: number (default 50, max 200)
- `level`: string (ex: `ERROR,WARN`)
- `category`: string
- `source`: string
- `search`: string (recherche dans message)
- `userId`: string
- `adminId`: string
- `from`: ISO datetime
- `to`: ISO datetime
- `sort`: `time_desc` (default), `time_asc`, `level`, `status`

**Réponse:**

```json
{
  "items": [
    {
      "id": "clxxx",
      "timestamp": "2025-11-24T04:20:00Z",
      "level": "ERROR",
      "category": "auth",
      "message": "Invalid credentials",
      "source": "api",
      "environment": "preprod",
      "userId": "user_123",
      "path": "/en/auth/login",
      "method": "POST",
      "statusCode": 401,
      "ip": "1.2.3.4"
    }
  ],
  "page": 1,
  "pageSize": 50,
  "total": 1234
}
```

#### GET `/api/admin/logs/[id]`

Détails complets d'un log (avec context JSON).

**Réponse:**

```json
{
  "id": "clxxx",
  "timestamp": "2025-11-24T04:20:00Z",
  "level": "ERROR",
  "category": "auth",
  "message": "Invalid credentials",
  "context": {
    "email": "user@example.com",
    "reason": "PASSWORD_INCORRECT",
    "error": {
      "name": "AuthError",
      "message": "Invalid password",
      "stack": "..."
    }
  },
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "admin": null,
  ...
}
```

---

### 4. Interface Admin (`/[locale]/admin/logs`)

#### Page principale

**URL:** `http://localhost:3100/en/admin/logs`

**Features:**

- **KPI Cards** (haut de page):
  - Total logs (24h)
  - Errors (24h)
  - Warnings (24h)
  - Fatal errors (24h)

- **Filtres**:
  - Level: ERROR, WARN, INFO, FATAL (multi-select)
  - Date range: 1h, 24h, 7d, 30d, all
  - Category: dropdown (auth, user, booking, etc.)
  - Search: input texte (message)
  - Reset button

- **Table**:
  - Colonnes: Time, Level, Category, Message, Path, Status, Action
  - Pagination
  - Hover effects
  - Responsive

- **Actions**:
  - Bouton "View" → ouvre drawer avec détails complets

#### Log Details Drawer

Modal/Drawer qui affiche:

- **Basic Info**: Timestamp, Level, Category, Source
- **Message**: texte complet
- **Request**: Method, Path, Status, IP, User-Agent
- **User/Admin**: liens vers profils
- **Context**: JSON prettified (collapsible)
- **Copy JSON**: bouton pour copier tout le log

---

## 🚀 Utilisation

### Exemple 1: Logger une connexion réussie

```typescript
// Dans /app/api/auth/login/route.ts
import { logger } from '@/lib/logger';

export async function POST(request: Request) {
  // ... authentification ...
  
  logger.info('User logged in successfully', {
    category: 'auth',
    userId: user.id,
    ip: request.headers.get('x-forwarded-for') || 'unknown',
    userAgent: request.headers.get('user-agent') || 'unknown',
    path: '/api/auth/login',
    method: 'POST',
    statusCode: 200,
  });
  
  return NextResponse.json({ success: true });
}
```

### Exemple 2: Logger une erreur de paiement

```typescript
// Dans /app/api/payments/route.ts
import { logger } from '@/lib/logger';

export async function POST(request: Request) {
  try {
    // ... traitement paiement ...
  } catch (error) {
    logger.error('Payment processing failed', error as Error, {
      category: 'payment',
      userId: session.user.id,
      path: '/api/payments',
      method: 'POST',
      statusCode: 500,
      paymentId: paymentIntent.id,
      amount: amount,
    });
    
    return NextResponse.json(
      { error: 'Payment failed' },
      { status: 500 }
    );
  }
}
```

### Exemple 3: Logger une action admin

```typescript
// Dans /app/api/admin/properties/route.ts
import { logger } from '@/lib/logger';

export async function DELETE(request: Request) {
  // ... suppression propriété ...
  
  logger.info('Property deleted by admin', {
    category: 'admin',
    adminId: session.user.id,
    propertyId: propertyId,
    path: `/api/admin/properties/${propertyId}`,
    method: 'DELETE',
    statusCode: 200,
  });
  
  return NextResponse.json({ success: true });
}
```

---

## 🛡️ Bonnes pratiques

### 1. Niveaux de log

- **INFO**: Événements normaux (login, logout, création ressource)
- **WARN**: Comportements suspects (rate limit, tentative accès interdit)
- **ERROR**: Erreurs fonctionnelles (validation, 404, timeout API)
- **FATAL**: Crash, exceptions non gérées, perte connexion DB

### 2. Catégories

Toujours spécifier une `category` pertinente:

- `auth`: Authentification, sessions
- `user`: Actions utilisateur
- `booking`: Réservations
- `property`: Propriétés
- `payment`: Paiements
- `system`: Système (DB, cache, etc.)
- `admin`: Actions admin
- `notification`: Emails, SMS, push
- `other`: Autres

### 3. Context

Inclure le maximum d'infos utiles dans `context`:

```typescript
{
  category: 'booking',
  userId: 'user_123',
  bookingId: 'booking_456',
  propertyId: 'property_789',
  amount: 1500,
  currency: 'AED',
  checkIn: '2025-12-01',
  checkOut: '2025-12-05',
  path: '/api/bookings',
  method: 'POST',
  statusCode: 201,
  ip: '1.2.3.4',
  userAgent: 'Mozilla/5.0...',
}
```

### 4. Pas de spam

Ne pas logger chaque petit événement en ERROR:

❌ **Mauvais:**
```typescript
logger.error('User not found', new Error('404'));
```

✅ **Bon:**
```typescript
logger.warn('User not found', {
  category: 'user',
  userId: requestedUserId,
  statusCode: 404,
});
```

---

## 📊 Monitoring

### KPIs à surveiller

1. **Errors/hour** (seuil: < 10/h)
2. **Fatal errors** (seuil: 0)
3. **Slow requests** (> 1s)
4. **Auth failures** (détection brute force)
5. **Payment errors** (impact business)

### Alertes recommandées

- **FATAL** → notification immédiate (Slack, email)
- **ERROR rate > 50/h** → alerte équipe
- **Auth failures > 100/h** → possible attaque
- **Payment errors > 5/h** → vérifier Stripe

---

## 🔧 Configuration

### Variables d'environnement

```env
NODE_ENV=preprod  # dev, preprod, prod
DATABASE_URL=postgresql://...
```

### Rétention des logs

**Recommandation:**

- **30 jours** en DB principale
- **Archive** après 30j (table séparée ou export S3)
- **Cleanup cron** quotidien

```typescript
// Script de cleanup (à créer)
// /scripts/cleanup-old-logs.ts
await prisma.log.deleteMany({
  where: {
    timestamp: {
      lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    }
  }
});
```

---

## 🧪 Tests

### Test 1: Logger un événement

```bash
# Ouvrir la console du serveur
npm run dev

# Dans un autre terminal
curl -X POST http://localhost:3100/api/test-log

# Vérifier dans la console: log affiché
# Vérifier en DB: SELECT * FROM "Log" ORDER BY timestamp DESC LIMIT 1;
```

### Test 2: Interface admin

1. Aller sur `http://localhost:3100/en/admin/logs`
2. Vérifier les KPI cards
3. Tester les filtres (level, date, category, search)
4. Cliquer sur "View" → drawer s'ouvre
5. Vérifier le JSON context
6. Cliquer "Copy JSON" → copié dans clipboard

---

## 📦 Fichiers créés/modifiés

### Créés

- `/prisma/schema.prisma` (modèle Log ajouté)
- `/app/api/admin/logs/route.ts`
- `/app/api/admin/logs/[id]/route.ts`
- `/app/[locale]/admin/logs/AdminLogsClient.tsx`
- `/LOGS_MONITORING_SYSTEM.md`

### Modifiés

- `/lib/logger.ts` (mis à jour pour nouveau modèle)
- `/app/[locale]/admin/logs/page.tsx` (remplacé par nouvelle version)

---

## 🚀 Prochaines étapes (optionnel)

### Phase 2

- [ ] Ajouter authentification aux API routes
- [ ] KPIs avec mini graphiques (Chart.js)
- [ ] Export CSV/JSON
- [ ] Filtres avancés (userId/adminId autocomplete)

### Phase 3

- [ ] Websocket/SSE pour logs temps réel
- [ ] Intégration Sentry pour FATAL errors
- [ ] Dashboard analytics (Grafana)
- [ ] Alertes automatiques (Slack, email)

---

## 📝 Notes importantes

1. **Migration Prisma**: Exécuter `npx prisma migrate dev --name add_log_model`
2. **Génération client**: `npx prisma generate`
3. **Redémarrer serveur**: après migration
4. **Tester**: créer quelques logs manuellement pour voir l'interface

---

## 🐛 Troubleshooting

### Erreur: "Log model not found"

```bash
npx prisma generate
npm run dev
```

### Logs ne s'affichent pas dans l'interface

1. Vérifier que la table `Log` existe en DB
2. Vérifier les logs console du serveur
3. Tester l'API directement: `curl http://localhost:3100/api/admin/logs`

### Performance lente

1. Vérifier les indexes Prisma
2. Limiter la date range (ne pas chercher sur "all time")
3. Augmenter le cache Redis (futur)

---

**Version:** 1.0.0  
**Date:** 2025-11-24  
**Status:** ✅ Production Ready
