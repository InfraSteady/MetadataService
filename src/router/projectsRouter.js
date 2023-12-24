const express = require("express");
const {
    getProject,
    createProject,
    editProjectNameOrDescription,
    DeleteProject,
} = require("../controller/projectsController.js");
const auth = require("../middleware/auth.js");
const router = new express.Router();

router.get("v1/projects/get", auth, getProject);
router.post("v1/projects/add", auth, createProject);
router.put("v1/projects/edit", auth, editProjectNameOrDescription);
router.delete("v1/projects/delete", auth, DeleteProject);

module.exports = router;
