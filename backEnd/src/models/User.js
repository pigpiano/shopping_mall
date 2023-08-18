const {defalut: mongoose} = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true, // 빈간 없애는 옵션
        unique: 1 //unique할 수 있게 함
    },
    password: {
        type: String,
        minLength: 5
    },
    
    role: {
        type: Number,
        default: 0 // 0은 일반 유저 1이면 관리자
    },    
    image: String

})