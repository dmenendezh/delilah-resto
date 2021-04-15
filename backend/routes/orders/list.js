const { Router } = require('express');
const router = Router();
const Orders = require('../../models/Orders');
const mdGlobal = require('../../middlewares/mdGlobal');
const mdUsers = require('../../middlewares/mdUsers');

router.get('/', mdGlobal.validateToken, async (req, res) => {
  
    if(res.locals.userLogged.admin === 1){//list all orders if is an admin user
        const orders = await Orders.ordersModel.findAll({})
        .catch(err => throwException(err, res));
    
        res.status(200).json({
            message: 'Returning all orders:',
            quantity: orders.length,
            orders
        });
    }else{//list user order 

        const user_id = res.locals.userLogged.usr_id;

        const orders = await Orders.ordersModel.findAll({
            where: {order_user: user_id}
        }).catch(err => throwException(err, res));

        res.status(200).json({
            message: 'User orders:',
            quantity: orders.length,
            orders
        });
    }    
});

const throwException = (err, res) => {
    res.status(500).json({
        message: 'There was a problem with the database.',
        error: err
    });
};


module.exports = router