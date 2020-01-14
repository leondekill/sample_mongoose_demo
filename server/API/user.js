const mongoose =require('mongoose');
//schema是mongoose里会用到的一种数据模式，可以理解为表结构的定义；
//每个schema会映射到mongodb中的一个collection，它不具备操作数据库的能力
const UserScheame=new mongoose.Schema({
   userName:{type :String},
   userPwd:{type :String},
})
let user=mongoose.model('user',UserScheame,'userName'); 
//model是由schema生成的模型，可以对数据库的操作\
const express = require('express');
let router = express.Router();
router.post('/login',(req,res)=>{
    let objpar={
        userName:req.body.username,
        userPwd:req.body.userpwd
    }
    user.findOne(objpar,(err,doc)=>{
           if(!doc){
               res.json({
                   staus:'0',
                   message:'用户名或密码错误'
               })
           }else{
               res.cookie("userName",doc.userName,{
                    path:"/",
                    maxAge:1000*60*60
                });
               res.json({
                staus:'1',
                message:'成功',
                reslut:doc
               })
           };

    })
})






module.exports=router;