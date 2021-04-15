const { Router } = require('express');
const router = Router();
const Orders = require('../../models/Orders');

const mdGlobal = require('../../middlewares/mdGlobal');
const mdUsers = require('../../middlewares/mdUsers');
const mdOrders = require('../../middlewares/mdOrders');

router.delete('/:id', mdGlobal.validateToken, mdUsers.userRol, async (req, res) => {
    const deletedOrder = await Orders.ordersModel
    .destroy({ where: { order_id: req.params.id } })
    .catch(err => catchDatabaseEror(err, res));

    res.status(200).json({
        message: 'Order deleted.',
        deletedOrder
    });
});

const throwException = (err, res) => {
    res.status(500).json({
        message: 'There was a problem with the database.',
        error: err
    });
};

module.exports = router;