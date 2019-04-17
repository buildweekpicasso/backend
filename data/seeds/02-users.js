exports.seed = knex => {
  const users = [
    {
      username: 'example',
      password: 'password',
    },
  ];
  return knex('users').insert(users);
};
