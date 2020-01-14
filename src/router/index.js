import Vue from 'vue'
import Router from 'vue-router'
import mianpage from '@/components/mianpage'
import login from '@/components/login'
import test from '@/components/test'
import mianone from '@/components/MianOne'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      name: 'test',
      component: test,
      children:[
        {path:'/mianone',component:mianone}
      ]
    },
    {
      path: '/mianpage',
      name: 'mianpage',
      component: mianpage
    },
    {
      path: '/',
      name: 'login',
      component: login
    }
  ]
})
