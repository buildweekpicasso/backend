exports.up = knex =>
  knex.schema.hasTable('users').then(
    exists =>
      exists &&
      knex.schema.table('users', users => {
        users.string('email', 128);
      }),
  );

exports.down = () => {};
