
exports.up = function(knex, Promise) {
  return knex.schema.createTable('water', function(table) {
    table.increments('id').primary();
    table.string('idpi')
      .unique()
      .notNullable();

    table.integer('watering');
    table.integer('available');

    table.timestamp('create_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('water');
};
