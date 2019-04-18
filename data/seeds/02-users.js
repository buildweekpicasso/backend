exports.seed = knex => {
  const users = [
    {
      username: 'example',
      password: 'password',
      email: 'email@email.com',
    },
    {
      username: 'example2',
      password: 'password2',
      email: 'mynock101@gmail.com',
    },
  ];
  return knex('users').insert(users);
};
