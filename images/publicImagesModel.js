/* eslint-disable */
const db = require('../data/dbConfig.js');

module.exports = {
  add,
  findAllReturningUrls,
  findByRequestKeyReturningUrls,
};

function add({ output_url, content_url, style_id, request_key }) {
  return db('public_images').insert({
    content_url,
    style_id,
    output_url,
    request_key,
  });
}

function findByRequestKeyReturningUrls(request_key) {
  return db('public_images')
    .select(
      'public_images.output_url as output_url',
      'public_images.content_url as content_url',
      'styles.image_url as style_url',
    )
    .join('styles', { 'public_images.style_id': 'styles.id' })
    .where({ 'public_images.request_key': request_key })
    .first();
}

function findAllReturningUrls() {
  return db("public_images as pi")
    .select(
      "pi.output_url",
      "pi.content_url",
      "s.image_url as style_url",
    )
    .join("styles as s", { "pi.style_id": "s.id" })
    .groupBy("pi.id");
}
