-- Create test users with working login
-- Password for all users: password123

INSERT INTO "User" (id, email, password, "firstName", "lastName", "isActive", "emailVerified", "createdAt", "updatedAt")
VALUES
  ('user-admin-super', 'admin@justrichard.com', '$2a$10$yb72EYgFmECbtiRM4.I7zOD9Ke5NT7XmugYteGFxBA0Voxhxvo7Om', 'Admin', 'Super', true, NOW(), NOW(), NOW()),
  ('user-admin-001', 'admin@test.com', '$2a$10$yb72EYgFmECbtiRM4.I7zOD9Ke5NT7XmugYteGFxBA0Voxhxvo7Om', 'John', 'Admin', true, NOW(), NOW(), NOW()),
  ('user-yacht-001', 'yacht.owner@test.com', '$2a$10$yb72EYgFmECbtiRM4.I7zOD9Ke5NT7XmugYteGFxBA0Voxhxvo7Om', 'Richard', 'YachtOwner', true, NOW(), NOW(), NOW()),
  ('user-property-001', 'property.owner@test.com', '$2a$10$yb72EYgFmECbtiRM4.I7zOD9Ke5NT7XmugYteGFxBA0Voxhxvo7Om', 'Sarah', 'PropertyOwner', true, NOW(), NOW(), NOW()),
  ('user-car-001', 'car.rental@test.com', '$2a$10$yb72EYgFmECbtiRM4.I7zOD9Ke5NT7XmugYteGFxBA0Voxhxvo7Om', 'Michael', 'CarRental', true, NOW(), NOW(), NOW()),
  ('user-doctor-001', 'doctor@test.com', '$2a$10$yb72EYgFmECbtiRM4.I7zOD9Ke5NT7XmugYteGFxBA0Voxhxvo7Om', 'Dr Emma', 'Doctor', true, NOW(), NOW(), NOW()),
  ('user-lawyer-001', 'lawyer@test.com', '$2a$10$yb72EYgFmECbtiRM4.I7zOD9Ke5NT7XmugYteGFxBA0Voxhxvo7Om', 'David', 'Lawyer', true, NOW(), NOW(), NOW()),
  ('user-coach-001', 'coach@test.com', '$2a$10$yb72EYgFmECbtiRM4.I7zOD9Ke5NT7XmugYteGFxBA0Voxhxvo7Om', 'Lisa', 'Coach', true, NOW(), NOW(), NOW()),
  ('user-customer-001', 'user1@test.com', '$2a$10$yb72EYgFmECbtiRM4.I7zOD9Ke5NT7XmugYteGFxBA0Voxhxvo7Om', 'Alice', 'Customer', true, NOW(), NOW(), NOW()),
  ('user-customer-002', 'user2@test.com', '$2a$10$yb72EYgFmECbtiRM4.I7zOD9Ke5NT7XmugYteGFxBA0Voxhxvo7Om', 'Bob', 'Customer', true, NOW(), NOW(), NOW()),
  ('user-customer-003', 'user3@test.com', '$2a$10$yb72EYgFmECbtiRM4.I7zOD9Ke5NT7XmugYteGFxBA0Voxhxvo7Om', 'Charlie', 'Customer', true, NOW(), NOW(), NOW()),
  ('user-customer-004', 'user4@test.com', '$2a$10$yb72EYgFmECbtiRM4.I7zOD9Ke5NT7XmugYteGFxBA0Voxhxvo7Om', 'Diana', 'Customer', true, NOW(), NOW(), NOW()),
  ('user-customer-005', 'user5@test.com', '$2a$10$yb72EYgFmECbtiRM4.I7zOD9Ke5NT7XmugYteGFxBA0Voxhxvo7Om', 'Eric', 'Customer', true, NOW(), NOW(), NOW())
ON CONFLICT (email) DO UPDATE SET
  password = EXCLUDED.password,
  "updatedAt" = NOW();

SELECT COUNT(*) as total_users FROM "User";
