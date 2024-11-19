const Producto = require('../models/producto.model');

class ProductoService {

  async crear(data) {
    try {
      const producto = new Producto(data);
      return await producto.save();
    } catch (error) {
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  }

  async obtenerTodos() {
    try {
      return await Producto.find();
    } catch (error) {
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  }

  async obtenerPorId(id) {
    try {
      return await Producto.findById(id);
    } catch (error) {
      throw new Error(`Error al obtener producto: ${error.message}`);
    }
  }

  async actualizar(id, data) {
    try {
      return await Producto.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw new Error(`Error al actualizar producto: ${error.message}`);
    }
  }


  async obtenerProductosFacturados() {
    try {
      return await Producto.aggregate([
        {
          $lookup: {
            from: 'facturas',
            let: { productoId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ['$$productoId', '$items.producto_id']
                  }
                }
              }
            ],
            as: 'facturas'
          }
        },
        {
          $match: {
            'facturas.0': { $exists: true }
          }
        }
      ]);
    } catch (error) {
      throw new Error(`Error al obtener productos facturados: ${error.message}`);
    }
  }

  async obtenerProductosNoFacturados() {
    try {
      return await Producto.aggregate([
        {
          $lookup: {
            from: 'facturas',
            let: { productoId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ['$$productoId', '$items.producto_id']
                  }
                }
              }
            ],
            as: 'facturas'
          }
        },
        {
          $match: {
            'facturas': { $size: 0 }
          }
        }
      ]);
    } catch (error) {
      throw new Error(`Error al obtener productos no facturados: ${error.message}`);
    }
  }

  async verificarStock(productoId, cantidad) {
    try {
      const producto = await this.obtenerPorId(productoId);
      if (!producto) {
        throw new Error('Producto no encontrado');
      }
      return true;
    } catch (error) {
      throw new Error(`Error al verificar stock: ${error.message}`);
    }
  }
}

module.exports = new ProductoService();

