<template>
    <div style="margin-top: 2rem">
        <form-preview header-label="付款金额" :header-value="'¥'+ totalamount" :body-items="itemlist" :footer-buttons="btns"></form-preview>
        <confirm v-model="isshow" :title="title" @on-cancel="onCancel" @on-confirm="onConfirm" @on-show="onShow" @on-hide="onHide">
            <p style="text-align:center;">{{content}}</p>
        </confirm>
    </div>
</template>
<script>
    import { FormPreview, Confirm } from 'vux'
    import config from '../../config/config'
    import wx from 'weixin-js-sdk';

    export default {
        components: {
            FormPreview,
            Confirm
        },
        data() {
            return {
                isshow: false,
                title: '',
                content: '',
                btns: [{
                    style: 'default',
                    text: '重新选购',
                    onButtonClick: () => {
                        this.showConfirm();

                    }
                }, {
                    style: 'primary',
                    text: '支付',
                    onButtonClick: () => {
                        console.log("支付");//后期接入支付
                        //支付成功后，创建客户订单
                        this.postorder();
                    }
                }],
                fansinfo: {},
                orderdata: {
                    ordernum: '',
                    suitelist: [],//cart
                    goodslist: [], //cart
                    totalamount: 0,//cart
                    taotalcount: 0,//cart
                    paytype: 'wepay',//wechat
                    paystate: 'paid',//1
                    ordertime: Date.now,//post time
                    paytime: Date.now,//=ordertime
                    fanid: this.$store.getters.getUserId,//query fansid
                    district: '',
                    region: '',
                    address: '',
                    note: '',
                    mobile: ''
                }
            }
        },
        created() {
            //根据store中的userid来 获取address、regionid、districtid
            this.axios.get(config.fans + '/' + this.$store.getters.getUserId)
                .then((response) => {
                    console.log("fans info:" + JSON.stringify(response.data));
                    this.fansinfo = response.data;
                    this.orderdata.district = this.fansinfo.district._id;
                    this.orderdata.region = this.fansinfo.address.region;
                    this.orderdata.address = this.fansinfo.address.detail + this.fansinfo.address.name;
                    this.orderdata.mobile = this.fansinfo.address.phone;
                    this.orderdata.suitelist = this.$store.getters.getCartList;
                    this.orderdata.taotalcount = this.$store.getters.getTotalCount;
                    this.orderdata.totalamount = this.$store.getters.getTotalAmount;
                    this.orderdata.ordertime = Date.now();

                    this.orderdata.paytime = Date.now();


                    //计算goodslist提交给后台接口，便于后台接口进行goods分类汇总

                })
                .catch(function (err) {
                    console.log(err);
                })
        },
        mounted () {
            //用来获取该用户是否是首单
              console.log("totalamount:"+this.$store.getters.getTotalAmount);
        },
        computed: {
            itemlist: function () {
                var itemlisttemp = [];
                var cartlist = this.$store.getters.getCartList;
                var itemtemp = {};
                for (var i = 0; i < cartlist.length; i++) {
                    itemtemp = {
                        label: cartlist[i].suite.suitename + '(¥' + cartlist[i].suite.suiteprice + ')' + ' * ' + cartlist[i].count + '个',
                        value: '¥' + (cartlist[i].suite.suiteprice * cartlist[i].count).toFixed(2)
                    }
                    itemlisttemp.push(itemtemp);
                }
                return itemlisttemp;

            },
            totalamount: function () {
                return (this.$store.getters.getTotalAmount/100).toFixed(2)
            }
        },
        methods: {
            onCancel() {
                console.log('on cancel');
                this.isshow = false;
            },
            onConfirm() {
                this.$store.commit('setCartList', []);
                console.log("清空购物车");
                this.$store.commit('setTotalAmount', 0);
                this.$store.commit('setTotalCount', 0);
                this.$router.back();
                this.isshow = false;
            },
            onHide() {
                console.log('on hide')
            },
            onShow() {
                console.log('on show')
            },
            showConfirm: function () {
                this.isshow = true;
                this.title = "提示";
                this.content = "重新选择将会清空当前订单"
            },
            postorder() {
                this.axios.post(config.morder+"?ps=1", this.orderdata)
                    .then((response) => {
                        var resultobj = response.data;

                        //     index中已经wx.config，这里直接发起微信支付。
                        wx.chooseWXPay({
                            timestamp: resultobj.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            nonceStr: resultobj.noncestr, // 支付签名随机串，不长于 32 位
                            package: resultobj.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                            signType: resultobj.sintype, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            paySign: resultobj.paysign, // 支付签名
                            success:  (res)=> {//需要用箭头函数，这样子才能保证this指针指向vue实例
                                console.log(res);
                             //    this.$router.push({ name: "orderlist" });//跳转到订单列表
                                if (res.errMsg == "chooseWXPay:ok") {
                                    //支付成功 
                                    // 支付成功后的回调函数
                                    this.axios.post(config.morder+"?ps=2", this.orderdata)
                                    .then((response)=>{
                                        var orderRes = response.data;
                                        this.$router.replace({ name: "orderlist" });//跳转到订单列表
                                    })
                                    .catch(function(err){
                                        console.log(err);
                                    })
                                    
                                } else {
                                    alert(res.errMsg);
                                    

                                     

                                }


                            },
                            cancel:  (res) =>{
                                console.log("订单取消")
                             
                                //  this.axios.post(config.morder, this.orderdata)
                                //  .then((response) => {})
                                //  .catch(function(err){})

                                // this.axios.delete(config.morder + "/" + resultobj.order._id)
                                //     .then((response) => {

                                //         console.log("删除取消订单")
                                //     })
                                //     .catch(function (err) {
                                //         console.log(err);
                                //     })



                            }
                        });

                        console.log(response.data);
                        //    this.$router.replace({ name: "orderlist" });//跳转到订单列表

                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            }
        }
    }

</script>
<style>

</style>