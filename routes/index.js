const express = require('express')
const path = require('path')
const router = express.Router()

const Client = require('../models/Client.js')

router.get('/', (req, res, next) => {
    

    res.render('Chat_waiting', { 
        Rooms : [
            {title : "채팅방 - 1 ", max : 20 , inPeople : 5, state : "public"},
            {title : "채팅방 - 2 ", max : 30, inPeople :2, state : "secret"}
        ]
    })

})

router.get('/ChatRoom', (req, res, next) => {
    res.render('Chat_Room')
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










