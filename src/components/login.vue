<template>
    <div class="mianlogin">
        <div class="container">
            <div class="fromson">
                <h2>登录</h2>   <h4 v-if='tip'>输入用户名或密码有误</h4>
                <div class="form-group">
                    <label for="exampleInputEmail1">Username</label>
                    <input  class="form-control" id="exampleInputEmail1" placeholder="username" v-model="username">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1" >Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="userpwd">
                </div>
                <div>          
                    <button class="btn btn-lg btn-primary btn-block" @click="login()">登录</button>
                </div>
     
            </div>
        </div>

    </div>
</template>
<script>
import Qs from 'qs'
import axios from 'axios'
export default {
     name:'login',
     data(){
         return{
             username:'',
             userpwd:'',
             nickname:'',
             tip:''
         }
     },
     methods:{
         login(){
             if(this.username&&this.userpwd){
                 this.tip=false;
                let data={
                    username:this.username,
                    userpwd:this.userpwd
                }
                let parm=Qs.stringify(data)
                axios
                .post('http://localhost:3000/api/login',parm)
                .then((respose)=>{
                    console.log(respose,"respose")
                    if(respose.data.staus=='0')
                    {
                         this.tip=true;
                         this.username='';
                         this.userpwd=''
                    }else{
                          this.$router.push({path:'/mianpage'})
                    }
                })
             }else{
                this.tip=true;
             }
         }
     }
}
</script>
<style scoped>
.mianlogin{
    height: 100vh;
    background-color: #eee
}
.container{
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    
}
.fromson{
    max-width: 330px;
    padding: 15px;
    margin: 0 auto; 

}
</style>