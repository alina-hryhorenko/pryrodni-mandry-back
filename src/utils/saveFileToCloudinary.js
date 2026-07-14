import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function uploadToCloudinary(buffer, options) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      },
    );

    uploadStream.end(buffer);
  });
}

export function saveFileToCloudinary(buffer, userId) {
  return uploadToCloudinary(buffer, {
    folder: 'nature-travels-app/avatars',
    public_id: `avatar_${userId}`,
    resource_type: 'image',
    overwrite: true,
    unique_filename: false,
    transformation: [
      { width: 500, height: 500, crop: 'fill', gravity: 'auto' },
      { fetch_format: 'auto', quality: 'auto' },
    ],
  });
}

export function saveStoryImageToCloudinary(buffer) {
  return uploadToCloudinary(buffer, {
    folder: 'nature-travels-app/stories',
    resource_type: 'image',
    transformation: [
      { width: 1200, crop: 'limit' },
      { fetch_format: 'auto', quality: 'auto' },
    ],
  });
}