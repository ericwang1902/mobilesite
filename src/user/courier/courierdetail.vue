<template>
    <div style="height: 100%;width: 100%">
        <tab :line-width=2 active-color='#fc378c'>
            <tab-item selected @on-item-click="handler(0)">店家订单</tab-item>
            <tab-item @on-item-click="handler(1)">客户订单</tab-item>
        </tab>

        <div class="tab-swiper vux-center" style="position: fixed; bottom:45px;width:100%">
            <scroller lock-x scrollbar-y height="-90px" ref="scroller">
                <div>
                    <div v-for="item in userorderlist" v-show="ifuser">
                        <card>
                            <div slot="content" class="card-padding">
                                <p style="color:#999;font-size:12px;">{{item.ordernum}} 状态:{{getsuserstate(item.ficorder.ficorderstate)}}</p>
                                <p style="font-size:14px;line-height:1.2;">{{item.region.regionname}}{{item.address}}</p>
                                <div><a style="font-size:14px;line-height:1.2;" :href="'tel:'+item.mobile">拨打:{{item.mobile}}</a></div>
                            </div>
                        </card>
                    </div>
                    <div v-for="item in shoporderlist" v-show="!ifuser">
                        <card>
                            <div slot="content" class="card-padding">
                                <p style="color:#999;font-size:12px;">{{item.ordernum}} 状态:{{getshopstate(item.ficorder.ficorderstate)}}</p>
                                <p style="font-size:14px;line-height:1.2;">供应商:{{item.supplier.suppliername}}</p>
                                <div v-for="goodsitem in item.goodslist">
                                <p style="font-size:14px;line-height:1.2;">{{goodsitem.goods.goodsname}}*{{goodsitem.goodscount}}</p>
                                </div>
                            </div>
                        </card>
                    </div>
                </div>
            </scroller>

        </div>



    </div>
</template>
<script>
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, Scroller, Card } from 'vux'
    import config from '../../config/config';
    import { mapGetters } from 'vuex'

    export default {
        components: {
            Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, Scroller, Card
        },
        data() {
            return {
                index: 0,
                ficorderid: '',
                userorderlist: [],
                shoporderlist: [],
                ifuser: false

            }
        },
        computed: {
            ...mapGetters({ ticksign: 'getTicksign' })//实现vuex的getter和vue实例属性绑定
        },
        created() {
            this.ficorderid = this.$route.query.ficid;
            this.getshoporder();

            console.log("dddddd:" + this.ticksign);
        },
        watch: {
            ticksign: function () {
                var type = this.$store.getters.getBtntype;
                switch (type) {
                    case 0:
                        this.getshoporder();
                        break;
                    case 1:
                        this.getuserorder();
                        break;
                    default:
                        break;

                }
            }
        },
        methods: {
            getsuserstate(val) {
                var title = '';
                switch (val) {
                    case '1':
                        title = '未取件';
                        break;
                    case '2':
                        title = '已取件';
                        break;
                    case '3':
                        title = '已送达';
                        break;
                    default:
                        break;
                }
                return title;

            },
            getshopstate(val) {
                var title = '';
                switch (val) {
                    case '1':
                        title = '未取件';
                        break;
                    case '2':
                        title = '已取件';
                        break;
                    case '3':
                        title = '已送达';
                        break;
                    default:
                        break;
                }
                return title;

            },
            getuserorder() {
                this.axios.get(config.morderbyficid + "?ficorder=" + this.ficorderid)
                    .then((response) => {
                        this.ifuser = true;
                        this.userorderlist = response.data;
                        this.$nextTick(() => {
                            this.$refs.scroller.reset({ top: 0 })
                        })
                        console.log(this.userorderlist);
                    })
                    .catch(function (err) {
                        console.log(err);
                    })

            },
            getshoporder() {
                this.axios.get(config.mshoporderbyficid + "?ficorder=" + this.ficorderid)
                    .then((response) => {
                        this.ifuser = false;
                        this.shoporderlist = response.data;
                        this.$nextTick(() => {
                            this.$refs.scroller.reset({ top: 0 })
                        })
                    })
                console.log('111');
            },
            handler(val) {
                switch (val) {
                    case 0:
                        this.getshoporder();
                        this.$store.commit('setBtntype', 0);
                        console.log("btntype:" + this.$store.getters.getBtntype)
                        break;
                    case 1:
                        this.getuserorder();
                        this.$store.commit('setBtntype', 1);
                        console.log("btntype:" + this.$store.getters.getBtntype)
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