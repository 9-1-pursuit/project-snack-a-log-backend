DROP DATABASE IF EXISTS snack_a_log;
CREATE DATABASE snack_a_log; 

\c snack_a_log; 

CREATE TABLE snacks(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    fiber NUMERIC,
    protein NUMERIC,
    added_sugar NUMERIC,
    isHealthy BOOLEAN,
    image TEXT
);


