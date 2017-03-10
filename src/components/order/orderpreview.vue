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

    export default {
        components: {
            FormPreview,
            Confirm
        },
        data() {
            return {
                isshow:false,
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

                    }
                }]
            }
        },
        created () {
            //根据store中的userid来 获取address、regionid、districtid
            this.axios.get(config.fans+'/'+this.$store.getters.getUserId)
                       .then((response)=>{
                           console.log("fans info:"+JSON.stringify(response.data));
                       })
                       .catch(function(err){
                            console.log(err);   
                       })
        },
        computed: {
            itemlist: function () {
                var itemlisttemp = [];
                var cartlist = this.$store.getters.getCartList;
                var itemtemp = {};
                for (var i = 0; i < cartlist.length; i++) {
                    itemtemp = {
                        label: cartlist[i].suite.suitename + '(¥' + cartlist[i].suite.suiteprice + ')' + ' * ' + cartlist[i].count + '个',
                        value: '¥' + cartlist[i].suite.suiteprice * cartlist[i].count
                    }
                    itemlisttemp.push(itemtemp);
                }
                return itemlisttemp;

            },
            totalamount: function () {
                return this.$store.getters.getTotalAmount
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
            }
        }
    }

</script>
<style>

</style>