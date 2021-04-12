const { DataTypes } = require ('sequelize');
const sequelize = require ('../database/dbConnector');

const productModel = sequelize.define('products', {
    prd_id_auto: {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true,
    },
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

module.exports = {sequelize, productModel};