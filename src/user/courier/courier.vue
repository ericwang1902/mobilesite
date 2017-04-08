<template>
    <div style="height: 100%;width: 100%">
        <tab>
            <tab-item selected @on-item-click="handler(1)">未完成配送批次</tab-item>
            <tab-item @on-item-click="handler(2)">已配送批次</tab-item>
        </tab>
        <scroller lock-x scrollbar-y height="-45px" ref="scroller">
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
                openid: ''
            }
        },
        components: {
            Tab, TabItem, Scroller,
            Tabbar, TabbarItem
        },
        created() {
            this.regionid = this.$route.query.regionid;
            this.openid = this.$route.query.openid;
            this.getficorderbyregion();
        },
        methods: {
            getstate(ficorder) {
                if (ficorder.ficorderstate == '1') {
                    return "未取件"
                }else if(ficorder.ficorderstate == '2'){
                    return "已取件"
                }else if(ficorder.ficorderstate =='3'){
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
            getficorderbyregion() {
                this.axios.get(config.mficorder + "?openid=" + this.openid + "&regionid=" + this.regionid)
                    .then((response) => {
                        this.ficorderlist = response.data;

                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            },
            handler(val) {
                switch (val) {
                    case 1:

                        console.log(1)
                        break;
                    case 2:

                        console.log(2)
                        break;
                    default:
                        break;

                }
            },
            onficclick(){

                console.log(item);
            }
        }
    }

</script>
<style>

</style>