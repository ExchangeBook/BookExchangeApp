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
  // next();
}


// dbController.addBook
// if (!res.locals.bookInDB)
// adds the book to the book table
dbController.addBook = (req, res, next) => {

  // const query = `
  // INSERT INTO people ("name", "gender", "species_id", "birth_year", "eye_color", "skin_color", "hair_color", "mass", "height", "homeworld_id")
  // VALUES (${name},${gender},${species_id},${birth_year},${eye_color},${skin_color},${hair_color},${mass},${height},${homeworld_id})
  // `;

  next();
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

  next();
}

//dbController.addOldBook
// adds new field to the oldbook
// (user._id: req.cookies.ssid),
// (isbn: req.body.isbn)
// *always occurs
dbController.addOldBook = (req, res, next) => {

  next();
}

//dbController.deleteOldBook
// query the oldbook table.
// delete the book with id of req.body._id
dbController.deleteOldBook = (req, res, next) => {

  next();
}



module.exports = dbController;
