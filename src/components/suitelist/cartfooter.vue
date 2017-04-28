<template>
    <div class="buy_cart_container">
        <div class="countbas">{{$store.getters.getTotalCount}}</div>
        <div class="cart_icon">
            <i class="fa fa-shopping-cart fa-2x"></i>
        </div>
        <div class="cart_amout">
            <div class="cart_amount_note">
                <div class="note1">
                        ¥ {{($store.getters.getTotalAmount/100).toFixed(2)}}
                </div>
            </div>
            <p class="descls" @click="tochooseaddress">
                免配送费
            </p>
        </div>
        <div class="goto_btn" @click="toOrderPreview()">
            <div class="btntitle">
                去结算
            </div>
        </div>
    </div>
</template>
<script>
    import { Confirm } from 'vux'
    import config from '../../config/config'
    export default {
        data() {

            return {
                region: '',
                address: '',
                name: '',
                mobile: '',
                loc: ''
            }
        },
        methods: {
            toOrderPreview() {
                this.axios.get(config.fans + '/' + this.$store.getters.getUserId)
                    .then((response) => {
                        this.fansinfo = response.data;
                        console.log("fansinfo:");
                        console.log(this.fansinfo);
                        if (this.fansinfo.address) {
                            this.region = this.fansinfo.address.region.regionname;
                            this.address = this.fansinfo.address.detail;
                            this.name = this.fansinfo.address.name;
                            this.mobile = this.fansinfo.address.phone;


                            if (this.$store.getters.getTotalAmount == 0) {
                                //需要再补充弹出框
                                this.$store.commit("setAlertinfo", {
                                    isshow: true,
                                    title: "提示!",
                                    content: "您未选择任何商品！"
                                })

                                console.log(this.$store.getters.getAlertinfo);
                            } else {
                                this.$router.push({ name: 'orderprepay' });
                            }

                        } else {
                            this.$store.commit("setAlertinfo", {
                                isshow: true,
                                title: "提示!",
                                content: "请配置配送地址，设置配送地址不会清空购物车！"
                            })
                        }

                    })
            }
            // tochooseaddress(){
            //     console.log("swdsfd");
            //     this.$router.push({ name: 'addlist'});
            // }
        },
        created() {

        }
    }

</script>
<style lang="scss" scoped>
    @import '../../assets/mixin';
    .buy_cart_container {
        display: flex;
        flex-direction: row;
        height: 100%;
        .countbas {
            height: 1.5rem;
            width: 1.5rem;
            position: fixed;
            bottom: 3rem;
            left: 2.5rem;
            border-radius: 50%;
            z-index: 1;
            background-color: crimson;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
        }
        .cart_icon {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            position: fixed;
            background-color: burlywood;
            border: .18rem solid #444;
            border-radius: 50%;
            bottom: 1rem;
            left: 0.5rem;
            height: 3rem;
            width: 3rem;
        }
        .cart_amout {
            background-color: #FFC0CB;
            flex: 1 1 auto;
            /*background-color: #444;*/
            display: flex;
            flex-direction: row;
            /*justify-content: center;*/
            align-items: center;
            .cart_amount_note {
                font-size: 1.2rem;
                color: #f60;
                font-weight: 700;
                flex: 1 1 auto;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content:flex-end;
                margin-right:0.5rem;
                .note1{

                }
            }
            .descls {
                font-size: 0.5rem;
                color: #444;
                font-weight: 700;
                margin-right: 1rem;
                flex: 0 1 auto;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .goto_btn {
            background-color: burlywood;
            flex: 0 1 7rem;
            display: flex;
            justify-content: center;
            align-items: center;
            .btntitle {
                font-size: .9rem;
                color: #444;
                font-weight: 700;
            }
        }
    }
</style>