<template>
<el-container>

<!-- dialog -->
    <el-dialog title="添加记录" v-model="dialog_from" :visible.sync="dialogFormVisible">
        <el-form ref="form"  label-width="80px">
          <el-form-item  label="id">
            <el-input v-model="dialog_from.id"></el-input>
          </el-form-item>
          <el-form-item  label="map">
            <el-input v-model="dialog_from.map"></el-input>
          </el-form-item>
            <el-form-item    label="date">
            <el-input v-model="dialog_from.date"></el-input>
          </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="dialogsubmit">提交</el-button>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
    </el-dialog>

<!-- 头部 -->
    <el-header>
      <div> 简单查询数据库demo</div>
    </el-header>

<!-- 侧边+主要内容 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
          <el-menu @select='select'>
              <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">one</span>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">two</span>
              </el-menu-item>    
              <el-menu-item index="3">
                <i class="el-icon-menu"></i>
                <span slot="title">three</span>
              </el-menu-item>                         
          </el-menu>
      </el-aside>
      <!-- 主要内容 -->
        <mian-one v-if="mianindex==1" @dialog_show='show_dailog'></mian-one>
        <mian-two v-else-if="mianindex==2"></mian-two>
        <mian-tr v-else-if="mianindex==3"></mian-tr>
    </el-container>

</el-container>
</template>
<script>
import axios from 'axios'
import MianOne from './MianOne'
import MianTwo from './MianTwo'
import MianTr from './MianTr'
export default {
  data(){
        return{
            dialog_from:{
                 id:'',
                 map:'',
                 date:'',
                 isSet:false   
            },
            dialogFormVisible: false,          
            flage:true,
            row:[
                {name:"id"},
                {name:"map"},
                {name:'date'},
                {name:'操作'}
            ],
            tableData: [],
            loading:true,
            search:'',
            total:'',
            pageSize:8,
            currIndex:1,
            form:'',
            mianindex:1
        }
    },
    methods:{
          show_dailog(){
            this.dialogFormVisible=true
          },
          handleEdit(index,row,falg){
               console.log(row,"handleEditrow")
               row.isSet=true;
          },
          Save(index,row,falg){
                row.isSet=false;
                console.log(row,"saverow");
                if(row._id){
                    axios
                      .get("http://localhost:3000/api/save",{params:row})
                        .then((value)=>{
                          if(value.data.status=="1"){
                                    this.$message({
                                        message: '保存成功',
                                        type: 'success'
                                      });
                                      this.getInfo();
                          }
                      })
                }else{
                  this.$message.warning("无_Id保存")
                  axios
                    .get("http://localhost:3000/api/Edit",{params:row})
                    .then((value)=>{
                          if(value.data.status=="1"){
                                    this.$message({
                                        message: '保存成功',
                                        type: 'success'
                                      });
                                      this.getInfo();
                          }                      
                    })
                }
          },
          getInfo(currIndex){
            axios
             .get("http://localhost:3000/api/mapInfo",{params:{
                 pageSize:this.pageSize,
                 currentPage:this.currIndex
             }})
               .then((value)=>{
                  this.tableData=value.data.res;                   
                  this.loading=false;
                  this.total=this.tableData.length                 
             })


          },
          delt(index,row){
            axios
            .get("http://localhost:3000/api/delt",{params:row})
            .then((value)=>{
                  if(value.data.status=="1"){
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                              });
                              this.getInfo();
                  }else{
                            this.$message.error('错了哦，这是一条错误消息');                   
                  }
            })
          },
          addMasterUser(){
              console.log(this.tableData)
              for(let i of this.tableData){
                  if(i.isSet){
                    return this.$message.warning("请先保存当前编辑项");
                  }
              };
              let addvlaue={
                   map:'',
                   id:'',
                   date:'',
                   isSet:true
                };
                this.tableData.push(addvlaue);
                console.log(this.tableData,"addd")
                //this.getInfo();
          },
          handleCurrentChange(val){
            this.currIndex=val;
            this.getInfo();
            console.log(`${val}当前`)
          },
          dialogclose(){
              this.dialogFormVisible = false;
          },
          dialogsubmit(){
              this.dialogFormVisible = false;
                  axios
                    .get("http://localhost:3000/api/Edit",{params:this.dialog_from})
                    .then((value)=>{
                          if(value.data.status=="1"){
                                    this.$message({
                                        message: '保存成功',
                                        type: 'success'
                                      });
                                      this.getInfo();
                          }                      
                    })
          },
          select(index){
              console.log(index)
              this.mianindex=index; 
          }           
    },
    mounted(){
      this.getInfo();
    },
    components:{
      MianOne,
      MianTwo,
      MianTr
    }
}
</script>
<style  scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    font-size: x-large;
    line-height: 60px;
   }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 600px;
    height: 690px;
   }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 35px;
   }
  
  body > .el-container {
    margin-bottom: 40px;
   } 
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
   }  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
   }
  .el-table-add-row {
    width: 100%;
    height: 34px;
    border: 1px dashed #f7750a;
    text-align: left;
    cursor: pointer;
    justify-content: center;
    display: flex;
    line-height: 34px;
    background-color: rgb(252, 252, 252)
   }
  .el-table-page-row {

      width: 100%;
      height: 34px;

      text-align: left;
      cursor: pointer;
      justify-content: center;
      display: flex;
      line-height: 34px;
      background-color: rgb(252, 252, 252)
      
   }
  .el-table-top-row{
      margin-top: 10px;
      width: 100%;
      height: 40px;
  
      text-align: left;
      cursor: pointer;
      line-height: 40px;
      justify-content: center;
      font-size: x-large;
      background-color: rgb(252, 252, 252)
   }
  .el-table-top-row-serch{
      margin-top: 10px;
      width: 100%;
      height: 40px;

      text-align: right;
      cursor: pointer;

      justify-content: center;
      font-size: x-large;
      background-color: rgb(252, 252, 252);
      background-color: rgb(236, 206, 34)
   }

</style>