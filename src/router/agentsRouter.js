const express = require("express");
const { getAgents, createAgents, editAgent, DeleteAgents } = require("../controller/agentsController.js");
const auth = require("../middleware/auth.js");
const router = new express.Router();

router.get("v1/agents/get", auth, getAgents);
router.post("v1/agents/add", auth, createAgents);
router.put("v1/agents/edit", auth, editAgent);
router.delete("v1/agents/delete", auth, DeleteAgents);

module.exports = router;
