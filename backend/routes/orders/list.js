const { Router } = require('express');
const router = Router();
const Orders = require('../../models/Orders');
const mdGlobal = require('../../middlewares/mdGlobal');
const mdUsers = require('../../middlewares/mdUsers');

router.get('/', mdGlobal.validateToken, mdUsers.userRol, async (req, res) => {
    const orders = await Orders.ordersModel.findAll({})
    .catch(err => throwException(err, res));

    res.status(200).json({
        message: 'Returning all available orders.',
        quantity: orders.length,
        orders
    });
});

const throwException = (err, res) => {
    res.status(500).json({
        message: 'There was a problem with the database.',
        error: err
    });
};


module.exports = router