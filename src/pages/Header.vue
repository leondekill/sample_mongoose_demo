<template>
    <div class="he">
      <nav class="navbar navbar-inverse navbar-fixed-top">
          <div class="container-fluid">
            <div class="row">
              <div class="one col-md-3">
                <a class="navbar-brand">你说是啥就是啥</a>
              </div>
              <div class="one col-md-5"></div>
              <div class="one col-md-4">
                <form class="navbar-form navbar-left">
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="Search">
                  </div>
  
                   <ul class="top nav navbar-nav navbar-right" >
                     <li class="litop">Dashboard</li>
                     <li class="litop">Settings</li>
                     <li class="litop">Profile</li>
                   </ul>
                </form>
              </div>
            </div>
          </div>
      </nav>
    </div>
</template>    

<style  scoped>
.he{
  height: 50px;
}
.navbar-inverse{  
margin-bottom: 2px;
}
.container-fluid{
 
height: 45px;

}
.one{
  height: 45px;
  padding:auto
}
.top{
  color: #9d9d9d;
  font-size: 19px;
  margin-top: 5px;
  margin-left: 0px;
}
.litop{
  margin-left:15px 
}
</style>