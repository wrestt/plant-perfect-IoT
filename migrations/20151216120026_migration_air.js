
exports.up = function(knex, Promise) {
  return knex.schema.createTable('air', function(table) {
    table.increments('id').primary();
    table.string('idpi');

    table.decimal(('temp'), [8], [2]);
    table.decimal(('humidity'), [8], [2]);

    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('air');
};
