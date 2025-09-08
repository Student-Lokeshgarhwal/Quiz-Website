const express = require("express");
const { createQuizHandler } = require("../controller/createquiz");
const router = express.Router();

router.post('/',createQuizHandler)


module.exports = router;