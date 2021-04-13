const PaymentType = require("./PaymentType");
const Orders = require("./Orders");
const OrdersDetails = require("./OrdersDetails");
const Products = require("./Products");
const Users = require("./Users");


Users.hasMany(Orders,{
    foreignKey:'usr_login'
});

Orders.belongsTo(Users,{
    foreignKey: 'usr_login'
});

Orders.belongsToMany(Products, {
    through: OrdersDetails
});

Orders.belongsTo(PaymentType,{
    foreignKey: 'payment_type_id'
});


module.exports = { Users,Products,OrderDetails,Orders,PaymentType};