<template>
    <scroller lock-x scrollbar-y height="-45px" ref="scroller">
        <div>
            <div v-for="item in suitelistNew">
                <suiteitem @suiteevent="getitemtocart" :Cartcount="item.count" :suiteInfo="item.suite"></suiteitem>
            </div>
        </div>
    </scroller>
</template>
<script>
    import config from '../../config/config'
    import suiteitem from './suiteitem'
    import { Scroller } from 'vux'

    export default {
        components: {
            suiteitem,
            Scroller
        },
        data() {
            return {
                suitelist: [],
                cartlist: [],
                suitelistNew: []
            }
        },
        created() {
            this.getSuites();
            console.log(JSON.stringify(this.$route.query.userid));
        },
        methods: {
            getSuites: function () {
                this.axios.get(config.msuite + '?userid=' + this.$store.getters.getUserId).then((response) => {
                    this.suitelist = response.data;
                    console.log("this.suitelist");
                    console.log(this.suitelist);


                    console.log("this.$store.getters.getCartList");
                    console.log(this.$store.getters.getCartList);

                    this.suitelistNew=[];
                    //根据store中的cartlist来获取count
                    for (var i = 0; i < this.suitelist.length; i++) {
                        var suitetemp={};
                        var cartitem=this.$store.getters.getCartList.find(d => d.suite._id == this.suitelist[i]._id);

                        if (cartitem) {
                           
                            suitetemp={
                                suite: this.suitelist[i],
                                amount: cartitem.amount,
                                count: cartitem.count
                            }
                        }
                        else{
                            suitetemp={
                                suite: this.suitelist[i],
                                amount: 0,
                                count: 0
                            }
                        }


                        this.suitelistNew.push(suitetemp);
                    }
                    
                    console.log("suitelistNew")
                    console.log(JSON.stringify(this.suitelistNew))



                    this.$nextTick(() => {
                        this.$refs.scroller.reset({ top: 0 })
                    })
                })
                    .catch(function (err) {
                        console.log(err)
                    })


            },
            getitemtocart: function (val) {
                //本组件内的cartlsit数据
                if (!this.cartlist.find(d => d.suite._id == val.suite._id)) {
                    this.cartlist.push(val);
                } else {
                    for (var i = 0; i < this.cartlist.length; i++) {
                        if (this.cartlist[i].suite._id == val.suite._id) {
                            this.cartlist[i].amount = val.amount;
                            this.cartlist[i].count = val.count;
                        }
                    }
                }

                //计算总金额和总数量，用来显示在底部购物车
                var totalamount = 0;
                var totalcount = 0;
                for (var i = 0; i < this.cartlist.length; i++) {
                    totalamount += this.cartlist[i].amount;
                    totalcount += this.cartlist[i].count;
                }
                //判断count为0,如果count为0，就删掉
                var cartlisttemp = [];
                for (var i = 0; i < this.cartlist.length; i++) {
                    if (this.cartlist[i].count !== 0) {
                        cartlisttemp.push(this.cartlist[i]);
                    }
                }
                this.$store.commit('setCartList', cartlisttemp);

                console.log("购物车清单：" + JSON.stringify(cartlisttemp));
                this.$store.commit('setTotalAmount', (totalamount*100).toFixed(0));
                this.$store.commit('setTotalCount', totalcount);

            }
        }
    }

</script>
<style>
    .suitescontent {
        width: 100%;
        background-color: #FBF9FE;
        position: fixed;
        top: 0rem;
        /*flex: 1 0 auto;*/
        /*设置自动占满除了“占位的30px之外的所有位置”*/
        background-color: #FBF9FE;
    }
</style>