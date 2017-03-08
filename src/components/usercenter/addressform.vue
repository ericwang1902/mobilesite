<template>
    <div>
         <group title="配送地址" label-width="4em" label-margin-right="2em"  label-align="right">
            <popup-picker required value-text-align="left" placeholder="必填" title="所属地区" show-name @on-change="distritconChange" :data="districtData" :columns="3" v-model="selectDistrict" ref="picker3"></popup-picker>
            <selector required title="商圈" placeholder="必填" :options="regionData" v-model="region"  @on-change="regiononChange"></selector>
            <x-input required placeholder="楼号/楼层/门牌号等，必填" title="详细地址" align="right" v-model="detail"></x-input>
            <x-input required placeholder="必填" type="text" title="姓名" align="right" v-model="receivername"></x-input>
            <x-input required placeholder="必填" title="电话" is-type="china-mobile" type="tel" align="right" v-model="receiverphone"></x-input>
         </group>
         <div class="sbbtn">
         <x-button  type="primary" @click.native="submitform">提交</x-button>
         </div>
         <alert v-model="isshowalert" :title="title" @on-show="onShow" @on-hide="onHide">{{content}}</alert>
    </div>
</template>
<script>
import { PopupPicker,Group,XInput,Selector,XButton,Alert } from 'vux'
import config from '../../config/config'

export default {
    components: {
        PopupPicker,
        Group,
        XInput,
        Selector,
        XButton,
        Alert
    },
    data(){
        return {
            districtData:[],//popup－picker 数据源
            selectDistrict:[],//选择,作废，使用的onchange事件来获取数据
            regionData:[],//selector的数据源
            district:'',//获取到的districtid

            region:'',
            detail:'',
            receivername:'',
            receiverphone:'',

            isshowalert:false,
            title:'',
            content:'',
            type:0
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
        },
        getregions:function(districtid){
            this.axios.get(config.mregions+"?districtid="+districtid)
                      .then((response)=>{
                          this.regionData = response.data;
                          console.log()
                      })
                      .catch(function(err){
                          console.log(err);
                      })
        },
        distritconChange:function(val){
            this.district = val[2];//取选择的区县的id
            this.getregions(this.district);
            
        },
        regiononChange:function(val){
            console.log(val);
            this.region =val;//取选择的配送区域的id
        },
        submitform:function(){
            console.log("submitform");
            var formdata={
                detail:this.detail,
                phone:this.receiverphone,
                name:this.receivername,
                region:this.region,
                fans:this.$store.getters.getUserId
            }
             console.log(formdata)
            if(!this.detail || !this.receiverphone || !this.receivername || !this.region || !this.$store.getters.getUserId){
                this.type=0;
                this.showAlert("警告","请将信息填写完整！");
            }else{
                this.axios.post(config.maddress,formdata)
                          .then((response)=>{
                              if(response.data._id){
                                  this.type=1;
                                  this.showAlert("恭喜","创建成功！");
                              }
                           
                          })
                          .catch(function(err){
                              console.log(err)
                          })
            }
            
        },
        onShow:function(){
            console.log('on show')
        },
        onHide () {
            console.log('on hide')
            if(this.type==1){
                console.log("go back to list");
                this.$router.push({ name: 'addlist'});
            }else{
                console.log("fill the form again")
            }
        },
        showAlert(title,content){
            this.isshowalert = true;
            this.title = title;
            this.content = content;
        }
        

    }
}

</script>
<style>
.sbbtn{
    margin-top: 10px;
    margin-left: 2px;
    margin-right: 2px;
}

</style>