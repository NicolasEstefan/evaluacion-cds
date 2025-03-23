const express = require('express')

const isAuth = require('../middleware/auth')

const router = express.Router()

const { postLogin, postSignup, postLogout } = require('../controllers/auth')

router.post('/signup', postSignup)
router.post('/login', postLogin)
router.post('/logout', isAuth, postLogout)

module.exports = router