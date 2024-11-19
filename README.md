# Sistema de Facturación - TP Base de Datos II

## Descripción del Proyecto
Este proyecto implementa un sistema de facturación utilizando una arquitectura de persistencia políglota. El sistema permite gestionar clientes, productos y facturas, manteniendo un control de stock y calculando automáticamente los montos con IVA.

## Justificación de la Arquitectura

### MongoDB
Elegimos MongoDB como base de datos principal por:
- **Flexibilidad en el esquema**: Ideal para documentos como facturas que pueden tener un número variable de items
- **Consultas complejas**: Soporta agregaciones y lookups necesarios para los reportes solicitados
- **Escalabilidad**: Permite escalar horizontalmente si el volumen de datos crece
- **Índices**: Soporta índices compuestos y únicos para optimizar las consultas frecuentes

### Redis
Utilizamos Redis como complemento por:
- **Gestión de stock**: Operaciones atómicas para control de inventario en tiempo real
- **Cache**: Almacenamiento en memoria para acceso rápido a datos frecuentes
- **Performance**: Excelente para operaciones de lectura/escritura rápidas
- **Persistencia**: Configurado para mantener los datos en disco

## Estructura del Proyecto
```
facturacion-system/
├── docker/
│   ├── mongodb/
│   │   └── init-mongo.js     # Inicialización de MongoDB
│   └── docker-compose.yml    # Configuración de containers
├── src/
│   ├── config/              # Configuración de bases de datos
│   ├── controllers/         # Controladores de la API
│   ├── models/             # Modelos de datos
│   ├── routes/             # Rutas de la API
│   ├── services/           # Lógica de negocio
│   ├── utils/              # Utilidades y helpers
│   └── app.js             # Entrada de la aplicación
├── .env                    # Variables de entorno
└── package.json           # Dependencias
```

## Requerimientos Implementados

### 1. Gestión de Clientes
- Almacenamiento en MongoDB para datos estructurados
- Cache en Redis para acceso rápido
- CRUD completo de clientes

### 2. Control de Stock
- Gestión atómica en Redis para evitar race conditions
- Verificación automática en cada venta
- Actualización en tiempo real

### 3. Facturación
- Cálculo automático de IVA (21%)
- Gestión de descuentos
- Validación de stock
- Transacciones atómicas

## Configuración Inicial

1. **Requisitos Previos**
```bash
# Instalar Docker y Node.js
- Docker Desktop
- Node.js v14 o superior
```

2. **Instalación**
```bash
# Clonar repositorio
git clone <url-repositorio>
cd facturacion-system

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar servicios
cd docker
docker-compose up -d
cd ..
npm run dev
```

## API Endpoints y Pruebas

## Pruebas de Requerimientos

### 1. Obtener clientes con teléfonos
```bash
curl http://localhost:3000/api/clientes/telefonos/todos
```
o en Postman:
- GET http://localhost:3000/api/clientes/telefonos/todos

### 2. Obtener teléfonos de Jacob Cooper
```bash
curl http://localhost:3000/api/clientes/buscar/jacob-cooper
```
o en Postman:
- GET http://localhost:3000/api/clientes/buscar/jacob-cooper

### 3. Teléfonos con datos de clientes
```bash
curl http://localhost:3000/api/clientes/telefonos/con-datos
```
o en Postman:
- GET http://localhost:3000/api/clientes/telefonos/con-datos

### 4. Clientes con facturas
```bash
curl http://localhost:3000/api/clientes/report/con-facturas
```
o en Postman:
- GET http://localhost:3000/api/clientes/report/con-facturas

### 5. Clientes sin facturas
```bash
curl http://localhost:3000/api/clientes/report/sin-facturas
```
o en Postman:
- GET http://localhost:3000/api/clientes/report/sin-facturas

### 6. Clientes con cantidad de facturas
```bash
curl http://localhost:3000/api/clientes/report/cantidad-facturas
```
o en Postman:
- GET http://localhost:3000/api/clientes/report/cantidad-facturas

### 7. Obtener facturas compradas por Kai Bullock
```bash
curl http://localhost:3000/api/facturas/cliente/kai-bullock
```
o en Postman:
- GET http://localhost:3000/api/facturas/cliente/kai-bullock

### 8. Productos facturados
```bash
curl http://localhost:3000/api/productos/report/facturados
```
o en Postman:
- GET http://localhost:3000/api/productos/report/facturados

### 9. Facturas con productos Ipsum
```bash
curl http://localhost:3000/api/facturas/productos/ipsum
```
o en Postman:
- GET http://localhost:3000/api/facturas/productos/ipsum

### 10. Gasto total por cliente
```bash
curl http://localhost:3000/api/clientes/report/gasto-total
```
o en Postman:
- GET http://localhost:3000/api/clientes/report/gasto-total

### 11. Vista de facturas por fecha
```bash
curl http://localhost:3000/api/facturas/ordenadas/fecha
```
o en Postman:
- GET http://localhost:3000/api/facturas/ordenadas/fecha

### 12. Productos no facturados
```bash
curl http://localhost:3000/api/productos/report/no-facturados
```
o en Postman:
- GET http://localhost:3000/api/productos/report/no-facturados

