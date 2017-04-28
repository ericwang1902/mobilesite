<template>
    <div class="suitediv">
        <img :src="imgsrc" :style="suiteimg" @click="itemClick()"/>
        <div class="suiteinfo">
            <div class="suiterow">
                <span class="suitefont">{{suiteInfo.suitename}}</span>
                <div class="suitepricediv">
                    <span class="suiteprice">¥ {{suiteInfo.suiteprice}} </span>
                    <span v-if="suiteInfo.suiteprice<suiteInfo.suiteshowprice" class="suiteshowprice">原价¥{{suiteInfo.suiteshowprice}}</span>
                </div>

            </div>
            <div class="addbtn" @click.stop="">
                <x-number v-model="count" align="right" :min="0" style="margin-right:0px;color:#000"></x-number>
            </div>

        </div>

    </div>
</template>
<script>
    import { XButton, XNumber } from 'vux'

    export default {

        props: ['suiteInfo', 'Cartcount'],
        components: {
            XButton,
            XNumber
        },
        data() {
            return {
                count: 0
            }
        },
        created() {
            this.count = this.Cartcount;
        },
        computed: {
            imgsrc:function(){
                // return {
                //     'background-image': 'url(' + this.suiteInfo.suitephoto + ')'
                // }
              return   this.suiteInfo.suitephoto;
            },
            suiteimg: function () {
                return {
                    // 'flex': '0 1 100px'
                    'width':document.body.clientWidth+'px'                                                                                                                          ,
                    'height':document.body.clientWidth*200/375+'px'
                }
            },
            goodsStr: function () {
                var goodsstr = '';
                for (var i = 0; i < this.suiteInfo.goodslist.length; i++) {
                    goodsstr += this.suiteInfo.goodslist[i].goodsname;
                    if (i !== this.suiteInfo.goodslist.length - 1) {
                        goodsstr += '|';
                    }
                }
                return goodsstr;
            }
            // ,
            // totalamount: function () {
            //     return this.count * this.suiteInfo.suiteprice;
            // }
        },
        watch: {
            count: function (val) {
                var obj = {
                    suite: this.suiteInfo,
                    amount: val * this.suiteInfo.suiteprice,
                    count: val
                }
                console.log(this.suiteInfo.suitename + obj.amount);
                this.$emit('suiteevent', obj);
            }
        },
        methods: {
            itemClick() {
                console.log("ddd：" + JSON.stringify(this.suiteInfo));
                this.$store.commit('setXdialogShow', true);
                this.$store.commit('setsuiteinfo', this.suiteInfo)

            }
        }
    }

</script>
<style>
    .suitediv {
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }
    

    
    .suiteinfo {
        background-color: #fff;
        flex: 0 1 auto;
        display: flex;
        flex-direction: row;
       
    }
    
    .suiterow {
         margin-left: 0.8rem;
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
    }
    
    .suitefont {
        color: #000;
        font-weight: 700;
        font-size: 1rem;
    }
    
    .suitepricediv {
        display: flex;
        flex-direction: row;
    }
    
    .suiteprice {
        color: #f60;
        font-weight: 700;
        font-size: 1rem;
    }
    
    .suiteshowprice {
        font-size: 0.8rem;
        text-decoration: line-through;
        margin-left: 1rem;
    }
    
    .addbtn {
        flex: 0 1 auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
    }
</style>