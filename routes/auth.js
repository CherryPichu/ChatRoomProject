const express = require('express')
const router = express.Router();
const path = require('path')
const clientdb = require('../models/Client')



router.post('/login', async (req, res, next) => {
    if(req.body.id && req.body.password){
        const loginInfo = new clientdb({
            email : req.body.id,
            password : req.body.password
        })
        
        const result = (await clientdb.findByIdandPassword(loginInfo))[0]
        if(result){
            req.session.client = result[0]
        }else{
            console.error("회원 정보 없음")
        }
        res.redirect('/')
    }else{
        console.error('id와 password가 없습니다.')
    }
})
module.exports = router



