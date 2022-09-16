const clientdb = require("../models/Client")
const passport = require('passport')
const local = require('./localStrategy')
module.exports = () => { 
    passport.serializerUser((client, done) => { //req.session 객체에
        // 사용자 정보를 다 들고 있으면 메모리를 많이 차지하기 때문에
        // 사용자의 아이디만 저장.
        done(null, client.id)
    })

    passport.deserializerUser((id,done) => {
        clientdb.getAll({})
    })
}

