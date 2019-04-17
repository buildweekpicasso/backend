const db = require('../data/dbConfig.js');

module.exports = {
  add,
  addReturningId,
  find,
  findBy,
  findById,
  getStyles,
  findStyleById,
};

function find() {
  return db('images');
}

function getStyles() {
  return db('styles');
}

function findBy(filter) {
  return db('images').where(filter);
}

async function add(image) {
  const [id] = await db('images').insert(image);
  return findById(id);
}

function addReturningId(image) {
  const [id] = db('images').insert(image);
  return id;
}

function findById(id) {
  return db('images')
    .where({ id })
    .first();
}

function findStyleById(id) {
  return db('styles')
    .where({ id })
    .first();
}
