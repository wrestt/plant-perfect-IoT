exports.up = function(knex, Promise) {
  return knex.schema.createTable('schedule', function(table) {
    table.increments('id').primary();
    table.integer('pi_id').references('pi.id').unique();

    table.boolean('auto');
    table.integer('humidity');
    table.decimal('interval');
    table.integer('monday');
    table.integer('tuesday');
    table.integer('wednesday');
    table.integer('thursday');
    table.integer('friday');
    table.integer('saturday');
    table.integer('sunday');

    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('schedule');
};
