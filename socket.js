const cookieParser = require('cookie-parser');
const ScoketIO = require('socket.io')
const Clientdb = require('./models/Client')
const Roomdb = require('./models/Room')
const cookie = require('cookie-signature');
const Chatdb = require('./models/Chat');
const { param } = require('./routes/page');


module.exports = (server, app, sessionMiddleware) => {
    const io = ScoketIO(server, { path : "/socket.io"});
    app.set('io', io);
    const waittingRoom = io.of('/wattingRoom')
    const chatRoom = io.of('/chatRoom')
    // io.of("/chatRoom").adapter.on("create-room", (room) => {
    //     console.log(`room ${room} was created`);
    // })

    
    io.use((socket, next) => {
        
        cookieParser(process.env.COOKIE_SECRET)(socket.request, socket.request.res || {}, next); // 소켓에서 쿠키 사용 가능
        sessionMiddleware(socket.request, socket.request.res || {}, next);

    })

    waittingRoom.on("connection", (socket) => {
        console.log("wattingRoom 네임스페이스 접속")
        socket.on('disconnect', () => {
            console.log("room 네임스페이스 접속 해제")
        })
        socket.on('get room', () => {
            Roomdb.getAll((err, data) => {
                if(err){
                    console.error(err);
                    return;
                } 
                for(const i of data){
                    // console.log(i)
                    socket.emit('newRoom', i)
                }
            });
            
        })

    })

    chatRoom.on("connection", (socket) => {
        
        const req = socket.request
        // console.log(req.session)
        console.log("ChatRoom에 접속")
        const { headers : { referer } } = req;
        // console.log(referer)
        const roomid = referer.split("=")[1]
        // console.log(socket.adapter.rooms)
        socket.join(roomid)
        
        const session = req.session
        var user = "anonymous"
        if(session.passport){
            user =  session.user // page에서 req.session.user = req.user 사용
        }

        socket.emit("join", { // 누가 방문했는지
            user:'system',
            chat : `${user.nick}님이 입장하셨습니다.`,
            session : user,
        })

        const byChat = new Chatdb({
            room : roomid,
        })

        Chatdb.loadChat(byChat,(err, res) => {
            

            if(err){
                console.error(err);
                return;
            } 
            
            // console.log(res)
            socket.emit("getChatAll", {
                // user:user.nick,
                chats : res, // 결과를 모두 보냄.
                session : user,
                
            })
        } , 30) // 최근 30개
        

        socket.on("post Chat", (data) => {

            // console.log(data)
            // console.log(user)
            const newchat = new Chatdb({
                chat : data.content,
                room : roomid,
                user : user.id,
                gif : null,
                nick : user.nick,
            })
            Chatdb.create(newchat, (err, res) => {
                if(err){
                    console.error(err);
                    return;
                } 
            })
            socket.to(roomid).emit("post Chat", { // 자신을 제외한 room에 있는 모두에게 보냄
                user:user.nick,
                who : "other",
                chat : data.content, // 결과를 모두 보냄.
                session : user,
            })

            socket.emit("post Chat", { // 자신에게도 보냄
                user: user.nick,
                who : "my",
                chat : data.content, // 결과를 모두 보냄.
                session : user,
            })
        })
       
        socket.on('disconnect', () => {
            console.log("chatRoom 네임스페이스 접속 해제")
            socket.leave(roomid);

        })
    })

    // 채팅방 만들기

    // 채팅방 삭제
    
}

