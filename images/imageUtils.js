const deepai = require('deepai');
deepai.setApiKey(process.env.DEEPAI_API_KEY);
const sg = require('@sendgrid/mail');
sg.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  processDeepAI,
  emailImage
};

async function processDeepAI(styleURL, contentURL) {
  const fs = require('fs');
  const res = await deepai.callStandardApi("neural-style", {
    style: fs.createReadStream(styleURL),
    content: fs.createReadStream(contentURL)
  });
  return res;
}

function emailImage(email, imagePath) {
  const msg = {
    to: email,
    from: 'test@example.com',
    subject: 'Here is your processed image!',
    text: 'Here is your processed image!',
    html: `<img src="${imagePath}" alt="the processed image"/>`,
  };
  sg.send(msg);
}