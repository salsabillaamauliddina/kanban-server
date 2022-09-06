const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env


const generateToken = (payload) => {
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
}


const verifyToken = (token) => {
  const match = jwt.verify(token, SECRET_KEY);
  return match;
}

module.exports = {
  generateToken,
  verifyToken
}