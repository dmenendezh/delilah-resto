const { Router } = require('express');
const router = Router();
const Orders = require('../../models/Orders');


router.post('/', async (req, res) => {
    const orderData = req.body;
    
    const newOrder = await Orders.ordersModel.create(orderData)
    .catch(err => {
        console.log('Unable to create the order.');
        throwException(err, res);
    });

    res.status(201).json({
        message: 'Order created.',
        newOrder
    });
});

const throwException = (err, res) => {
    res.status(500).json({
        message: 'There was a problem with the database.',
        error: err
    });
};

module.exports = router;