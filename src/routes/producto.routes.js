// src/routes/producto.routes.js
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');
const { validateProducto } = require('../utils/validators');

// CRUD básico
router.post('/', validateProducto, productoController.crearProducto);
router.get('/', productoController.obtenerProductos);
router.get('/:id', productoController.obtenerProductoPorId);
router.put('/:id', validateProducto, productoController.actualizarProducto);

// Requerimientos específicos
router.get('/report/facturados', productoController.obtenerProductosFacturados);     // Req 8
router.get('/report/no-facturados', productoController.obtenerProductosNoFacturados); // Req 12

module.exports = router;