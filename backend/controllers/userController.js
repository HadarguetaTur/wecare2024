const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const { getOne, getAll, updateOne, deleteOne } = require("./handlerFactory");
const jwt = require('jsonwebtoken');
const { uploadSingle, processImage } = require("../utils/uploadImage");


exports.uploadUserPhoto = uploadSingle;

exports.resizeUserPhoto = processImage;

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, "username", "email");
  if (req.file) filteredBody.photo = req.file.filename;
  const updatedUser = await User.findByIdAndUpdate(req.body._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.body.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined! Please use /signup instead",
  });
};

exports.getUserByToken = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(new AppError("You are not logged in! Please log in to get access.", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.params.id = decoded.id;

  return getOne(User)(req, res, next);
});


exports.getusers = async (req, res, next) => {
  console.log('hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 20;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const users = await User.find({
      ...(req.query.isCareProvider && { isCareProvider: req.query.isCareProvider }),
      ...(req.query.category && { category: req.query.category }),
   
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalUsers= await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    console.log("succses",users);

    res.status(200).json({
      users,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUser = getOne(User);
exports.getAllUsers = getAll(User);
exports.updateUser = updateOne(User);
exports.deleteUser = deleteOne(User);
