const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/signin", userController.signin);

router.post("/signup", userController.signup);

// router.get("/logout", userController.logout);

module.exports = router;
