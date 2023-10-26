const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const indexRouter = require('./routes')
const userRouter = require('./routes/user')

// react랑 node 방화벽 제거
const cors = require('cors')

app.use(cors())

// form 파싱
app.use(bodyParser.json())
// post 파싱
app.use(bodyParser.urlencoded({extended : true}))

app.use('/', indexRouter)
app.use('/user', userRouter)

app.set('port', process.env.PORT || 3333)
app.listen(app.get('port'))