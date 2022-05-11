const db = require('../models/booksModels');
const userController = {};
const bcrypt = require('bcrypt');

userController.createUser = (req, res, next) => {
  const { username, password, email, phone, address } = req.body;
  //username = hashedusername
  bcrypt.hash(password, 12)
  .then((hash) => {
      const query = `INSERT INTO users ("username", "password", "email", "phone", "address") VALUES ($1, $2, $3, $4, $5)`;
      const values = [username, hash, email, phone, address];
      db.query(query, values)
        .then(() => {
          res.locals.user = 'test';
          next()
        })
        .catch((err) => {
          console.log(err)
          next(err);
        });
    }
  )
  .catch(err => {
    return next({
      log: "error hashing password",
      message: { err: "error hashing password" }
    })
  })
}

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  const query1 = `SELECT password FROM users WHERE username = $1`;
  const values1 = [username];
  
  db.query(query1, values1)
    .then(sqlRes => {
      hash = sqlRes.rows[0].password;
      bcrypt.compare(password, hash)
        .then(result => {
          if (result) {
            const query2 = `SELECT user_id, username, email, phone, address FROM users WHERE username = $1`;
            const values2 = [username];
          
            db.query(query2, values2)
              .then((verifiedUser) => {
                res.locals.user = verifiedUser.rows[0]
                res.locals.loggedIn = true;
              })
              .then(() => next())
              .catch(err => {
                const errObj = {
                  err: err,
                  message: { Error: 'Login Failed' }
                }
                next(errObj)
              })
          } else {
            res.locals.loggedIn = false;
          }
        })
    }).catch(err => {
      return next({
        log: "username or password not found",
        message: { err: "username or password not found" }
      })
    })

}

userController.selectAllUsers = (req, res, next) => {
  db.query(`SELECT * FROM users`)
    .then(users => console.log(users))
}


module.exports = userController;