/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS raw_capture
(
    id uuid NOT NULL PRIMARY KEY,
    reference_id int8 NOT NULL,
    image_url varchar NOT NULL,
    lat numeric NOT NULL,
    lon numeric NOT NULL,
    gps_accuracy smallint NULL,
    field_user_id int8 NOT NULL,
    field_user_photo_url varchar NULL,
    field_username varchar NOT NULL,
    device_identifier varchar NULL,
    note varchar NULL,
    attributes jsonb NULL, 
    status varchar NOT NULL,
    rejection_reason varchar NULL,
    created_at timestamptz NOT NULL,
    updated_at timestamptz NOT NULL
);

CREATE INDEX rcapture_status_idx ON raw_capture(status);
CREATE INDEX rcapture_fieldusr_idx ON raw_capture(field_user_id);
CREATE INDEX rcapture_fieldusrname_idx ON raw_capture(field_username);
CREATE INDEX rcapture_crdate_idx ON raw_capture(created_at);
CREATE INDEX rcapture_update_idx ON raw_capture(updated_at);
