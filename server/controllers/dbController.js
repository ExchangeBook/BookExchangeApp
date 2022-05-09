const db = require('../models/booksModels');
const dbController = {};

//dbController.findBook
// query the book table to find field with isbn.
// if the book exist, res.locals.bookindb = true
// req.body.isbn 
// res.locals.bookindb 
// req.cookies.ssid
dbController.findBook = (req, res, next) => {
  // destructure req body to retrieve ISBN
  // console.log(req.body);
  const { isbn } = req.body;
  // define the query to get the field 
  const query = `SELECT * FROM books WHERE isbn = '${isbn}'`;
  // make a request to db 
// working with the entier table in order to find an attribute
  db.query(query)
    .then((data) => {
      // check if returned object from query has row property with more than 1 row. If so, bookindb is true. Otherwise, bookindb is false
      data.rowCount > 0 ? res.locals.bookInDB = true : res.locals.bookInDB = false;
      next();
    })
    .catch((err) => {
      console.log(err)
      next(err);
    });
}


//dbController.addBook
// if (!res.locals.bookInDB)
// adds the book to the book table
dbController.addBook = (req, res, next) => {
  // check if new book is NOT in table already
  res.locals.bookInDB = false;
  if (!res.locals.bookInDB) {
    //add the new book
    //deconstruct the res.locals.book object 
    // const { isbn_13, title, name, subjects} = res.locals.book;
    const query = `
    INSERT INTO books ("isbn", "title", "author", "genre")
    VALUES ('9780155658110','1984','George Orwell','Dystopian')
    `;
    //CHANGE TO THIS LATER ONCE API WORKS AND WHAT RESULTS ARE
    // const query = `
    // INSERT INTO books ("isbn", "title", "author", "genre")
    // VALUES (${isbn_13},${title},${name},${genre})
    // `;
    // only adding/working with one specific attribute
    db.query(query)
    .then(() => next())
    .catch((err) =>{
      next(err);
    });
  } else {
    next();
  }
}

//dbController.findOldBook
// query the oldbook table.
// If the book doesn't exist,
// next(err);
// otherwise
// res.locals.oldbooks =  resulting table after 
// joining the userinfo with book condition, 
// also include the _id of oldbook table 
dbController.findOldBook = (req, res, next) => {
  const keyword= req.body.searchString;
  const query = `SELECT users.username, users.email, books.title, books.author, old_books.condition, books.isbn
  FROM users
  JOIN old_books
  ON users.user_id = old_books.user_id
  JOIN books
  ON old_books.bookISBN = books.isbn
  WHERE title ~* '\\y${keyword}\\y'`;

  db.query(query)
    .then((data) => {
      console.log(data.rows);
      res.locals.oldbooks = data.rows;
      next();
    })
    .catch((err) => {
      console.log(err)
      next(err);
    });
}

//dbController.addOldBook
// adds new field to the oldbook
// (user._id: req.cookies.ssid),
// (isbn: req.body.isbn)
// *always occurs
dbController.addOldBook = (req, res, next) => {
  //deconstruct the res.locals.book object 
  // const { isbn_13, title, name, subjects} = res.locals.book;
  const query = `INSERT INTO old_books (user_id, bookISBN, condition) VALUES ('1', '9780006722250', 'Like new')`;
  //CHANGE TO THIS LATER ONCE API WORKS AND WHAT RESULTS ARE ^^
  db.query(query)
  .then(() => next())
  .catch((err) =>{
    next(err);
  });
}

//dbController.deleteOldBook
// query the oldbook table.
// delete the book with id of req.body._id
dbController.deleteOldBook = (req, res, next) => {
  //deconstruct the res.locals.book object 
  // const _id = req.body._id;
  const _id = '4';
  const query = `DELETE FROM old_books WHERE old_book_id = ${ _id}`;
  //CHANGE TO THIS LATER ONCE API WORKS AND WHAT RESULTS ARE ^^
  db.query(query)
  .then(() => next())
  .catch((err) =>{
    next(err);
  });
}

dbController.findMyBookList = (req, res, next) => {
  const user_id = '1'
  // const keyword= req.body.searchString;
  const query = `SELECT books.title, books.author, old_books.condition, books.isbn
  FROM users
  JOIN old_books
  ON users.user_id = old_books.user_id
  JOIN books
  ON old_books.bookISBN = books.isbn
  WHERE users.user_id = '${user_id}'`;

  db.query(query)
    .then((data) => {
      // console.log(data.rows);
      res.locals.mybooks = data.rows;
      next();
    })
    .catch((err) => {
      console.log(err)
      next(err);
    });
}


module.exports = dbController;
