<template>
    <div>
        <div>
            <tab :line-width=2
                 active-color='#fc378c'
                 v-model="index">
                <tab-item class="vux-center"
                          :selected="demo2 === item"
                          v-for="(item, index) in list2"
                          @click="demo2 = item"
                          :key="index">{{item}}</tab-item>
            </tab>
    
            <swiper v-model="index"
                    height="100px"
                    :show-dots="false">
                <swiper-item v-for="(item, index) in list2"
                             :key="index">
    
                    <div class="tab-swiper vux-center">
                        <scroller lock-x
                                  scrollbar-y
                                  height="-45px"
                                  ref="scroller">
                            <div>
                                <div v-for="item in userorderlist">
                                    <div style="border: .025rem solid #f5f5f5">
                                         <div>{{item.ordernum}}</div>
                                         <div>{{item.region.regionname}}</div>
                                         <div>{{item.address}}</div>
                                         <div><a :href="'tel:'+'item.mobile'">{{item.mobile}}</a></div>
                                    </div>
                                </div>
                            </div>
                        </scroller>
    
                    </div>
                </swiper-item>
            </swiper>
    
        </div>
    </div>
</template>
<script>
import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, Scroller } from 'vux'
import config from '../../config/config';
export default {
    components: {
        Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, Scroller
    },
    data() {
        return {
            list2: ['客户订单', '店家订单'],
            demo2: '客户订单',
            index: 0,
            ficorderid:'',
            userorderlist:[]

        }
    },
    created () {
        this.ficorderid = this.$route.query.ficid;
        this.getuserorder();
    },
    methods: {
        getuserorder(){
            this.axios.get(config.morderbyficid+"?ficorder="+this.ficorderid)
                      .then((response)=>{
                          this.userorderlist = response.data;
                          console.log(this.userorderlist)
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