<template>
    <div style="height: 100%;width: 100%">
        <tab>
            <tab-item selected @on-item-click="handler(1)">未取件批次</tab-item>
            <tab-item @on-item-click="handler(2)">已取件批次</tab-item>
            <tab-item @on-item-click="handler(3)">已送达批次</tab-item>
        </tab>
        <scroller lock-x scrollbar-y use-pullup height="-45px" ref="scroller" @on-pullup-loading="load1" :pullup-config="pullupconfig">
            <div>
                <div v-for="item in ficorderlist">
                    <div style="border: .025rem solid #f5f5f5" @click="onficclick(item)">
                        <div>{{item.ficordernum}}</div>
                        <div>{{getstate(item)}}</div>
                    </div>
                </div>
            </div>
        </scroller>

    </div>
</template>
<script>
    import config from '../../config/config';
    import { Tab, TabItem, Scroller } from 'vux';
    import { Tabbar, TabbarItem } from 'vux'

    export default {
        data() {
            return {
                ficorderlist: [],
                regionid: '',
                openid: '',
                ficorderstate: 1,

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
        components: {
            Tab, TabItem, Scroller,
            Tabbar, TabbarItem
        },
        created() {
            this.regionid = this.$route.query.regionid;
            this.openid = this.$route.query.openid;
            this.getficorderbyregion(true, 10, 1, () => { });//------------------------------    
            this.$store.commit('setShowfooter', false);

        },
        destroyed() {
            this.$store.commit('setShowfooter', true);
        },
        methods: {
            getstate(ficorder) {
                if (ficorder.ficorderstate == '1') {
                    return "未取件"
                } else if (ficorder.ficorderstate == '2') {
                    return "已取件"
                } else if (ficorder.ficorderstate == '3') {
                    return "已送达"
                }
            },
            //根据openid查询用户信息
            getuserinfo() {
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
            //根据regionid获取ficorder
            getficorderbyregion(isfirst, pageitems, currentpage, callback) {

                var params = {
                    openid: this.openid,
                    regionid: this.regionid,
                    ficorderstate: this.ficorderstate
                }

                this.axios.get(config.mficorder , { params: params })
                    .then((response) => {
                       
                        if (isfirst) {
                            this.total = response.data.count;
                            if (this.total == 0) {
                                this.$refs.scroller.disablePullup();
                            }
                            this.ficorderlist = response.data.ficorders;
                        } else {
                            var ficorders = response.data.ficorders;
                            for (var i = 0; i < ficorders.length; i++) {
                                this.ficorderlist.push(ficorders[i])
                            }
                        }
                         console.log(this.total);



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
            handler(val) {
                switch (val) {
                    case 1:
                        console.log(1)
                        this.ficorderstate = 1;

                        break;
                    case 2:
                        console.log(2)
                        this.ficorderstate = 2;

                        break;
                    case 3:
                        console.log(3)
                        this.ficorderstate = 3;

                        break;
                    default:
                        break;

                }
                this.currentpage = 1;
                this.ficorderlist = [];
                 this.$refs.scroller.disablePullup();
                this.$refs.scroller.enablePullup();
                this.getficorderbyregion(true, 10, 1, () => { });//------------------------------
            },
            load1() {
                console.log(this.total / this.pageitems);
                if (this.currentpage < this.total / this.pageitems) {
                    this.currentpage += 1;
                    this.getficorderbyregion(false, this.pageitems, this.currentpage, () => {
                        this.$refs.scroller.donePullup();
                    })
                } else if (this.total == 0) {
                    this.$refs.scroller.disablePullup();
                } else if (this.currentpage > this.total / this.pageitems) {
                    this.$refs.scroller.disablePullup();
                }


            },
            onficclick(item) {
                console.log(item);
                this.$router.push({ name: "courierdetail", query: { ficid: item._id } });
            }
        }
    }

</script>
<style>

</style>