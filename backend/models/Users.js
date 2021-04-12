const { DataTypes } = require ('sequelize');
const sequelize = require ('../database/dbConnector');
const orders = require('./Orders');

const usersModel = sequelize.define('users', {
    usr_login: {
        type: DataTypes.STRING,
        allowNull:false,
        primaryKey: true
    },
    usr_full_name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    usr_phone: {
        type: DataTypes.STRING,
        allowNull:false
    },
    usr_address: {
        type: DataTypes.STRING,
        allowNull:false
    },
    usr_password: {
        type: DataTypes.STRING,
        allowNull:false
    },
    usr_email: {
        type: DataTypes.STRING,
        allowNull:false
    },
    usr_admin_flag: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
}, {
    timestamps: false
  });

/*usuarios.belongsTo(rol,{
    foreignKey:'rol_id'
});*/

usersModel.hasMany(orders,{
    foreignKey:'usr_login'
});

module.exports = {sequelize, usersModel};