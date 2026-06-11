const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (filePath, folder = "educore") => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
  });
  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
};

const uploadVideo = async (filePath, folder = "educore") => {
  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: "video",
    folder,
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
};

const deleteMedia = async (publicId, resourceType = "image") => {
  return await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
};

module.exports = {
  uploadImage,
  uploadVideo,
  deleteMedia,
};
