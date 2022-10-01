
exports.isLoggedIn = (req, res, next) => {
    if(req.user){
        next()
    }else{
        res.send("회원로그인이 되지 않음.")
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    
}
