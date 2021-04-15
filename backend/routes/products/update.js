const { Router } = require('express');
const router = Router();
const Products = require('../../models/Products');
const mdGlobal = require('../../middlewares/mdGlobal');
const mdUsers = require('../../middlewares/mdUsers');

router.put('/:id', mdGlobal.validateToken, mdGlobal.checkEmptyBody, mdUsers.userRol, async (req, res) => {
    const name = req.body.prd_name;
    const price = req.body.prd_price;
    const description = req.body.prd_description;
    const urlImage = req.body.prd_image;

    console.log(req.params);
    console.log(name);

    const updatedPrd = await Products.productModel
    .update({ prd_name: name, prd_price: price, prd_description: description, prd_image: urlImage }, { where: { prd_id_auto: req.params.id } })
    .catch(err => throwException(err, res));

    res.status(201).json({
        message: 'Products updated:',
        updatedPrd
    });
});

const throwException = (err, res) => {
    res.status(500).json({
        message: 'There was a problem with the database.',
        error: err
    });
};

module.exports = router;