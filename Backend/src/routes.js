const express = require('express');

// import controllers
const OngController = require('./controllers/OngController');
const incidentController = require('./controllers/incidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();

// criating roots

// ONGS
//root to list the ongs
routes.get('/ongs', OngController.index);
// root to ciate ongs
routes.post('/ongs', OngController.create);
// Profile
routes.get('/profile', ProfileController.index);
// Session
routes.post('/session', SessionController.create);

// INCIDENTS
routes.get('/incidents', incidentController.index);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);

module.exports = routes;  // exporting the routes


