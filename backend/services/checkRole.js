require('dotenv').config();

function checkRole(req, res, next) {
    if (res.locals.role == process.env.USER) {
        console.log('ROLE VERIFICATION FAILED');
        return res.sendStatus(401);
    } else {
        next();
    }
}

module.exports = { checkRole: checkRole };