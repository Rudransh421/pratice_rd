import { Router } from "express";

import {
  loginUser,
  logoutUser,
  registerUser,
  generateAccessRefreshToken,
  changePassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getWatchHistory,
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

//router.post('/register', registerUser) only use for sigle method : post or get or delete etc.

// for multiple method for single route optimal weay is :

// router.route('/register')
//   .get(showRegisterForm)
//   .post(registerUser)
//   .put(updateRegistration);

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/loginUser").post(loginUser);

// secured routes

router.route("/logoutUser").post(verifyJwt, logoutUser);
router.route("/refresh-token").post(generateAccessRefreshToken);
router.route("/change-password").post(verifyJwt, changePassword);
router.route("/current-user").get(verifyJwt, getCurrentUser);
router.route("/update-account").patch(verifyJwt, updateAccountDetails);
router
  .route("/avatar-update")
  .patch(verifyJwt, upload.single("avatar"), updateUserAvatar);
router
  .route("/coverImage-update")
  .patch(verifyJwt, upload.single("coverImage"), updateUserCoverImage);
router
  .route("/channel-profile/:username")
  .get(verifyJwt, getUserChannelProfile);
router.route("/watch-history").get(verifyJwt, getWatchHistory);

export default router;
