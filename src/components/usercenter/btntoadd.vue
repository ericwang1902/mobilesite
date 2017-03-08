<template>
    <div class="f1">
        <x-button @click.native="gotoAddAddress">添加地址</x-button>
    </div>
</template>
<script>
    import { XButton } from 'vux'
    export default {
        components:{
            XButton
        },
        methods:{
            gotoAddAddress:function(){
                this.$router.push({ name: 'modifyadd'});
            }
        }
    }

</script>
<style>
.f1{
    margin-bottom: 2px;
}

</style>