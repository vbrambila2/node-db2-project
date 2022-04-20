exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();
    tbl.text('vin').unique().notNull();
    tbl.text('make').notNull();
    tbl.text('model').notNull();
    tbl.integer('mileage').notNull();
    tbl.text('title');
    tbl.text('transmission');
  })
};

exports.down = function (knex) {
  // DO YOUR MAGIC
  return knex.dropTableIfExists('cars');
};                                       