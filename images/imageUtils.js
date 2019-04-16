const fetch = require('node-fetch');

const process = ({ fast, request_key, style_url, content_url }) =>
  fetch(`http://3.14.3.46:5000/${fast ? 'fast' : 'deep'}transform`, {
    method: 'post',
    body: JSON.stringify({ request_key, style_url, content_url }),
    headers: { 'Content-Type': 'application/json' },
  });

module.exports = {
  process,
};
