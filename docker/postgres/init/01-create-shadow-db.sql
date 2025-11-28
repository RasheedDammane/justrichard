-- Script d'initialisation PostgreSQL pour JustRichard Preprod
-- Crée automatiquement la shadow database pour Prisma

-- Créer la shadow database si elle n'existe pas
SELECT 'CREATE DATABASE preprod_justrichard_shadow'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'preprod_justrichard_shadow')\gexec

-- Créer les extensions nécessaires
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Connexion à la shadow database pour créer les extensions
\c preprod_justrichard_shadow;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Retour à la base principale
\c preprod_justrichard;

-- Créer un utilisateur readonly (optionnel, pour analytics)
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_user WHERE usename = 'readonly_user') THEN
      CREATE USER readonly_user WITH PASSWORD 'readonly123';
   END IF;
END
$$;

-- Donner les permissions de lecture
GRANT CONNECT ON DATABASE preprod_justrichard TO readonly_user;
GRANT USAGE ON SCHEMA public TO readonly_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO readonly_user;

-- Log
SELECT 'Database preprod_justrichard initialized successfully' AS status;
SELECT 'Shadow database preprod_justrichard_shadow created' AS status;
SELECT 'Extensions uuid-ossp, pgcrypto, pg_trgm installed' AS status;
