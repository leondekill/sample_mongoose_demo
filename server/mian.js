const experss=require('express');
const app=new experss;
const mongoose=require('./conn');
//render的引擎  需要npminstall
// app.engine('html',require('express-art-template'));  
//post请求获得参数
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
//cookie
const cookieParser=require('cookie-parser');
app.use(cookieParser());  //cookie存取

let router=require('./API/user');
let router_map=require('./API/mapinfo');
let router_crud=require('./API/crud');

app.all('*', (req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });
app.use('/api',router);
app.use('/api',router_map);
app.use('/api',router_crud);





var serveroen= app.listen(3000,function(){
    console.log("localhost:3000")
})