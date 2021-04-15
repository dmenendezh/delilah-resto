const database = require('../database/dbConnector');
const mdOrders = {};
const Products = require('../models/Products');
const { Op } = require("sequelize");

mdOrders.checkProducts = async (req, res, next) => {
    const arrProducts = req.body.arrProducts;
    const arrProductsId = arrProducts.map(product => product.product_id);

    const products = await Products.productModel.findAll({
        where: {
            prd_id_auto: {
              [Op.or]: arrProductsId
            }
        }
    });

    if(arrProducts.length !== products.length) {
        res.status(404).json({
            message: 'Some products are not available.'
        });
    } else {
        res.locals.products = products;
        next();
    }
}

mdOrders.checkDataSended = async (req, res, next) => {
    const payment_type = req.body.order_payment_type;
    const arrProducts = req.body.arrProducts;

    if(typeof(payment_type) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the payment type.'
        });
    } else if(!Array.isArray(arrProducts) || arrProducts.length === 0) {
        res.status(400).json({
            message: 'Empty order.'
        });
    } else {
        next();
    }
}

mdOrders.checkStatusSendend = (req, res, next) => {
    const status = req.body.order_status;
    console.log(status);
    if(typeof(status) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the state provided'
        });
    } else {
        const possibleStatus = ['Nuevo', 'Confirmado', 'Preparando', 'Enviando', 'Entregado'];
        if(possibleStatus.includes(status)){
            next();
        }else{
            res.status(400).json({
                message: 'Invalid status sendend. Possibles: Nuevo, Confirmado, Preparando, Enviando, Entregado'
            });
        }
        
    }
};

module.exports = mdOrders;