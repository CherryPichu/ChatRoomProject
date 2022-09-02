const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
dotenv.config();

const path = require('path');
const app = express();
const routerindex = require('./routes/index.js')

app.use(express.static(path.join(__dirname, 'views/css'))) // 정적파일 제공
app.use(express.static(path.join(__dirname, 'views/js'))) // 정적파일 제공

app.set('port', process.env.PORT || 8082)

app.use(morgan('dev'))


app.use(express.static(path.join(__dirname, 'public')))


// app.use('/select', routerindex)
app.use('/', routerindex)
// app.get('/', (req, res, next) => {
//     res.sendFile(path.join(__dirname, './views', 'Chat_waiting.html'))
// })


var options = {
    swaggerOptions: {
      validatorUrl: null
    }
  };

// app.use('')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
// swagger api 문서


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중')
})



