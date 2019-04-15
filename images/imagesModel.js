const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('images');
}

function findBy(filter) {
  return db('images').where(filter);
}

async function add(image) {
  const [id] = await db('images').insert(image);
  return findById(id);
}

function findById(id) {
  return db('images')
    .where({ id })
    .first();
}
