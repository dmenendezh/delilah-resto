//1. importar express y demas librerias
const express = require("express");
const db = require("./backend/database/dbConnector");

const server = express();
const bodyParser = require("body-parser");
const CORS = require("cors");


//3. agregar middlewares globales
server.use(express.json()); // parsear el body a un objeto

server.use('/login', require('./backend/routes/login'));


const PORT = process.env.APP_PORT ? process.env.APP_PORT : 3000;

//5. levantar el servidor
server.listen(PORT, () => {
    console.log(`servidor iniciado en ${PORT}`);
});


// ERROR DETECTION
server.use((err, req, res, next) => {
    if (!err) {
      return next();
    } else if (err.name === "JsonWebTokenError") {
      console.log(err);
      res.status(400).json(`Error: ${err.message}`);
    } else if (err.name === "TokenExpiredError") {
      res.status(401).json("Token has expired. Please login again");
    } else {
      console.log("An error has occurred", err), res.status(500).send("Error");
    }
  });