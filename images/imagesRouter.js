const router = require('express').Router();
const multer = require('multer');
const uuid = require('uuid/v4');

const images = require('./imagesModel.js');
const ImageUtils = require('./imageUtils.js');

const fileFilter = (_req, file, cb) => {
  file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)
    ? cb(null, true)
    : cb(null, false);
};

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (_req, file, cb) => {
    cb(null, uuid() + file.originalname);
  },
});

const MB = 1e6;
const upload = multer({
  storage,
  limits: 3 * MB,
  fileFilter,
}).single('style-image');

// @TODO: Add error handling
router.post('/upload', (req, res) => {
  upload(req, res);
  return res.status(200).json({
    message: 'Success',
  });
});

// @TODO: This logic will need to be combined with
// what I've got as the "upload" route above, but
// for the sake of mocking this out, I think we can
// leave separate for now
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
