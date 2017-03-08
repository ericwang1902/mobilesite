<template>
    <div>
         <scroller lock-x scrollbar-y height="-44px" ref="scroller">
            <div class="bck" >
                <!--<p v-for="i in 60" v-if="showList1">placeholder {{ i + '' + i }}</p>-->
                <checker v-model="demo1" class="ckcls" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                    <checker-item v-for="i in 60" value="i">
                        <div >
                            test
                        </div>
                    </checker-item>
                </checker>
            </div>
            
        </scroller>
    </div>
</template>
<script>
    import { Scroller,Checker,CheckerItem } from 'vux'

    export default {
        components: {
            Scroller,
            Checker,
            CheckerItem
        },
        data () {
            return {
                demo1:'',
                showList1:true
            }
        }
    }
</script>
<style>
.bck{
    background-color:aqua;
}
.demo1-item {
  border: 1px solid #ececec;
  widows: 100%;
}
.demo1-item-selected {
  border: 1px solid green;
}
.ckcls{
    display: flex;
    flex-direction: column;
}
</style>