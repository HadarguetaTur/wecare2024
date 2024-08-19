const express = require("express");

const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.get('/getusers', userController.getusers);

router.post("/signup", authController.signup);
router.post("/signin", authController.login);
router.get("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

// router.use(authController.protect);



router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);
router.patch(
  "/updateMe",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete("/deleteMe", userController.deleteMe);

router
  .route("/token")
  .get(userController.getUserByToken)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);


router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/token")
  .get(userController.getUserByToken)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
