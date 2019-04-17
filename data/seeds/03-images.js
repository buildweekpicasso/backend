exports.seed = knex => {
  const images = [
    {
      image_url: 'example.com/image.png',
      user_id: 1,
    },
  ];
  return knex('images').insert(images);
};
