<template>
    <div class="f1">
        <x-button type="primary" @click.native="gotoAddAddress">继续购买</x-button>
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
                this.$router.push({ name: 'home'});
            }
        }
    }

</script>
<style>
.f1{
    margin-bottom: 2px;
}

</style>