<template>
    <div style="height: 100%;width: 100%">
        <tab>
            <tab-item selected @on-item-click="handler(1)">已下发订单</tab-item>
            <tab-item @on-item-click="handler(2)">未下发订单</tab-item>
            <tab-item @on-item-click="handler(3)">全部订单</tab-item>
        </tab>
        <div style="height: 100%;width: 100%">
            <scroller lock-x scrollbar-y height="-45px" ref="scroller">
                <div>
                    <div v-for="item in orderlist">
                        <div style="border: .025rem solid #f5f5f5">
                            <div>{{item.ordernum}}</div>
                            <div>{{item.address}}</div>
                        </div>
                    </div>
                </div>
            </scroller>
        </div>
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
                orderlist: []
            }
        },
        created() {
            this.openid = this.$route.query.openid;
            this.getuserinfo();
        },
        methods: {
            getuserinfo: function () {
                this.axios.get(config.muser + "?openid=" + this.openid)
                    .then((response) => {
                        this.userinfo = response.data;
                        console.log(response.data);
                        this.getDeliveredOrder();
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            },
            getUndeliveredOrder: function () {
                //未下发的客户订单
                this.axios.get(config.morderlistagent + "?districtid=" + this.userinfo.district._id)
                    .then((response) => {
                        this.orderlist = response.data;
                        this.$nextTick(() => {
                            this.$refs.scroller.reset({ top: 0 })
                        })
                        console.log(response.data);
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            },
            getDeliveredOrder: function () {
                //已下发的客户订单
                this.axios.get(config.morderlistagent + "?districtid=" + this.userinfo.district._id + "&delivered=true")
                    .then((response) => {
                        this.orderlist = response.data;
                        this.$nextTick(() => {
                            this.$refs.scroller.reset({ top: 0 })
                        })
                        console.log(response.data);
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            },
            getAllOrder: function () {
                //所有订单
                this.axios.get(config.morderlistagent + "?districtid=" + this.userinfo.district._id + "&all=true")
                    .then((response) => {
                        this.orderlist = response.data;
                        this.$nextTick(() => {
                            this.$refs.scroller.reset({ top: 0 })
                        })
                        console.log(response.data);
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            },
            handler(val) {
                switch (val) {
                    case 1:
                        this.getDeliveredOrder();
                        console.log(1)
                        break;
                    case 2:
                        this.getUndeliveredOrder();
                        console.log(2)
                        break;
                    case 3:
                        this.getAllOrder();
                        console.log(3)
                        break;
                    default:
                        break;

                }
            }
        }
    }

</script>
<style>

</style>