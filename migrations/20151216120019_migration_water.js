
exports.up = function(knex, Promise) {
  return knex.schema.createTable('water', function(table) {
    table.increments('id').primary();
    table.integer('pi_id').references('pi.id');

    table.decimal('watering');
    table.decimal('available');

    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('water');
};
