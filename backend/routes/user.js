const express = require("express");
const { handleSignup, handleLogin } = require("../controller/user");

const router = express.Router();

router.post('/signup', handleSignup);
router.post("/login", handleLogin);

module.exports = router;