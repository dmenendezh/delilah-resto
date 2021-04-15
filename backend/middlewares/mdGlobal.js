const JWT = require('jsonwebtoken');
const JWTSign = 'mySUPERpass.12';
const mdGlobal = {};

mdGlobal.checkEmptyBody = (req, res, next) => {
    if(isObjEmpty(req.body)) {
        res.status(400).json({
            message: 'Empty body.'
        });
    } else {
        next();
    }
};

//Funciones auxiliares
function isObjEmpty(obj) {
    return Object.entries(obj).length === 0;
}

mdGlobal.validateToken = (req, res, next) => {
    const token = req.headers.authorization;
    const tokenVerified = JWT.verify(token, JWTSign, (error, decoded) => {
        if(error) {
            res.status(403).json({
                message: 'Unable to verify the token.',
                error
            });
        } else {
            res.locals.userLogged = decoded;
            next();
        }
    });
};


module.exports = mdGlobal;
