//1. importar express y demas librerias
const express = require("express");

const server = express();
const bodyParser = require("body-parser");

//3. agregar middlewares globales
server.use(express.json()); // parsear el body a un objeto
server.use(bodyParser.json());

/*users routes*/
server.use('/login', require('./backend/routes/users/login'));
server.use('/register', require('./backend/routes/users/register'));

/*products routes */
server.use('/products/list', require('./backend/routes/products/list'));
server.use('/products/create', require('./backend/routes/products/create'));
server.use('/products/update', require('./backend/routes/products/update'));
server.use('/products/delete', require('./backend/routes/products/delete'));

/*orders routes */
server.use('/orders/list', require('./backend/routes/orders/list'));
server.use('/orders/create', require('./backend/routes/orders/create'));


const PORT = process.env.APP_PORT ? process.env.APP_PORT : 3000;

//5. levantar el servidor
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
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