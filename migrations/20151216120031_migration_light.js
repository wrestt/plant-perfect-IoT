
exports.up = function(knex, Promise) {
  return knex.schema.createTable('light', function(table) {
    table.increments('id').primary();
    table.string('idpi')
      .unique()
      .notNullable();

    table.decimal(('ir'), [8], [2]);
    table.decimal(('lux'), [8], [2]);
    table.decimal(('visible'), [8], [2]);

    table.timestamp('create_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('light');
};
