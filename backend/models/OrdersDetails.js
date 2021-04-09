const { DataTypes } = require ('sequelize');
const sequelize = require ('../database/dbConnector');
const pedidos = require('./Orders');
const productos = require('./Products');

const orderDetails = sequelize.define('orders_details', {
    od_quantity: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    od_order_id: {
        type: DataTypes.INTEGER,
        references: {
            model:pedidos,
            key:'order_id'
        }
        
    },
    od_product_id: {
        type: DataTypes.INTEGER,
        references: {
            model:productos,
            key:'prd_id_auto'
        }
    }
}, {
    timestamps: false
  });

module.exports = orderDetails;