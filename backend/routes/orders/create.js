const { Router } = require('express');
const router = Router();

const Orders = require('../../models/Orders');
const OD = require('../../models/OrdersDetails');

const mdGlobal = require('../../middlewares/mdGlobal');
const mdUsers = require('../../middlewares/mdUsers');
const mdOrders = require('../../middlewares/mdOrders');


router.post('/', mdGlobal.validateToken, mdGlobal.checkEmptyBody, mdOrders.checkDataSended, mdOrders.checkProducts, async (req, res) => {
    const userLogged = res.locals.userLogged;
    const dbProducts = res.locals.products;

    const newOrder = {
        order_total_price: calculateTotalPrice(dbProducts, req.body.arrProducts),
        order_payment_type: req.body.order_payment_type,
        order_status: 'Nuevo',
        order_date: new Date(),
        order_user: userLogged.usr_id
    }
   
    const newOrderDB = await Orders.ordersModel.create(newOrder)
    .catch(err => {
        console.log('Unable to create the order.' + err.message);
        throwException(err, res);
    });
  
    const newOrderId = newOrderDB.order_id;
    const arrayProducts = req.body.arrProducts;
    const arrOrderDetails = JSONOrdersDetails(newOrderId, dbProducts, arrayProducts);

    const orderProduct = await OD.orderDetailsModel.bulkCreate(arrOrderDetails, { returning: true })
    .catch(async err => {
        await Orders.ordersModel.destroy({ where: { od_order_id: newOrderId } })
        .catch(err => {
            res.status(500).json({
                message: 'Order cannot be removed.',
                err
            });
        });

        res.status(500).json({
            message: 'Order cannot be saved.',
            err
        });
    });

    res.status(201).json({
        message: 'Order created.',
        newOrderDB
    });
});

const throwException = (err, res) => {
    res.status(500).json({
        message: 'There was a problem with the database.',
        error: err
    });
};


/* - INTERNAL FUNCTIONS - */
function calculateTotalPrice(dbProducts, bodyProducts) {
    let total = 0;
    bodyProducts.forEach(bodyProduct => {
        product = dbProducts.find(dbProduct => dbProduct.prd_id_auto === bodyProduct.product_id);
        total = total + product.prd_price * bodyProduct.quantity;
    });
    return total;
}

function JSONOrdersDetails(orderId, dbProducts, bodyProducts) {
    let arrOrderDetails = [];

    for(let i = 0; i < bodyProducts.length; i++) {
        productFound = dbProducts.find(dbProduct => dbProduct.prd_id_auto === bodyProducts[i].product_id);
        console.log("productFound" + productFound);
        const productos = {
            od_quantity: bodyProducts[i].quantity,
            od_order_id: orderId,
            od_product_id: bodyProducts[i].product_id,
        }
        arrOrderDetails[i] = productos;
    }
    return arrOrderDetails;
}
/* - INTERNAL FUNCTIONS - */


module.exports = router;