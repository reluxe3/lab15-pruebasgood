// backend/routes/laboratoriosRoutes.js
const express = require('express');
const router = express.Router();
const laboratoriosController = require('../controllers/laboratoriosController');

router.get('/', laboratoriosController.getAll);

module.exports = router;
