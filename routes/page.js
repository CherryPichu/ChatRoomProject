const express = require('express')
const path = require('path')
const router = express.Router()
const {isLoggedIn }= require('../middlewares/middlewares')

const Client = require('../models/Client.js')

router.get('/', (req, res, next) => {
    // post : req.body.이름
    // get : req.query.이름
    res.render('Chat_waiting', { client : req.user, errorMessage : req.query.loginError }) // pasport 로 얻는 세션은 req.user 에 저장됨.
    // 매법 접속때 마다 passport는 db에 데이터를 요청해 받아와서 메모리를 절약할 수 있음.
})

router.get('/ChatRoom', isLoggedIn, (req, res, next) => {
    
    res.render('Chat_Room')
})

router.get("/login", (req, res, next) => {
    res.render('ChatLogin.html')
})

router.get("/join", (req, res, next) => {
    res.render('Chat_join.html')
})


module.exports = router


/**
 * @swagger
 * paths: 
 *   /: 
 *     get: 
 *       operationId: ViewMain
 *       tags: [/routes]
 *       description: main page
 *       parameters: []
 *       responses: {200 : {description : main.html 페이지 출력}}
 *   /login : 
 *     get: 
 *       operationId: ViewLogin
 *       tags: [/routes]
 *       description: Chat login Page
 *       parameters: []
 *       responses: 
 *          200 : 
 *              description : ChatLogin.html 페이지 출력}}
 *   /main/Chatwaiting : 
 *     get: 
 *       operationId: ViewChatWatting
 *       tags: [/routes]
 *       description: Chat login Page
 *       parameters: []
 *       responses: 
 *          200 : 
 *              description : Chatwaiting.html 페이지 출력
 *   /main/ChatRoom : 
 *     get: 
 *       operationId: ViewChatWatting
 *       tags: [/routes]
 *       description: Chat login Page
 *       parameters: []
 *       responses: 
 *          200 : 
 *              description : ChatRoom.html 페이지 출력
 *   /models/index : 
 *     api: 
 *       operationId: ViewChatWatting
 *       tags: [/models]
 *       description: Chat login Page
 *       parameters: []
 *       responses: 
 *          200 : 
 *              description :  ChatRoom.html 페이지 출력
*/










