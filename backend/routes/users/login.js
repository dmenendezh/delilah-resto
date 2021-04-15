const { Router } = require('express');
const router = Router();
const db = require("../../database/dbConnector");


const JWT = require('jsonwebtoken');
const JWTSign = 'mySUPERpass.12';
const Users = require('../../models/Users');
const { QueryTypes } = require("sequelize");
/*
router.post('/', async (req, res) => {
    
    const {usr_full_name, usr_password} = req.body;
    
    const getUser = await db.query(
        `SELECT * FROM users WHERE usr_full_name = :username OR usr_email = :username`,
        {replacements: { username: usr_full_name }, type: db.QueryTypes.SELECT}

    ).catch((err) => {
        console.log('Error: ', err)
    });

    if(!getUser[0]) {
        return res.json({ message: 'Username or password does not match!'})
    }

    if(getUser[0].usr_password !== usr_password) {
        return res.json({ message: 'Username or password does not match!'})
    }
    const jwtToken = jwt.sign({usr_login: getUser[0].usr_login, usr_email: getUser[0].usr_email, admin: getUser[0].usr_admin_flag }, process.env.TOKENSECRET);

    res.json({ message: 'Welcome!', token: jwtToken });
});
*/

router.post('/', async (req, res) => {
    const {usr_full_name, usr_password} = req.body;

    const userFound = await Users.usersModel.findOne({
        where: { usr_full_name: usr_full_name, usr_password: usr_password }
    }).catch(err => catchDatabaseEror(err, res));

    console.log("userFound:" + userFound);
    if(!userFound) {
        const usrMail = await Users.usersModel.findOne({
            where: { usr_email: usr_full_name, usr_password: usr_password }
        }).catch(err => catchDatabaseEror(err, res));
        console.log("usrMail:" + usrMail);

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