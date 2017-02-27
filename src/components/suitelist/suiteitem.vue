<template>
    <div :style="suiteCls">
        <div class="suiteClsBottom">
            <p style="color:#000000;">{{suiteInfo.suitename}}</p>
        </div>
        
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
                'flex-direction': 'column-reverse',
                'margin-bottom':'5px'
            }
        }
    }
}
</script>
<style>
.suiteClsBottom{
    height:50%;
    display: flex;
    flex-direction: column-reverse;
    font-size: 20px;
    padding-left: 10px;
    padding-bottom: 5px;
    background-image: linear-gradient(rgba(230,26,107,0),rgba(255,255,255,1));
}
</style>