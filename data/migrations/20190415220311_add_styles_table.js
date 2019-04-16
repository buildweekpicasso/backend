exports.up = knex =>
  knex.schema.createTable('styles', styles => {
    styles.increments();

    styles.string('imageUrl').notNullable();
    styles.string('thumbUrl').notNullable();
    styles.string('year').notNullable();
    styles.string('title').notNullable();
  });

exports.down = knex => knex.schema.dropTableIfExists('styles');
