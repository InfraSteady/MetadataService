const express = require("express");
const { signUpController, loginController, logoutController } = require("../controller/userAuthController.js");
const auth = require("../middleware/auth.js");
const router = new express.Router();

router.post("/v1/user/register", signUpController);
router.post("/v1/user/login", loginController);
router.post("/v1/user/logout", auth, logoutController);

module.exports = router;
