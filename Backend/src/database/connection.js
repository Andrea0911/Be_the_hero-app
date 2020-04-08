const knex = require('knex');
const configuration = require('../../knexfile');

// the connection is criated, using the development configutarion in the knexfile
const connection = knex(configuration.development);

// exporting the connection whi the DB
module.exports = connection;