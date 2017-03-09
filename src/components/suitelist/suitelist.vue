<template>
    <div class="suitelist">
        <scroller lock-x scrollbar-y height="-3rem" ref="scroller">
        <div>
            <div v-for="item in suitelist">
                <suiteitem :suiteInfo="item"></suiteitem>
            </div>
        </div>
        </scroller>
    </div>
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
                suitelist: []
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
            }
        }
    }
</script>
<style>
.suitelist{
    background-color: #EFEFEF;
}


</style>