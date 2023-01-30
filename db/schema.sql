DROP DATABASE IF EXISTS snack_a_log;
CREATE DATABASE snack_a_log; 

\c snack_a_log; 

CREATE TABLE snacks(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    fiber NUMERIC DEFAULT 0,
    protein NUMERIC DEFAULT 0,
    added_sugar NUMERIC DEFAULT 0,
    is_healthy BOOLEAN ,
    image TEXT
);


