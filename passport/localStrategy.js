const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcypy = require('bcrypt') // 암호화
const clientdb = require("../models/Client")


module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'id', // html form에 로그인 field name!
        passwordField: 'password',
    }, (email , password, done) => {
            const loginInfo = new clientdb({
                email : email
            })
            clientdb.findByClient( loginInfo, async (err, exUser) => {
                // console.log(exUser)
                if(err){ console.error(err); return;}
                if(exUser){
                    const result = await bcypy.compare(password, exUser.password);
                    // const result = password == exUser.password
                    if(result){
                        done(null, exUser)
                    }else {
                        done(null, false, {message : '비밀번호가 일치하지 않습니다.'});
                    }
                }else {
                    done(null, false, {message : "가입되지 않은 회원입니다."})
                }
            });
    }))
}
