exports.up = knex =>
  knex.schema.createTable('styles', styles => {
    styles.increments();

    styles.string('image_url').notNullable();
    styles.string('thumb_url').notNullable();
    styles.string('year').notNullable();
    styles.string('title').notNullable();
  });

exports.down = knex => knex.schema.dropTableIfExists('styles');
