<template>
    <div>
         <scroller lock-x scrollbar-y height="-3rem" ref="scroller">
            <div class="bck" >
                <!--<p v-for="i in 60" v-if="showList1">placeholder {{ i + '' + i }}</p>-->
                <checker v-model="selectaddress" class="ckcls" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                    <checker-item @on-item-click="ClickItem(item)" :value="item" v-for="(item, index) in addresslist" :key="index">
                    
                        <div class="aditem">
                            <header>
                            <span class="adname">{{item.name}}</span>
                             <span class="adphone">{{item.phone}}</span>
                            </header>
                            <p class="adregion">{{item.region.district.province+item.region.district.city+item.region.district.district+item.region.regionname+item.detail}}</p>
                             
                        </div>
                    </checker-item>
                </checker>
            </div>
            
        </scroller>
   <confirm v-model="isshowalert" :title="title"
    @on-cancel="onCancel"
    @on-confirm="onConfirm"
    @on-show="onShow"
    @on-hide="onHide">
    <p style="text-align:center;">{{ content}}</p>
   </confirm>
    </div>
</template>
<script>
    import { Scroller,Checker,CheckerItem,Confirm } from 'vux'
    import config from '../../config/config'

    export default {
        components: {
            Scroller,
            Checker,
            CheckerItem,
            Confirm
        },
        data () {
            return {
                selectaddress:'',//使用的是item－onclick事件
                showList1:true,
                addresslist: [],
                isshowalert:false,
                title:'',
                content:'',
                choosenitem:{}
            }
        },
        created(){
            this.axios.get(config.maddress+"?fansid="+this.$store.getters.getUserId)
                      .then((response)=>{
                          console.log(JSON.stringify(response.data))
                          this.addresslist = response.data;
                           this.$nextTick(() => {
                            this.$refs.scroller.reset({top: 0})
                            })
                      })
                      .catch(function(err){
                          console.log(err);
                      })
        },
        methods:{
             showAlert(title,content){
            this.isshowalert = true;
            this.title = title;
            this.content = content;
            },
            ClickItem(val){
                console.log("选择了："+JSON.stringify(val))
                this.choosenitem = val;
                this.showAlert('提示',"选择该地址为配送地址？")
            },
            onCancel () {
            console.log('on cancel')
            },
            onConfirm () {
            console.log('on confirm')
            var formdata={
                district:this.choosenitem.region.district._id,
                address:this.choosenitem._id
            }
            this.axios.put(config.fans+"/"+this.$store.getters.getUserId,formdata)
                      .then((response)=>{
                          console.log(response.data)
                          if(response.data._id){
                              this.$router.push({ name: 'home'});
                          }
                      })
                      .catch(function(err){
                          console.log(err);
                      })
            },
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
.bck{
    background-color:white;
}
.demo1-item {
    border-bottom: .025rem solid #f5f5f5;
    line-height: 1rem;
}
.demo1-item-selected {
  border: .025rem solid #ff4a00;
  background: #ffffff url(../../assets/check.png) no-repeat right bottom;
}
.ckcls{
    display: flex;
    flex-direction: column;
}
.aditem{
    display: flex;
    flex-direction: column;

}
.adname{
     font-size: 1.1rem;
    font-weight: 900;
    margin-left: 2rem;
    line-height: 1.2rem;
}
.adphone{
    font-size: .7rem;
    line-height: 1.2rem;
}
.adregion{
    margin-left: 2rem;
    font-size: .6rem;
    color: #777;
    line-height: 1.2rem;
}

</style>