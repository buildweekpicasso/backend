const fetch = require('node-fetch');
const sg = require('@sendgrid/mail');
const sgKey = process.env.SENDGRID_API_KEY;
sg.setApiKey(sgKey);

const processImage = ({ fast, request_key, style_url, content_url }) => {
  console.log({ request_key, style_url, content_url });
  return fetch(`http://18.217.10.89:5000/${fast ? 'fast' : 'deep'}transform`, {
    method: 'post',
    body: JSON.stringify({ request_key, style_url, content_url }),
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json());
};

const emailImage = (email, imagePath) => {
  console.log('sending email to: ', email, imagePath);
  const msg = {
    to: email,
    from: 'santa@bwpicasso.com',
    subject: 'Here is your processed image!',
    text: 'Here is your processed image!',
    html: `<img src="${imagePath}" alt="the processed image"/>`,
  };
  sg.send(msg);
}

module.exports = {
  processImage,
  emailImage,
};
