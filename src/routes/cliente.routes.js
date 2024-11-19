const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');
const { validateCliente } = require('../utils/validators');

router.post('/', validateCliente, clienteController.crearCliente);
router.get('/', clienteController.obtenerClientes);
router.get('/:id', clienteController.obtenerClientePorId);
router.put('/:id', validateCliente, clienteController.actualizarCliente);
router.delete('/:id', clienteController.eliminarCliente);

router.get('/telefonos/todos', clienteController.obtenerClientesConTelefonos);
router.get('/buscar/jacob-cooper', clienteController.obtenerTelefonosJacobCooper);
router.get('/telefonos/con-datos', clienteController.obtenerTelefonosConDatosCliente);
router.get('/report/con-facturas', clienteController.obtenerClientesConFacturas);
router.get('/report/sin-facturas', clienteController.obtenerClientesSinFacturas);
router.get('/report/cantidad-facturas', clienteController.obtenerClientesConCantidadFacturas);
router.get('/report/gasto-total', clienteController.obtenerGastoTotalPorCliente);

module.exports = router;