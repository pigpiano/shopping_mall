const express = require('express');
// 절대경로 사용
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

// env 환경변수를 사용하기 위해 필요하다.
const dotenv = require('dotenv')
dotenv.config();

// Constants
const PORT = 4000;

// App 객체 생성
const app = express();

// post로 보낼 때 파싱해서 전달하기 위해서 express.json 미들웨어 설정.
app.use(express.json());

// mongoDB랑 우리 앱을 연결
mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log('연결완료')
})
.catch(err => {
    console.error(err)
})

app.get('/', (req, res, next) => {
    // Will crash the server on every HTTP request
    setImmediate(() => { next(new Error('it is an Error')) });
    // res.send('hello everybody')
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.json(req.body)
})

// app.use('/users', require('./routes/users'));
app.use((error, req, res, next)=> {
    res.status(err.status || 500);
    res.send(error.message || '서버에서 에러가 발생했습니다');
})


// 두 개의 다른 Orgin을 갖고 있으면 서버는 아무 설정 없이 Request를 보낼 수 없기 때문에 CORS 설정 필요.
app.use(cors())

// uploads 폴더 안에 있는 정적인 파일을들 클라이언트에게 제공해준다. path.join(__dirname, ...) <-- 절대경로 ../를 앞에 안붙이면 경로 틀림.
app.use(express.static(path.join(__dirname, '../uploads')));



app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`)