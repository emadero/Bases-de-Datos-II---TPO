// src/controllers/producto.controller.js
const productoService = require('../services/producto.service');

// CRUD Básico
exports.crearProducto = async (req, res) => {
  try {
    const producto = await productoService.crear(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await productoService.obtenerTodos();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await productoService.obtenerPorId(req.params.id);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.actualizarProducto = async (req, res) => {
  try {
    const producto = await productoService.actualizar(req.params.id, req.body);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Requerimientos específicos
exports.obtenerProductosFacturados = async (req, res) => {
  try {
    const productos = await productoService.obtenerProductosFacturados();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerProductosNoFacturados = async (req, res) => {
  try {
    const productos = await productoService.obtenerProductosNoFacturados();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
