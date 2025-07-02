// backend/models/medicamento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Laboratorio = require('./laboratorio'); // Importa el modelo Laboratorio

// Define el modelo para la tabla 'Medicamento'
const Medicamento = sequelize.define('Medicamento', {
  CodMedicamento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'CodMedicamento'
  },
  descripcionMed: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'descripcionMed'
  },
  fechaFabricacion: {
    type: DataTypes.DATEONLY, // Formato YYYY-MM-DD
    allowNull: false,
    field: 'fechaFabricacion'
  },
  fechaVencimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'fechaVencimiento'
  },
  Presentacion: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Presentacion'
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'stock'
  },
  precioVentaUni: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'precioVentaUni'
  },
  precioVentaPres: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'precioVentaPres'
  },
  CodTipoLab: { // Clave foránea a Laboratorio
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'CodTipoLab', // Nombre de la columna de la FK en la BD
    references: {
      model: Laboratorio, // Referencia al modelo Laboratorio
      key: 'CodLab'      // Clave primaria en Laboratorio
    }
  },
  Marca: {
    type: DataTypes.STRING,
    allowNull: true, // Asumiendo que la marca podría ser opcional
    field: 'Marca'
  },
  CodEspec: { // Clave foránea a Especialidad (no la usaremos en el CRUD principal, pero la incluimos)
    type: DataTypes.INTEGER,
    allowNull: true, // Asumiendo que la especialidad podría ser opcional
    field: 'CodEspec'
    // references: { // Si tuvieras el modelo Especialidad, lo referenciarías aquí
    //   model: Especialidad,
    //   key: 'CodEspec'
    // }
  }
}, {
  tableName: 'Medicamento', // Asegura que el nombre de la tabla en la BD sea 'Medicamento'
  timestamps: false // Deshabilita las columnas createdAt y updatedAt
});

// Define la relación: Un Medicamento pertenece a un Laboratorio
Medicamento.belongsTo(Laboratorio, {
  foreignKey: 'CodTipoLab', // La clave foránea en Medicamento
  as: 'laboratorio' // Alias para incluir el laboratorio asociado
});

// Define la relación inversa: Un Laboratorio puede tener muchos Medicamentos
Laboratorio.hasMany(Medicamento, {
  foreignKey: 'CodTipoLab',
  as: 'medicamentos'
});

module.exports = Medicamento;
