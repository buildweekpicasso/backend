const router = require('express').Router();
const multer = require('multer');
const uuid = require('uuid/v4');

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

module.exports = router;
