const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const db = require("../../database/dbConnector");


const { QueryTypes } = require("sequelize");

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

module.exports = router