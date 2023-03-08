const { Router } = require('express');
// Importar todos los routers;
const { dogRouter } = require('./dogRouter.js');
const { tempRouter } = require('./tempRouter.js');

const router = Router();

// Configurar los routers
router.use('/dogs', dogRouter);
router.use('/temp', tempRouter);

module.exports = { router };
