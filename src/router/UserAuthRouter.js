const express = require("express");
const { signUpController, loginController, logoutController } = require("../controller/UserAuthController");
const auth = require("../middleware/auth.js");
const router = new express.Router();

router.post("v1/user/register", auth, signUpController);
router.post("v1/user/login", auth, loginController);
router.post("v1/user/logout", auth, logoutController);

module.exports = router;
