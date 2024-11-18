db = db.getSiblingDB('facturacion');

// Crear colecciones
db.createCollection('clientes');
db.createCollection('productos');
db.createCollection('facturas');

// Crear índices
db.clientes.createIndex({ "nombre": 1, "apellido": 1 });
db.productos.createIndex({ "codigo": 1 }, { unique: true });
db.facturas.createIndex({ "fecha": 1 });
db.facturas.createIndex({ "cliente_id": 1 });

// Insertar datos de prueba
db.clientes.insertMany([
  {
    numero: 1,
    nombre: "Jacob",
    apellido: "Cooper",
    direccion: "123 Main St",
    telefonos: ["555-0123", "555-0124"]
  },
  {
    numero: 2,
    nombre: "Kai",
    apellido: "Bullock",
    direccion: "456 Oak Ave",
    telefonos: ["555-0125"]
  }
]);

db.productos.insertMany([
  {
    codigo: "P001",
    nombre: "Producto 1",
    marca: "Ipsum",
    precio: 100.00,
    descripcion: "Descripción producto 1"
  },
  {
    codigo: "P002",
    nombre: "Producto 2",
    marca: "Lorem",
    precio: 200.00,
    descripcion: "Descripción producto 2"
  }
]);