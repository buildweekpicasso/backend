const fs = require('fs');
const { chunksOf } = require('../../lib');

exports.seed = knex => {
  const files = fs.readdirSync('./static/styles');
  const styles = chunksOf(2)(files).map(([image_url, thumb_url]) => ({
    image_url,
    thumb_url,
    year: image_url
      .split(',')
      .map(f_ => f_.replace(/^_/, '').replace(/_/g, ' '))[1],
    title: image_url
      .split(',')
      .map(f_ => f_.replace(/^_/, '').replace(/_/g, ' '))[2],
  }));
  return knex('styles').insert(styles);
};
