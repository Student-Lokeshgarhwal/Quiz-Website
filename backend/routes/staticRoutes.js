const express = require('express');
const { initalpageHandler, signupHandler, loginHandler, logoutHandler } = require('../controller/auth');

const router = express.Router();

router.get('/',initalpageHandler)
router.post('/signup',signupHandler)
router.post('/login',loginHandler)
router.get('/logout',logoutHandler)

module.exports = router;