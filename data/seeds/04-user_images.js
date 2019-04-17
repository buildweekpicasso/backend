exports.seed = knex => {
  const userImages = [
    {
      output_url: 'example.com/image.png',
      user_id: 1,
      image_id: 1,
      style_id: 1,
      request_key: '123abc',
    },
    {
      output_url: 'example.com/anotherimage.jpg',
      user_id: 2,
      image_id: 1,
      style_id: 1,
      request_key: 'multipass',
    },
  ];
  return knex('user_images').insert(userImages);
};
