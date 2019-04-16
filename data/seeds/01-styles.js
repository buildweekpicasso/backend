const fs = require('fs');

exports.seed = knex => {
  const files = fs.readdirSync('./static/styles').map(url => ({ url }));
  knex('styles').insert(files);
};
