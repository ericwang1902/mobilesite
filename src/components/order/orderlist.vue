<template>
    <div>
        <scroller lock-x scrollbar-y height="-45px" ref="scroller">
            <div>
                <div v-for="item in orderlist" class="orderitemrow">
                    <card>
                        <div slot="content" class="card-padding">
                            <p style="color:#999;font-size:12px;"><span style="font-size: 12px;">订单号:</span><span>{{item.ordernum}}</span>        </p>
                            <p style="font-size:12px;line-height:1.2;"><span style="font-size: 12px;margin-right: 0.5rem">状态：</span><span>{{getstate(item.ficorder)}}</span></p>
                            <p style="font-size:12px;line-height:1.2;"><span style="font-size: 12px;margin-right: 1rem">订单日期:</span><span>{{ordertimefunc(item.ordertime)}}</span></p>
                            <div v-for="suiteitem in item.suitelist">
                                <p style="font-size: 12px;margin-right: 0.5rem">{{suiteitem.suite.suitename}}*{{suiteitem.count}}</p>
                            </div>
                            
                        </div>
                    </card>
                    <div>
                         <span class="suiteprice">¥ {{item.totalamount}}</span>
                    </div>
                </div>
            </div>
        </scroller>
    </div>
</template>
<script>
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, Scroller, Card } from 'vux'
    import config from '../../config/config'
    export default {
        data() {
            return {
                orderlist: []
            }
        },
        methods: {
            ordertimefunc(val) {
                return new Date(val).toLocaleDateString() + new Date(val).toLocaleTimeString();
            },
            getstate(ficorder) {
                if (!ficorder) {
                    return "您已成功下单，等待商家接单";
                } else {
                    if (ficorder.ficorderstate == '1') {
                        return "商家已接单，等待配送员取件"
                    }
                    if (ficorder.ficorderstate == '2') {
                        return "配送员已取件，配送中"
                    }
                    if (ficorder.ficorderstate == '3') {
                        return "已送达"
                    }
                }
            }
        },
        components: {
            Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, Scroller, Card
        },
        created() {

            var fansid = '';
            if (this.$route.query.fansid) {
                fansid = this.$route.query.fansid;
            }
            else {
                fansid = this.$store.getters.getUserId;
            }
            console.log(fansid)
            this.axios.get(config.morderlist + '?fansid=' + fansid)
                .then((response) => {
                    console.log(response.data);
                    this.orderlist = response.data;
                    this.$nextTick(() => {
                        this.$refs.scroller.reset({ top: 0 })
                    })
                })
                .catch(function (err) {
                    console.log(err);
                })
        }
    }

</script>

<style lang="scss" scoped>
    .orderitemrow {
        display: flex;
        flex-direction: row;
        /*margin-top: 1rem;*/
        background-color: #ffffff;
        border: .025rem solid #f5f5f5;
    }
    
    .leftcolum {
        margin-left: 1rem;
        display: flex;
        flex-direction: column;
    }
    
    .ordernum {
        font-size: 0.9rem;
        font-weight: 800;
    }
    
    .suiteprice {
        color: #f60;
        margin-left: 1rem;
        font-size: 0.8rem;
        font-weight: 600;
    }
</style>