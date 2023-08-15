const express = require('express');
const router = express.Router();
const {usersController} = require('./../controllers/user');
const {protect} = require("../middleware/auth");

router.post("/register/:role",usersController.insert);
router.post("/login",usersController.login);
router.get("/:id", usersController.getUser);

module.exports = router;