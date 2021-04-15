const database = require('../database/dbConnector');
const mdOrders = {};
const Products = require('../models/Products');
const { Op } = require("sequelize");

mdOrders.productAvailable = async (req, res, next) => {
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

module.exports = mdOrders;