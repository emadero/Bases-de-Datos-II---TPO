// src/controllers/factura.controller.js
const facturaService = require('../services/factura.service');

exports.crearFactura = async (req, res) => {
  try {
    const factura = await facturaService.crear(req.body);
    res.status(201).json(factura);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.obtenerFacturas = async (req, res) => {
  try {
    const facturas = await facturaService.obtenerTodos();
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerFacturaPorId = async (req, res) => {
  try {
    const factura = await facturaService.obtenerPorId(req.params.id);
    if (factura) {
      res.json(factura);
    } else {
      res.status(404).json({ message: 'Factura no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerFacturasKaiBullock = async (req, res) => {
  try {
    const facturas = await facturaService.obtenerFacturasKaiBullock();
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerFacturasProductosIpsum = async (req, res) => {
  try {
    const facturas = await facturaService.obtenerFacturasProductosIpsum();
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerFacturasOrdenadasPorFecha = async (req, res) => {
  try {
    const facturas = await facturaService.obtenerFacturasOrdenadasPorFecha();
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerFacturasPorCliente = async (req, res) => {
  try {
    const facturas = await facturaService.obtenerFacturasPorCliente(req.params.clienteId);
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

