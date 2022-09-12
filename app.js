const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
dotenv.config();

const webSocket = require('./socket')
const path = require('path');
const app = express();
const routerindex = require('./routes/index.js');
const routerauth = require('./routes/auth.js')
const swaggerJSDoc = require('swagger-jsdoc');

const session = require('express-session')
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false,
    },
}))

const cookieParser = require('cookie-parser')
app.use(cookieParser(process.env.COOKIE_SECRET))

const nunjucks = require('nunjucks')
app.set('view engine', 'html')
nunjucks.configure('views', {
    express : app,
    watch : true,
})

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'views/css'))) // 정적파일 제공
app.use(express.static(path.join(__dirname, 'views/js'))) // 정적파일 제공
app.use(express.static(path.join(__dirname, 'public')))

app.set('port', process.env.PORT || 8082)

// app.use('/auth', routerauth)
app.use('/', routerindex)
// app.get('/', (req, res, next) => {
//     res.sendFile(path.join(__dirname, './views', 'Chat_waiting.html'))
// })




// app.use('')
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
// swagger api 문서
const options = require('./src/swagger')
const specs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const server = app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중')
})

const sessionMiddleware = session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
})
app.use(sessionMiddleware)
webSocket(server, app , sessionMiddleware)
