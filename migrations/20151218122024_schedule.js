exports.up = function(knex, Promise) {
  return knex.schema.createTable('schedule', function(table) {
    table.increments('id').primary();
    table.integer('pi_id').unique().references('pi.id');

    table.boolean('auto');
    table.integer('humidity');
    table.integer('interval');
    table.boolean('monday');
    table.boolean('tuesday');
    table.boolean('wednesday');
    table.boolean('thursday');
    table.boolean('friday');
    table.boolean('saturday');
    table.boolean('sunday');

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.string('updated_at');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('schedule');
};
