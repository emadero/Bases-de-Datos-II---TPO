// src/routes/cliente.routes.js
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');
const { validateCliente } = require('../utils/validators');

// CRUD básico
router.post('/', validateCliente, clienteController.crearCliente);
router.get('/', clienteController.obtenerClientes);
router.get('/:id', clienteController.obtenerClientePorId);
router.put('/:id', validateCliente, clienteController.actualizarCliente);
router.delete('/:id', clienteController.eliminarCliente);

// Requerimientos específicos
router.get('/telefonos/todos', clienteController.obtenerClientesConTelefonos);  // Req 1
router.get('/buscar/jacob-cooper', clienteController.obtenerTelefonosJacobCooper);  // Req 2
router.get('/telefonos/con-datos', clienteController.obtenerTelefonosConDatosCliente);  // Req 3
router.get('/report/con-facturas', clienteController.obtenerClientesConFacturas);  // Req 4
router.get('/report/sin-facturas', clienteController.obtenerClientesSinFacturas);  // Req 5
router.get('/report/cantidad-facturas', clienteController.obtenerClientesConCantidadFacturas);  // Req 6
router.get('/report/gasto-total', clienteController.obtenerGastoTotalPorCliente);  // Req 10

module.exports = router;