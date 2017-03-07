<template>
    <div>
        addressform
    </div>
</template>
<script>
import config from '../../config/config'

export default {
    data(){
        return {
            districtData:[]
        }
    },
    created(){
        this.getdistricts();
    },
    methods:{
        getdistricts:function(){
            console.log(config.mdistricts)
            this.axios.get(config.mdistricts)
                      .then(response=>{
                          console.log(response.data)
                      })
                      .catch(function(err){
                          console.log(err);
                      })
                    
        }
    }
}

</script>
<style>

</style>