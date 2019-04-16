exports.up = knex =>
  knex.schema.createTable('styles', styles => {
    styles.increments();

    styles
      .string('url')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();
  });

exports.down = knex => knex.schema.dropTableIfExists('styles');
