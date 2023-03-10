const { Router } = require('express');
// Importar todos los routers;
const { dogRouter } = require('./dogRouter');
const { tempRouter } = require('./tempRouter');

const router = Router();

// Configurar los routers
router.use('/dogs', dogRouter);
router.use('/temp', tempRouter);

module.exports = router;
