const express = require("express");
const { deleteUser, getUser } = require("../controller/user.controller");
const router = express.Router();

router.get("/users", getUser);
router.delete("/users/:username", deleteUser);

module.exports = router;
