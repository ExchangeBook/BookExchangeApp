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
router.post('/addOldBook', dbController.findBook, apiController.findBook, apiController.findAuthor, dbController.addBook, (req, res) => {
  // console.log(res.locals.book);
  console.log('hello');
  // return res.status(200).json(res.locals.book);
});

router.post('/findOldBook', dbController.findOldBook, (req, res) => {
  return res.status(200).json(res.locals.oldbooks);
});


//interactions in MyPage
router.post('/deleteOldBook', dbController.findOldBook, (req, res) => {
  return res.status(200).json(res.locals.oldbooks);
});

router.get('/getMyOldBookList', dbController.findMyBookList, (req, res) => {
  return res.status(200).json(res.locals.mybooks);
});

//interactions in Register
router.post('/register', userController.createUser, userController.selectAllUsers, (req, res) => {
  return res.status(200).json(res.locals.user);
});


module.exports = router;