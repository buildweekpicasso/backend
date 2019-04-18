exports.up = knex =>
  knex.schema.createTable('public_images', public_images => {
    public_images.increments();

    public_images
      .integer('image_id')
      .references('id')
      .inTable('images')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();
    public_images
      .integer('style_id')
      .references('id')
      .inTable('styles')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();

    public_images
      .string('request_key')
      .unique()
      .notNullable();

    public_images.string('output_url').notNullable();
  });

exports.down = knex => knex.schema.dropTableIfExists('public_images');
