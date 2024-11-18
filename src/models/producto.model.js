// src/models/producto.model.js
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true
  },
  nombre: {
    type: String,
    required: true
  },
  marca: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  descripcion: String
}, {
  timestamps: true
});

productoSchema.index({ codigo: 1 }, { unique: true });
productoSchema.index({ marca: 1 });

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;