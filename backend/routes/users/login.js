const { Router } = require('express');
const router = Router();
const db = require("../../database/dbConnector");


const JWT = require('jsonwebtoken');
const JWTSign = 'mySUPERpass.12';
const Users = require('../../models/Users');
const { QueryTypes } = require("sequelize");
const mdUsers = require('../../middlewares/mdUsers');
const mdGlobal = require('../../middlewares/mdGlobal');


router.post('/', mdGlobal.checkEmptyBody, mdUsers.requireDataSendend, async (req, res) => {
    const {usr_full_name, usr_password} = req.body;

    const userFound = await Users.usersModel.findOne({
        where: { usr_full_name: usr_full_name, usr_password: usr_password }
    }).catch(err => catchDatabaseEror(err, res));

    if(!userFound) {
        const usrMail = await Users.usersModel.findOne({
            where: { usr_email: usr_full_name, usr_password: usr_password }
        }).catch(err => catchDatabaseEror(err, res));

        if(!usrMail) {
            res.status(404).json({
                message: 'Username or password invalid.'
            });
        } else {
            res.locals.userLogged = usrMail;
            const token = await JWT.sign({ usr_id: usrMail.usr_id, usr_name: usrMail.usr_full_name, admin: usrMail.usr_admin_flag }, JWTSign);
    
            res.status(200).json({
                message: 'Successfully logged in.',
                token
            });
        }        
    } else {
        res.locals.userLogged = userFound;
        const token = await JWT.sign({ usr_id: userFound.usr_id, usr_name: userFound.usr_full_name, admin: userFound.usr_admin_flag }, JWTSign);

        res.status(200).json({
            message: 'Successfully logged in.',
            token
        });
    }
});

module.exports = router