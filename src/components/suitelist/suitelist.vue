<template>
    <div class="suitelist">
        <div v-for="item in suitelist">
            <suiteitem :suiteInfo="item"></suiteitem>
        </div>
    </div>
</template>
<script>
    import config from '../../config/config'
    import suiteitem from './suiteitem'

    export default {
        components: {
            suiteitem
        },
        data() {
            return {
                suitelist: []
            }
        },
        created() {
            this.getSuites();
        },
        methods: {
            getSuites: function () {
                this.axios.get(config.suite).then((response) => {
                    this.suitelist = response.data;
                    console.log(this.suitelist);
                    
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
    background-color:chartreuse;
}


</style>