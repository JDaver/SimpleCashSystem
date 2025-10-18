-- EXTENSION--
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
-- ADD USERS FUNCTION --
CREATE OR REPLACE FUNCTION add_user(
        new_username TEXT,
        new_schema TEXT,
        new_mail TEXT
    ) RETURNS JSON AS $$
    DECLARE
        max_users INT:= 5;
        current_count INT;
		new_user app_users;
        
    BEGIN
        SELECT COUNT(*) INTO current_count FROM app_users;
        IF current_count>= max_users THEN
            RAISE EXCEPTION 'Limite massimo di utenti raggiunto (%).',max_users;
        END IF;
        
        EXECUTE FORMAT('CREATE SCHEMA IF NOT EXISTS %I',new_schema);
        
        INSERT INTO app_users(username,schema_name,email,token, token_expires)
        VALUES (new_username, new_schema, new_mail, gen_random_uuid(), NOW() + INTERVAL '16 hours')  RETURNING * INTO new_user;

    EXECUTE FORMAT('
    CREATE TABLE IF NOT EXISTS %I.product (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price NUMERIC(10,2) NOT NULL,
        isBeverage BOOLEAN DEFAULT FALSE,
        isGlobal BOOLEAN DEFAULT TRUE,
        allergens JSONB
    )
    ', new_schema);

    EXECUTE FORMAT('
        CREATE TABLE IF NOT EXISTS %I.party (
            id SERIAL PRIMARY KEY,
            name_party VARCHAR(100) NOT NULL
        )
    ', new_schema);

    -- Tabelle dipendenti
    EXECUTE FORMAT('
        CREATE TABLE IF NOT EXISTS %I.receipt (
            id SERIAL PRIMARY KEY,
            tot_price NUMERIC(10,2) NOT NULL,
            id_party INT REFERENCES %I.party(id),
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ', new_schema, new_schema);

    EXECUTE FORMAT('
        CREATE TABLE IF NOT EXISTS %I.product_receipt (
            product_id INT REFERENCES %I.product(id),
            receipt_id INT REFERENCES %I.receipt(id),
            quantity NUMERIC
        )
    ', new_schema, new_schema, new_schema);

    EXECUTE FORMAT('
        CREATE TABLE IF NOT EXISTS %I.product_party (
            product_id INT REFERENCES %I.product(id),
            party_id INT REFERENCES %I.party(id),
            CONSTRAINT unique_product_party UNIQUE (product_id, party_id)
        )
    ', new_schema, new_schema, new_schema);

    RETURN row_to_json(new_user);
    END;
$$  LANGUAGE plpgsql;


--DELETE USERS FUNCTION--   
CREATE OR REPLACE FUNCTION remove_user(target_username TEXT)
RETURNS TEXT AS $$
DECLARE
    target_schema TEXT;
BEGIN
    
    SELECT schema_name INTO target_schema
    FROM app_users
    WHERE username = target_username;

    IF target_schema IS NULL THEN
        RAISE EXCEPTION 'Utente %s non trovato in app_users.', target_username;
    END IF;

   
    EXECUTE FORMAT('DROP SCHEMA IF EXISTS %I CASCADE', target_schema);

    
    DELETE FROM app_users WHERE username = target_username;

    RETURN FORMAT('Utente %s eliminato insieme allo schema %s', target_username, target_schema);
END;
$$ LANGUAGE plpgsql;


--UPDATE USER--
CREATE OR REPLACE FUNCTION update_user(
    old_username TEXT,
    new_username TEXT,
    new_schema_name TEXT,
    new_email TEXT

) RETURNS TEXT AS $$
DECLARE
    old_schema_name TEXT; 
BEGIN
    
    SELECT schema_name INTO old_schema_name
    FROM app_users
    WHERE username = old_username;

    IF old_schema_name IS NULL THEN
        RAISE EXCEPTION 'Utente %s non trovato.', old_username;
    END IF;


    IF old_schema_name <> new_schema_name THEN
        EXECUTE FORMAT('ALTER SCHEMA %I RENAME TO %I', old_schema_name, new_schema_name);
    END IF;

    UPDATE app_users
    SET username = new_username,
        schema_name = new_schema_name,
        email = new_email
    WHERE username = old_username;

    RETURN FORMAT(
        'Utente %s rinominato in %s',
        old_username, new_username
    );
END;
$$ LANGUAGE plpgsql;


--CREATE APP_USERS--
CREATE TABLE IF NOT EXISTS public.app_users
(
    id integer NOT NULL DEFAULT nextval('app_users_id_seq'::regclass),
    username character varying(100) COLLATE pg_catalog."default" NOT NULL,
    schema_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default",
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    token uuid DEFAULT gen_random_uuid(),
    token_expires timestamp with time zone,
    CONSTRAINT app_users_pkey PRIMARY KEY (id),
    CONSTRAINT app_users_email_key UNIQUE (email),
    CONSTRAINT app_users_username_key UNIQUE (username)
)

TABLESPACE pg_default;