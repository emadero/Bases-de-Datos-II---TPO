const Cliente = require('../models/cliente.model');

class ClienteService {
  async crear(data) {
    try {
      const cliente = new Cliente(data);
      return await cliente.save();
    } catch (error) {
      throw new Error(`Error al crear cliente: ${error.message}`);
    }
  }

  async obtenerTodos() {
    try {
      return await Cliente.find();
    } catch (error) {
      throw new Error(`Error al obtener clientes: ${error.message}`);
    }
  }

  async obtenerPorId(id) {
    try {
      return await Cliente.findById(id);
    } catch (error) {
      throw new Error(`Error al obtener cliente: ${error.message}`);
    }
  }

  async actualizar(id, data) {
    try {
      return await Cliente.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw new Error(`Error al actualizar cliente: ${error.message}`);
    }
  }

  async eliminar(id) {
    try {
      return await Cliente.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error al eliminar cliente: ${error.message}`);
    }
  }

  async obtenerClientesConTelefonos() {
    try {
      const clientes = await Cliente.find().select('nombre apellido telefonos');
      if (!clientes) {
        throw new Error('No se encontraron clientes');
      }
      return clientes;
    } catch (error) {
      throw new Error(`Error al obtener clientes con teléfonos: ${error.message}`);
    }
  }

  async obtenerTelefonosJacobCooper() {
    try {
      return await Cliente.findOne({
        nombre: "Jacob",
        apellido: "Cooper"
      }).select('numero telefonos');
    } catch (error) {
      throw new Error(`Error al obtener teléfonos: ${error.message}`);
    }
  }

  async obtenerTelefonosConDatosCliente() {
    try {
      const clientes = await Cliente.find();
      return clientes.flatMap(cliente => 
        cliente.telefonos.map(telefono => ({
          telefono,
          cliente: {
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            numero: cliente.numero
          }
        }))
      );
    } catch (error) {
      throw new Error(`Error al obtener teléfonos con datos: ${error.message}`);
    }
  }

  async obtenerClientesConFacturas() {
    try {
      return await Cliente.aggregate([
        {
          $lookup: {
            from: 'facturas',
            localField: '_id',
            foreignField: 'cliente_id',
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
      throw new Error(`Error al obtener clientes con facturas: ${error.message}`);
    }
  }

  async obtenerClientesSinFacturas() {
    try {
      return await Cliente.aggregate([
        {
          $lookup: {
            from: 'facturas',
            localField: '_id',
            foreignField: 'cliente_id',
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
      throw new Error(`Error al obtener clientes sin facturas: ${error.message}`);
    }
  }

  async obtenerClientesConCantidadFacturas() {
    try {
      return await Cliente.aggregate([
        {
          $lookup: {
            from: 'facturas',
            localField: '_id',
            foreignField: 'cliente_id',
            as: 'facturas'
          }
        },
        {
          $project: {
            nombre: 1,
            apellido: 1,
            cantidadFacturas: { $size: '$facturas' }
          }
        }
      ]);
    } catch (error) {
      throw new Error(`Error al obtener cantidad de facturas: ${error.message}`);
    }
  }

  async obtenerGastoTotalPorCliente() {
    try {
      return await Cliente.aggregate([
        {
          $lookup: {
            from: 'facturas',
            localField: '_id',
            foreignField: 'cliente_id',
            as: 'facturas'
          }
        },
        {
          $project: {
            nombre: 1,
            apellido: 1,
            gastoTotal: {
              $sum: '$facturas.total'
            }
          }
        }
      ]);
    } catch (error) {
      throw new Error(`Error al obtener gasto total: ${error.message}`);
    }
  }
}

module.exports = new ClienteService();