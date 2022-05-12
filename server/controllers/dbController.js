const db = require('../models/booksModels');
const dbController = {};

// return the user's wishlist
dbController.getWishlist = function (req, res, next){
  const queryArray = [req.body.user_id];
  const queryString = 
  `SELECT
    book_id,  title, author, genre, isbn, img_url 
  FROM 
    wishlist LEFT JOIN books ON wishlist.book_id=books.id
  WHERE
    wishlist.user_id=$1`;
  db.query(queryString, queryArray)
  .then(response => {
    console.log('HERE IS THE RESULT OF THE WISHLIST QUERY: ', response.rows);
    res.locals.wishlist = response.rows;
    next();
  }).catch(err =>
    next(err)
  );
};


// return the user's library
dbController.getUserLibrary = function (req, res, next){
  const queryArray = [req.body.user_id];
  const queryString = 
  `SELECT
    book_id,  title, author, genre, isbn, img_url 
  FROM 
    user_library LEFT JOIN books ON user_library.book_id=books.id
  WHERE
    user_library.user_id=$1`;
  db.query(queryString, queryArray)
  .then(response => {
    console.log('HERE IS THE RESULT OF THE USER LIBRARY QUERY: ', response.rows);
    next();
  }).catch(err => {
    console.log('ERROR: ', err);
    next(err);
  });
};

// add a book to the table of books (in preparating for adding it to the wishlist or user_library)
dbController.addBook = function (req, res, next){
  const user_id = 2;
  const x =  req.body
  const queryArray = [user_id, x.title, x.author, x.genre, x.isbn, x.img_URL];
  console.log('REQ.BODY: ', req.body);
  console.log('QUERYARRAY: ', queryArray);
  const queryString = 
  `INSERT INTO
    books(user_id, title, author, genre, isbn, img_URL)
  VALUES
    ($1, $2, $3, $4, $5, $6)
  RETURNING
    id`;
  db.query(queryString, queryArray)
  .then(response => {
    console.log('CONFIRMATION OF BOOK ENTRY and BOOK_ID: ', response);
    res.locals.newBookID = response.rows[0];
    next();
  }).catch(err => {
    console.log('ERROR: ', err);
    next(err);
  });
};

// add a book to the wish list
dbController.addToWishlist = function(req, res, next){
  //const queryArray = [res.locals.user_id, res.locals.book_id];
  //res.locals.newBookID = {id: 23};
  const queryArray = [2, res.locals.newBookID.id];
  const queryString = 
  `INSERT INTO
    wishlist(user_id, book_id)
  VALUES
    ($1, $2)`
  db.query(queryString, queryArray)
  .then(response => {
    console.log('CONFIRMATION OF WISHLIST ADDITION: ', response);
    next();
  }).catch(err => {
    console.log('ERROR: ', err);
    next(err);
  });

};



// add a book to the library
dbController.addToUserLibrary = function(req, res, next){
  //const queryArray = [res.locals.user_id, res.locals.book_id];
  //res.locals.newBookID = {id: 23};
  const queryArray = [2, res.locals.newBookID.id];
  const queryString = 
  `INSERT INTO
    user_library(user_id, book_id)
  VALUES
    ($1, $2)`
  db.query(queryString, queryArray)
  .then(response => {
    console.log('CONFIRMATION OF USER LIBRARY ADDITION: ', response);
    next();
  }).catch(err =>
    next(err)
  );

};


// delete a book from the wishlist


// delte a book from teh library

module.exports = dbController;
