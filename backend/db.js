const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('semana15', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;