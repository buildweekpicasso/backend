const router = require('express').Router();
const multer = require('multer');
const uuid = require('uuid/v4');

const images = require('./imagesModel.js');
const ImageUtils = require('./imageUtils.js');

const BASE_URL = process.env.HEROKU_URL || 'https://bw-picasso.herokuapp.com/';

const fileFilter = (_req, file, cb) => {
  file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)
    ? cb(null, true)
    : cb(new Error('Wrong filetype'));
};

const storage = multer.diskStorage({
  destination: './static/uploads/',
  filename: (_req, file, cb) => {
    cb(null, uuid() + file.originalname);
  },
});

const MB = 1e6;
const upload = multer({
  storage,
  limits: 3 * MB,
  fileFilter,
}).single('content-image');

router.get('/styles', (_req, res) => {
  images
    .getStyles()
    .then(s => res.status(200).json(s))
    .catch(err => res.status(500).json({ message: err }));
});

// @TODO: Add error handling
router.post('/upload', (req, res) => {
  upload(req, res, err => {
    err
      ? res.status(500).json({ message: err })
      : res.status(200).json({ message: 'Success', file: req.file.path });
  });
});

router.post('/process', (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.status(500).json({
        error: err,
        message: 'There was a problem saving the uploaded file',
      });
    }
    console.log(req.file.filename);
    const { styleID } = req.body;
    images
      .findStyleById(parseInt(styleID, 10))
      .then(style => {
        const style_url = `${BASE_URL}styles/${style.imageUrl}`;
        const content_url = `${BASE_URL}uploads/${req.file.filename}`;
        ImageUtils.process({
          fast: true,
          request_key: uuid(),
          style_url,
          content_url,
        })
          .then(image => {
            res.status(200).json(image);
          })
          .catch(processErr => {
            res.status(500).json({
              error: processErr,
              message:
                'Error processing the images by sending them to the Deep AI API.',
            });
          });
      })
      .catch(findStyleErr => {
        res.status(500).json({
          error: findStyleErr,
          message: 'Error finding style by ID, possibly does not exist?',
        });
      });
  });
});

module.exports = router;
