const JWT = require('jsonwebtoken');
const JWTSign = 'mySUPERpass.12';
const mdGlobal = {};

mdGlobal.checkBody = (req, res, next) => {
    if(isObjEmpty(req.body)) {
        console.log('Body cannot be empty');
        res.status(400).json({
            message: 'There was a problem with the information provided'
        });
    } else {
        next();
    }
};


module.exports = mdGlobal;
