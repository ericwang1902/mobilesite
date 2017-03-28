<template>
    <div style="height: 100%;width: 100%">
        <tab>
            <tab-item selected @on-item-click="handler(1)">客户订单</tab-item>
            <tab-item @on-item-click="handler(2)">店铺订单</tab-item>
        </tab>
        <tabbar>
            <tabbar-item @on-item-click="barhandler(1)">
                <span slot="label">当前批次</span>
            </tabbar-item>
            <tabbar-item show-dot @on-item-click="barhandler(2)">
                <span slot="label">历史批次</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>
<script>
    import config from '../../config/config';
    import { Tab, TabItem, Scroller } from 'vux';
    import { Tabbar, TabbarItem } from 'vux'

    export default {
        components: {
            Tab, TabItem, Scroller,
            Tabbar, TabbarItem
        },
        methods: {
            
            handler(val) {
                switch (val) {
                    case 1:

                        console.log(1)
                        break;
                    case 2:

                        console.log(2)
                        break;
                    default:
                        break;

                }
            },
            barhandler(val){
                switch (val) {
                    case 1:

                        console.log(111)
                        break;
                    case 2:

                        console.log(222)
                        break;
                    default:
                        break;

                }
            }
        }
    }

</script>
<style>

</style>