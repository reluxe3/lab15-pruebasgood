// backend/controllers/medicamentosController.js
const Medicamento = require('../models/medicamento');
const Laboratorio = require('../models/laboratorio'); // Importa el modelo Laboratorio

// Obtener todos los medicamentos, incluyendo su laboratorio asociado
exports.getAll = async (req, res) => {
  try {
    const medicamentos = await Medicamento.findAll({
      include: [{
        model: Laboratorio,
        as: 'laboratorio', // Usa el alias definido en el modelo Medicamento
        attributes: ['CodLab', 'razonSocial'] // Solo incluye estos atributos del laboratorio
      }]
    });
    res.json(medicamentos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un medicamento por su ID, incluyendo su laboratorio
exports.getOne = async (req, res) => {
  try {
    const medicamento = await Medicamento.findByPk(req.params.CodMedicamento, {
      include: [{
        model: Laboratorio,
        as: 'laboratorio',
        attributes: ['CodLab', 'razonSocial']
      }]
    });
    if (!medicamento) return res.status(404).json({ message: 'Medicamento no encontrado' });
    res.json(medicamento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo medicamento
exports.create = async (req, res) => {
  try {
    const nuevoMedicamento = await Medicamento.create(req.body);
    res.status(201).json(nuevoMedicamento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un medicamento existente
exports.update = async (req, res) => {
  try {
    const [numFilasActualizadas] = await Medicamento.update(req.body, {
      where: { CodMedicamento: req.params.CodMedicamento }
    });
    if (numFilasActualizadas === 0) return res.status(404).json({ message: 'Medicamento no encontrado o sin cambios' });
    res.json({ message: 'Medicamento actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un medicamento
exports.remove = async (req, res) => {
  try {
    const eliminado = await Medicamento.destroy({
      where: { CodMedicamento: req.params.CodMedicamento }
    });
    if (!eliminado) return res.status(404).json({ message: 'Medicamento no encontrado' });
    res.status(204).send(); // No content for successful deletion
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
