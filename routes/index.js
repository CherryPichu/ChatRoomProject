const express = require('express')
const path = require('path')
const router = express.Router()
const db = require('../models/index.js')

router.get('/', (req, res, next) => {
    
    res.send(db.PrintClient() );
})

module.exports = router










