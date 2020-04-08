
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        // Criating an incremental ID 
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        // column that have the ong that criate the incident. the relationship 
        table.string('ong_id').notNullable();
        
        // the foreing key. 
        //The column ong_id have a reference with the column ID in the ongs table 
        table.foreign('ong_id').references('id').inTable('ongs');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
