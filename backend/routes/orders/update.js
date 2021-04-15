const { Router } = require('express');
const router = Router();
const Orders = require('../../models/Orders');
const mdGlobal = require('../../middlewares/mdGlobal');
const mdUsers = require('../../middlewares/mdUsers');
const mdOrders = require('../../middlewares/mdOrders');

router.put('/:id', mdGlobal.validateToken, mdGlobal.checkBody, mdOrders.checkStatusSendend, mdUsers.userRol, async (req, res) => {
    const order_status = req.body.order_status;

    const updatedOrder = await Orders.ordersModel
    .update({ order_status: order_status }, { where: { order_id: req.params.id } })
    .catch(err => catchDatabaseEror(err, res));

    res.status(200).json({
        message: 'Order updated.',
        updatedOrder
    });
});

const throwException = (err, res) => {
    res.status(500).json({
        message: 'There was a problem with the database.',
        error: err
    });
};

module.exports = router;