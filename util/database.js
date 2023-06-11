const Sequelize = require('sequelize');

const sequelize = new Sequelize('candy-shop', 'root', 'Sagar@549412', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;