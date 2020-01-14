<template>
          <el-main>
          <el-row>
            <el-col :span="12"><div class="el-table-top-row" style="width: 100%;" ><span>查询列表</span></div></el-col>
            <el-col :span="12"><div class="el-table-top-row-serch" style="width: 100%;" >        
            <!-- <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索" style="width: 40% "  /> -->
          <el-button @click="show">添加弹窗</el-button>
              </div>
              </el-col>
          </el-row>
          <el-table
              :data='tableData'
              style="width:100%"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              height="500"
              border>
              <el-table-column v-for="(item,index) in row" :key="index" :label='item.name'>
                  <template slot-scope="scope">
                      <span style="margin-left: 10px" v-if="item.name=='id'">
                          <span v-if="!scope.row.isSet">{{ scope.row.id }}</span> 
                              <el-input v-else size="mini" placeholder="请输入内容" v-model="scope.row.id">
                              </el-input> 
                      </span>

                      <span style="margin-left: 10px" v-if="item.name=='map'">
                          <span v-if="!scope.row.isSet">{{ scope.row.map }}</span> 
                              <el-input v-else size="mini" placeholder="请输入内容" v-model="scope.row.map">
                              </el-input>
                      </span>

                      <span style="margin-left: 10px" v-if="item.name=='date'">
                          <span v-if="!scope.row.isSet">{{ scope.row.date }}</span> 
                              <el-input v-else size="mini" placeholder="请输入内容" v-model="scope.row.date">
                              </el-input>
                      </span>

                    <span style="margin-left: 10px" v-if="item.name=='操作'">  
                        <el-button v-if="!scope.row.isSet"
                          size="mini"
                          @click="handleEdit(scope.$index, scope.row,false)">编辑</el-button>
                        <el-button v-else
                          size="mini"
                          type="danger"
                          @click="Save(scope.$index, scope.row,true)">保存</el-button>
                          
                          <!-- <el-popconfirm
                            title="这是一段内容确定删除吗？"
                          >
                                  <el-button 
                                      size="mini"
                                      type="danger"
                                      slot="reference"
                                      @click="delt(scope.$index, scope.row)">删除</el-button>

                          </el-popconfirm> -->
                          <el-popover
                            placement="top-start"
                            title="警告⚠"
                            width="200"
                            trigger="hover"
                            content="删除后无法更改">
                            <el-button slot="reference" size="mini" type="danger" @click="delt(scope.$index, scope.row)"> 删除</el-button>
                          </el-popover>
                      </span>
                  </template>
              </el-table-column>

          </el-table>
          <el-row>
            <el-col :span="24"><div class="el-table-add-row" style="width: 100%;" @click="addMasterUser()"><span>+ 添加</span></div></el-col>
            <el-col :span="24"><div class="el-table-page-row" style="width: 100%;">
              <el-pagination
              background
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              size='8'
              :total="16">
            </el-pagination></div>
            </el-col>
          </el-row>
      </el-main>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return {
            tableData: [],
            loading:true,
            row:[
                {name:"id"},
                {name:"map"},
                {name:'date'},
                {name:'操作'}
            ],
            total:'',
            pageSize:8,
            currIndex:1,
        }
    },
    methods:{
          show(){
            this.$emit('dialog_show')
          },
          handleEdit(index,row,falg){
               console.log(row,"handleEditrow")
               row.isSet=true;
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
    },
    mounted(){
        this.getInfo()
    }
}
</script>
<style scoped>
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 35px;
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
      background-color: rgb(252, 252, 252)
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
</style>