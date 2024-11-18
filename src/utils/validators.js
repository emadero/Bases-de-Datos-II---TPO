// src/utils/validators.js
const { body, validationResult } = require('express-validator');

exports.validateCliente = [
  body('numero').isInt().withMessage('El número debe ser un entero'),
  body('nombre').trim().isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  body('apellido').trim().isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
  body('direccion').trim().notEmpty().withMessage('La dirección es requerida'),
  body('telefonos').isArray().withMessage('Los teléfonos deben ser un array'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateProducto = [
  body('codigo').trim().notEmpty().withMessage('El código es requerido'),
  body('nombre').trim().notEmpty().withMessage('El nombre es requerido'),
  body('marca').trim().notEmpty().withMessage('La marca es requerida'),
  body('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
