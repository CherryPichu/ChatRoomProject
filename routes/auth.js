const path = require('path')
const router = require('express').Router();
const passport = require('passport')
const clientdb = require('../models/Client')
const brcypt = require('bcrypt')


const {AuthLogin, AuthLogout, AuthJoin} = require("../controllers/auth.controller")

router.post('/join', AuthJoin)

router.post('/login', AuthLogin)

router.get('/logout', AuthLogout) // get 으로 logout 하는 것은 보안적 위협이 있다. passport document logout 확인


module.exports = router
