const bcrypt = require('bcrypt');

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(password, salt);
  return hashed;
}

const comparePassword = (password, hashedPassword) => {
  const match = bcrypt.compareSync(password, hashedPassword);
  return match
}

module.exports = {
  hashPassword,
  comparePassword
}