CREATE TABLE IF NOT EXISTS device_configuration
(
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_identifier varchar NOT NULL,
    brand varchar NOT NULL,
    model varchar NOT NULL,
    device varchar NOT NULL,
    serial varchar NOT NULL,
    hardware varchar NOT NULL,
    manufacturer varchar NOT NULL,
    app_build varchar NOT NULL,
    app_version varchar NOT NULL,
    os_version varchar NOT NULL,
    sdk_version varchar NOT NULL,
    logged_at timestamptz NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);
