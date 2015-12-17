
exports.up = function(knex, Promise) {
  return knex.schema.createTable('soil', function(table) {
    table.increments('id').primary();
    table.integer('pi_id').references('pi.id');

    table.decimal(('humidity'), [8], [2]);

    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('soil');
};
