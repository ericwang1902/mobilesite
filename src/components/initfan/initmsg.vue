<template>
    <div>
        <msg :title="title" :description="des" :icon="icon" :buttons="buttons"></msg>
    </div>
</template>
<script>
    import { Msg } from 'vux'
    export default {
        components: {
            Msg
        },
        data() {
            return {
                title: "提示",
                des: "您尚未选择所在区域及配送地址，请维护所在区域、新增收货地址!",
                icon: "warn",
                buttons: [
                    {
                        type: 'primary',
                        text: '立即去添加地址',
                        link: '/modifyadd'
                    }]
            }
        },
        created() {
            var userid = this.$route.query.userid;//1.获取当前query串中的userid
            this.$store.commit('setUserId', userid);//2.将userid存放在store中
            console.log(this.$store.getters.getUserId)
        },
        methods: {
            gotoAddAddress: function () {
                this.$router.push({ name: 'modifyadd' });
            }
        }
    }

</script>
<style>

</style>