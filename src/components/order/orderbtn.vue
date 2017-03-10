<template>
    <div class="f1">
        <x-button @click.native="backtochoose">修改订单</x-button>
    </div>
</template>
<script>
    import { XButton } from 'vux'
    export default {
        components:{
            XButton
        },
        methods:{
            backtochoose:function(){
                this.$router.back();
            }
        }
    }

</script>
<style>
.f1{
    margin-bottom: 2px;
}

</style>