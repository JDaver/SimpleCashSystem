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
            party_id INT REFERENCES %I.party(id)
        )
    ', new_schema, new_schema, new_schema);

    RETURN 'Utente creato correttamente'
    END;
$$  LANGUAGE plpgsql;