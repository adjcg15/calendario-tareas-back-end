const express = require('express');
const cors = require('cors');
const { dbConection } = require('./database/config');
require('dotenv').config();

//Crear la aplicación:
const app = express();

//Base de datos
dbConection();

//CORS
app.use(cors());

//Directorio público
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
//CRUD - manejo de eventos del calendario

//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});