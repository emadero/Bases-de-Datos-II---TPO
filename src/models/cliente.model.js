// src/models/cliente.model.js
const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  numero: { 
    type: Number, 
    required: true, 
    unique: true 
  },
  nombre: { 
    type: String, 
    required: true 
  },
  apellido: { 
    type: String, 
    required: true 
  },
  direccion: { 
    type: String, 
    required: true 
  },
  telefonos: [{ 
    type: String,
    required: true 
  }]
});

module.exports = mongoose.model('Cliente', clienteSchema);