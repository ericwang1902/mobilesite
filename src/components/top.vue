<template>
    <div>
        <x-header :left-options="{showBack: false}">
            {{title}}
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
            title:"本轮下单将于15点结束"
        }
    }
}

</script>
<style>
</style>