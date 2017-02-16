<template>
    <div style="background-color:bisque">
        
        <group style="background-color:blue">
                <div :style="styleObj">
                    
                </div>
                <x-number :title="suitename" ></x-number>
        </group>
        <divider></divider>
    </div>

</template>
<script>
    import {Group,XNumber,Divider  } from 'vux'

    export default {
        props:['suitename',
                'suitedes',
                'suitephoto',
                'suiteprice'],
        components:{
            Group,
            XNumber,
            Divider  
        },
        data () {
            return {
                //用来绑定套餐的背景图
                styleObj:{
                    background:'url(' + this.suitephoto + ') 0% 0% / 100% 100% no-repeat',
                    width:'100%',
                    height:'200px',
                    
                }
            }
        }
    }

</script>
<style>
</style>