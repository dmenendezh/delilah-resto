const { Router } = require('express');
const router = Router();
const Products = require('../../models/Products');

router.get('/', async (req, res) => {
    const products = await Products.productModel.findAll({})
    .catch(err => throwException(err, res));

    res.status(200).json({
        message: 'Returning all available products.',
        quantity: products.length,
        products
    });
});

const throwException = (err, res) => {
    res.status(500).json({
        message: 'There was a problem with the database.',
        error: err
    });
};


module.exports = router