exports.up = function(knex, Promise) {
  return knex.schema.createTable('images', images => {
    images.increments();

    images
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('images');
};
