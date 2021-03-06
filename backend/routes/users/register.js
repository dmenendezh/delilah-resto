const { Router } = require('express');
const router = Router();
const Users = require('../../models/Users');
const mdUsers = require('../../middlewares/mdUsers');
const mdGlobal = require('../../middlewares/mdGlobal');



router.post('/',  mdGlobal.checkEmptyBody, mdUsers.checkRequiredData, mdUsers.isDataValid, async (req, res) => {
    const userData = req.body;
    
    const newUser = await Users.usersModel.create(userData)
    .catch(err => {
        console.log('Unable to create user.');
        res.status(500).json({
            message: 'There was a problem with the database.',
            error: err
        });
    });

    res.status(201).json({
        message: 'User created.',
        newUser
    });
});

module.exports = router