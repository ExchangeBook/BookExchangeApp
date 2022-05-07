const express = require('express');

const router = express.Router();

const dbController = require('../controllers/dbController');
const apiController = require('../controllers/apiController');
const db = require('../models/booksModels');

router.get('/findBook', apiController.findBook, apiController.findAuthor, (req, res) => {
  return res.status(200).json(res.locals.bookInDB);
})


// assumes input is -->>    { "isbn": "xxxxxxx"}
router.post('/kai', dbController.addBook, (req, res) => {
  // console.log("hiiiiiiiiiiiiii")
  console.log(res.locals.bookindb);
  return res.status(200).json({ hi: res.locals.bookInDB });
})


module.exports = router;