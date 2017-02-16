<template>
    <div :style="styleObj" >
        
    </div>

</template>
<script>
    import {Masker} from 'vux'

    export default {
        props:['suitename',
                'suitedes',
                'suitephoto',
                'suiteprice'],
        components:{
            Masker
        },
        data () {
            return {
                styleObj:{
                    background:'url(' + this.suitephoto + ') 0% 0% / 100% 100% no-repeat',
                    width:'100%',
                    height:'200px'
                }
            }
        }
    }

</script>
<style>
</style>