<template>
    <div >
        top
    </div>
</template>
<script>
import { XHeader, Clocker,Cell } from 'vux'

export default {
    
    components: {
        XHeader,
        Clocker,
        Cell
    },
    data () {
        return {
            title:"本轮下单将于15点结束",
            time1: '2017-02-16 20:00'
        }
    }
}

</script>
<style>

</style>
