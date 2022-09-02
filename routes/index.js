const express = require('express')
const path = require('path')
const router = express.Router()
const db = require('../models/index.js')

const client = require('../models/client.js')

router.get('/', (req, res, next) => {

    client.getAll((err, data) =>{
        if(err){
            res.status(500).send({
                message:
                err.message || "Some error occured while creating th Client"
            })
        }
        // console.log(data)
    })


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

module.exports = router










