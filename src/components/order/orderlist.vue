<template>
    <div>
        <div v-for="item in orderlist" class="orderitemrow">
            <div class="leftcolum">
                <div class="ordernum">
                    <p><span style="font-size: 1rem;margin-right: 1rem">订单号:</span><span>{{item.ordernum}}</span></p>
                </div>
                <div class="ordernum">
                    <p><span style="font-size: 1rem;margin-right: 1rem">订单日期:</span><span>{{ordertimefunc(item.ordertime)}}</span></p>
                </div>
                <div class="ordernum">
                    <p><span style="font-size: 1rem;margin-right: 0.5rem">¥</span><span>{{item.totalamount}}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import config from '../../config/config'
    export default {
        data() {
            return {
                orderlist: []
            }
        },
        methods: {
            ordertimefunc(val) {
                return new Date(val).toLocaleDateString() + new Date(val).toLocaleTimeString();
            }
        },
        components: {
        },
        created() {
            this.axios.get(config.morderlist + '?fansid=' + this.$store.getters.getUserId)
                .then((response) => {
                    console.log("根据fansid获取order：" + this.$store.getters.getUserId)
                    console.log(response.data);
                    this.orderlist = response.data;
                })
                .catch(function (err) {
                    console.log(err);
                })
        }
    }

</script>

<style lang="scss" scoped>
    .orderitemrow {
        display: flex;
        flex-direction: row;
        margin-top: 1rem;
        background-color: #ffffff;
        border: .025rem solid #f5f5f5;
        
    }
    
    .leftcolum {
        margin-left: 1rem;
        display: flex;
        flex-direction: column;
    }
    
    .ordernum {
        font-size: 0.9rem;
        font-weight: 800;
    }
</style>