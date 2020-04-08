const connection = require('../database/connection');

module.exports = {
    async index (request, response){
        const {page = 1} = request.query;
        // having the otal of cases
        const [count] = await connection('incidents').count();
        //console.log(count);

        const incidents = await connection('incidents')
            // getting the information of the ong where ong_id from 'incidents'
            // table is equal with the id in the 'ongs' table that have the incident   
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            // to limit for each 5 elements in the list
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city',
                'ongs.uf'
            ]);
        // show in the front end o total of cases
        response.header('X-Total-Count', count['count(*)']);
        
        return response.json(incidents);
    },
    async create (request, response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;
        
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete (request, response){
        // accessing to the route param (ID)
        const { id } = request.params;
        // get the id of the login ong, to verific if the ong's Id that
        // wants to eliminate the incident is equal with the ong's Id  
        //that wants to delete the incidents
        const ong_id = request.headers.authorization;

        // select the first ong_id, in the incidents table, where the Id from 
        // route param is equal with a column Id
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            //.first();
        // verific if the ong_id returned is equal with the ong_id login in the application    
        if (incident.ong_id !== ong_id){
            // return a status cod 401 = Unauthorazation
            return response.status(401).json({error: 'Operation not permited.'});
        }
        await connection('incidents').where('id', id).delete();
        // return a status cod 204 = No content
        return response.status(204).send();    

    }
};