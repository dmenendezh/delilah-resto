const database = require('../database/dbConnector');
const mdUsers = {};

mdUsers.requireRegisterData = async (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const fullName = req.body.fullName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;

    if(typeof(userName) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the username provided'
        });
    } else if (typeof(password) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the password provided'
        });
    } else if (typeof(fullName) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the name provided'
        });
    } else if (typeof(email) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the email provided'
        });
    } else if (typeof(phoneNumber) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the phone number provided'
        });
    } else if (typeof(address) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the address provided'
        });
    } else {
        next();
    }
};

mdUsers.requireLoginData = (req, res, next) => {
    const fullname = req.body.usr_full_name;
    const password = req.body.usr_password;

    if(typeof(fullname) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the username provided'
        });
    } else if (typeof(password) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the password provided'
        });
    } else {
        next();
    }
};

mdUsers.isDataValid = async (req, res, next) => {
    const userName = req.body.usr_full_name;
    const email = req.body.usr_password;

    const isUserNameValid = await database.usersModel.findOne({
        where: { usr_full_name: userName }
    }).catch(err => catchDatabaseEror(err, res));

    const isEmailValid = await database.usersModel.findOne({
        where: { usr_email: email }
    }).catch(err => catchDatabaseEror(err, res));

    if(isUserNameValid) {
        res.status(500).json({
            message: 'This username is already registered.'
        });
    } else if (isEmailValid) {
        res.status(500).json({
            message: 'This email is already registered.'
        });
    } else {
        next();
    }
};


mdUsers.userRol = (req, res, next) => {
    console.log(res.locals.userLogged.admin === 1);

    if(res.locals.userLogged.admin === 0) {
        res.status(403).json({
            message: 'Permition denied.'
        });
    } else {
        next();
    }
};

module.exports = mdUsers;