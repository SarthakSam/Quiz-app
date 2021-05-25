const { verifyToken } = require('./token');

module.exports = function(req, res, next) {
    const { authorization } = req.headers;
    if(!authorization)
        return res.status(401).json({ message: "Please signin/signup to continue" });
    const tokenObj = verifyToken(authorization);
    if("decoded" in tokenObj) {
        console.log(tokenObj.decoded);
        res.user = tokenObj.decoded.data;
        next();
    } else {
        res.status(401).json({ message: "Token is corrupted or expired. Please signin/signup again to continue" });
    }
}