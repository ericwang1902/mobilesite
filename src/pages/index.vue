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
        <x-dialog v-model="$store.getters.getXdialogShow" class="dialog-demo" @on-hide="onhide" :hideOnBlur="true"  :scroll="true">
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
    import weixinjs from '../common/jweixin-1.2.0';

    export default {
        components: {
            topDiv,
            XDialog
        },
        created() {
            var userid = this.$route.query.userid;//1.获取当前query串中的userid
            this.$store.commit('setUserId', userid);//2.将userid存放在store中
            console.log("userid:" + this.$store.getters.getUserId);
        },
        methods: {
            closeDialog() {
                this.$store.commit('setXdialogShow', false);
            },
            onhide(){
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