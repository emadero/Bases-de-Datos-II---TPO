const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');
const { validateProducto } = require('../utils/validators');

router.post('/', validateProducto, productoController.crearProducto);
router.get('/', productoController.obtenerProductos);
router.get('/:id', productoController.obtenerProductoPorId);
router.put('/:id', validateProducto, productoController.actualizarProducto);

router.get('/report/facturados', productoController.obtenerProductosFacturados);
router.get('/report/no-facturados', productoController.obtenerProductosNoFacturados);

module.exports = router;