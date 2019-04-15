const router = require('express').Router();
const images = require('./imagesModel.js');
const ImageUtils = require('./imageUtils.js');

router.post('/process', (req, res) => {
  const { style, content } = req.body;
  ImageUtils.processDeepAI(style, content)
    .then(image => {
      res.status(200).json(image);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    })
});

module.exports = router;