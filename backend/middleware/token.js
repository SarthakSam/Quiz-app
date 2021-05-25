const jwt     = require('jsonwebtoken');
const secret  = 'secret';

const getToken = (data) => {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
        data
      }, secret);
}

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secret);
        return { decoded };
      } catch(err) {
          console.log(err);
        return { message: "Invalid token" };
      }
}

module.exports = {
    getToken,
    verifyToken
}