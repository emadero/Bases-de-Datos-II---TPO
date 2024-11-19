const express = require('express');
const router = express.Router();
const { 
  crearFactura, 
  obtenerFacturas, 
  obtenerFacturaPorId,
  obtenerFacturasKaiBullock,
  obtenerFacturasProductosIpsum,
  obtenerFacturasOrdenadasPorFecha,
  obtenerFacturasPorCliente 
} = require('../controllers/factura.controller');


router.post('/', crearFactura);
router.get('/', obtenerFacturas);
router.get('/:id', obtenerFacturaPorId);
router.get('/cliente/kai-bullock', obtenerFacturasKaiBullock);
router.get('/productos/ipsum', obtenerFacturasProductosIpsum);
router.get('/ordenadas/fecha', obtenerFacturasOrdenadasPorFecha);
router.get('/cliente/:clienteId', obtenerFacturasPorCliente);

module.exports = router;