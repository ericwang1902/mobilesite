<template>
    <div>
         <group title="" label-width="4em" label-margin-right="2em"  label-align="right">
            <popup-picker required value-text-align="left" placeholder="必填" title="所属地区" :data="districtData" :columns="3" v-model="selectDistrict" ref="picker3"></popup-picker>
            <selector required title="商圈" placeholder="必填" :options="['软件园', '电信大楼']" v-model="region"></selector>
            <x-input required placeholder="楼号/楼层/门牌号等，必填" title="详细地址" align="right" v-model="detail"></x-input>
            <x-input required placeholder="必填" type="text" title="姓名" align="right" v-model="receivername"></x-input>
            <x-input required placeholder="必填" title="电话" is-type="china-mobile" type="tel" align="right" v-model="receiverphone"></x-input>
         </group>
    </div>
</template>
<script>
import { PopupPicker,Group,XInput,Selector } from 'vux'
import config from '../../config/config'

export default {
    components: {
        PopupPicker,
        Group,
        XInput,
        Selector
    },
    data(){
        return {
            districtData:[],
            selectDistrict:[],
            region:'',
            detail:'',
            receivername:'',
            receiverphone:''
        }
    },
    created(){
        console.log(config.mdistricts)
        this.getdistricts();
    },
    methods:{
        getdistricts:function(){
            this.axios.get(config.mdistricts)
                       .then((response)=>{
                           console.log(response.data);
                           this.districtData=response.data;
                       })
                       .catch(function(err){
                           console.log(err);
                       })
        }
    }
}

</script>
<style>

</style>