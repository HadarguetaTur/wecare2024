const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploads = async (file, public_id, overwrite, invalidate) => {
  console.log(`Uploading file: ${file}`);
  console.log(`Public ID: ${public_id}`);
  console.log(`Overwrite: ${overwrite}`);
  console.log(`Invalidate: ${invalidate}`);
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        public_id,
        overwrite: overwrite ? 1 : 0,
        invalidate: invalidate ? 1 : 0,
        timestamp
      },
      process.env.CLOUD_API_SECRET
    );

    const uploadResult = await cloudinary.uploader.upload(file, {
      public_id,
      overwrite,
      invalidate,
      timestamp,
      signature,
      api_key: process.env.CLOUD_API_KEY,
    });

    console.log(uploadResult);
    return uploadResult;
  } catch (error) {
    console.error("Error during upload:", error);
    throw error;
  }
};

function videoUpload(file, public_id, overwrite, invalidate) {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      {
        resource_type: "video",
        chunk_size: 50000,
        public_id,
        overwrite,
        invalidate,
      },
      (error, result) => {
        if (error) resolve(error);
        resolve(result);
      }
    );
  });
}

module.exports = {
  uploads,
  videoUpload,
};
