const fetch = require('node-fetch');

const process = ({ fast, request_key, style_url, content_url }) => {
  console.log({ request_key, style_url, content_url });
  return fetch(`http://18.217.10.89:5000/${fast ? 'fast' : 'deep'}transform`, {
    method: 'post',
    body: JSON.stringify({ request_key, style_url, content_url }),
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json());
};

module.exports = {
  process,
};
