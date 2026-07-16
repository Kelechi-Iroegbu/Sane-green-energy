const express = require("express");
const router = express.Router();
const { sendSupportMessage } = require("../Controllers/supportController");

router.post("/", sendSupportMessage);

module.exports = router;
