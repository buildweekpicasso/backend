const deepai = require('deepai');
deepai.setApiKey(process.env.DEEPAI_API_KEY);
console.log(process.env.DEEPAI_API_KEY);

module.exports = {
  processDeepAI
};

async function processDeepAI(styleURL, contentURL) {
  console.log('sending to be processed');
  const res = await deepai.callStandardApi("neural-style", {
    style: styleURL,
    content: contentURL
  });
  return res;
}