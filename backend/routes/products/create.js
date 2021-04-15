const { Router } = require('express');
const router = Router();
const Products = require('../../models/Products');
const mdGlobal = require('../../middlewares/mdGlobal');
const mdUsers = require('../../middlewares/mdUsers');
const mdProducts = require('../../middlewares/mdProducts');


router.post('/', mdGlobal.validateToken, mdGlobal.checkEmptyBody, mdUsers.userRol, mdProducts.checkDataSended, async (req, res) => {
    const prdData = req.body;
    
    const newProduct = await Products.productModel.create(prdData)
    .catch(err => {
        console.log('Unable to create product.');
        throwException(err, res);
    });

    res.status(201).json({
        message: 'Product created.',
        newProduct
    });
});


const throwException = (err, res) => {
    res.status(500).json({
        message: 'There was a problem with the database.',
        error: err
    });
};

module.exports = router;