<template>
    <div >
      <div class="row top_mian" >
            <div class="col-md-3" ><div class="inmap" id='map'></div><div class="sapn">wold</div></div>
            <div class="col-md-3" ><div class="inmap" id='map'></div><div class="sapn">wold</div></div>
            <div class="col-md-3" ><div class="inmap" id='map'></div><div class="sapn">wold</div></div>
            
      </div>
      <div class="row botm_mian">
          <table class="table table-striped">
              <thead>
                  <tr class="tr_top">
                      <td>map</td>
                      <td>id</td>
                      <td>编辑</td>
                  </tr>
              </thead>
              <tbody >
                  <tr v-for="(item,index) in mapInfo" :key="index">
                      <td>{{item.map}}</td>
                      <td>{{item.id}}</td>
                      <td>
                        <button type="button" class="btn btn-primary btn-sm">编辑</button>
                        <button type="button" class="btn btn-default btn-sm">修改</button>
                      </td>
                  </tr>
 
              </tbody>
          </table>
      </div>
    </div>

</template>
<script>
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import * as control from 'ol/control';                                            
import { Logo, TileSuperMapRest } from '@supermap/iclient-ol';
import axios from 'axios'

export default {
    name:'navmian',
    data(){
        return{
           map:Object,
           mapInfo:Array
        }
    },
    props:{
        base_layer:Object
    },
    mounted(){
       this.initmap();
       this.getMapInfo();
    },
    methods:{
       initmap(){
        this.map= new Map({
            target: 'map',
            view: new View({
                center: [0, 0],
                zoom: 2,
                projection: 'EPSG:4326'
            })
        });
        this.map.addLayer(this.base_layer)
      },
      getMapInfo(){
          axios
          .get('http://localhost:3000/api/mapInfo')
          .then((value)=>{
              this.mapInfo=value.data.res;
              console.log(this.mapInfo)
          })
      }
    }
}
</script>

<style scoped>
.botm_mian{
    height: 50%;

}

.top_mian{
   height: 50%;
}
.top_mian >.col-md-3{
   margin-top: 15px;
   height: 100%;
   font-size: large;
   text-align: center;
  
   margin-right: 15px; 


}
.sapn{
    background-color: rgb(243, 243, 243)
}
.inmap{
    height: 80%;
}
.table{
    width: 90%;
    max-width: 100%;
    margin-bottom: 20px;
    margin-left: 10px
}
.tr_top{
   font-size: 20px
}
</style>