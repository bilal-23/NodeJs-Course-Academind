// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete',
//     password: '1234'
// });

// module.exports = pool.promise();

const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('node-complete', 'root', '1234', { dialect: 'mysql', host: 'localhost' });

module.exports = sequelize;
