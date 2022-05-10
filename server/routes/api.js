const express = require('express');
const router = express.Router();

const dbController = require('../controllers/dbController');
const apiController = require('../controllers/apiController');
const userController = require('../controllers/userController');
//const db = require('../models/booksModels');


router.get('/findBook', apiController.findBook, apiController.findAuthor, (req, res) => {
  return res.status(200).json(res.locals.bookInDB);
});

// input is JSON object that must include { "isbn": "9780060244194"}
router.post('/addOldBook', dbController.findBook, apiController.findBook, apiController.findAuthor, dbController.addBook, dbController.addOldBook, (req, res) => {
  return res.status(200).json(res.locals);
});

router.post('/findOldBook', dbController.findOldBook, (req, res) => {
  return res.status(200).json(res.locals.oldbooks);
});


//interactions in MyPage
router.post('/deleteOldBook', dbController.deleteOldBook, (req, res) => {
  return res.status(200).send(req.body.myOldBookId);
});

router.get('/getMyOldBookList', dbController.findMyBookList, (req, res) => {
  return res.status(200).json(res.locals.mybooks);
});

//interactions in Register
router.post('/register', userController.createUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

router.get('/verifyUser', userController.verifyUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

///temp stuff
const db = require('../models/booksModels');
router.get('/seeuser', (req, res) => {
  const query = `SELECT * FROM users`;
  // make a request to db 
  // working with the entier table in order to find an attribute
  db.query(query)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err)
    });
  return res.status(200).json({ msg: 'hhihi' });
});



module.exports = router;