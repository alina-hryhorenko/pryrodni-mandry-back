import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function saveAvatarFileToCloudinary(buffer, userId) {
  const option = {
    folder: 'nature-travels-app/avatars',
    auto_mkdir: true,
    public_id: `avatar_${userId}`,
    resource_type: 'image',
    overwrite: true,
    unique_filename: false,
    transformation: [
      { width: 500, height: 500, crop: 'fill', gravity: 'auto' },
      { fetch_format: 'auto', quality: 'auto' },
    ],
  };

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      option,
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

export async function saveStoryImageFileToCloudinary(buffer, storyImageId) {
  const option = {
    folder: 'nature-travels-app/story-images',
    auto_mkdir: true,
    public_id: `story_${storyImageId}`,
    resource_type: 'image',
    overwrite: true,
    unique_filename: false,
    transformation: [
      { width: 500, height: 500, crop: 'fill', gravity: 'auto' },
      { fetch_format: 'auto', quality: 'auto' },
    ],
  };

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      option,
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
