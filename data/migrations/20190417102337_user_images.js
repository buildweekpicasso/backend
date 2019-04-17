exports.up = knex =>
  knex.schema.createTable('user_images', user_images => {
    user_images.increments();

    user_images
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();
    user_images
      .integer('image_id')
      .references('id')
      .inTable('images')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();
    user_images
      .integer('style_id')
      .references('id')
      .inTable('styles')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();

    user_images
      .string('request_key')
      .unique()
      .notNullable();

    user_images.string('output_url');
  });

exports.down = knex => knex.schema.dropTableIfExists('user_images');
