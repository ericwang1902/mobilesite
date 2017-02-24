<template>
    <div :style="suiteCls">
        <p style="color:#000000">{{suiteInfo.suitename}}</p>
    </div>
</template>
<script>
export default {
    props:['suiteInfo'],
    data(){
        return {

        }
    },
    computed:{
        suiteCls:function(){
            return{
                'width': '100%',
                'height':'200px',
                'background-image': 'url('+this.suiteInfo.suitephoto+')',
                'background-size':'100% 100%',
                'display':'flex',
                'flex-direction': 'column-reverse'
            }
        }
    }
}
</script>
<style>
</style>