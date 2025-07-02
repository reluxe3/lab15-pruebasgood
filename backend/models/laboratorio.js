// backend/models/laboratorio.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// Define el modelo para la tabla 'Laboratorio'
const Laboratorio = sequelize.define('Laboratorio', {
  CodLab: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'CodLab' // Nombre de la columna en la BD
  },
  razonSocial: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'razonSocial'
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'direccion'
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'telefono'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'email'
  },
  contacto: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'contacto'
  }
}, {
  tableName: 'Laboratorio', // Asegura que el nombre de la tabla en la BD sea 'Laboratorio'
  timestamps: false // Deshabilita las columnas createdAt y updatedAt
});

module.exports = Laboratorio;
