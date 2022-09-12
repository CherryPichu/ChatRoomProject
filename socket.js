const cookieParser = require('cookie-parser');
const ScoketIO = require('socket.io')
const Clientdb = require('./models/Client')
const Roomdb = require('./models/Room')

module.exports = (server, app, sessionMiddleware) => {
    const io = ScoketIO(server, { path : "/socket.io"});
    app.set('od', io);
    const waittingRoom = io.of('/wattingRoom')
    const chatRoom = io.of('/chatRoom')
    
    io.use((socket, next) => {
        cookieParser(process.env.COOKIE_SECRET)(socket.request, socket.request.res || {}, next);
        sessionMiddleware(socket.request, socket.request.res || {}, next);
    })

    waittingRoom.on("connection", (socket) => {
        console.log("wattingRoom 네임스페이스 접속")
        socket.on('disconnect', () => {
            console.log("room 네임스페이스 접속 해제")
        })
        socket.on('get room', async () => {
            const Rooms = await Roomdb.getAll();
            
            for(const i of Rooms[0]){
                // console.log(i)
                io.of('/wattingRoom').emit('newRoom', i)
            }

        })

    })
}

