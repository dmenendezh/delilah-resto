const { DataTypes } = require ('sequelize');
const sequelize = require ('../database/dbConnector');

const ordersModel = sequelize.define('orders', {
    order_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true
    },
    order_user: {
        type: DataTypes.STRING,
        allowNull:false
    },
    order_total_price: {
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    order_date: {
        type: DataTypes.DATE,
        allowNull:false
    },
    order_status: {
        type: DataTypes.STRING,
        allowNull:false
    },
    order_payment_type: {
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
    timestamps: false
  });

module.exports = {sequelize, ordersModel};