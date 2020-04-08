const express = require('express');  // import dependecia express
const cors = require('cors');
const routes = require('./routes');  // importing a file of routes

const app = express();  // instanciando minha app, variavel que armazen minha app

// let that all the application can to access to the backend
app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(3333, () => console.log('aplicacion corriendo en la puerta 3333')); // coloco a ouvir minha app na porta 3333