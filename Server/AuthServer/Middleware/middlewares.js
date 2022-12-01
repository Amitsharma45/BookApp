const {  VerifyToken } = require('../Auth/userauth')

function isLoginMiddleware(req, res, next) {
    // console.log(req.isAuthenticated());
    if (!req.isAuthenticated()) {
        res.status(401).send('Please Login to Website First');
    } else {
        next();
    }
}
function VerifyTokenMiddleware(req, res, next) {
    // console.log(req.headers.authorization)
    const userid = VerifyToken(req.headers.authorization);
    if (!userid) {
        res.status(401).send({ status: 401, message: "You are not authorized" });

    } else {
        req.user = userid;
        next();
    }

}

module.exports = {VerifyTokenMiddleware ,isLoginMiddleware};