// backend/index.js (Actualización)
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const Medicamento = require('./models/medicamento');
const Laboratorio = require('./models/laboratorio');
const medicamentosRoutes = require('./routes/medicamentosRoutes');
const laboratoriosRoutes = require('./routes/laboratoriosRoutes'); // Importa las rutas de laboratorio

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/medicamentos', medicamentosRoutes);
app.use('/api/laboratorios', laboratoriosRoutes); // Usa las rutas de laboratorios

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos sincronizada correctamente.');

    // Opcional: Insertar algunos datos de ejemplo si las tablas están vacías
    return Laboratorio.count().then(laboratorioCount => {
      if (laboratorioCount === 0) {
        console.log('Insertando datos de ejemplo en Laboratorio...');
        return Laboratorio.bulkCreate([
          { razonSocial: 'Laboratorios A S.A.', direccion: 'Calle Falsa 123', telefono: '111-222', email: 'a@lab.com', contacto: 'Juan Perez' },
          { razonSocial: 'PharmaCorp Ltda.', direccion: 'Av. Siempre Viva 45', telefono: '333-444', email: 'p@pharm.com', contacto: 'Maria Gomez' },
        ]);
      }
    }).then(() => Medicamento.count()).then(medicamentoCount => {
      if (medicamentoCount === 0) {
        console.log('Insertando datos de ejemplo en Medicamento...');
        return Medicamento.bulkCreate([
          { descripcionMed: 'Paracetamol 500mg', fechaFabricacion: '2023-01-15', fechaVencimiento: '2025-01-15', Presentacion: 'Caja x 10', stock: 100, precioVentaUni: 0.50, precioVentaPres: 5.00, CodTipoLab: 1, Marca: 'Generico' },
          { descripcionMed: 'Ibuprofeno 400mg', fechaFabricacion: '2023-03-20', fechaVencimiento: '2026-03-20', Presentacion: 'Blister x 20', stock: 75, precioVentaUni: 0.75, precioVentaPres: 15.00, CodTipoLab: 2, Marca: 'Doloral' },
          { descripcionMed: 'Amoxicilina 250mg', fechaFabricacion: '2023-05-10', fechaVencimiento: '2025-05-10', Presentacion: 'Frasco jarabe', stock: 50, precioVentaUni: 8.00, precioVentaPres: 8.00, CodTipoLab: 1, Marca: 'Antibiotico' },
        ]);
      }
    });
  })
  .then(() => {
    app.listen(3001, () => {
      console.log('Backend de Farmacia corriendo en http://localhost:3001');
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos o iniciar servidor:', err);
  });
