const userController = {};

userController.createUser = (req, res, next) => {
  const { username, password, email, phone, address } = req.body;
  console.log(username, password, email, phone, address)
  const query = `INSERT INTO users (username, password, email, phone, address) VALUES ($1, $2, $3, $4, $5)`;
  const values = [username, password, email, phone, address];
  db.query(query, values)
  .then(() => next())
  .catch((err) =>{
    next(err);
  });
}

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = ${username} and password = ${password}`;
  const values = [ username, password ];
  db.query(query, values)
  .then((verfiedUser) => res.locals.user = verifiedUser)
  .then(() => next())
  .catch(err => {
    const errObj = {
      err: err,
      message: { Error: 'Login Failed'}
    }
    next(errObj)
  })
}

userController.selectAllUsers = (req, res, next) => {
  db.query(`SELECT * FROM users`)
    .then(users => console.log(users))
}


// I am watching you from darkness CLAY
// lolol 

module.exports = userController;

// CREATE TABLE users (
// user_id SERIAL PRIMARY KEY,
// username VARCHAR(50) NOT NULL,
// password VARCHAR(50) NOT NUL
// email VARCHAR(100),
// phone VARCHAR(50),
// address VARCHAR(500)
// );