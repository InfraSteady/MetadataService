const express = require("express");
const {
    getSeviceTests,
    createSeviceTests,
    editSeviceTestsNameOrDescription,
    DeleteSeviceTests,
} = require("../controller/projectsController.js");
const auth = require("../middleware/auth.js");
const router = new express.Router();

router.post("v1/tests/get", auth, getSeviceTests);
router.post("v1/tests/add", auth, createSeviceTests);
router.put("v1/tests/edit", auth, editSeviceTestsNameOrDescription);
router.delete("v1/tests/delete", auth, DeleteSeviceTests);

module.exports = router;
