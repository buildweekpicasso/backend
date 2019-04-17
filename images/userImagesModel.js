const db = require('../data/dbConfig.js');

module.exports = {
  add,
  findBy,
  findById,
  findByRequestKey,
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

function updateByRequestKey(request_key, obj) {
  return db('user_images')
    .where({ request_key })
    .update(obj)
    .returning('*');
}
