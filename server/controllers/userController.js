const db = require('../models/booksModels');
const userController = {};

userController.createUser = (req, res, next) => {
  const { username, password, email, phone, address } = req.body;
  const query = `INSERT INTO users ("username", "password", "email", "phone", "address") VALUES ('${username}', '${password}', '${email}', '${phone}', '${address}')`;
  const values = [username, password, email, phone, address];
  db.query(query)
    .then(() => {
      res.locals.user = 'test';
      next()
    })
    .catch((err) => {
      console.log(err)
      next(err);
    });
}

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = ${username} and password = ${password}`;
  const values = [username, password];
  db.query(query, values)
    .then((verfiedUser) => res.locals.user = verifiedUser)
    .then(() => next())
    .catch(err => {
      const errObj = {
        err: err,
        message: { Error: 'Login Failed' }
      }
      next(errObj)
    })
}

userController.selectAllUsers = (req, res, next) => {
  db.query(`SELECT * FROM users`)
    .then(users => console.log(users))
}


module.exports = userController;