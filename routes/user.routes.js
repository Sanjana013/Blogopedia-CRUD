const express = require("express");
const { registerUser, profile, loginUser } = require("../controllers/user.controller");
const { checkAuth } = require("../middlewares/auth.middleware");
const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile", checkAuth, profile)


module.exports = router