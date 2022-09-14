const express = require('express')
const router = express.Router();
const path = require('path')
const clientdb = require('../models/Client')



router.post('/login', (req, res, next) => {
    // 클로저에 대한 고찰 : https://haesoo9410.tistory.com/342
    if(req.body.id && req.body.password){
        const loginInfo = new clientdb({
            email : req.body.id,
            password : req.body.password
        })
        
        clientdb.findByIdandPassword(loginInfo, (err, response) => { 
            if(err){
                onsole.error("회원 정보 없음")
                console.error(err);
                res.redirect('/') // 오류페이지
            }
            req.session.client = response[0]
            // console.log(req.session.client)
            res.redirect('/')
        })
        console.log(req.session.client)
        
        
    }else{
        console.error('id와 password가 없습니다.')
    }
})

router.get('/logout', (req, res, next) => {
    req.session.client = null;
    res.redirect('/')
})
module.exports = router



