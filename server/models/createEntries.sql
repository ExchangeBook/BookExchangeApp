INSERT INTO users(email) 
VALUES
  ('james@aol.com'),
  ('ken@aol.com'),
  ('li@aol.com'),
  ('tristen@aol.com'),
  ('alex@aol.com')
;

INSERT INTO books(title, author, genre, user_id)
VALUES
  ('Harry Potter 1', 'JK Rowling', 'fantasy', 1),
  ('The Big Short', 'Michael Lewis', 'non-fiction', 2),
  ('Brothers Karamazov', 'Fyodor Dosteovsky', 'historical fiction', 3),
  ('book1', 'author 1', 'genre 1', 1),
  ('book1', 'author 1', 'genre 1', 2),
  ('book2', 'author 2', 'genre 2', 3),
  ('book4', 'author 4', 'genre 4', 4),
  ('book5', 'author 5', 'genre 1', 5),
  ('book6', 'author 6', 'genre 1', 1),
  ('book6', 'author 7', 'genre 2', 2),
  ('book7', 'author 8', 'genre 3', 3),
  ('book8', 'author 9', 'genre 1', 4),
  ('book9', 'author 10', 'genre 1', 5),
  ('book10', 'author 11', 'genre 2', 1),
  ('book11', 'author 12', 'genre 3', 2),
  ('book12', 'author 13', 'genre 1', 3),
  ('book13', 'author 14', 'genre 2', 4),
  ('book14', 'author 15', 'genre 3', 5)
;

INSERT INTO wishlist(user_id, book_id)
VALUES
  (1,1),
  (2,2),
  (4,4),
  (2,5),
  (5,6),
  (1,7),
  (5,8),
  (3,3)
 ; 

INSERT INTO user_library(user_id, book_id)
VALUES
  (1,9),
  (2,10),
  (4,11),
  (2,12),
  (5,13),
  (1,14),
  (5,16),
  (3,15)
 ; 
