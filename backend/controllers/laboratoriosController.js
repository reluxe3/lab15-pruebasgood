// backend/controllers/laboratoriosController.js
const Laboratorio = require('../models/laboratorio');

exports.getAll = async (req, res) => {
  try {
    const laboratorios = await Laboratorio.findAll();
    res.json(laboratorios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
