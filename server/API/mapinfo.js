const mongoose =require('mongoose');
//schema是mongoose里会用到的一种数据模式，可以理解为表结构的定义；
//每个schema会映射到mongodb中的一个collection，它不具备操作数据库的能力
const UserScheame=new mongoose.Schema({
   map:{type :String},
   id:{type :String},
   date:{type:String},
   isSet:{type:Boolean}
})
let map=mongoose.model('map',UserScheame,'map'); 
//model是由schema生成的模型，可以对数据库的操作\
const express = require('express');
let router = express.Router();

router.get('/mapInfo',(req,res)=>{
    let pageSize=parseInt(req.query.pageSize) ;
    let currentPage=parseInt(req.query.currentPage);
    let skip=(currentPage-1)*pageSize;
    if(req.query.id){
        map.find({id:req.query.id}).exec((err,doc)=>{
            res.json({
                status:"1",
                res:doc
            })
        })           
    }else{
        let condition={};
        map.find(condition).skip(skip).limit(pageSize).exec((err,doc)=>{
            res.json({
                status:"1",
                res:doc
            })
        })
    }
   

});
router.get('/idinfo',(req,res)=>{
    let par_id=req.query.id
    let par={
        id:new RegExp(par_id)
    }
    map.find(par,(err,doc)=>{
        if(doc){
            res.json({
                status:'1',
                doc:doc
            })
        }else{
            res.json({
                status:'2',
                doc:"失败"
            });
            
        }
    })
})
module.exports=router;