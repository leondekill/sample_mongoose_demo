const mongoose =require('mongoose');
//schema是mongoose里会用到的一种数据模式，可以理解为表结构的定义；
//每个schema会映射到mongodb中的一个collection，它不具备操作数据库的能力
const UserScheame=new mongoose.Schema({
   map:{type :String},
   id:{type :String},
   date:{type:String},
   isSet:{type:Boolean}
})
let save=mongoose.model('save',UserScheame,'map'); 
//model是由schema生成的模型，可以对数据库的操作\
const express = require('express');
let router = express.Router();

//更新
router.get('/save',(req,res)=>{
 let par=req.query
 console.log(par,"par")
    save.findOne({_id:par._id},(err,doc)=>{
        console.log(doc,"docone")
        doc.map=par.map;
        doc.id=par.id;
        doc.date=par.date
        doc.save((err,doc)=>{
            if(doc){
                res.json({
                   status:"1",
                   message:"保存成功"
                })
            }
        })   
    })
});

//删除
router.get('/delt',(req,res)=>{
    let par=req.query;
    save.deleteOne({_id:par._id},(err)=>{
        if(err){
            res.json({
                status:"2",
                message:'删除失败'
            })
        }else{
            res.json({
                status:"1",
                message:"删除成功"
            })
        }
    })
});

//保存增加项成功
router.get('/Edit',(req,res)=>{
    let par=req.query;
    console.log(par);
    par.isSet=false;
    let one=new save(par)
    one.save((err,doc)=>{
           if(doc){
               res.json({
                status:"1",
                message:"保存增加项成功"
               })
           }else{
            res.json({
                status:"2",
                message:"保存增加项失败"
               })               
           }
    })
})




module.exports=router;