### 13. CRUD de Clientes

#### Crear Cliente
```bash
curl -X POST http://localhost:3000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "numero": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "direccion": "Calle 123",
    "telefonos": ["1234-5678"]
  }'
```
o en Postman:
- POST http://localhost:3000/api/clientes
- Body (JSON):
```json
{
  "numero": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "direccion": "Calle 123",
  "telefonos": ["1234-5678"]
}
```

#### Modificar Cliente
```bash
curl -X PUT http://localhost:3000/api/clientes/1 \
  -H "Content-Type: application/json" \
  -d '{
    "direccion": "Nueva Dirección 456"
  }'
```
o en Postman:
- PUT http://localhost:3000/api/clientes/1
- Body (JSON):
```json
{
  "direccion": "Nueva Dirección 456"
}
```

#### Eliminar Cliente
```bash
curl -X DELETE http://localhost:3000/api/clientes/1
```
o en Postman:
- DELETE http://localhost:3000/api/clientes/1

### 14. CRUD de Productos

#### Crear Producto
```bash
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -d '{
    "codigo": "P001",
    "nombre": "Producto 1",
    "marca": "Ipsum",
    "precio": 100.00,
    "descripcion": "Descripción del producto"
  }'
```
o en Postman:
- POST http://localhost:3000/api/productos
- Body (JSON):
```json
{
  "codigo": "P001",
  "nombre": "Producto 1",
  "marca": "Ipsum",
  "precio": 100.00,
  "descripcion": "Descripción del producto"
}
```

### 15. CRUD de Facturas

#### Crear Factura
```bash
curl -X POST http://localhost:3000/api/facturas \
  -H "Content-Type: application/json" \
  -d '{
    "numero": "F001",
    "cliente_id": "ID_CLIENTE",
    "items": [
      {
        "producto_id": "ID_PRODUCTO",
        "cantidad": 2,
        "precio_unitario": 100000
      },
      {
        "producto_id": "ID_PRODUCTO_2",
        "cantidad": 1,
        "precio_unitario": 45000
      }
    ],
    "subtotal": 245000
  }'
```
o en Postman:
POST http://localhost:3000/api/facturas
Headers: Content-Type: application/json
Body (raw JSON):

```json
{
  "numero": "F001",
  "cliente_id": "ID_CLIENTE",
  "items": [
    {
      "producto_id": "ID_PRODUCTO",
      "cantidad": 2,
      "precio_unitario": 100000
    },
    {
      "producto_id": "ID_PRODUCTO_2",
      "cantidad": 1,
      "precio_unitario": 45000
    }
  ],
  "subtotal": 245000
}
```

#### Listar todas las facturas

```bash
curl http://localhost:3000/api/facturas
```
o en Postman:
- GET http://localhost:3000/api/facturas


#### Obtener factura específica

```bash
curl http://localhost:3000/api/facturas/ID_FACTURA

```
o en Postman:
- GET http://localhost:3000/api/facturas/ID_FACTURA

#### Obtener facturas por cliente

```bash
curl http://localhost:3000/api/facturas/cliente/ID_CLIENTE

```
o en Postman:
- GET http://localhost:3000/api/facturas/cliente/ID_CLIENTE


## Notas Adicionales

1. El precio de los productos se guarda sin IVA
2. El IVA se calcula al 21% en las facturas
3. Los montos en las facturas incluyen:
   - Subtotal (sin IVA)
   - IVA
   - Total (con IVA)

## Requerimientos Específicos del TP

### 1. Persistencia Políglota
- MongoDB: Base principal para clientes, productos y facturas
- Redis: Control de stock y cache


## Modelo de Datos

### Cliente
```javascript
{
  numero: Number,
  nombre: String,
  apellido: String,
  direccion: String,
  telefonos: [String]
}
```

### Producto
```javascript
{
  codigo: String,
  nombre: String,
  marca: String,
  precio: Number,  // Sin IVA
  descripcion: String
}
```

### Factura
```javascript
{
  numero: String,
  fecha: Date,
  cliente_id: ObjectId,
  items: [{
    producto_id: ObjectId,
    cantidad: Number,
    precio_unitario: Number
  }],
  subtotal: Number,
  iva: Number,
  total: Number
}
```

## Características Técnicas

### Performance
- Índices optimizados en MongoDB
- Cache en Redis para datos frecuentes
- Consultas optimizadas con agregaciones

### Seguridad
- Validación de datos
- Control de transacciones
- Manejo de errores robusto

### Escalabilidad
- Arquitectura modular
- Containers Docker
- Bases de datos distribuibles

## Mantenimiento y Soporte

### Monitoreo
```bash
# Ver logs
docker logs facturacion-system_mongodb_1
docker logs facturacion-system_redis_1
```

### Backup
```bash
# Backup de MongoDB
docker exec -it mongodb mongodump --out /backup
```

## Contribuidores
- Madero Torres, Eduardo Federico
- Tepedino, Cristian
- Bloise, Luca

## Documentación Adicional
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Redis Documentation](https://redis.io/documentation)
