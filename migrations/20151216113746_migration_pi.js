exports.up = function(knex, Promise) {
  return knex.schema.createTable('pi', function(table) {
    table.increments('id').primary();
    table.string('pi_id')
      .unique()
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pi');
};
