const clienteService = require('../services/cliente.service');

exports.crearCliente = async (req, res) => {
  try {
    const cliente = await clienteService.crear(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await clienteService.obtenerTodos();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerClientePorId = async (req, res) => {
  try {
    const cliente = await clienteService.obtenerPorId(req.params.id);
    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.actualizarCliente = async (req, res) => {
  try {
    const cliente = await clienteService.actualizar(req.params.id, req.body);
    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.eliminarCliente = async (req, res) => {
  try {
    const cliente = await clienteService.eliminar(req.params.id);
    if (cliente) {
      res.json({ message: 'Cliente eliminado' });
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerClientesConTelefonos = async (req, res) => {
  try {
    const clientes = await clienteService.obtenerClientesConTelefonos();
    res.status(200).json(clientes);
  } catch (error) {
    console.error('Error en obtenerClientesConTelefonos:', error);
    res.status(500).json({ 
      message: error.message || 'Error al obtener clientes con teléfonos'
    });
  }
};

exports.obtenerTelefonosJacobCooper = async (req, res) => {
  try {
    const cliente = await clienteService.obtenerTelefonosJacobCooper();
    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerTelefonosConDatosCliente = async (req, res) => {
  try {
    const telefonos = await clienteService.obtenerTelefonosConDatosCliente();
    res.json(telefonos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerClientesConFacturas = async (req, res) => {
  try {
    const clientes = await clienteService.obtenerClientesConFacturas();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerClientesSinFacturas = async (req, res) => {
  try {
    const clientes = await clienteService.obtenerClientesSinFacturas();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerClientesConCantidadFacturas = async (req, res) => {
  try {
    const clientes = await clienteService.obtenerClientesConCantidadFacturas();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerGastoTotalPorCliente = async (req, res) => {
  try {
    const gastos = await clienteService.obtenerGastoTotalPorCliente();
    res.json(gastos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

