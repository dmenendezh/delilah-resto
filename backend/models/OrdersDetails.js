const { DataTypes } = require ('sequelize');
const sequelize = require ('../database/dbConnector');
const Orders = require('./Orders');
const Products = require('./Products');

const orderDetails = sequelize.define('orders_details', {
    od_quantity: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    od_order_id: {
        type: DataTypes.INTEGER,
        references: {
            model:Orders,
            key:'order_id'
        }
        
    },
    od_product_id: {
        type: DataTypes.INTEGER,
        references: {
            model:Products,
            key:'prd_id_auto'
        }
    }
}, {
    timestamps: false,
    underscored: true
  });

module.exports = orderDetails;