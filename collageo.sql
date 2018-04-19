
CREATE DATABASE collageo;

CREATE TABLE users (
  id SERIAL4 PRIMARY KEY,
  username VARCHAR(200) NOT NULL,
  email VARCHAR(400) NOT NULL,
  password_digest VARCHAR(200) NOT NULL
);

CREATE TABLE assets (
  id SERIAL4 PRIMARY KEY,
  image VARCHAR(800) NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

alter table assets ALTER user_id column DROP NOT NULL
