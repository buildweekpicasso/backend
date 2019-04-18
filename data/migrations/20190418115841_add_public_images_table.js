exports.up = knex =>
  knex.schema.createTable('public_images', public_images => {
    public_images.increments();

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

    public_images.string('content_url', 256).notNullable();
    public_images.string('output_url', 256).notNullable();
  });

exports.down = knex => knex.schema.dropTableIfExists('public_images');
