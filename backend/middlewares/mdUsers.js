const database = require('../database/dbConnector');
const mdUsers = {};
const Users = require('../models/Users');

mdUsers.checkRequiredData = async (req, res, next) => {
    const fullName = req.body.usr_full_name;
    const usrPhone = req.body.usr_phone;
    const usrAddress = req.body.usr_address;
    const usrPassword = req.body.usr_password;

    const usr_admin_flag = req.body.usr_admin_flag;
    const usrEmail = req.body.usr_email;

    if(typeof(fullName) !== 'string') {
        res.status(400).json({
            message: 'Error with user sendend'
        });
    } else if (typeof(usr_admin_flag) !== 'number') {
        res.status(400).json({
            message: 'Error with admin flag sendend'
        });
    } else if (typeof(usrPassword) !== 'string') {
        res.status(400).json({
            message: 'Error with password sendend'
        });
    } else if (typeof(usrEmail) !== 'string') {
        res.status(400).json({
            message: 'Error with email sendend'
        });
    } else if (typeof(usrPhone) !== 'string') {
        res.status(400).json({
            message: 'Error with phone sendend'
        });
    } else if (typeof(usrAddress) !== 'string') {
        res.status(400).json({
            message: 'Error with address sendend'
        });
    } else {
        next();
    }
};

mdUsers.requireDataSendend = (req, res, next) => {
    const fullname = req.body.usr_full_name;
    const password = req.body.usr_password;

    if(typeof(fullname) !== 'string') {
        res.status(400).json({
            message: 'Error with name sendend'
        });
    } else if (typeof(password) !== 'string') {
        res.status(400).json({
            message: 'Error with password sendend'
        });
    } else {
        next();
    }
};

mdUsers.isDataValid = async (req, res, next) => {
    const user_name = req.body.usr_full_name;
    const usr_email = req.body.usr_email;

    const usernameExists = await Users.usersModel.findOne({
        where: { usr_full_name: user_name }
    }).catch(err => throwException(err, res));

    const usrEmailExists = await Users.usersModel.findOne({
        where: { usr_email: usr_email }
    }).catch(err => throwException(err, res));

    if(usernameExists) {
        res.status(500).json({
            message: 'This user already exists.'
        });
    } else if (usrEmailExists) {
        res.status(500).json({
            message: 'This user already exists.'
        });
    } else {
        next();
    }
};

const throwException = (err, res) => {
    res.status(500).json({
        message: 'There was a problem with the database.',
        error: err
    });
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