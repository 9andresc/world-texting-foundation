exports.up = function (knex) {
  return knex.schema.createTable('acronyms', (table) => {
    table.increments();
    table.string('acronym').notNullable();
    table.json('definitions').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('acronyms');
};
