const mongoose = require('mongoose');

const facturaSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true,
    unique: true
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now
  },
  cliente_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  items: [{
    producto_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
      required: true
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1
    },
    precio_unitario: {
      type: Number,
      required: true,
      min: 0
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  iva: {
    type: Number,
    required: true,
    min: 0
  },
  descuento: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

facturaSchema.index({ fecha: -1 });
facturaSchema.index({ cliente_id: 1 });
facturaSchema.index({ numero: 1 }, { unique: true });

const Factura = mongoose.model('Factura', facturaSchema);

module.exports = Factura;