
const database = require('../database/dbConnector');
const mdProducts = {};


mdProducts.checkDataSended = (req, res, next) => {
    const prd_name = req.body.prd_name;
    const prd_description = req.body.prd_description;
    const prd_price = req.body.prd_price;
    const prd_image = req.body.prd_image;

    if(typeof(prd_name) !== 'string') {
        res.status(400).json({
            message: 'Error with name sendend'
        });
    } else if (typeof(prd_price) !== 'number') {
        res.status(400).json({
            message: 'Error with price sendend'
        });
    } else if (typeof(prd_description) !== 'string') {
        res.status(400).json({
            message: 'Error with description sendend'
        });
    }  else if (typeof(prd_image) !== 'string') {
        res.status(400).json({
            message: 'Error with image sendend'
        });
    } else {
        next();
    }
};

module.exports = mdProducts;