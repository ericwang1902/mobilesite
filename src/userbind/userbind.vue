<template>
<div>
    用户绑定
</div>
</template>
<script>
export default {
    created (){
         var openid = this.$route.query.openid;//1.获取当前query串中的openid
         console.log(openid)
    }
}
</script>
<style>
</style>