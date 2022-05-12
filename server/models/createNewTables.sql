DROP TABLE IF EXISTS users, books, old_books, wishlist, user_library;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  token VARCHAR(200) UNIQUE
);

CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  isbn VARCHAR(30),
  title VARCHAR(500) NOT NULL, 
  author VARCHAR(500) NOT NULL,
  genre VARCHAR(50) NOT NULL,
  img_URL varchar(200),
  user_id INTEGER references users(id) 
);

CREATE TABLE IF NOT EXISTS wishlist (
  user_id INTEGER references users(id),
  book_id INTEGER references books(id),
  PRIMARY KEY(book_id)
);

CREATE TABLE IF NOT EXISTS user_library (
  user_id INTEGER references users(id),
  book_id INTEGER references books(id),
  PRIMARY KEY(user_id, book_id)
);