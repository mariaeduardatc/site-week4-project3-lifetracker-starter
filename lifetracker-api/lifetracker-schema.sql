CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(500) NOT NULL,
    password VARCHAR(500) NOT NULL,
    first_name VARCHAR(500) NOT NULL,
    last_name VARCHAR(500) NOT NULL,
    email VARCHAR(500) NOT NULL UNIQUE CHECK (position('@' IN email) > 1)
);


CREATE TABLE exercise
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    duration VARCHAR(255) NOT NULL,
    intensity VARCHAR(255) NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);


-- CREATE TABLE nutrition
-- (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     category VARCHAR(255) NOT NULL,
--     calories VARCHAR(255) NOT NULL,
--     image_url VARCHAR(255) NOT NULL, 
--     user_id SERIAL NOT NULL,
--     created_at TIMESTAMP NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES users(id)
-- );