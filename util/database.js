const Sequelize = require('sequelize');

const sequelize = new Sequelize('candy-shop', 'root', '******', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;