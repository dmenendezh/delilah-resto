const { Router } = require('express');
const router = Router();
const Products = require('../../models/Products');


router.post('/', async (req, res) => {
    const prdData = req.body;
    console.log(prdData);
    
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

module.exports = router