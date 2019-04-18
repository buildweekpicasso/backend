const router = require('express').Router();
const multer = require('multer');
const uuid = require('uuid/v4');
const authMiddleware = require('../auth/authMiddleware');

const images = require('./imagesModel.js');
const users = require('../users/usersModel');
const userImages = require('./userImagesModel.js');
const publicImages = require('./publicImagesModel.js');
const imageUtils = require('./imageUtils.js');
const BASE_URL = 'https://quiet-shore-93010.herokuapp.com/';

const trace = msg => x => (console.log(msg, x), x);

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
    const request_key = uuid();
    images
      .findStyleById(styleID)
      .then(style => {
        const style_url = `${BASE_URL}styles/${style.image_url}`;
        const content_url = `${BASE_URL}uploads/${req.file.filename}`;

        imageUtils
          .processImage({
            fast: true,
            request_key,
            style_url,
            content_url,
          })
          .then(trace('\n\n\n *** What is image?'))
          .then(image => {
            publicImages
              .add({
                output_url: image.output_url,
                content_url,
                style_id: styleID,
                request_key,
              })
              .then(_success => {
                res.status(200).json({ ...image, style_url, content_url });
              })
              .catch(error => {
                res.status(500).json({
                  message:
                    'Error trying to add image to public_images database',
                  error,
                });
              });
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

router.post('/process-deep', authMiddleware, (req, res) => {
  console.log('\n\n\n\n****** PROCESS_DEEP CALLED');
  const request_key = uuid();
  const username = req.username || 'bob';
  console.log('\n\n\n\n****** USERNAME', username);
  upload(req, res, err => {
    if (err) {
      res.status(500).json({
        error: err,
        message: 'There was a problem saving the uploaded file',
      });
    }
    const { styleID } = req.body;
    // users.findBy({username}).then(trace("\n\n\n**** IS THIS A VALID USER?"))
    Promise.all([users.findBy({ username }), images.findStyleById(styleID)])
      .then(([[user], style]) => {
        const style_url = `${BASE_URL}styles/${style.image_url}`;
        const content_url = `${BASE_URL}uploads/${req.file.filename}`;
        console.log('\n\n\n\n\n ******* USER: ', user);
        console.log('\n\n\n\n\n ******* STYLE: ', style);

        imageUtils
          .processImage({
            fast: false,
            request_key,
            style_url,
            content_url,
          })
          .then(success => {
            images
              .addReturningId({
                user_id: user.id,
                image_url: content_url,
              })
              .then(trace('\n\n\n ***** THIS SHOULD BE AN IMAGE ID'))
              .then(image_id => {
                userImages
                  .add({
                    user_id: user.id,
                    image_id,
                    style_id: style.id,
                    request_key,
                  })
                  .catch(error => {
                    console.error('Something went wrong');
                    res.status(500).json({
                      message:
                        'Something went wrong when inserting to the user_images table',
                      error,
                    });
                  });
              })
              .catch(error => {
                console.error('\n\n\n**** ERROR:', err);
                res.status(500).json({
                  message:
                    'Something went wrong when inserting to the images table',
                  error,
                });
              });
            res.status(200).json(success);
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

router.put('/request/:key', (req, res) => {
  const { key } = req.params;
  const { output_url } = req.body;
  userImages
    .updateByRequestKey(key, {
      output_url,
    })
    .then(entry => {
      userImages
        .findByRequestKey(key)
        .then(userImage => {
          console.log('userImage', userImage);
          users
            .findById(userImage.user_id)
            .then(user => {
              imageUtils.emailImage(user.email, output_url);
              res.status(200).json(entry);
            })
            .catch(findUserErr => {
              res.status(404).json({
                error: findUserErr,
                message:
                  'Error finding an existing user by ID on the user_image in /request/:key',
              });
            });
        })
        .catch(findUserImageErr => {
          res.status(404).json({
            error: findUserImageErr,
            message: 'Error finding an existing userImage by ID',
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        error,
        message: 'Unable to find that request_key',
      });
    });
});

router.get('/requests/:key', (req, res) => {
  const { key } = req.params;
  userImages
    .findByRequestKeyReturningUrls(key)
    .then(entry => {
      res.status(200).json(entry);
    })
    .catch(error => {
      res.status(404).json({
        message: 'Failed to find matching request_key',
        error,
      });
    });
});

router.get('/requests', (_req, res) => {
  userImages
    .findAllReturningUrls()
    .then(entries => {
      res.status(200).json(entries);
    })
    .catch(error => {
      res.status(404).json({
        message: 'Failed to access user images',
        error,
      });
    });
});

router.get('/public/:key', (req, res) => {
  const { key } = req.params;
  publicImages
    .findByRequestKeyReturningUrls(key)
    .then(entry => {
      res.status(200).json(entry);
    })
    .catch(error => {
      res.status(404).json({
        message: 'Failed to find matching request_key',
        error,
      });
    });
});

router.get('/public', (_req, res) => {
  publicImages
    .findAllReturningUrls()
    .then(entries => {
      res.status(200).json(entries);
    })
    .catch(error => {
      res.status(500).json({
        message: 'Failed to access public images',
        error,
      });
    });
});

module.exports = router;
