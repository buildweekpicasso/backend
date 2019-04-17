const db = require('../data/dbConfig.js');

module.exports = {
  add,
  findBy,
  findById,
  findByRequestKey,
};

function findBy(filter) {
  return db('user_images').where(filter);
}

async function add(image) {
  const [id] = await db('user_images').insert(image);
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
