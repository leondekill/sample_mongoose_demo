const mongoose=require('mongoose');
 mongoose.connect('mongodb://localhost:27017/config');
mongoose.connection.on('error',function(err){
console.log('连接异常')
})
mongoose.connection.on('connected',function(){
console.log("连接")
})
mongoose.connection.on('disconnected',function(){
    console.log("断连接")
})

module.exports=mongoose;