const Sequelize = require('sequelize').Sequelize;

const sequelize = require('../util/database');

const Cart=sequelize.define('cart',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    }
});

module.exports = Cart;