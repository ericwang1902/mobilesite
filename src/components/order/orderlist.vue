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
                    <p><span style="font-size: 1rem;margin-right: 0.5rem">状态：</span><span>{{getstate(item.ficorder)}}</span></p>
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
            },
            getstate(ficorder){
                if(!ficorder){
                    return "您已成功下单，等待商家接单";
                }else{
                    if(ficorder.ficorderstate=='1'){
                        return "商家已接单，等待配送"
                    }
                }
            }
        },
        components: {
        },
        created() {
         
            var fansid = '';
            if(this.$route.query.fansid){
                fansid = this.$route.query.fansid;
            }
            else{
                fansid = this.$store.getters.getUserId;
            }
            console.log(fansid)
            this.axios.get(config.morderlist + '?fansid=' + fansid)
                .then((response) => {
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