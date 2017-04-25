<template>
    <div>
        <scroller lock-x scrollbar-y use-pullup height="-45px" ref="scroller" @on-pullup-loading="load1" :pullup-config="pullupconfig">
            <div>
                <div v-for="item in orderlist" class="orderitemrow">
                        <div  class="itemleft">
                            <p><span style="font-size: 14px;">订单号:</span><span style="font-size: 14px;color:#999;">{{item.ordernum}}</span> </p>
                            <p style="font-size:14px;line-height:1.2;"><span style="font-size: 14px;margin-right: 1rem">订单日期:</span><span>{{ordertimefunc(item.ordertime)}}</span></p>
                            <p style="font-size:14px;line-height:1.2;"><span style="font-size: 14px;margin-right: 0.5rem">状态：</span><span style="font-size: 14px;color:cadetblue;margin-right: 0.5rem">{{getstate(item.ficorder)}}</span></p>
                           
                            <div v-for="suiteitem in item.suitelist">
                                <p style="font-size: 14px;margin-right: 0.5rem">{{suiteitem.suite.suitename}}*{{suiteitem.count}}</p>
                            </div>

                        </div>
                    <div class="pricediv">
                        <span class="suiteprice">¥ {{(item.totalamount/100).toFixed(2)}}</span>
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
                orderlist: [],
                pageitems: 10,
                currentpage: 1,
                total: 0,
                pullupconfig: {
                    content: '上拉加载更多',
                    downContent: '松开进行加载',
                    upContent: '上拉加载更多',
                    loadingContent: '加载中...',
                     pullUpHeight: 60
                }
            }
        },
        methods: {
            ordertimefunc(val) {
                return new Date(val).toLocaleDateString() + new Date(val).toLocaleTimeString();
            },
            getstate(ficorder) {
                if (!ficorder) {
                    return "已下单";
                } else {
                    if (ficorder.ficorderstate == '1') {
                        return "已接单"
                    }
                    if (ficorder.ficorderstate == '2') {
                        return "已取件"
                    }
                    if (ficorder.ficorderstate == '3') {
                        return "已送达"
                    }
                }
            },
            //第一次加载
            getorder1(pageitems, currentpage) {
                var fansid = '';
                if (this.$route.query.fansid) {
                    fansid = this.$route.query.fansid;
                }
                else {
                    fansid = this.$store.getters.getUserId;
                }
                console.log(fansid)
                this.axios.get(config.morderlist + '?fansid=' + fansid + "&pageitems=" + pageitems + "&currentpage=" + currentpage)
                    .then((response) => {
                        this.total = response.data.count;
                        this.orderlist = response.data.orders;
                        this.$nextTick(() => {
                            this.$refs.scroller.reset()
                        })
                    })
                    .catch(function (err) {
                        console.log(err);
                    })

            },
            getorder(pageitems, currentpage, callback) {
                var fansid = '';
                if (this.$route.query.fansid) {
                    fansid = this.$route.query.fansid;
                }
                else {
                    fansid = this.$store.getters.getUserId;
                }
                console.log(fansid)
               
                this.axios.get(config.morderlist + '?fansid=' + fansid + "&pageitems=" + pageitems + "&currentpage=" + currentpage)
                    .then((response) => {
                        console.log(response.data);
                        var orders = response.data.orders;
                        for (var i = 0; i < orders.length; i++) {
                            this.orderlist.push(orders[i])
                        }
                        
                        this.$nextTick(() => {
                            this.$refs.scroller.reset();
                            callback();
                        })
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            },
            load1() {
                if (this.currentpage < this.total) {
                    this.currentpage += 1;
                    this.getorder(this.pageitems, this.currentpage, () => {
                        this.$refs.scroller.donePullup();
                    })
                }


            }
        },
        components: {
            Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, Scroller, Card
        },
        created() {
            this.getorder1(10, 1);
        }
    }

</script>

<style lang="scss" scoped>
    .orderitemrow {
        display: flex;
        flex-direction: row;
        justify-content:space-around;
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
    .itemleft{
        display: flex;
        flex-direction:column;
        justify-content:space-around;
    }
    .pricediv{
        display: flex;
        flex-direction: row;
        align-items:center;
    }
    
    .suiteprice {
        color: #f60;
        margin-left: 1rem;
        font-size: 1rem;
        font-weight: 600;
    }
</style>