const express = require('express');

const router = express.Router();

const {register, login, getValidJWT, decodeJWT} = require("../controllers/authController.js");

router.post("/register", register);
router.post("/login", login);
router.get("/getToken", getValidJWT);
router.get("/decodeJWT", decodeJWT);

module.exports = router;