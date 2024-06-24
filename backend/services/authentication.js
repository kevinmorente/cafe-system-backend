require('dotenv').config();
const jwt = require('jsonwebtoken');

function authenticationToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, response) => {
            if (err) {
                return res.sendStatus(403);
            } else {
                res.locals = response;
                next();
            }
        })
    }
}

module.exports = { authenticationToken: authenticationToken };