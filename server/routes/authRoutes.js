const express = require('express');

const router = express.Router();

const {register, getValidJWT, validateJWT} = require("../controllers/authController.js");

router.post("/register", register);
router.get("/getToken", getValidJWT);
router.get("/decodeJWT", validateJWT);

module.exports = router;