CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS wallet_registration
(
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet varchar NOT NULL,
    user_photo_url varchar NOT NULL,
    grower_account_id uuid NOT NULL,
    first_name varchar NOT NULL,
    last_name varchar NOT NULL,
    phone varchar,
    email varchar,
    lat numeric NOT NULL,
    lon numeric NOT NULL,
    registered_at timestamptz NOT NULL,
    v1_legacy_organization varchar
);