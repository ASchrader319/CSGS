const express = require('express');

const router = express.Router();

const {getValidJWT, validateJWT} = require("../controllers/auth.js");

router.get("/getToken", getValidJWT);
router.get("/decodeJWT", validateJWT);

module.exports = router;