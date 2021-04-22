const { Router } = require('express');
const router = Router();
const Users = require('../../models/Users');
const mdGlobal = require('../../middlewares/mdGlobal');
const mdUsers = require('../../middlewares/mdUsers');

router.get('/:id',  mdGlobal.validateToken, mdUsers.userRol, async (req, res) => {
    const usr = await Users.usersModel.findAll({ where: { usr_id: req.params.id }})
    .catch(err => throwException(err, res));

    res.status(200).json({
        message: 'Returning user.',
        quantity: usr.length,
        usr
    });
});

const throwException = (err, res) => {
    res.status(500).json({
        message: 'There was a problem with the database.',
        error: err
    });
};


module.exports = router