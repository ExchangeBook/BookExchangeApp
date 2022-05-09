const express = require('express');

const router = express.Router();

const dbController = require('../controllers/dbController');
const apiController = require('../controllers/apiController');
const db = require('../models/booksModels');

router.get('/findBook', apiController.findBook, apiController.findAuthor, (req, res) => {
  return res.status(200).json(res.locals.bookInDB);
})


// assumes input is -->>    { "isbn": "xxxxxxx"}
router.post('/kai', dbController.findOldBook, (req, res) => {
  return res.status(200).json({greet: 'hi'});
})

router.post('/findOldBook', dbController.findOldBook, (req, res) => {
  return res.status(200).json(res.locals.oldbooks);
})


module.exports = router;