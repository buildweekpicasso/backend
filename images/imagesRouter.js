const router = require('express').Router();
const multer = require('multer');
const uuid = require('uuid/v4');
const authMiddleware = require('../auth/authMiddleware');

const images = require('./imagesModel.js');
const users = require('../users/usersModel');
const userImages = require('./userImagesModel.js');
const ImageUtils = require('./imageUtils.js');
const BASE_URL = 'https://quiet-shore-93010.herokuapp.com/';

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

router.post('/process', (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.status(500).json({
        error: err,
        message: 'There was a problem saving the uploaded file',
      });
    }
    const { styleID } = req.body;
    // @TODO: get `fast` from req.body
    let fast = true;
    const request_key = uuid();
    images
      .findStyleById(styleID)
      .then(style => {
        const style_url = `${BASE_URL}styles/${style.imageUrl}`;
        const content_url = `${BASE_URL}uploads/${req.file.filename}`;
        ImageUtils.process({
          fast,
          request_key,
          style_url,
          content_url,
        })
          .then(image => {
            ImageUtils.emailImage('mynock101@gmail.com', image.output_url);
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

function maybeAuthMiddleware(req, res, next) {
  return req.body.fast ? next() : authMiddleware(req, res, next);
}

router.put('/request/:key', (req, res) => {
  const { key } = req.params;
  const { output_url } = req.body;
  userImages
    .updateByRequestKey(key, {
      output_url,
    })
    .then(entry => res.status(200).json(entry))
    .catch(error => {
      res.status(500).json({
        error,
        message: 'Unable to find that request_key',
      });
    });
});

module.exports = router;
