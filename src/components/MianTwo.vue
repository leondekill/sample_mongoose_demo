<template>
    <el-mian class="el-main">
          <!-- 上方折叠栏 -->
          <el-row>
            <el-col :span="24"><div class="el-table-top-row" style="width: 100%" >
                  <el-collapse v-model="activeName" accordion>
                    <el-collapse-item title="ID查询" name="1">
                       <el-col :span="12">
                         <div class="el-table-top-row" style="width: 100%;" >
                           <span>
                              <el-select 
                              v-model="value" 
                              filterable 
                              remote
                              :remote-method="remoteMethod"
                              placeholder="请选择" >
                                <el-option
                                  v-for="(item,index) in options"
                                  :key="index"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                             </span>
                              <el-button type="danger" plain @click="serach"> 查询</el-button>
                         </div>
                       </el-col>
                       <el-col :span="12">
                         <div class="el-table-top-row-serch" style="width: 100%;" >        
                          
                         </div>
                      </el-col>
                    </el-collapse-item>
                    
                    <el-collapse-item title="Feedback" name="2">
                      <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                      <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                    </el-collapse-item>

                  </el-collapse>
              </div>
              </el-col>

          </el-row>
          
          <!-- 中间隔断 -->
          <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
          </el-row>

           <!-- 查出的表 -->
          <el-table 
            :data="tableData"
            stripe
            style="width: 100%" v-show="show_table">
            <el-table-column
              prop="id"
              label="Id"
              width="180">
            </el-table-column>
            <el-table-column
              prop="map"
              label="Map"
              width="180">
            </el-table-column>
            <el-table-column
              prop="date"
              label="Date">
            </el-table-column>
          </el-table>
    </el-mian>
</template>
<script>
import axios from 'axios'
export default {
    name:'MianTwo',
    data(){
      return {
         activeName: '1',
         value:'',
         options: [],
         show_table:false,
         tableData: []
      }
    },
     methods:{
       remoteMethod(value){
               if(value){
                 axios 
                 .get("http://localhost:3000/api/idinfo",{
                   params:{
                     id:value
                   }
                 })
                 .then((value)=>{
                        this.options.length=0;
                        let docs=value.data.doc;
                        for(let j=0;j<docs.length;j++)
                        {
                          this.options.push({value:docs[j].id,_id:docs[j]._id})
                        }
                        console.log(this.value,"value")
                 })
               }else{
                 this.options.length=0;
               }
       },
       serach(){
              let params=this.value
              axios
              .get('http://localhost:3000/api/idinfo',{params:{id:params}})
              .then((value)=>{
                if(value.data.doc.length>=0){
                 console.log(value.data.doc,"value");
                 this.tableData=value.data.doc;
                 this.show_table=true;
                }
                else{
                    this.$message.error('错了哦，联系管理员');
                }

                  
              })
       }   
     }
}
</script>
<style scoped>
  .el-main {
    color: #333;
    text-align: center;
    line-height: 35px;
    font-size: x-large
   }
  .el-table-top-row{

       line-height: 35px
  }
  .grid-content {
    border-radius: 4px;
    min-height: 20px;
  }
</style>