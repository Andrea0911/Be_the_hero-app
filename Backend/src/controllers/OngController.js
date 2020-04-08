const connection = require('../database/connection');
//import crypto package
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
     
        return response.json(ongs);
    },

    async create( request, response ){
        const { name, email, whatsapp, city, uf } = request.body; 
        // creating the ID of each ong
        // gera 4 bytes de carateres aleatorios e os converte em uma string de tipo hexadecimal 
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp ,
            city,
            uf
        })
        return response.json({ id });
    } 
};