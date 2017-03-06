<template>
    <div>
        您尚未选择所在区域及配送地址，请新增收货地址
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        created() {
            var userid = this.$route.query.userid;//1.获取当前query串中的userid
            this.$store.commit('setUserId', userid);//2.将userid存放在store中
            console.log(this.$store.getters.getUserId)
        },
        methods: {
            //更新当前用户的所属地区
            UpdateDistrict:function(){

            }
        }
    }

</script>
<style>

</style>