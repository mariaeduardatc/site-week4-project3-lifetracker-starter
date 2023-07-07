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
    duration INTEGER NOT NULL,
    intensity INTEGER NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE sleep
(
    id SERIAL PRIMARY KEY,
    dating DATE NOT NULL,
    bed_time TIME NOT NULL,
    wake_time TIME NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE nutrition
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    calories INTEGER NOT NULL,
    image_url VARCHAR(255) NOT NULL, 
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);