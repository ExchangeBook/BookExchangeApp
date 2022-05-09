const express = require('express');

const router = express.Router();

const dbController = require('../controllers/dbController');
const apiController = require('../controllers/apiController');
const db = require('../models/booksModels');

router.get('/findBook', apiController.findBook, apiController.findAuthor, (req, res) => {
  return res.status(200).json(res.locals.bookInDB);
})


// assumes input is -->>    { "isbn": "xxxxxxx"}
router.get('/kai', dbController.findMyBookList, (req, res) => {
  console.log(res.locals.mybooks);
  return res.status(200).json({greet: 'hi'});
})


module.exports = router;