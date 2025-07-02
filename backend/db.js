// backend/db.js
const { Sequelize } = require('sequelize');

// Configura la conexión a la base de datos 'bd_Farmacia'
const sequelize = new Sequelize('bd_Farmacia', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false // Desactiva los logs SQL en la consola
});

module.exports = sequelize;
