const { default: axios } = require('axios');

const apiController = {};

apiController.findBook = (req, res, next) => {
  if (res.locals.bookInDB) return next();
  const { isbn } = req.body;
  let authorEndpoint;
  axios.get(`https://openlibrary.org/isbn/${isbn}.json`)
    .then((response) => {
      const bookInfo = response.data;
      let { title, authors, subjects } = bookInfo;
      if (!subjects) subjects = ['Unknown'];
      if (!authors) authors = ['Unknown'];
      res.locals.authorEndpoint = authors[0].key;
      res.locals.book = { isbn_13: isbn, title: title, subjects: subjects[0] };
      return next();
    })
    .catch((err) => {
      const defaultErr = {
        log: 'ERROR found in apiController.findBook',
        message: { err: `There was an error${err}` },
      };
      return next(defaultErr);
    });
};

apiController.findAuthor = (req, res, next) => {
  if (res.locals.bookInDB) return next();
  const { authorEndpoint } = res.locals;
  // if author code was not found in apiController.findBook, move onto next middleware function 
  // and make author property unknown
  if (!authorEndpoint) {
    res.locals.book.author = 'Unknown';
    return next();
  }
  axios.get(`https://openlibrary.org/${authorEndpoint}.json`)
    .then((response) => {
      const authorInfo = response.data;
      const author = authorInfo.name;
      res.locals.book.author = author;
      return next();
    })
    .catch((err) => {
      const defaultErr = {
        log: 'ERROR found in apiController.findAuthor',
        message: { err: `There was an error${err}` },
      };
      return next(defaultErr);
    });
};

module.exports = apiController;



















// const { default: axios } = require("axios");


// const apiController = {};
// // from MDN
// // fetch('http://example.com/movies.json')
// //   .then(response => response.json())
// //   .then(data => console.log(data));
// apiController.findBook = (req, res, next) => {
//   if (res.locals.bookInDB) {
//     return next();
//   } else {
//     const isbn = req.body.isbn;
//     let authorEndpoint;
//     axios.get(`https://openlibrary.org/isbn/${isbn}.json`)
//       .then(response => {
//         const bookInfo = response.data;
//         const { isbn_13, title, authors, subjects } = bookInfo;
//         axios.get('https://openlibrary.org/authors/OL548174A.json')
//         console.log(isbn_13[0], title, authors[0], subjects[0])
//         res.locals.authorEndpoint = authors[0].key;
//         res.locals.book = { isbn_13: isbn_13[0], name: title, subjects: subjects[0] };
//         return next();
//       })
//       .catch(err => {
//         const defaultErr = {
//           log: 'ERROR found in apiController.findBook',
//           message: { err: 'There was an error.' + `${isbn}` + 'not found.' }
//         };
//         return next(defaultErr);
//       });
//   }
// }
// //error message display isbn

// apiController.findAuthor = (req, res, next) => {
//   const authorEndpoint = res.locals.authorEndpoint;
//   axios.get(`https://openlibrary.org/${authorEndpoint}.json`)
//     .then(response => {
//       const authorInfo = response.data;
//       const { name } = authorInfo;
//       console.log('name', name)
//       res.locals.book = { ...res.locals.book, name };
//       console.log(res.locals.book)
//       return next();
//     })
//     .catch(err => {
//       const defaultErr = {
//         log: 'ERROR found in apiController.findAuthor',
//         message: { err: 'There was an error' + err }
//       };
//       return next(defaultErr);
//     });
// }


// module.exports = apiController;