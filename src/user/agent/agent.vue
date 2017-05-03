<template>
    <div style="height: 100%;width: 100%">
        <tab>
            <tab-item selected @on-item-click="handler(1)">已下发订单</tab-item>
            <tab-item @on-item-click="handler(2)">未下发订单</tab-item>
            <tab-item @on-item-click="handler(3)">全部订单</tab-item>
        </tab>
        <selector v-if="$store.getters.getShowDoBtn" required title="商圈(下发必填)" placeholder="必填" :options="regionData" v-model="region" @on-change="regiononChange"></selector>
    
        <scroller lock-x scrollbar-y use-pullup :height="heightS" ref="scroller" @on-pullup-loading="load1" :pullup-config="pullupconfig">
            <div>
                <div v-for="item in orderlist">
                    <div style="border: .025rem solid #f5f5f5">
                        <div>{{item.ordernum}}</div>
                        <div>{{item.region.regionname+item.address}}</div>
                    </div>
                </div>
            </div>
        </scroller>
    
    </div>
</template>
<script>
import config from '../../config/config';
import { Tab, TabItem, Scroller, Selector } from 'vux';
import { mapGetters } from 'vuex'

export default {
    components: {
        Tab, TabItem, Scroller, Selector
    },
    data() {
        return {
            openid: '',//query中的openid
            userinfo: {},//根据openid去获取到的user数据
            orderlist: [],
            heightS: '-45px',

            regionData: [],//selector的数据源
            region: '请先选择所属地区！',
            tabnum: 1,

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
        this.getuserinfo();

    },
    computed: {
        ...mapGetters({ searchorder: 'getSearchorder' })
    },
    watch: {
        searchorder: function () {
            this.getorders(true, this.tabnum, 10, 1, () => { });
        }
    },
    methods: {
        getregions: function () {
            this.axios.get(config.mregions + "?districtid=" + this.userinfo.district._id)
                .then((response) => {
                    this.regionData = [];
                     this.getorders(true, this.tabnum, 10, 1, () => { });
                    for (var i = 0; i < response.data.length; i++) {
                        this.regionData.push(response.data[i]);
                    }
                    console.log()
                    this.region = 0;
                })
                .catch(function (err) {
                    console.log(err);
                })
        },
        regiononChange: function (val) {
            console.log(val);
            this.region = val;//取选择的配送区域的id
            this.$store.commit("setDeRegionid", this.region);
             this.getorders(true, this.tabnum, 10, 1, () => { });

        },
        getuserinfo: function () {
            this.axios.get(config.muser + "?openid=" + this.openid)
                .then((response) => {
                    this.userinfo = response.data;
                    this.getregions();
                    console.log(response.data);
                })
                .catch(function (err) {
                    console.log(err);
                })
        },
        getorders(isfirst, tabnum, pageitems, currentpage, callback) {
            console.log('isfirst:'+isfirst);
            console.log('tabnum:'+tabnum);
            console.log('pageitems:'+pageitems);
            console.log('currentpage:'+currentpage);
            var params = {};

            if (this.region) {
                if (tabnum == 1) {//已下发
                    params = {
                        districtid: this.userinfo.district._id,
                        delivered: true,
                        pageitems: pageitems,
                        currentpage: currentpage
                    }

                } else if (tabnum == 2) {//未下发
                    params = {
                        districtid: this.userinfo.district._id,
                        regionid: this.region,
                        pageitems: pageitems,
                        currentpage: currentpage
                    }

                } else if (tabnum == 3) {
                    params = {
                        districtid: this.userinfo.district._id,
                        all: true,
                        pageitems: pageitems,
                        currentpage: currentpage
                    }

                }
            } else {
                if (tabnum == 1) {//已下发
                    params = {
                        districtid: this.userinfo.district._id,
                        delivered: true,
                        pageitems: pageitems,
                        currentpage: currentpage
                    }

                } else if (tabnum == 2) {//未下发
                    params = {
                        districtid: this.userinfo.district._id,
                        pageitems: pageitems,
                        currentpage: currentpage
                    }
                } else if (tabnum == 3) {
                    params = {
                        districtid: this.userinfo.district._id,
                        all: true,
                        pageitems: pageitems,
                        currentpage: currentpage
                    }
                }
            }

            this.axios.get(config.morderlistagent, { params: params })
                .then((response) => {
                    if (isfirst) {
                        this.total = response.data.count;
                        if(this.total==0){
                            this.$refs.scroller.disablePullup();
                        }
                        console.log('total:'+this.total)
                        this.orderlist = response.data.orders;
                       // console.log("this.orderlist:"+JSON.stringify(this.orderlist))
                    }else{
                        var orders = response.data.orders;
                        for (var i = 0; i < orders.length; i++) {
                            this.orderlist.push(orders[i])
                        }
                       // console.log("this.orderlist:"+JSON.stringify(this.orderlist))
                    }
                    
                    this.$nextTick(() => {
                        if(isfirst){
                            this.$refs.scroller.reset({top:0});
                        }else{
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
                    this.heightS = '-45px'
                    this.$store.commit("setShowDoBtn", false);
                    this.tabnum = 1;
                    console.log(1)
                    break;
                case 2:
                    this.heightS = '-135px'
                    this.$store.commit("setShowDoBtn", true);
                    this.tabnum = 2;
                    console.log(2)
                    break;
                case 3:
                    this.heightS = '-45px'
                    this.$store.commit("setShowDoBtn", false);
                    this.tabnum = 3;
                    console.log(3)
                    break;
                default:
                    break;
            }
            this.currentpage=1;
            this.orderlist=[];
            this.$refs.scroller.enablePullup();
            this.getorders(true, this.tabnum, 10, this.currentpage, () => { });


        },
        load1() {
            console.log(this.total/this.pageitems);
            if (this.currentpage < this.total/this.pageitems) {
                this.currentpage += 1;
                this.getorders(false,this.tabnum,this.pageitems, this.currentpage, () => {
                    this.$refs.scroller.donePullup();
                })
            }else if(this.total==0){
                this.$refs.scroller.disablePullup();
            }else if(this.currentpage > this.total/this.pageitems){
                this.$refs.scroller.disablePullup();
            }


        }
    }
}

</script>
<style>

</style>