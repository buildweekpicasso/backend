const db = require('../data/dbConfig.js');

module.exports = {
  add,
  findAllReturningUrls,
  findBy,
  findById,
  findByRequestKey,
  findByRequestKeyReturningUrls,
  updateByRequestKey,
};

function findBy(filter) {
  return db('user_images').where(filter);
}

async function add({ user_id, image_id, style_id, request_key }) {
  const [id] = await db('user_images').insert({
    user_id,
    image_id,
    style_id,
    request_key,
    output_url: null,
  });
  return findById(id);
}

function findById(id) {
  return db('user_images')
    .where({ id })
    .first();
}

function findByRequestKey(request_key) {
  return db('user_images')
    .where({ request_key })
    .first();
}

function findByRequestKeyReturningUrls(request_key) {
  return db('user_images')
    .select(
      'user_images.output_url as output_url',
      'images.image_url as content_url',
      'styles.image_url as style_url',
      'users.username as username',
    )
    .join('images', { 'user_images.image_id': 'images.id' })
    .join('users', { 'user_images.user_id': 'users.id' })
    .join('styles', { 'user_images.style_id': 'styles.id' })
    .where({ 'user_images.request_key': request_key })
    .first();
}

function findAllReturningUrls() {
  return db('user_images')
    .select(
      'user_images.output_url as output_url',
      'images.image_url as content_url',
      'styles.image_url as style_url',
      'users.username as username',
    )
    .join('images', { 'user_images.image_id': 'images.id' })
    .join('users', { 'user_images.user_id': 'users.id' })
    .join('styles', { 'user_images.style_id': 'styles.id' })
    .whereNotNull('user_images.output_url');
}

function updateByRequestKey(request_key, obj) {
  return db('user_images')
    .where({ request_key })
    .update(obj)
    .returning('*');
}
