//1. importar express y demas librerias
const express = require("express");
const db = require("./backend/database/dbConnector");

//2. crear la instancia de express
const server = express();
//3. agregar middlewares globales
server.use(express.json()); // parsear el body a un objeto

const PORT = process.env.APP_PORT ? process.env.APP_PORT : 3000;

//5. levantar el servidor
server.listen(PORT, () => {
    console.log(`servidor iniciado en ${PORT}`);
});