const path = require('path')
const passport = require('passport')
const clientdb = require('../models/Client')
const brcypt = require('bcrypt')


module.exports.AuthJoin = async( req, res, next) => {
    const { email, nick, password } = req.body
    try {
        const exUser = clientdb.findByClient(new clientdb({email}), async (err, data) => {
                if(err){
                    console.error(err)
                    res.redirect('/?loginError=이미 있는 이메일, 다른 이메일로 시도.')
                    return;
                }
                if(data){
                    // console.log(data)
                    return;
                }
                const hash = await brcypt.hash(password, 12)
                const newclient = new clientdb({email, nick, password : hash});
                clientdb.create(newclient, (err, data) => {
                    if(err){
                        console.error(err)
                        res.redirect('/?loginError=에러')
                        return res.redirect('/');
                    }
                    if(data.affectedRows >= 1){
                        // console.log(data)
                        return res.redirect('/?loginError=성공!');
                    }
                    return res.redirect('/?loginError=알수 없는 오류 발생..')
                })
        })
    }catch(err){
        console.error(err)
    }
}

module.exports.AuthLogin =  (req, res, next) => {
    
    passport.authenticate('local', (authError ,user, info) => {

        if(authError){
            console.error(authError);
            return next(authError)
        }
        if(!user){ // 로그인 실패시 user : false
            return res.redirect(`/?loginError=${info.message}`)
        }
        return req.login(user, (loginError) => { // 로그인 성공시
            if(loginError) {
                console.error(loginError);
                return next(loginError)
            }
            return res.redirect('/');
        })
    })(req,res,next)
}

module.exports.AuthLogout = (req, res) => {
    req.logout((err) => {
        if(err){ return next(err) }
        res.redirect('/')
    });

    req.session.destroy()
        
        
    res.redirect('/')
}

// {AuthLogin, AuthLogout, AuthJoin} 이선식으로 나옴

