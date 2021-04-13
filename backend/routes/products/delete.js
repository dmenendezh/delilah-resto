const { Router } = require('express');
const router = Router();
const Products = require('../../models/Products');

router.delete('/:id', async (req, res) => {
    const deletedPrd = await Products.productModel
    .destroy({ where: { prd_id_auto: req.params.id } })
    .catch(err => throwException(err, res));

    res.status(201).json({
        message: 'Products deleted:',
        deletedPrd
    });
});

const throwException = (err, res) => {
    res.status(500).json({
        message: 'There was a problem with the database.',
        error: err
    });
};

module.exports = router;