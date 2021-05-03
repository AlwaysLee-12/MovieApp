const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const saltRounds=10; //10자리 salt
const jwt=require('jsonwebtoken');

//user에 관한 스키마 생성
const userSchema=mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email:{
        type:String,
        trim:true, //공백 없애주는 역할 ex)lee 12@naver.com에서 공백 제거해서 
        		   //					lee12@naver.com으로 만듦
        unique:1
    },
    password:{
        type:String,
        maxlength:100
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        default:0
    },
    image: String,
    token:{
        type:String
    },
    tokenExp:{ //토큰 유효기간
        type:Number
    }
});

//유저 정보 저장 전에 암호화 
userSchema.pre('save',function(next){
    var user=this;

    //다른 유저 정보가 아닌 패스워드 변경시에만 암호화 시키도록 함   
    if(user.isModified('password')){
        //비밀번호를 암호화 시킴
        //솔트 생성
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err) return next(err);
            //솔트를 이용해 해시값 생성
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                //유저 비밀번호에 암호화 된(해싱) 값 할당
                user.password=hash;
                next();
            });
        });
    } else{
        next();
    }
});

userSchema.methods.comparePassword=function(plainPasswprd,cb){
    //plainPassword(1234567) 암호화 된 비밀번호(해싱값)가 같은지 체크
    bcrypt.compare(plainPasswprd,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    });
}

userSchema.methods.generateToken=function(cb){
    var user=this;

    //jsonwebtoken을 이용해 토큰 생성
    var token= jwt.sign(user._id.toHexString(),'secretToken');
    user.token=token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    });
}

userSchema.statics.findByToken=function(token,cb){
    var user=this;

    //토큰 복호화
    jwt.verify(token,'secretToken',function(err,decoded){
        if(err) return cb(err);
        //유저 아이디를 이용해 유저를 찾은 후 클라이언트에서 가져온 토큰과 데이터베이스에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id":decoded,"token":token},function(err,user){
            if(err) return cb(err);
            cb(null,user);
        });
    });
}

//user 스키마를 모델로 감싸줌
const User=mongoose.model('User',userSchema);

module.exports={User}
//다른 곳에서도 해당 모듈을 사용할 수 있음