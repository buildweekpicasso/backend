exports.up = knex =>
  knex.schema.hasTable('images').then(
    exists =>
      exists &&
      knex.schema.table('images', images => {
        images.string('image_url', 256);
      }),
  );

exports.down = () => {};
