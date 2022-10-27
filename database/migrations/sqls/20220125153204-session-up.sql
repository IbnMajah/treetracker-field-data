CREATE TABLE IF NOT EXISTS session
(
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_configuration_id uuid NOT NULL REFERENCES device_configuration(id),
    originating_wallet_registration_id uuid NOT NULL REFERENCES wallet_registration(id),
    target_wallet varchar,
    check_in_photo_url varchar,
    track_url varchar,
    organization varchar,
    created_at timestamptz NOT NULL DEFAULT now()
);
