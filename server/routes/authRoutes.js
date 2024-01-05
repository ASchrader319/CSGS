const express = require('express');

const router = express.Router();

const {register, getValidJWT, decodeJWT} = require("../controllers/authController.js");

router.post("/register", register);
router.get("/getToken", getValidJWT);
router.get("/decodeJWT", decodeJWT);

module.exports = router;