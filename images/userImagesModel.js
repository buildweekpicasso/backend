const db = require('../data/dbConfig.js');

module.exports = {
  add,
  findBy,
  findById,
  findByRequestId,
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

function findByRequestId(request_id) {
  return db('user_images')
    .where({ request_id })
    .first();
}
