const router = require('express').Router();
const multer = require('multer');
const uuid = require('uuid/v4');

const images = require('./imagesModel.js');
const ImageUtils = require('./imageUtils.js');

const IMAGE_URLS = [
  'https://www.albertina.at/site/assets/files/1456/9_pablo_picasso_-_frau_mit_gruenem_hut.1200x0.jpg',
  'https://artsy-media-uploads.s3.amazonaws.com/EYY79UlnQZMrzscU8c3mxQ%2Fcustom-Custom_Size___pablo-picasso-le-taureau-1945.jpg',
  'https://d7hftxdivxxvm.cloudfront.net/?resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2Foy5RyqmgzaFURJBaCSIWMQ%252FPicasso%252C%2BLe%2BRepos%2B%25281932%2529.jpg&width=1200&quality=80',
  'https://www.artforum.com/uploads/upload.002/id12476/article03_1064x.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgJuMJkR3MiI-WhQZXqrSi7Env6ZS8oo7jRl3PejJuWpdFKPuHJg',
  'https://www.metmuseum.org/toah/images/hb/hb_50.188.jpg',
  'http://www.moma.org/media/W1siZiIsIjE1MTUwNyJdLFsicCIsImNvbnZlcnQiLCItcmVzaXplIDIwMDB4MjAwMFx1MDAzZSJdXQ.jpg?sha=60650e258d538582',
  'https://i0.wp.com/www.guggenheim.org/wp-content/uploads/1931/01/78.2514.59_ph_web-1.jpg?w=870',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRffxN44JKgoS_Kwfss9cxL2LZxDQ3ErIrxttA5ZgN_qij6GnM6',
  'https://media.architecturaldigest.com/photos/576ab1305ea3e586576ec3d9/16:9/w_1280,c_limit/picasso-world-record-sothebys-auction-01.jpg',
  'https://www.tate.org.uk/art/images/work/P/P11/P11365_10.jpg',
  'https://www.pablopicasso.org/images/paintings/still-life-with-compote-and-glass.jpg',
].map(imageUrl => ({
  imageUrl,
  styleId: uuid(),
}));

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
}).single('style-image');

router.get('/styles', (_req, res) => {
  // res.status(200).json({ message: 'hehlo' });
  res.status(200).json(IMAGE_URLS);
});

// @TODO: Add error handling
router.post('/upload', (req, res) => {
  upload(req, res, err => {
    err
      ? res.status(500).json({ message: err })
      : res.status(200).json({ message: 'Success', file: req.file.path });
  });
});

// @TODO: This logic will need to be combined with
// what I've got as the "upload" route above, but
// for the sake of mocking this out, I think we can
// leave separate for now
router.post('/process', (req, res) => {
  const { style, content } = req.body;
  ImageUtils.processDeepAI(style, content)
    .then(image => {
      res.status(200).json(image);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
