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
                <!--<div>{{$store.getters.getsuiteinfo.goodslist}}</div>-->

            </div>
            <span class="vux-close" @click="closeDialog">关闭</span>
        </x-dialog>
        <alert v-model="$store.getters.getAlertinfo.isshow" :title="$store.getters.getAlertinfo.title" >{{$store.getters.getAlertinfo.content}}</alert>
        

    </div>
</template>
<script>
    import topDiv from "../components/layout/topDiv";
    import { XDialog,Alert } from 'vux';
    import wx from 'weixin-js-sdk';
    import config from "../config/config";
    import utils from "../common/utils";

    export default {
        components: {
            topDiv,
            XDialog,
            Alert
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

            console.log(this.url);

            //调用微信签名计算接口，在服务器端进行计算
            this.axios.get(config.mwxjsapiticketurl)
                .then((response) => {
                    var configobj = response.data;
                    console.log(configobj);
                    
                    
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: configobj.appid, // 必填，公众号的唯一标识
                        timestamp: configobj.timestamp, // 必填，生成签名的时间戳
                        nonceStr: configobj.noncestr, // 必填，生成签名的随机串
                        signature: configobj.signature,// 必填，签名，见附录1
                        jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });


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