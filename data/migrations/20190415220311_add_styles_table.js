exports.up = knex =>
  knex.schema.createTable('styles', styles => {
    styles.increments();

    styles.string('url').notNullable();
  });

exports.down = knex => knex.schema.dropTableIfExists('styles');
