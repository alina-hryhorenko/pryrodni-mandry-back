import createHttpError from 'http-errors';
import multer from 'multer';

export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        createHttpError(
          400,
          'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.',
        ),
      );
    }
  },
  limits: {
    // max size 1 MB
    fileSize: 1 * 1024 * 1024,
  },
});
