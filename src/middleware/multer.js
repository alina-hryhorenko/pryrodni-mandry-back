import createHttpError from 'http-errors';
import multer from 'multer';

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
];

const MAX_FILE_SIZE = 1 * 1024 * 1024;

export const upload = multer({
  storage: multer.memoryStorage(),

  fileFilter: (req, file, cb) => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      return cb(
        createHttpError(
          400,
          'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.',
        ),
      );
    }

    cb(null, true);
  },

  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});
