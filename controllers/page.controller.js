const Roomdb = require('../models/Room')
const path = require('path')



exports.createRoom = (req,res,next) => {

    const newRoom = new Roomdb({
        title : req.body.title,
        inPeople : 0,
        max : req.body.max,
        owner : req.user.id,
        password : req.body.password,
        state : req.body.state,
    });
    Roomdb.create(newRoom, (err, data) => {
        if(err){
            console.error(err)
            res.redirect('/?loginError=방 생성 에러')
        }
        res.redirect('/?loginError=방 생성 성공')
        
    })
}
