// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Hello from './components/HelloFromVux'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

import index from './pages/index'
import initfan from  './components/initfans/initfan'
import suitelist from './components/suitelist/suitelist'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: index,
    children: [
        {path:'home',component:suitelist,meta: { title:"货架" }},
        {path:'initfan',component:initfan,meta: { title: "设置地区" }}
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
  render: h => h(App)
}).$mount('#app')
