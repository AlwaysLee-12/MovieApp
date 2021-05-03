const express= require('express');
const app= express();
const port=5000;
const bodyParser=require('body-parser');  //body-parser 사용
const { User }= require('./models/User'); //User 모듈을 불러옴
const mongoose= require('mongoose');
const { json } = require('body-parser');
const config=require('./config/key');
const cookieParser=require('cookie-parser');
const {auth}= require('./middleware/auth'); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(config.mongoURI,{
    useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=>console.log('MongoDB Connected'))
  .catch(err=>console.log(err));

app.get('/',(req,res)=>res.send('Hello World!!!'));

app.get('/api/hello',(req,res)=>{
  res.send("안녕하세요~");
})

app.post('/api/users/register',(req,res)=>{
  //회원 가입 시 필요한 정보들을 client에서 가져와 데이터 베이스에 저장
  const user=new User(req.body);
  user.save((err,userInfo)=>{
    if(err) return res.json({success:false,err}); //만약 저장시 에러가 발생하면, 클라이언트에게 json 형식으로 에러 메시지 전달
    return res.status(200).json({ //저장을 성공했다면, json 형식으로 저장 성공 메시지 전달
      success:true
    });
  });
});

app.post('/api/users/login',(req,res)=>{
  //요청된 이메일이 데이터베이스에 존재하는지 확인
  User.findOne({email:req.body.email},(err,user)=>{
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없음"
      })
    }
    //요청된 이메일이 데이터베이스에 존재한다면, 비밀번호가 데이터베이스에 있는 것과 일치하는지 확인
    user.comparePassword(req.body.password,(err,isMatch)=>{
      if(!isMatch) return res.json({loginSuccess: false, message: "비밀번호가 틀림"});
      //비밀번호까지 일치하면, 토큰 생성
      user.generateToken((err,user)=>{
        if(err) return res.status(400).send(err);
        //토큰 저장. where? 쿠키, 로컬 스토리지, 세션(여기서는 쿠키에 저장)
        res.cookie("x_auth",user.token)
        .status(200)
        .json({loginSuccess:true, userId: user.id});
      });
    });
  });
});

//auth: 요청을 받고 콜백함수로 넘어가기 전 auth라는 미들웨어를 통해 인증 절차 수행
app.get('/api/users/auth',auth,(req,res)=>{
  //미들웨어를 통과해 여기까지 왔으면 인증이 성공했다는 것
  res.status(200).json({
    _id:req.user._id,
    isAdmin:req.user.role===0?false:true,
    isAuth:true,
    email:req.user.email,
    lastname:req.user.lastname,
    role:req.user.role,
    image:req.user.image
  });
});

//로그아웃 기능 구현
app.get('/api/users/logout',auth,(req,res)=>{
  //먼저 인증 과정을 수행하고, 그 후 해당 아이디를 가진 유저의 토큰을 지워준다.
  User.findOneAndUpdate({_id:req.user._id},{token:""},(err,user)=>{
    if(err) return res.json({success:false,err});
    return res.status(200).send({success:true});
  });
});


app.listen(port,()=>console.log(`Example app listening on port ${port}!`));



