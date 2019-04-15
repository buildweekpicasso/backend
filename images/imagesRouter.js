const router = require('express').Router();
const images = require('./imagesModel.js');
const ImageUtils = require('./imageUtils.js');

router.post('/process', (req, res) => {
  console.log('posting the process thing?');
  const { style, content } = req.body;
  console.log(style, content);
  ImageUtils.processDeepAI(style, content)
    .then(image => {
      console.log(image);
      res.status(200).json({ url: image });
    })
    .catch(err => {
      console.log('uh oh', err);
      res.status(500).json({ error: err });
    })
});

module.exports = router;