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
import initfan from './components/initfans/initfan'
import footer1 from './components/initfans/footer1'
import suitelist from './components/suitelist/suitelist'


//usercenter
import addressform from './components/usercenter/addressform'//地址form
import addressbutton from './components/usercenter/addressbutton'//地址form的确认按钮

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: index,
    children: [
      {
        path: 'home', components: { a: suitelist }, meta: { title: "货架" }
      },
      {
        path: 'initfan', components: { a: initfan, b: footer1 }, meta: { title: "设置地区" }
      },
      {
        path: 'modifyadd', components: { a: addressform, b: addressbutton }, meta: { title: "添加地址" }
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
