<template>
    <div style="height: 100%;width: 100%">
        <tab>
            <tab-item selected @on-item-click="handler(1)">已下发订单</tab-item>
            <tab-item @on-item-click="handler(2)">未下发订单</tab-item>
            <tab-item @on-item-click="handler(3)">全部订单</tab-item>
        </tab>
        <selector v-if="$store.getters.getShowDoBtn" required title="商圈(下发必填)" placeholder="必填" :options="regionData" v-model="region" @on-change="regiononChange"></selector>
    
        <scroller lock-x scrollbar-y :height="heightS" ref="scroller">
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
            tabnum: 1
        }
    },
    created() {
        this.openid = this.$route.query.openid;
        this.getuserinfo();
        
    },
    computed:{
        ...mapGetters({ searchorder: 'getSearchorder' })
    },
    watch:{
        searchorder:function(){
                 this.getorders(this.tabnum);
        }
    },
    methods: {
        getregions: function () {
            this.axios.get(config.mregions + "?districtid=" + this.userinfo.district._id)
                .then((response) => {
                    this.regionData = [];
                    this.getorders(this.tabnum);
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
            this.$store.commit("setDeRegionid",this.region);
            this.getorders(this.tabnum);

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
        getorders(tabnum) {
            var params = {};

            if (this.region) {
                if (tabnum == 1) {//已下发
                    params = {
                        districtid: this.userinfo.district._id,
                        delivered: true
                    }

                } else if (tabnum == 2) {//未下发
                    params = {
                        districtid: this.userinfo.district._id,
                        regionid: this.region
                    }

                } else if (tabnum == 3) {
                    params = {
                        districtid: this.userinfo.district._id,
                        all: true
                    }

                }
            } else {
                if (tabnum == 1) {//已下发
                    params = {
                        districtid: this.userinfo.district._id,
                        delivered: true
                    }

                } else if (tabnum == 2) {//未下发
                    params = {
                        districtid: this.userinfo.district._id
                    }
                } else if (tabnum == 3) {
                    params = {
                        districtid: this.userinfo.district._id,
                        all: true
                    }
                }
            }

            this.axios.get(config.morderlistagent, { params: params })
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
            this.getorders(this.tabnum);


        }
    }
}

</script>
<style>

</style>