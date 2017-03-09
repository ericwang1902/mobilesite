<template>
        <scroller  lock-x scrollbar-y height="-45px" ref="scroller">
        <div>
            <div v-for="item in suitelist">
                <suiteitem @suiteevent="getitemtocart" :suiteInfo="item"></suiteitem>
            </div>
        </div>
        </scroller>
</template>
<script>
    import config from '../../config/config'
    import suiteitem from './suiteitem'
    import {Scroller} from 'vux'

    export default {
        components: {
            suiteitem,
            Scroller
        },
        data() {
            return {
                suitelist: [],
                cartlist:[]
            }
        },
        created() {
            this.getSuites();
            console.log(JSON.stringify(this.$route.query.userid));
        },
        methods: {
            getSuites: function () {
                this.axios.get(config.msuite+'?userid='+this.$route.query.userid).then((response) => {
                    this.suitelist = response.data;
                    console.log(this.suitelist);
                    this.$nextTick(() => {
                            this.$refs.scroller.reset({top: 0})
                            })
                    
                })
                    .catch(function (err) {
                        console.log(err)
                    })
            },
            getitemtocart:function(val){
                if(!this.cartlist.find(d=>d.suite._id==val.suite._id)){
                    this.cartlist.push(val);
                }else{
                    for(var i=0;i<this.cartlist.length;i++){
                        if(this.cartlist[i].suite==val.suite){
                            this.cartlist[i].amount = val.amount;
                            this.cartlist[i].count = val.count;
                        }
                    }
                }
                var totalamount=0;
                var totalcount=0;
                for(var i=0;i<this.cartlist.length;i++){
                    totalamount+=this.cartlist[i].amount;
                    totalcount+=this.cartlist[i].count;
                }
                
                this.$store.commit('setTotalAmount',totalamount);
                this.$store.commit('setTotalCount',totalcount);
                console.log("总额："+JSON.stringify(this.cartlist));
            }
        }
    }
</script>
<style>
  .suitescontent {
        width: 100%;
        background-color: #FBF9FE;
        position: fixed;
        top: 0rem;
        /*flex: 1 0 auto;*/
        /*设置自动占满除了“占位的30px之外的所有位置”*/
        background-color: #FBF9FE;
    }
</style>