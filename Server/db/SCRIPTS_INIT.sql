-- ADD USERS FUNCTION --
CREATE OR REPLACE FUNCTION add_user(
        new_username TEXT,
        new_schema TEXT,
        new_mail TEXT
    ) RETURNS TEXT AS $$
    DECLARE
        max_users INT:= 5;
        current_count INT;
        
    BEGIN
        SELECT COUNT(*) INTO current_count FROM app_users;
        IF current_count>= max_users THEN
            RAISE EXCEPTION 'Limite massimo di utenti raggiunto (%).',max_users;
        END IF;
        
        EXECUTE FORMAT('CREATE SCHEMA IF NOT EXISTS %I',new_schema);
        
        INSERT INTO app_users(username,schemaname,email)
        VALUES (new_username, new_schema, new_mail);

    EXECUTE FORMAT('
    CREATE TABLE IF NOT EXISTS %I.product (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price NUMERIC(10,2) NOT NULL,
        isBeverage BOOLEAN DEFAULT FALSE,
        isGlobal BOOLEAN DEFAULT TRUE,
        allergens JSON
    )
    ', new_schema);

    EXECUTE FORMAT('
        CREATE TABLE IF NOT EXISTS %I.party (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL
        )
    ', new_schema);

    -- Tabelle dipendenti
    EXECUTE FORMAT('
        CREATE TABLE IF NOT EXISTS %I.receipt (
            id SERIAL PRIMARY KEY,
            tot_price NUMERIC(10,2) NOT NULL,
            party_id INT REFERENCES %I.party(id),
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

    RETURN 'Utente creato correttamente'
    END;
$$  LANGUAGE plpgsql;


--DELETE USERS FUNCTION--   
CREATE OR REPLACE FUNCTION remove_user(target_username TEXT)
RETURNS TEXT AS $$
DECLARE
    target_schema TEXT;
BEGIN
    
    SELECT schemaname INTO target_schema
    FROM app_users
    WHERE username = target_username;

    IF target_schema IS NULL THEN
        RAISE EXCEPTION 'Utente % non trovato in app_users.', target_username;
    END IF;

   
    EXECUTE FORMAT('DROP SCHEMA IF EXISTS %I CASCADE', target_schema);

    
    DELETE FROM app_users WHERE username = target_username;

    RETURN FORMAT('Utente % eliminato insieme allo schema %.', target_username, target_schema);
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
        RAISE EXCEPTION 'Utente % non trovato.', old_username;
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
        'Utente % rinominato in %',
        old_username, new_username
    );
END;
$$ LANGUAGE plpgsql;
