#!/bin/bash

echo "👥 Creating test users directly in PostgreSQL..."
echo ""

# Password hash for "password123"
HASH='$2a$10$yb72EYgFmECbtiRM4.I7zOD9Ke5NT7XmugYteGFxBA0Voxhxvo7Om'

docker exec justrichard-preprod-db psql -U postgres -d preprod_justrichard << EOF

-- Insert users
INSERT INTO "User" (id, email, password, "firstName", "lastName", role, "isActive", "emailVerified", "createdAt", "updatedAt")
VALUES
  ('user-admin-super', 'admin@justrichard.com', '$HASH', 'Admin', 'Super', 'SUPER_ADMIN', true, NOW(), NOW(), NOW()),
  ('user-admin-001', 'admin@test.com', '$HASH', 'John', 'Admin', 'ADMIN', true, NOW(), NOW(), NOW()),
  ('user-yacht-001', 'yacht.owner@test.com', '$HASH', 'Richard', 'YachtOwner', 'PROVIDER', true, NOW(), NOW(), NOW()),
  ('user-property-001', 'property.owner@test.com', '$HASH', 'Sarah', 'PropertyOwner', 'PROVIDER', true, NOW(), NOW(), NOW()),
  ('user-car-001', 'car.rental@test.com', '$HASH', 'Michael', 'CarRental', 'PROVIDER', true, NOW(), NOW(), NOW()),
  ('user-doctor-001', 'doctor@test.com', '$HASH', 'Dr. Emma', 'Doctor', 'PROVIDER', true, NOW(), NOW(), NOW()),
  ('user-lawyer-001', 'lawyer@test.com', '$HASH', 'David', 'Lawyer', 'PROVIDER', true, NOW(), NOW(), NOW()),
  ('user-coach-001', 'coach@test.com', '$HASH', 'Lisa', 'Coach', 'PROVIDER', true, NOW(), NOW(), NOW()),
  ('user-customer-001', 'user1@test.com', '$HASH', 'Alice', 'Customer', 'CUSTOMER', true, NOW(), NOW(), NOW()),
  ('user-customer-002', 'user2@test.com', '$HASH', 'Bob', 'Customer', 'CUSTOMER', true, NOW(), NOW(), NOW()),
  ('user-customer-003', 'user3@test.com', '$HASH', 'Charlie', 'Customer', 'CUSTOMER', true, NOW(), NOW(), NOW()),
  ('user-customer-004', 'user4@test.com', '$HASH', 'Diana', 'Customer', 'CUSTOMER', true, NOW(), NOW(), NOW()),
  ('user-customer-005', 'user5@test.com', '$HASH', 'Eric', 'Customer', 'CUSTOMER', true, NOW(), NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET
  password = EXCLUDED.password,
  "firstName" = EXCLUDED."firstName",
  "lastName" = EXCLUDED."lastName",
  role = EXCLUDED.role,
  "isActive" = EXCLUDED."isActive",
  "emailVerified" = EXCLUDED."emailVerified",
  "updatedAt" = NOW();

SELECT COUNT(*) as total_users FROM "User";

EOF

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Users created successfully!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 LOGIN CREDENTIALS:"
echo ""
echo "All users use password: password123"
echo ""
echo "🔐 ADMIN:"
echo "  • admin@justrichard.com (SUPER ADMIN)"
echo "  • admin@test.com (ADMIN)"
echo ""
echo "👔 PROVIDERS:"
echo "  • yacht.owner@test.com"
echo "  • property.owner@test.com"
echo "  • car.rental@test.com"
echo "  • doctor@test.com"
echo "  • lawyer@test.com"
echo "  • coach@test.com"
echo ""
echo "👥 CUSTOMERS:"
echo "  • user1@test.com (Alice)"
echo "  • user2@test.com (Bob)"
echo "  • user3@test.com (Charlie)"
echo "  • user4@test.com (Diana)"
echo "  • user5@test.com (Eric)"
echo ""
echo "🌐 LOGIN: http://localhost:3254/en/login"
echo "⚙️ ADMIN: http://localhost:3254/en/admin"
echo ""
