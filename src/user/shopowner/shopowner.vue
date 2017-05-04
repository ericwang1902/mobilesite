<template>
    <div style="height: 100%;width: 100%">
        <tab>
            <tab-item selected @on-item-click="handler('1')">未取件订单</tab-item>
            <tab-item @on-item-click="handler('2')">已取件订单</tab-item>
            <tab-item @on-item-click="handler('3')">全部订单</tab-item>
        </tab>

        <scroller lock-x scrollbar-y use-pullup height="-45px" ref="scroller" @on-pullup-loading="load1" :pullup-config="pullupconfig">
            <div>
                <div v-for="item in orderlist">
                    <div style="border: .025rem solid #f5f5f5">
                        <div>{{item.ordernum}}</div>
                        <div v-for="goodsitem in item.goodslist">
                            <div>{{goodsitem.goods.goodsname}} x {{goodsitem.goodscount}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </scroller>

    </div>
</template>
<script>
    import config from '../../config/config';
    import { Tab, TabItem, Scroller } from 'vux';

    export default {
        components: {
            Tab, TabItem, Scroller
        },
        data() {
            return {
                openid: '',//query中的openid
                userinfo: {},//根据openid去获取到的user数据
                orderlist: [],
                status: 1,//1是表示未取件，2是已取件，3是送达，对应ficorder的状态常量

                isfirst: true,
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
        created() {
            this.openid = this.$route.query.openid;
            this.getuserinfo(() => { });
        },
        methods: {
            //v-if="ifshow(item.ficorder.ficorderstate)"
            // ifshow:function(itemstate){
            //     if(this.status==3)
            //     {
            //         return true;
            //     } else
            //     {
            //         return itemstate ==this.status;
            //     }

            // },
            //获取用户信息
            getuserinfo: function (callback) {
                console.log("[[[[[[[[[[[[[[")
                this.axios.get(config.muser + "?openid=" + this.openid)
                    .then((response) => {
                        this.userinfo = response.data;
                        console.log(response.data);
                        this.getshoporder(this.isfirst, this.pageitems, this.currentpage, () => { callback() });//----------------------
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            },
            getshoporder: function (isfirst, pageitems, currentpage, callback) {
                var params = {
                    supplieruserid: this.userinfo._id,
                    ficstatus: this.status,
                    pageitems: pageitems,
                    currentpage: currentpage
                }

                this.axios.get(config.mshoporderlistsupplier, { params: params })
                    .then((response) => {
                        console.log(response.data.count)
                        console.log(response.data.orders)
                        if (isfirst) {
                            if (this.status == '3') {
                                this.total = response.data.count;
                                this.orderlist = response.data.orders;
                            }
                            if (this.total == 0) {
                                this.$refs.scroller.disablePullup();
                            }
                            if (this.status == '1' || this.status == '2') {
                                this.orderlist = [];
                                for (var i = 0; i < response.data.orders.length; i++) {
                                    if (response.data.orders[i].ficorder.ficorderstate == this.status) {
                                        this.orderlist.push(response.data.orders[i]);
                                        this.total++;
                                    }
                                }
                            }
                        }
                        else {
                            var orders = response.data.orders;
                            if (this.status == '3') {
                                for (var i = 0; i < orders.length; i++) {
                                    this.orderlist.push(orders[i])
                                }
                            }

                            if (this.status == '1' || this.status == '2') {
                                for (var i = 0; i < response.data.orders.length; i++) {
                                    if (response.data.orders[i].ficorder.ficorderstate == this.status) {
                                        this.orderlist.push(response.data.orders[i]);
                                        this.total++;
                                    }
                                }
                            }

                        }
                        this.$nextTick(() => {
                            if (isfirst) {
                                this.$refs.scroller.reset({ top: 0 });
                            } else {
                                this.$refs.scroller.reset();
                            }

                            if (!isfirst) {
                                callback();
                            }
                        })


                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            },
            //tab响应函数
            handler(val) {
                this.total = 0;
                this.status = val;
                this.isfirst = true;
                this.currentpage = 1;
                this.orderlist = [];
                this.$refs.scroller.disablePullup();
                this.$refs.scroller.enablePullup();
                this.getuserinfo(() => { });//----------------------
            },
            load1() {
                this.isfirst = false;
                console.log(this.total / this.pageitems);
                if (this.currentpage < this.total / this.pageitems) {
                    this.currentpage += 1;
                    this.getuserinfo(() => {
                        this.$refs.scroller.donePullup();
                    })
                } else if (this.total == 0) {
                    this.$refs.scroller.disablePullup();
                } else if (this.currentpage > this.total / this.pageitems) {
                    this.$refs.scroller.disablePullup();
                }


            }
        }


    }

</script>
<style>

</style>