// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Hello from './components/HelloFromVux'

import store from './config/store'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

import index from './pages/index'

//货架和购物车的组件
import suitelist from './components/suitelist/suitelist'
import cartfooter from './components/suitelist/cartfooter'

//订单preview的组件
import  orderpreview from './components/order/orderpreview'
import orderlist from "./components/order/orderlist"

//初始化粉丝地址列表
import message from './components/initfan/initmsg'
//usercenter
import addressform from './components/usercenter/addressform'//地址form
import addresslist from './components/usercenter/addresslist'//地址列表
import btntoadd from './components/usercenter/btntoadd'//地址列表底部的按钮

//用户绑定
import userbind from './user/userbind/userbind'
import admin from './user/admin/admin'
import courier from  './user/courier/courier'
import shopowner from './user/shopowner/shopowner'
import agent from './user/agent/agent'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: index,
    children: [
      {
        path: 'home',name: 'home', components: { a: suitelist, b:cartfooter}, meta: { title: "货架" }
      },
      {
        path: 'initfan',name: 'initfan', components: { a: message }, meta: { title: "设置地区" }
      },
      {
       // path: 'modifyadd',name: 'modifyadd', components: { a: addressform, b: addressbutton }, meta: { title: "添加地址" }
        path: 'modifyadd',name: 'modifyadd', components: { a: addressform }, meta: { title: "添加地址" }
      },
      {
        path:'addlist',name:'addlist',components:{a:addresslist,b:btntoadd},meta:{title:"地址列表"}
      },
      {
        path:'orderprepay',name:'orderprepay',components:{a:orderpreview},meta: { title:"订单预览" }
      },
      {
        path:'orderlist',name:'orderlist',components:{a:orderlist},meta:{title:"订单列表"}
      },
      {
        path:'userbind',name:'userbind',components:{a:userbind},meta: { title:"用户绑定" }
      },
      {
        path:'admin',name:'admin',components:{a:admin},meta: { title:"管理员" }
      },
      {
        path:'courier',name:'courier',components:{a:courier},meta: { title:"配送员" }
      },
      {
        path:'shopowner',name:'shopowner',components:{a:shopowner},meta: { title:"店主" }
      },
      {
        path:'agent',name:'agent',components:{a:agent},meta: { title:"区域代理" }
      }
      
    ]
  }
]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
