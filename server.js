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
server.use('/users/list', require('./backend/routes/users/list'));//private access

/*products routes */
server.use('/products/list', require('./backend/routes/products/list'));//public access
server.use('/products/create', require('./backend/routes/products/create'));//private access
server.use('/products/update', require('./backend/routes/products/update'));//private access
server.use('/products/delete', require('./backend/routes/products/delete'));//private access

/*orders routes */
server.use('/orders/list', require('./backend/routes/orders/list'));//public access
server.use('/orders/create', require('./backend/routes/orders/create'));//public access
server.use('/orders/update', require('./backend/routes/orders/update'));//private access
server.use('/orders/delete', require('./backend/routes/orders/delete'));//private access


const PORT = process.env.APP_PORT ? process.env.APP_PORT : 3000;

//5. levantar el servidor
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});