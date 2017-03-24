<template>
    <div class="indexCls">

        <transition name="router-slid" mode="out-in">
            <router-view name="a"></router-view>
        </transition>

        <div class="WFooter">
            <transition name="router-slid" mode="out-in">
                <router-view name="b"></router-view>
            </transition>
        </div>
        <x-dialog v-model="$store.getters.getXdialogShow" class="dialog-demo" @on-hide="onhide" :hideOnBlur="true" :scroll="true">
            <p class="dialog-title">{{$store.getters.getsuiteinfo.suitename}}</p>
            <div class="img-box">
                <img :src="$store.getters.getsuiteinfo.suitephoto" style="max-width:100%">

            </div>
            <span class="vux-close" @click="closeDialog">关闭</span>
        </x-dialog>

    </div>
</template>
<script>
    import topDiv from "../components/layout/topDiv";
    import { XDialog } from 'vux';
    import wx from 'weixin-js-sdk';
    import config from "../config/config";
    import utils from "../common/utils";

    export default {
        components: {
            topDiv,
            XDialog
        },
        data() {
            return {
                jsapiticket: '',
                noncestr: '',
                timestamp: '',
                url: ''
            }
        },
        created() {
            var userid = this.$route.query.userid;//1.获取当前query串中的userid
            this.$store.commit('setUserId', userid);//2.将userid存放在store中
            console.log("userid:" + this.$store.getters.getUserId);

            //获取后台的jsapiticket
            this.axios.get(config.mwxjsapiticketurl)
                .then((response) => {
                    console.log(response.data.jsapiticket);
                    this.jsapiticket = response.data.jsapiticket;
                    this.noncestr = Math.random().toString(36).substr(2, 15);
                    this.timestamp = parseInt(new Date().getTime() / 1000) + '';
                    this.url = '';//需要获取

                    //计算签名---需要修改
                    var signature1= utils.wxjssign(this.jsapiticket, this.noncestr, this.timestamp, this.url);

                    // wx.config({
                    //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    //     appId: 'wx94e3a09e4149b262', // 必填，公众号的唯一标识
                    //     timestamp: this.timestamp, // 必填，生成签名的时间戳
                    //     nonceStr: this.noncestr, // 必填，生成签名的随机串
                    //     signature: signature1,// 必填，签名，见附录1
                    //     jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    // });


                })
                .catch(function (err) {
                    console.log(err);
                })






        },
        methods: {
            closeDialog() {
                this.$store.commit('setXdialogShow', false);
            },
            onhide() {
                console.log("hiede")
                this.$store.commit('setXdialogShow', false);
            }
        }
    }

</script>
<style>
    .indexCls {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    /*说明：利用flexbox布局的特性，制作垂直方向的列表，设置垂直方向之后，当item不设置指定宽度的时候，将会自动填充一行*/
    
    .zhanwei {
        flex: 0 0 3rem;
    }
    
    .WFooter {
        position: fixed;
        bottom: 0px;
        /* background-color: aqua;*/
        width: 100%;
        height: 44px;
    }
    
    .router-fade-enter-active,
    .router-fade-leave-active {
        transition: opacity .3s;
    }
    
    .router-fade-enter,
    .router-fade-leave-active {
        opacity: 0;
    }
    
    .router-slid-enter-active,
    .router-slid-leave-active {
        transition: all .4s;
    }
    
    .router-slid-enter,
    .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
    
    .dialog-demo {
        display: flex;
        flex-direction: column;
        margin-top: 10%;
        .vux-close {
            height: 5rem
        }
    }
</style>