# 📚 GLOSSAIRE RÉFÉRENTIEL - PRISMA SCHEMA

**Date de génération** : 20/11/2025 17:05:25
**Base de données** : PostgreSQL (justrichard_preprod)

---

## 📋 Table des Matières

1. [Account](#account)
2. [Activity](#activity)
3. [AdClick](#adclick)
4. [AdImpression](#adimpression)
5. [ApiKey](#apikey)
6. [ApiProvider](#apiprovider)
7. [ApiUsage](#apiusage)
8. [Appointment](#appointment)
9. [AuditLog](#auditlog)
10. [Availability](#availability)
11. [BlogCategory](#blogcategory)
12. [BlogComment](#blogcomment)
13. [BlogPost](#blogpost)
14. [Booking](#booking)
15. [BookingPayment](#bookingpayment)
16. [BookingStatusHistory](#bookingstatushistory)
17. [CacheEntry](#cacheentry)
18. [CacheStats](#cachestats)
19. [CardTemplate](#cardtemplate)
20. [Category](#category)
21. [CategoryTranslation](#categorytranslation)
22. [ChatbotConversation](#chatbotconversation)
23. [ChatbotMessage](#chatbotmessage)
24. [City](#city)
25. [Country](#country)
26. [Currency](#currency)
27. [Event](#event)
28. [EventCategory](#eventcategory)
29. [EventRegistration](#eventregistration)
30. [EventSchedule](#eventschedule)
31. [EventSpeaker](#eventspeaker)
32. [EventTicket](#eventticket)
33. [Favorite](#favorite)
34. [Footer](#footer)
35. [FormSubmission](#formsubmission)
36. [Header](#header)
37. [Language](#language)
38. [Lead](#lead)
39. [LeadActivity](#leadactivity)
40. [Media](#media)
41. [MediaFolder](#mediafolder)
42. [MediaTag](#mediatag)
43. [Menu](#menu)
44. [Notification](#notification)
45. [PageTemplate](#pagetemplate)
46. [Permission](#permission)
47. [Property](#property)
48. [Provider](#provider)
49. [ProviderAd](#providerad)
50. [ProviderAnalytics](#provideranalytics)
51. [ProviderChatbot](#providerchatbot)
52. [ProviderForm](#providerform)
53. [ProviderLocation](#providerlocation)
54. [ProviderMedia](#providermedia)
55. [ProviderMember](#providermember)
56. [ProviderNotification](#providernotification)
57. [ProviderReview](#providerreview)
58. [ProviderService](#providerservice)
59. [Region](#region)
60. [Review](#review)
61. [Role](#role)
62. [RolePermission](#rolepermission)
63. [Service](#service)
64. [ServiceTag](#servicetag)
65. [ServiceTranslation](#servicetranslation)
66. [Session](#session)
67. [TimeSlot](#timeslot)
68. [Transfer](#transfer)
69. [TransferBooking](#transferbooking)
70. [TransferReview](#transferreview)
71. [Translation](#translation)
72. [TranslationMissing](#translationmissing)
73. [User](#user)
74. [UserPermission](#userpermission)
75. [UserRole](#userrole)
76. [VerificationToken](#verificationtoken)
77. [Yacht](#yacht)
78. [PageContent](#pagecontent)
79. [NavbarLink](#navbarlink)
80. [FooterContent](#footercontent)

---

## 📊 Statistiques

- **Total modèles** : 80
- **Total champs** : 967
- **Total relations** : 967

---

## 🎯 Conventions de Nommage

### Modèles (Tables)
- **Format** : PascalCase
- **Exemples** : `User`, `BlogPost`, `NavbarLink`

### Champs
- **Format** : camelCase
- **Exemples** : `userId`, `createdAt`, `isActive`

### Relations
- **Format** : PascalCase (même que le modèle cible)
- **Exemples** : `User`, `Category`, `BlogPost`

### Enums
- **Format** : PascalCase
- **Valeurs** : SCREAMING_SNAKE_CASE
- **Exemples** : `UserRole.ADMIN`, `BookingStatus.CONFIRMED`

---

## 📦 Modèles Détaillés

### Account

**Table PostgreSQL** : `"Account"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `Int`
- `String`
- `String`
- `String`
- `String`
- `User`

#### Index

- `userId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const account = await prisma.account.findMany();

// TypeScript Type
import { Account } from '@prisma/client';
```

---

### Activity

**Table PostgreSQL** : `"Activity"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `Int`
- `Int`
- `String`
- `Float`
- `Float`
- `String`
- `String`
- `String`
- `String`
- `Float`
- `Float`
- `Json`
- `Json`
- `Json`
- `Json`
- `Json`
- `Json`
- `String`
- `String`
- `String`
- `Int`
- `Int`
- `Float`
- `Boolean`
- `Boolean`
- `Boolean`
- `DateTime`
- `DateTime`
- `City`
- `Country`

#### Index

- `category`
- `cityId`
- `countryId`
- `isActive`
- `isFeatured`
- `slug`

#### Utilisation dans le Code

```typescript
// Prisma Client
const activity = await prisma.activity.findMany();

// TypeScript Type
import { Activity } from '@prisma/client';
```

---

### AdClick

**Table PostgreSQL** : `"AdClick"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `DateTime`
- `ProviderAd`

#### Index

- `adId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const adClick = await prisma.adClick.findMany();

// TypeScript Type
import { AdClick } from '@prisma/client';
```

---

### AdImpression

**Table PostgreSQL** : `"AdImpression"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `DateTime`
- `ProviderAd`

#### Index

- `adId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const adImpression = await prisma.adImpression.findMany();

// TypeScript Type
import { AdImpression } from '@prisma/client';
```

---

### ApiKey

**Table PostgreSQL** : `"ApiKey"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `Boolean`
- `DateTime`
- `DateTime`
- `ApiProvider`
- `ApiUsage`

#### Index

- `providerId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const apiKey = await prisma.apiKey.findMany();

// TypeScript Type
import { ApiKey } from '@prisma/client';
```

---

### ApiProvider

**Table PostgreSQL** : `"ApiProvider"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `Boolean`
- `DateTime`
- `ApiKey`

#### Index

- `category`
- `name`

#### Utilisation dans le Code

```typescript
// Prisma Client
const apiProvider = await prisma.apiProvider.findMany();

// TypeScript Type
import { ApiProvider } from '@prisma/client';
```

---

### ApiUsage

**Table PostgreSQL** : `"ApiUsage"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `DateTime`
- `Int`
- `Int`
- `Int`
- `Int`
- `Float`
- `DateTime`
- `ApiKey`

#### Index

- `apiKeyId`
- `date`

#### Utilisation dans le Code

```typescript
// Prisma Client
const apiUsage = await prisma.apiUsage.findMany();

// TypeScript Type
import { ApiUsage } from '@prisma/client';
```

---

### Appointment

**Table PostgreSQL** : `"Appointment"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `DateTime`
- `String`
- `String`
- `String`
- `String`
- `DateTime`
- `DateTime`
- `User`

#### Index

- `date`
- `status`
- `userId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const appointment = await prisma.appointment.findMany();

// TypeScript Type
import { Appointment } from '@prisma/client';
```

---

### AuditLog

**Table PostgreSQL** : `"AuditLog"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `Json`
- `Json`
- `String`
- `String`
- `DateTime`

#### Index

- `action`
- `createdAt`
- `userId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const auditLog = await prisma.auditLog.findMany();

// TypeScript Type
import { AuditLog } from '@prisma/client';
```

---

### Availability

**Table PostgreSQL** : `"Availability"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `Int`
- `String`
- `String`
- `Boolean`
- `DateTime`

#### Index

- `dayOfWeek`
- `providerId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const availability = await prisma.availability.findMany();

// TypeScript Type
import { Availability } from '@prisma/client';
```

---

### BlogCategory

**Table PostgreSQL** : `"BlogCategory"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `Boolean`
- `DateTime`
- `BlogPost`

#### Index

- `slug`

#### Utilisation dans le Code

```typescript
// Prisma Client
const blogCategory = await prisma.blogCategory.findMany();

// TypeScript Type
import { BlogCategory } from '@prisma/client';
```

---

### BlogComment

**Table PostgreSQL** : `"BlogComment"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `DateTime`
- `BlogPost`

#### Index

- `postId`
- `status`

#### Utilisation dans le Code

```typescript
// Prisma Client
const blogComment = await prisma.blogComment.findMany();

// TypeScript Type
import { BlogComment } from '@prisma/client';
```

---

### BlogPost

**Table PostgreSQL** : `"BlogPost"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `Int`
- `DateTime`
- `DateTime`
- `DateTime`
- `BlogComment`
- `BlogCategory`

#### Index

- `categoryId`
- `slug`
- `status`

#### Utilisation dans le Code

```typescript
// Prisma Client
const blogPost = await prisma.blogPost.findMany();

// TypeScript Type
import { BlogPost } from '@prisma/client';
```

---

### Booking

**Table PostgreSQL** : `"Booking"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `DateTime`
- `DateTime`
- `Float`
- `String`
- `String`
- `String`
- `DateTime`
- `DateTime`
- `User`
- `BookingPayment`
- `BookingStatusHistory`

#### Index

- `startDate`
- `status`
- `userId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const booking = await prisma.booking.findMany();

// TypeScript Type
import { Booking } from '@prisma/client';
```

---

### BookingPayment

**Table PostgreSQL** : `"BookingPayment"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `Float`
- `String`
- `String`
- `String`
- `String`
- `DateTime`
- `Booking`

#### Index

- `bookingId`
- `status`

#### Utilisation dans le Code

```typescript
// Prisma Client
const bookingPayment = await prisma.bookingPayment.findMany();

// TypeScript Type
import { BookingPayment } from '@prisma/client';
```

---

### BookingStatusHistory

**Table PostgreSQL** : `"BookingStatusHistory"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `DateTime`
- `Booking`

#### Index

- `bookingId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const bookingStatusHistory = await prisma.bookingStatusHistory.findMany();

// TypeScript Type
import { BookingStatusHistory } from '@prisma/client';
```

---

### CacheEntry

**Table PostgreSQL** : `"CacheEntry"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `Int`
- `DateTime`
- `DateTime`

#### Index

- `expiresAt`
- `key`

#### Utilisation dans le Code

```typescript
// Prisma Client
const cacheEntry = await prisma.cacheEntry.findMany();

// TypeScript Type
import { CacheEntry } from '@prisma/client';
```

---

### CacheStats

**Table PostgreSQL** : `"CacheStats"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `DateTime`
- `Int`
- `Int`
- `Int`
- `Int`
- `DateTime`

#### Index

- `date`

#### Utilisation dans le Code

```typescript
// Prisma Client
const cacheStats = await prisma.cacheStats.findMany();

// TypeScript Type
import { CacheStats } from '@prisma/client';
```

---

### CardTemplate

**Table PostgreSQL** : `"CardTemplate"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `Json`
- `Boolean`
- `DateTime`

#### Index

- `slug`

#### Utilisation dans le Code

```typescript
// Prisma Client
const cardTemplate = await prisma.cardTemplate.findMany();

// TypeScript Type
import { CardTemplate } from '@prisma/client';
```

---

### Category

**Table PostgreSQL** : `"Category"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `Int`
- `Boolean`
- `DateTime`
- `DateTime`
- `Category`
- `Category`
- `CategoryTranslation`
- `Service`

#### Index

- `isActive`
- `order`
- `parentId`
- `slug`

#### Utilisation dans le Code

```typescript
// Prisma Client
const category = await prisma.category.findMany();

// TypeScript Type
import { Category } from '@prisma/client';
```

---

### CategoryTranslation

**Table PostgreSQL** : `"CategoryTranslation"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `Category`

#### Index

- `categoryId`
- `locale`

#### Utilisation dans le Code

```typescript
// Prisma Client
const categoryTranslation = await prisma.categoryTranslation.findMany();

// TypeScript Type
import { CategoryTranslation } from '@prisma/client';
```

---

### ChatbotConversation

**Table PostgreSQL** : `"ChatbotConversation"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `DateTime`
- `DateTime`
- `ProviderChatbot`
- `ChatbotMessage`

#### Index

- `chatbotId`
- `sessionId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const chatbotConversation = await prisma.chatbotConversation.findMany();

// TypeScript Type
import { ChatbotConversation } from '@prisma/client';
```

---

### ChatbotMessage

**Table PostgreSQL** : `"ChatbotMessage"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `DateTime`
- `ChatbotConversation`

#### Index

- `conversationId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const chatbotMessage = await prisma.chatbotMessage.findMany();

// TypeScript Type
import { ChatbotMessage } from '@prisma/client';
```

---

### City

**Table PostgreSQL** : `"City"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `Float`
- `Float`
- `Boolean`
- `DateTime`
- `DateTime`
- `Activity`
- `Country`
- `Region`
- `Event`
- `Property`
- `Provider`
- `ProviderLocation`
- `Transfer`
- `Yacht`

#### Index

- `countryId`
- `regionId`
- `slug`

#### Utilisation dans le Code

```typescript
// Prisma Client
const city = await prisma.city.findMany();

// TypeScript Type
import { City } from '@prisma/client';
```

---

### Country

**Table PostgreSQL** : `"Country"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `Boolean`
- `DateTime`
- `DateTime`
- `Activity`
- `City`
- `Event`
- `Property`
- `Provider`
- `Region`
- `Transfer`
- `Yacht`

#### Index

- `code`
- `isActive`

#### Utilisation dans le Code

```typescript
// Prisma Client
const country = await prisma.country.findMany();

// TypeScript Type
import { Country } from '@prisma/client';
```

---

### Currency

**Table PostgreSQL** : `"Currency"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `Float`
- `Boolean`
- `DateTime`

#### Index

- `code`
- `isActive`

#### Utilisation dans le Code

```typescript
// Prisma Client
const currency = await prisma.currency.findMany();

// TypeScript Type
import { Currency } from '@prisma/client';
```

---

### Event

**Table PostgreSQL** : `"Event"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `DateTime`
- `DateTime`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `Int`
- `Boolean`
- `String`
- `Boolean`
- `Boolean`
- `Int`
- `Int`
- `DateTime`
- `DateTime`
- `EventCategory`
- `City`
- `Country`
- `Region`
- `EventRegistration`
- `EventSchedule`
- `EventSpeaker`
- `EventTicket`

#### Index

- `categoryId`
- `slug`
- `startDate`
- `status`

#### Utilisation dans le Code

```typescript
// Prisma Client
const event = await prisma.event.findMany();

// TypeScript Type
import { Event } from '@prisma/client';
```

---

### EventCategory

**Table PostgreSQL** : `"EventCategory"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `Int`
- `Boolean`
- `DateTime`
- `DateTime`
- `Event`

#### Index

- `isActive`
- `slug`

#### Utilisation dans le Code

```typescript
// Prisma Client
const eventCategory = await prisma.eventCategory.findMany();

// TypeScript Type
import { EventCategory } from '@prisma/client';
```

---

### EventRegistration

**Table PostgreSQL** : `"EventRegistration"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `Int`
- `Float`
- `String`
- `String`
- `DateTime`
- `DateTime`
- `Event`
- `EventTicket`
- `User`

#### Index

- `email`
- `eventId`
- `registrationNumber`

#### Utilisation dans le Code

```typescript
// Prisma Client
const eventRegistration = await prisma.eventRegistration.findMany();

// TypeScript Type
import { EventRegistration } from '@prisma/client';
```

---

### EventSchedule

**Table PostgreSQL** : `"EventSchedule"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `DateTime`
- `DateTime`
- `String`
- `Int`
- `DateTime`
- `Event`

#### Index

- `eventId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const eventSchedule = await prisma.eventSchedule.findMany();

// TypeScript Type
import { EventSchedule } from '@prisma/client';
```

---

### EventSpeaker

**Table PostgreSQL** : `"EventSpeaker"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `Int`
- `DateTime`
- `Event`

#### Index

- `eventId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const eventSpeaker = await prisma.eventSpeaker.findMany();

// TypeScript Type
import { EventSpeaker } from '@prisma/client';
```

---

### EventTicket

**Table PostgreSQL** : `"EventTicket"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `Float`
- `String`
- `Int`
- `Int`
- `Boolean`
- `DateTime`
- `EventRegistration`
- `Event`

#### Index

- `eventId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const eventTicket = await prisma.eventTicket.findMany();

// TypeScript Type
import { EventTicket } from '@prisma/client';
```

---

### Favorite

**Table PostgreSQL** : `"Favorite"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `DateTime`
- `User`

#### Index

- `userId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const favorite = await prisma.favorite.findMany();

// TypeScript Type
import { Favorite } from '@prisma/client';
```

---

### Footer

**Table PostgreSQL** : `"Footer"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `Json`
- `Boolean`
- `DateTime`
- `DateTime`

#### Index

- `isActive`

#### Utilisation dans le Code

```typescript
// Prisma Client
const footer = await prisma.footer.findMany();

// TypeScript Type
import { Footer } from '@prisma/client';
```

---

### FormSubmission

**Table PostgreSQL** : `"FormSubmission"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `Json`
- `String`
- `String`
- `DateTime`
- `ProviderForm`

#### Index

- `formId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const formSubmission = await prisma.formSubmission.findMany();

// TypeScript Type
import { FormSubmission } from '@prisma/client';
```

---

### Header

**Table PostgreSQL** : `"Header"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `Json`
- `Boolean`
- `DateTime`
- `DateTime`

#### Index

- `isActive`

#### Utilisation dans le Code

```typescript
// Prisma Client
const header = await prisma.header.findMany();

// TypeScript Type
import { Header } from '@prisma/client';
```

---

### Language

**Table PostgreSQL** : `"Language"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `Boolean`
- `Boolean`
- `Int`
- `DateTime`
- `Translation`

#### Index

- `code`
- `isActive`

#### Utilisation dans le Code

```typescript
// Prisma Client
const language = await prisma.language.findMany();

// TypeScript Type
import { Language } from '@prisma/client';
```

---

### Lead

**Table PostgreSQL** : `"Lead"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `DateTime`
- `DateTime`
- `Provider`
- `LeadActivity`

#### Index

- `email`
- `providerId`
- `status`

#### Utilisation dans le Code

```typescript
// Prisma Client
const lead = await prisma.lead.findMany();

// TypeScript Type
import { Lead } from '@prisma/client';
```

---

### LeadActivity

**Table PostgreSQL** : `"LeadActivity"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `DateTime`
- `Lead`

#### Index

- `leadId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const leadActivity = await prisma.leadActivity.findMany();

// TypeScript Type
import { LeadActivity } from '@prisma/client';
```

---

### Media

**Table PostgreSQL** : `"Media"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `Int`
- `Int`
- `Int`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `DateTime`
- `MediaFolder`
- `MediaTag`

#### Index

- `folderId`
- `mimeType`

#### Utilisation dans le Code

```typescript
// Prisma Client
const media = await prisma.media.findMany();

// TypeScript Type
import { Media } from '@prisma/client';
```

---

### MediaFolder

**Table PostgreSQL** : `"MediaFolder"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `DateTime`
- `Media`
- `MediaFolder`
- `MediaFolder`

#### Index

- `parentId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const mediaFolder = await prisma.mediaFolder.findMany();

// TypeScript Type
import { MediaFolder } from '@prisma/client';
```

---

### MediaTag

**Table PostgreSQL** : `"MediaTag"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `Media`

#### Index

- `mediaId`
- `tag`

#### Utilisation dans le Code

```typescript
// Prisma Client
const mediaTag = await prisma.mediaTag.findMany();

// TypeScript Type
import { MediaTag } from '@prisma/client';
```

---

### Menu

**Table PostgreSQL** : `"Menu"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `Json`
- `Boolean`
- `DateTime`
- `DateTime`

#### Index

- `isActive`
- `location`

#### Utilisation dans le Code

```typescript
// Prisma Client
const menu = await prisma.menu.findMany();

// TypeScript Type
import { Menu } from '@prisma/client';
```

---

### Notification

**Table PostgreSQL** : `"Notification"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `Boolean`
- `DateTime`
- `User`

#### Index

- `isRead`
- `userId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const notification = await prisma.notification.findMany();

// TypeScript Type
import { Notification } from '@prisma/client';
```

---

### PageTemplate

**Table PostgreSQL** : `"PageTemplate"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `Json`
- `Boolean`
- `DateTime`

#### Index

- `slug`

#### Utilisation dans le Code

```typescript
// Prisma Client
const pageTemplate = await prisma.pageTemplate.findMany();

// TypeScript Type
import { PageTemplate } from '@prisma/client';
```

---

### Permission

**Table PostgreSQL** : `"Permission"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `DateTime`
- `RolePermission`
- `UserPermission`

#### Index

- `resource`

#### Utilisation dans le Code

```typescript
// Prisma Client
const permission = await prisma.permission.findMany();

// TypeScript Type
import { Permission } from '@prisma/client';
```

---

### Property

**Table PostgreSQL** : `"Property"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `Int`
- `Int`
- `Float`
- `Int`
- `Boolean`
- `Float`
- `Float`
- `Float`
- `String`
- `String`
- `String`
- `String`
- `Float`
- `Float`
- `Json`
- `Json`
- `Json`
- `String`
- `String`
- `String`
- `String`
- `Int`
- `Int`
- `Float`
- `Boolean`
- `Boolean`
- `Boolean`
- `DateTime`
- `DateTime`
- `City`
- `Country`

#### Index

- `cityId`
- `countryId`
- `isActive`
- `isFeatured`
- `slug`
- `type`

#### Utilisation dans le Code

```typescript
// Prisma Client
const property = await prisma.property.findMany();

// TypeScript Type
import { Property } from '@prisma/client';
```

---

### Provider

**Table PostgreSQL** : `"Provider"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `Float`
- `Int`
- `Boolean`
- `Boolean`
- `Boolean`
- `DateTime`
- `DateTime`
- `Lead`
- `City`
- `Country`
- `ProviderAd`
- `ProviderAnalytics`
- `ProviderChatbot`
- `ProviderForm`
- `ProviderLocation`
- `ProviderMedia`
- `ProviderMember`
- `ProviderNotification`
- `ProviderReview`
- `ProviderService`

#### Index

- `cityId`
- `countryId`
- `isActive`
- `isFeatured`
- `slug`

#### Utilisation dans le Code

```typescript
// Prisma Client
const provider = await prisma.provider.findMany();

// TypeScript Type
import { Provider } from '@prisma/client';
```

---

### ProviderAd

**Table PostgreSQL** : `"ProviderAd"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `Float`
- `Float`
- `Int`
- `Int`
- `DateTime`
- `DateTime`
- `Boolean`
- `DateTime`
- `DateTime`
- `AdClick`
- `AdImpression`
- `Provider`

#### Index

- `isActive`
- `providerId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const providerAd = await prisma.providerAd.findMany();

// TypeScript Type
import { ProviderAd } from '@prisma/client';
```

---

### ProviderAnalytics

**Table PostgreSQL** : `"ProviderAnalytics"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `DateTime`
- `Int`
- `Int`
- `Int`
- `Float`
- `DateTime`
- `Provider`

#### Index

- `date`
- `providerId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const providerAnalytics = await prisma.providerAnalytics.findMany();

// TypeScript Type
import { ProviderAnalytics } from '@prisma/client';
```

---

### ProviderChatbot

**Table PostgreSQL** : `"ProviderChatbot"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `Float`
- `Int`
- `Boolean`
- `DateTime`
- `DateTime`
- `ChatbotConversation`
- `Provider`

#### Index

- `providerId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const providerChatbot = await prisma.providerChatbot.findMany();

// TypeScript Type
import { ProviderChatbot } from '@prisma/client';
```

---

### ProviderForm

**Table PostgreSQL** : `"ProviderForm"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `Json`
- `Boolean`
- `DateTime`
- `DateTime`
- `FormSubmission`
- `Provider`

#### Index

- `providerId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const providerForm = await prisma.providerForm.findMany();

// TypeScript Type
import { ProviderForm } from '@prisma/client';
```

---

### ProviderLocation

**Table PostgreSQL** : `"ProviderLocation"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `Float`
- `Float`
- `Boolean`
- `Boolean`
- `DateTime`
- `DateTime`
- `City`
- `Provider`

#### Index

- `cityId`
- `providerId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const providerLocation = await prisma.providerLocation.findMany();

// TypeScript Type
import { ProviderLocation } from '@prisma/client';
```

---

### ProviderMedia

**Table PostgreSQL** : `"ProviderMedia"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `Int`
- `DateTime`
- `Provider`

#### Index

- `providerId`
- `type`

#### Utilisation dans le Code

```typescript
// Prisma Client
const providerMedia = await prisma.providerMedia.findMany();

// TypeScript Type
import { ProviderMedia } from '@prisma/client';
```

---

### ProviderMember

**Table PostgreSQL** : `"ProviderMember"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `DateTime`
- `Provider`

#### Index

- `providerId`
- `userId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const providerMember = await prisma.providerMember.findMany();

// TypeScript Type
import { ProviderMember } from '@prisma/client';
```

---

### ProviderNotification

**Table PostgreSQL** : `"ProviderNotification"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `Boolean`
- `DateTime`
- `Provider`

#### Index

- `isRead`
- `providerId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const providerNotification = await prisma.providerNotification.findMany();

// TypeScript Type
import { ProviderNotification } from '@prisma/client';
```

---

### ProviderReview

**Table PostgreSQL** : `"ProviderReview"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `Int`
- `String`
- `Boolean`
- `Boolean`
- `DateTime`
- `DateTime`
- `Provider`

#### Index

- `isPublished`
- `providerId`
- `rating`

#### Utilisation dans le Code

```typescript
// Prisma Client
const providerReview = await prisma.providerReview.findMany();

// TypeScript Type
import { ProviderReview } from '@prisma/client';
```

---

### ProviderService

**Table PostgreSQL** : `"ProviderService"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `Float`
- `String`
- `Int`
- `Boolean`
- `DateTime`
- `DateTime`
- `Provider`
- `Service`

#### Index

- `providerId`
- `serviceId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const providerService = await prisma.providerService.findMany();

// TypeScript Type
import { ProviderService } from '@prisma/client';
```

---

### Region

**Table PostgreSQL** : `"Region"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `Boolean`
- `DateTime`
- `DateTime`
- `City`
- `Event`
- `Country`

#### Index

- `countryId`
- `slug`

#### Utilisation dans le Code

```typescript
// Prisma Client
const region = await prisma.region.findMany();

// TypeScript Type
import { Region } from '@prisma/client';
```

---

### Review

**Table PostgreSQL** : `"Review"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `Int`
- `String`
- `Boolean`
- `DateTime`
- `User`

#### Index

- `entityType, entityId`
- `userId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const review = await prisma.review.findMany();

// TypeScript Type
import { Review } from '@prisma/client';
```

---

### Role

**Table PostgreSQL** : `"Role"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `Int`
- `Boolean`
- `DateTime`
- `DateTime`
- `RolePermission`
- `UserRole`

#### Index

- `level`
- `name`

#### Utilisation dans le Code

```typescript
// Prisma Client
const role = await prisma.role.findMany();

// TypeScript Type
import { Role } from '@prisma/client';
```

---

### RolePermission

**Table PostgreSQL** : `"RolePermission"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `Permission`
- `Role`

#### Index

- `permissionId`
- `roleId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const rolePermission = await prisma.rolePermission.findMany();

// TypeScript Type
import { RolePermission } from '@prisma/client';
```

---

### Service

**Table PostgreSQL** : `"Service"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `Float`
- `String`
- `Int`
- `Boolean`
- `DateTime`
- `DateTime`
- `ProviderService`
- `Category`
- `ServiceTag`
- `ServiceTranslation`

#### Index

- `categoryId`
- `isActive`
- `slug`

#### Utilisation dans le Code

```typescript
// Prisma Client
const service = await prisma.service.findMany();

// TypeScript Type
import { Service } from '@prisma/client';
```

---

### ServiceTag

**Table PostgreSQL** : `"ServiceTag"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `DateTime`
- `Service`

#### Index

- `serviceId`
- `tag`

#### Utilisation dans le Code

```typescript
// Prisma Client
const serviceTag = await prisma.serviceTag.findMany();

// TypeScript Type
import { ServiceTag } from '@prisma/client';
```

---

### ServiceTranslation

**Table PostgreSQL** : `"ServiceTranslation"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `Service`

#### Index

- `locale`
- `serviceId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const serviceTranslation = await prisma.serviceTranslation.findMany();

// TypeScript Type
import { ServiceTranslation } from '@prisma/client';
```

---

### Session

**Table PostgreSQL** : `"Session"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `DateTime`
- `User`

#### Index

- `userId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const session = await prisma.session.findMany();

// TypeScript Type
import { Session } from '@prisma/client';
```

---

### TimeSlot

**Table PostgreSQL** : `"TimeSlot"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `DateTime`
- `String`
- `String`
- `Boolean`
- `DateTime`

#### Index

- `date`
- `isBooked`
- `providerId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const timeSlot = await prisma.timeSlot.findMany();

// TypeScript Type
import { TimeSlot } from '@prisma/client';
```

---

### Transfer

**Table PostgreSQL** : `"Transfer"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `TransferType`
- `VehicleType`
- `String`
- `String`
- `String`
- `String`
- `Float`
- `Float`
- `Float`
- `Float`
- `Int`
- `Int`
- `Float`
- `Float`
- `String`
- `Int`
- `Float`
- `Json`
- `Json`
- `Json`
- `Json`
- `Json`
- `String`
- `String`
- `String`
- `String`
- `String`
- `Int`
- `String`
- `String`
- `String`
- `String`
- `Json`
- `Int`
- `Int`
- `Int`
- `String`
- `Boolean`
- `Boolean`
- `Boolean`
- `Boolean`
- `Json`
- `Json`
- `Json`
- `String`
- `String`
- `String`
- `Int`
- `Int`
- `Float`
- `Int`
- `Boolean`
- `Boolean`
- `Boolean`
- `DateTime`
- `DateTime`
- `City`
- `Country`
- `TransferBooking`
- `TransferReview`

#### Index

- `cityId`
- `countryId`
- `fromLocation`
- `isActive`
- `isFeatured`
- `slug`
- `toLocation`
- `transferType`
- `vehicleType`

#### Utilisation dans le Code

```typescript
// Prisma Client
const transfer = await prisma.transfer.findMany();

// TypeScript Type
import { Transfer } from '@prisma/client';
```

---

### TransferBooking

**Table PostgreSQL** : `"TransferBooking"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `DateTime`
- `String`
- `String`
- `String`
- `Int`
- `Int`
- `Boolean`
- `Boolean`
- `Float`
- `Float`
- `Float`
- `Float`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `Boolean`
- `String`
- `String`
- `String`
- `DateTime`
- `DateTime`
- `Transfer`

#### Index

- `pickupDate`
- `status`
- `transferId`
- `userId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const transferBooking = await prisma.transferBooking.findMany();

// TypeScript Type
import { TransferBooking } from '@prisma/client';
```

---

### TransferReview

**Table PostgreSQL** : `"TransferReview"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `Int`
- `String`
- `Int`
- `Int`
- `Int`
- `Boolean`
- `Boolean`
- `DateTime`
- `DateTime`
- `Transfer`

#### Index

- `isApproved`
- `transferId`
- `userId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const transferReview = await prisma.transferReview.findMany();

// TypeScript Type
import { TransferReview } from '@prisma/client';
```

---

### Translation

**Table PostgreSQL** : `"Translation"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `DateTime`
- `DateTime`
- `Language`

#### Index

- `languageId`
- `namespace`

#### Utilisation dans le Code

```typescript
// Prisma Client
const translation = await prisma.translation.findMany();

// TypeScript Type
import { Translation } from '@prisma/client';
```

---

### TranslationMissing

**Table PostgreSQL** : `"TranslationMissing"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `Int`
- `DateTime`

#### Index

- `locale`

#### Utilisation dans le Code

```typescript
// Prisma Client
const translationMissing = await prisma.translationMissing.findMany();

// TypeScript Type
import { TranslationMissing } from '@prisma/client';
```

---

### User

**Table PostgreSQL** : `"User"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `DateTime`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `Boolean`
- `DateTime`
- `DateTime`
- `Account`
- `Appointment`
- `Booking`
- `EventRegistration`
- `Favorite`
- `Notification`
- `Review`
- `Session`
- `UserPermission`
- `UserRole`

#### Index

- `email`
- `isActive`

#### Utilisation dans le Code

```typescript
// Prisma Client
const user = await prisma.user.findMany();

// TypeScript Type
import { User } from '@prisma/client';
```

---

### UserPermission

**Table PostgreSQL** : `"UserPermission"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `DateTime`
- `Permission`
- `User`

#### Index

- `permissionId`
- `userId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const userPermission = await prisma.userPermission.findMany();

// TypeScript Type
import { UserPermission } from '@prisma/client';
```

---

### UserRole

**Table PostgreSQL** : `"UserRole"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `DateTime`
- `Role`
- `User`

#### Index

- `roleId`
- `userId`

#### Utilisation dans le Code

```typescript
// Prisma Client
const userRole = await prisma.userRole.findMany();

// TypeScript Type
import { UserRole } from '@prisma/client';
```

---

### VerificationToken

**Table PostgreSQL** : `"VerificationToken"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `DateTime`

#### Utilisation dans le Code

```typescript
// Prisma Client
const verificationToken = await prisma.verificationToken.findMany();

// TypeScript Type
import { VerificationToken } from '@prisma/client';
```

---

### Yacht

**Table PostgreSQL** : `"Yacht"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `Int`
- `Float`
- `String`
- `Int`
- `Int`
- `Int`
- `Int`
- `Float`
- `Float`
- `Float`
- `Float`
- `Float`
- `Float`
- `Float`
- `String`
- `String`
- `String`
- `Json`
- `Json`
- `Json`
- `Json`
- `Json`
- `String`
- `String`
- `String`
- `String`
- `Float`
- `String`
- `String`
- `String`
- `Int`
- `String`
- `Json`
- `String`
- `String`
- `Int`
- `Int`
- `Float`
- `Int`
- `Boolean`
- `Boolean`
- `Boolean`
- `DateTime`
- `DateTime`
- `City`
- `Country`

#### Index

- `capacity`
- `cityId`
- `countryId`
- `isActive`
- `isFeatured`
- `slug`

#### Utilisation dans le Code

```typescript
// Prisma Client
const yacht = await prisma.yacht.findMany();

// TypeScript Type
import { Yacht } from '@prisma/client';
```

---

### PageContent

**Table PostgreSQL** : `"PageContent"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `String`
- `Json`
- `Boolean`
- `DateTime`
- `DateTime`

#### Index

- `slug`
- `locale`

#### Utilisation dans le Code

```typescript
// Prisma Client
const pageContent = await prisma.pageContent.findMany();

// TypeScript Type
import { PageContent } from '@prisma/client';
```

---

### NavbarLink

**Table PostgreSQL** : `"NavbarLink"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `Int`
- `Boolean`
- `DateTime`
- `DateTime`

#### Index

- `locale, order`
- `isActive`

#### Utilisation dans le Code

```typescript
// Prisma Client
const navbarLink = await prisma.navbarLink.findMany();

// TypeScript Type
import { NavbarLink } from '@prisma/client';
```

---

### FooterContent

**Table PostgreSQL** : `"FooterContent"`

#### Champs

| Nom | Type | Optionnel | Défaut | Description |
|-----|------|-----------|--------|-------------|

#### Relations

- `String`
- `String`
- `String`
- `String`
- `String`
- `Json`
- `Json`
- `Json`
- `Boolean`
- `DateTime`
- `DateTime`

#### Index

- `locale`
- `isActive`

#### Utilisation dans le Code

```typescript
// Prisma Client
const footerContent = await prisma.footerContent.findMany();

// TypeScript Type
import { FooterContent } from '@prisma/client';
```

---

