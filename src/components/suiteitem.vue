<template>
    <masker style="border-radius: 2px;">
        <div class="m-img" :style="{backgroundImage: 'url(' + suitephoto + ')'}"></div>
        <div slot="content" class="m-title">
          {{suitename}}
          <br/>
          <!--<span class="m-time">{{suitedes}}</span>-->
        </div>
      </masker>

</template>
<script>
    import {Masker} from 'vux'

    export default {
        props:['suitename',
                'suitedes',
                'suitephoto',
                'suiteprice'],
        components:{
            Masker
        }
    }

</script>
<style>
</style>