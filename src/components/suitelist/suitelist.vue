<template>
    <div class="suitelist">
        
    </div>
</template>
<script>
import config from '../../config/config'

export default {
    data(){
        return {
            suitelist:[]
        }
    },
    created(){
        
    },
    methods:{
        getSuites:function(){
            this.axios.get(config.suite).then((response)=>{
            this.suitelist = response.data;       
            console.log(this.suitelist)
            })
        .catch(function(err){
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