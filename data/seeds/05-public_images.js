exports.seed = knex => {
  const publicImages = [
    {
      output_url: 'example.com/image.png',
      content_url: 'whatever.com/foo.jpg',
      style_id: 1,
      request_key: '123abc',
    },
    {
      output_url: 'example.com/image2.png',
      content_url: 'whateve123123r.com/foo.jpg',
      style_id: 2,
      request_key: '123sdfabc',
    },
    {
      output_url: 'example23.com/image23.png',
      content_url: 'whatev123123er.com/foo123123.jpg',
      style_id: 1,
      request_key: '123abc232323',
    },
  ];
  return knex('public_images').insert(publicImages);
};
