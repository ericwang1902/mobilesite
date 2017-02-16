<template>
    <scroller lock-x ref="scroller" >
        <div>
            <div style="margin: 10px;" v-for='suite in suiteArray'>
                <suiteitem :suitename='suite.suitename' :suitedes='suite.suitedes' :suitephoto='suite.suitephoto' :suiteprice='suite.suiteprice'></suiteitem>
            </div>
        </div>
    </scroller>
</template>
<script>
import suiteitem from './suiteitem'
import config from '../config/config'
import {Scroller} from 'vux'

export default {
    components: {
        Scroller,
        suiteitem
    },
    data () {
        return {
            //需要获取套餐列表数据，成为suitearray吧。
            suiteArray:[]
        }
    },
    created () {
        this.axios.get(config.suite)
                  .then((response)=>{
                      console.log(response);
                      this.suiteArray = response.data;
                  })
                  .catch(function(err){
                      console.log(err);
                  })
                
    }
}

</script>
<style>
</style>