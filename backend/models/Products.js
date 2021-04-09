const { DataTypes } = require ('sequelize');
const sequelize = require ('../database/dbConnector');

const productos = sequelize.define('products', {
    prd_name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    prd_price: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    prd_description: {
        type: DataTypes.STRING,
        allowNull:true
    },
    prd_image: {
        type: DataTypes.STRING,
        allowNull:false
    },
}, {
    timestamps: false
  });

module.exports = productos;