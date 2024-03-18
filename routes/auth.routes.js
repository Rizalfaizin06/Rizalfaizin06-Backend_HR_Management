const express = require("express");
const { signIn, signUp } = require("../controller/auth.controller");
const router = express.Router();

router.post("/auth", signIn);
router.post("/registration", signUp);

module.exports = router;
