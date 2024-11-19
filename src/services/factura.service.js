const Factura = require('../models/factura.model');
const Cliente = require('../models/cliente.model');

class FacturaService {

  async crear(data) {
    try {
      data.iva = data.subtotal * 0.21; // 21% IVA
      data.total = data.subtotal + data.iva;
      
      const factura = new Factura(data);
      return await factura.save();
    } catch (error) {
      throw new Error(`Error al crear factura: ${error.message}`);
    }
  }

  async obtenerTodos() {
    try {
      return await Factura.find()
        .populate('cliente_id')
        .populate('items.producto_id');
    } catch (error) {
      throw new Error(`Error al obtener facturas: ${error.message}`);
    }
  }

  async obtenerPorId(id) {
    try {
      return await Factura.findById(id)
        .populate('cliente_id')
        .populate('items.producto_id');
    } catch (error) {
      throw new Error(`Error al obtener factura: ${error.message}`);
    }
  }

  async obtenerFacturasKaiBullock() {
    try {
      const cliente = await Cliente.findOne({
        nombre: "Kai",
        apellido: "Bullock"
      });

      if (!cliente) {
        throw new Error('Cliente no encontrado');
      }

      return await Factura.find({ cliente_id: cliente._id })
        .populate('items.producto_id');
    } catch (error) {
      throw new Error(`Error al obtener facturas: ${error.message}`);
    }
  }

  async obtenerFacturasProductosIpsum() {
    try {
      return await Factura.aggregate([
        {
          $lookup: {
            from: 'productos',
            localField: 'items.producto_id',
            foreignField: '_id',
            as: 'productos'
          }
        },
        {
          $match: {
            'productos.marca': 'Ipsum'
          }
        }
      ]);
    } catch (error) {
      throw new Error(`Error al obtener facturas Ipsum: ${error.message}`);
    }
  }

  async obtenerFacturasOrdenadasPorFecha() {
    try {
      return await Factura.find()
        .sort({ fecha: -1 })
        .populate('cliente_id')
        .populate('items.producto_id');
    } catch (error) {
      throw new Error(`Error al obtener facturas ordenadas: ${error.message}`);
    }
  }

  async obtenerFacturasPorCliente(clienteId) {
    try {
      return await Factura.find({ cliente_id: clienteId })
        .populate('items.producto_id')
        .sort({ fecha: -1 });
    } catch (error) {
      throw new Error(`Error al obtener facturas del cliente: ${error.message}`);
    }
  }

  async calcularTotales(items) {
    try {
      const subtotal = items.reduce((total, item) => 
        total + (item.precio_unitario * item.cantidad), 0);
      const iva = subtotal * 0.21;
      const total = subtotal + iva;
      
      return { subtotal, iva, total };
    } catch (error) {
      throw new Error(`Error al calcular totales: ${error.message}`);
    }
  }
}

module.exports = new FacturaService();

