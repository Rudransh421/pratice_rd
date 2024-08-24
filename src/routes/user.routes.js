import { Router } from "express";

import { registerUser } from "../controllers/user.controller.js";

const router = Router();

//router.post('/register', registerUser) only use for sigle method : post or get or delete etc.

// for multiple method for single route optimal weay is :

// router.route('/register')
//   .get(showRegisterForm)
//   .post(registerUser)
//   .put(updateRegistration);

router.route("/register").post(registerUser);

export default router;
