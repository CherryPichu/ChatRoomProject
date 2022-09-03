const express = require('express')
const path = require('path')
const router = express.Router()

const client = require('../models/client.js')

router.get('/', (req, res, next) => {

    // client.getAll((err, data) =>{
    //     if(err){
    //         res.status(500).send({
    //             message:
    //             err.message || "Some error occured while creating th Client"
    //         })
    //     }
    //     // console.log(data)
    // })


    res.sendFile(path.join(__dirname, '../views', 'Chat_waiting.html'))
})

router.get('/add', (req, res, next) => {
    console.log("/add")
    const newclient = new client({
        nick : "namjung",
        email : req.query.email,
        password : "1234",
        colorHash : null,
        snsid : null,
        deletedAt : null,
    }) 
    client.create(newclient, (err, data)=>{
        if(err){
            res.status(500).send({
                message:
                err.message || "Some error occured while creating th Client"
            })
        }
        console.log(data)
    })
    res.send("good")
})

router.get("/remove", (req, res, next) => {
    client.remove(req.query.id, (err, data) => {
        if(err){
            console.error(err)
        }
    })
    res.send('good')
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










