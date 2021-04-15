const Orders = require("./Orders");
const OrdersDetails = require("./OrdersDetails");
const Products = require("./Products");
const Users = require("./Users");


Users.hasMany(Orders,{
    foreignKey:'usr_id'
});

Orders.belongsTo(Users,{
    foreignKey: 'usr_id'
});

Orders.belongsToMany(Products, {
    as: 'orders_details',
    through: OrdersDetails,
    foreignKey: 'order_id'
});


module.exports = { Users,Products,Orders,OrderDetails};