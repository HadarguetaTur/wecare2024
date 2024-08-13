const multer = require("multer");
const { uploads } = require("../utils/cloudinary");
const AppError = require("./appError");
const fs = require("fs").promises;

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadSingle = upload.single("file");

const processImage = async (req, res, next) => {
  if (!req.file) return next();
  try {
    const tempFilePath = `temp-${Date.now()}.jpeg`;
    await fs.writeFile(tempFilePath, req.file.buffer);
    const public_id = `user-${req.body._id}-${Date.now()}`;
    const overwrite = true;
    const invalidate = true;

    const result = await uploads(tempFilePath, public_id, overwrite, invalidate);

    req.file.filename = result.secure_url;
    next();
  } catch (err) {
    console.log(err);
    return next(new AppError("Error processing image", 500));
  }
};

module.exports = {
  uploadSingle,
  processImage,
};