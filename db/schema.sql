DROP DATABASE IF EXISTS snack_a_log;
CREATE DATABASE snack_a_log; 

\c snack_a_log; 

CREATE TABLE snacks(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    fiber NUMBER,
    protein NUMBER,
    added_sugar NUMBER,
    is_healthy BOOLEAN,
    image TEXT
)


