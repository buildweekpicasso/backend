const db = require('../data/dbConfig.js');

module.exports = {
  add,
  findAllReturningUrls,
  findByRequestKeyReturningUrls,
};

async function add({ output_url, content_url, style_id, request_key }) {
  const [id] = await db('public_images').insert({
    content_url,
    style_id,
    output_url,
    request_key,
  });
  return findById(id);
}

function findById(id) {
  return db('public_images')
    .where({ id })
    .first();
}

function findByRequestKeyReturningUrls(request_key) {
  return db('public_images')
    .select(
      'public_images.output_url as output_url',
      'public_images.content_url as content_url',
      'styles.imageUrl as style_url',
    )
    .join('styles', { 'public_images.style_id': 'styles.id' })
    .where({ 'public_images.requestkey': request_key })
    .first();
}

function findAllReturningUrls() {
  return db('public_images')
    .select(
      'public_images.output_url as output_url',
      'public_images.content_url as content_url',
      'styles.imageUrl as style_url',
    )
    .join('styles', { 'public_images.style_id': 'styles.id' });
}
