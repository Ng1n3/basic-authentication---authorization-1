const express = require("express");
const userController = require("./users.controller");

const router = express.Router();

//create user
router.post("/", userController.createNewUser);

module.exports = router;
