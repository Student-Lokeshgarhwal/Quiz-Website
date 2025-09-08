const express = require('express');
const { getAllQuizHandler, checkOptionHandler } = require('../controller/getallquiz');
const router = express.Router();

router.get('/',getAllQuizHandler)
router.post('/:option',checkOptionHandler)


module.exports = router;