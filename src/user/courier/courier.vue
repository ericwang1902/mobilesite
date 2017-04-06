<template>
    <div style="height: 100%;width: 100%">
        <tab>
            <tab-item selected @on-item-click="handler(1)">客户订单</tab-item>
            <tab-item @on-item-click="handler(2)">店铺订单</tab-item>
        </tab>

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
            }
        }
    }

</script>
<style>

</style>