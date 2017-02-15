<template>
  <div>
    <top></top>
    <div class="vux-demo">
      <img class="logo" src="http://okxwe70nc.bkt.clouddn.com/2017-02-07--12-49-02">
      <h1> </h1>
    </div>
    <alert v-model="show" :title="title1" @on-show="onShow" @on-hide="onHide">警告内容</alert>
    <group title="cell demo">
     <x-switch :title="title2" v-model="show"></x-switch>
    </group>
  </div>
</template>

<script>
import { Group,XSwitch, Cell,Alert } from 'vux'
import top from './top'

export default {
  components: {
    Alert,
    Group,
    XSwitch,
    Cell,
    top
  },
  data () {
    return {
      show:false,
      title1:"标题1",
      title2:"标题2"
    }
  },
  methods: {
    onHide () {
      console.log('on hide')
    },
    onShow () {
      console.log('on show')
    }
  }
}
</script>

<style>
.vux-demo {
  margin-top: 2px;
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>