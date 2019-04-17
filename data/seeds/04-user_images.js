exports.seed = knex => {
  const userImages = [
    {
      output_url: 'example.com/image.png',
      user_id: 1,
      image_id: 1,
      style_id: 1,
      request_key: '123abc',
    },
  ];
  return knex('user_images').insert(userImages);
};
