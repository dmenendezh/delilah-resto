const { DataTypes } = require ('sequelize');
const sequelize = require ('../database/dbConnector');
const formasPago = require('./PaymentType');
const ordersDetails = require('./OrdersDetails.js');
const productos = require('./Products');


const pedidos = sequelize.define('orders', {
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
        allowNull:true
    },
    order_status: {
        type: DataTypes.STRING,
        allowNull:true
    },
    order_payment_type: {
        type: DataTypes.STRING,
        allowNull:true
    }
}, {
    timestamps: false
  });

pedidos.belongsToMany(productos, {
    through: ordersDetails
});


module.exports = pedidos;