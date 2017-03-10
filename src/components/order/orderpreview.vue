<template>
    <div style="margin-top: 2rem">
        <form-preview header-label="付款金额" :header-value="'¥'+ totalamount" :body-items="itemlist" :footer-buttons="btns"></form-preview>
    </div>
</template>
<script>
    import { FormPreview } from 'vux'
    export default {
        components: {
            FormPreview
        },
        data() {
            return {
                btns: [{
                    style: 'default',
                    text: '重新选购',
                    onButtonClick: () => {
                        
                        this.$store.commit('setCartList', []);
                        console.log("清空购物车" );
                        this.$store.commit('setTotalAmount', 0);
                        this.$store.commit('setTotalCount', 0);
                        this.$router.back();
                    }
                }, {
                    style: 'primary',
                    text: '支付',
                    onButtonClick: () => {
                        
                        console.log("支付" );
                    }
                }]
            }
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
        }
    }

</script>
<style>

</style>