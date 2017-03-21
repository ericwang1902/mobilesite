<template>
    <div style="height: 100%;width: 100%">
        <tab>
            <tab-item selected @on-item-click="handler(1)">未取件订单</tab-item>
            <tab-item @on-item-click="handler(2)">已取件订单</tab-item>
            <tab-item @on-item-click="handler(3)">全部订单</tab-item>
        </tab>

        <scroller lock-x scrollbar-y height="-45px" ref="scroller">
            <div>
                <div v-for="item in orderlist" v-if="ifshow(item.ficorder.ficorderstate)">
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
                status:1//1是表示未取件，2是已取件，3是送达，对应ficorder的状态常量
            }
        },
        created() {
            this.openid = this.$route.query.openid;
            this.getuserinfo();
        },
        methods: {
            ifshow:function(itemstate){
                if(this.status==3)
                {
                    return true;
                } else
                {
                    return itemstate ==this.status;
                }
                
            },
            //获取用户信息
            getuserinfo: function () {
                this.axios.get(config.muser + "?openid=" + this.openid)
                    .then((response) => {
                        this.userinfo = response.data;
                        console.log(response.data);
                        this.getUngetshoporder();
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            },
            getUngetshoporder: function () {
                this.axios.get(config.mshoporderlistsupplier + "?supplieruserid=" + this.userinfo._id)
                    .then((response) => {
                        this.orderlist = response.data;
                        console.log(response.data);
                        this.$nextTick(() => {
                            this.$refs.scroller.reset({ top: 0 })
                        })
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            },
            //tab响应函数
            handler(val) {
                this.status = val;
                this.getUngetshoporder();
            }
        }


    }

</script>
<style>

</style>