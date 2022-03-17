const Sequelize = require('sequelize').Sequelize;
const sequelize = require('../util/database');

const Order = sequelize.define('order', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    quantity : Sequelize.INTEGER,
})

module.exports = Order;