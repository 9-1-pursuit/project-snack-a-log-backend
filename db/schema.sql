DROP DATABASE IF EXISTS snack_a_log;
CREATE DATABASE snack_a_log; 

\c snack_a_log; 

CREATE TABLE snacks (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    fiber NUMERIC DEFAULT 0 NOT NULL,
    protein NUMERIC DEFAULT 0 NOT NULL,
    added_sugar NUMERIC DEFAULT 0,
    is_healthy BOOLEAN,
    image TEXT DEFAULT 'https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image'
); 
