const deepai = require('deepai');
deepai.setApiKey(process.env.DEEPAI_API_KEY);

module.exports = {
  processDeepAI
};

async function processDeepAI(styleURL, contentURL) {
  const fs = require('fs');
  const res = await deepai.callStandardApi("neural-style", {
    style: fs.createReadStream(styleURL),
    content: fs.createReadStream(contentURL)
  });
  return res;
}