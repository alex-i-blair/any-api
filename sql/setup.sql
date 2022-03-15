-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS cars;

CREATE TABLE cars (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  make TEXT NOT NULL,
  model TEXT NOT NULL
);