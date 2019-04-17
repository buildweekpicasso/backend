exports.seed = knex => {
  const users = [
    {
      username: 'example',
      password: 'password',
      email: 'email@email.com',
    },
  ];
  return knex('users').insert(users);
};
