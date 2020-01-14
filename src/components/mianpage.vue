<template>
  <div class="hello">
      <nave-header></nave-header>
      <div class="mian container-fluid">
        <div class="row">
            <nave-sider class="col-md-2 sidebar" ></nave-sider>
            <nave-mian   class="col-md-10 navmain" :base_layer='base_layer' ></nave-mian>
        </div>
      </div>
  </div>
</template>

<script>
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import * as control from 'ol/control';                                            
import { Logo, TileSuperMapRest } from '@supermap/iclient-ol';


import  NaveHeader from '../pages/Header'
import  NaveSider  from '../pages/NavSider'
import  NaveMian   from '../pages/navmian'
export default {
  name: 'HelloWorld',
  data () {
    return {
       base_layer: new TileLayer({
                    source: new TileSuperMapRest({
                        url: "https://iserver.supermap.io/iserver/services/map-world/rest/maps/World",
                        wrapX: true
                    }),
                    projection: 'EPSG:4326'
                  }),
       
    }
  },
  components:{
      NaveHeader,
      NaveSider,
      NaveMian
  },
  mounted(){
      

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mian{
  
  height: 93vh;
}

.sidebar{
    height:  93vh;
    position: fixed;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #f5f5f5;
    border-right: 1px solid #eee;
}
.navmain{
  height:  93vh;
  margin-left: 254px;
}

</style>
