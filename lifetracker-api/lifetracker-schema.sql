CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(50) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    email VARCHAR(319) NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);


CREATE TABLE nutrition
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    category VARCHAR(50) NOT NULL,
    calories VARCHAR(20) NOT NULL,
    image_url VARCHAR(30) NOT NULL, 
    user_id SERIAL NOT NULL,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);