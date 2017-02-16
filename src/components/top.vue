<template>
    <div>
        <x-header style="background-color: rgb(65, 181, 191)" :left-options="{showBack: false}">
            <clocker style="font-size: 12px" :time="time1">%H小时 %M 分 %S 秒</clocker>
        </x-header>
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
            time1: '2017-02-16 12:00'
        }
    }
}

</script>
<style>
.header{
    
}
</style>