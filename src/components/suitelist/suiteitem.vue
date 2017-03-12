<template>
    <div :style="suiteCls" @click="itemClick()">

        <div class="suiteClsBottom">
            <div class="goodstr">{{suiteInfo.suitedes}}</div>
            <div class="suiterow">

                <p><span class="suitefont">{{suiteInfo.suitename}}</span><span class="suiteprice">¥ {{suiteInfo.suiteprice}}</span></p>
                <div class="zhanwei">
                </div>
                <div class="addbtn">
                    <i @click.stop="movefromcart()" class="fa fa-minus-circle fa-2x" style="margin-right:0.5rem" aria-hidden="true"></i>
                    <p style="color:#fff">{{count}}</p>
                    <i @click.stop="addtocart()" class="fa fa-plus-circle fa-2x" style="margin-left:0.5rem" aria-hidden="true"></i>
                </div>
            </div>
        </div>
        

    </div>
</template>
<script>
    import { XButton } from 'vux'
    
    export default {

        props: ['suiteInfo'],
        components: {
            XButton
        },
        data() {
            return {
                count: 0
            }
        },
        computed: {
            suiteCls: function () {
                return {
                    'width': '100%',
                    'height': '200px',
                    'background-image': 'url(' + this.suiteInfo.suitephoto + ')',
                    'background-size': '100% 100%',
                    'display': 'flex',
                    'flex-direction': 'column-reverse',
                    'margin-bottom': '5px'
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
            },
            totalamount: function () {
                return this.count * this.suiteInfo.suiteprice;
            }
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
                console.log("ddd");
                this.$store.commit('setXdialogShow', true);
                this.$store.commit('setsuiteinfo',this.suiteInfo)

            },
            addtocart() {
                this.count++;
                console.log("addtocart")
            },
            movefromcart() {
                if (this.count > 0) {
                    this.count--;
                }
                console.log("movefromcart")
            }
        }
    }

</script>
<style lang="scss" scoped>
    .suiteClsBottom {
        height: 100%;
        display: flex;
        flex-direction: column-reverse;
        justify-content: flex-start;
        padding-left: 1rem;
        padding-bottom: 0.5rem;
        background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 1));
        .goodstr {
            margin-top: 0.4rem;
            color: #fff;
            font-size: 0.7rem;
        }
        .suitefont {
            margin-right: 1rem;
            color: #fff;
            font-weight: 700;
            font-size: 1rem;
        }
        .suiterow {
            display: flex;
            flex-direction: row;
            color: #fff;
        }
        .suiteprice {
            color: #f60;
            margin-left: 1rem;
            font-size: 0.8rem;
            font-weight: 600;
        }
        .zhanwei {
            flex: 1 0 auto;
        }
        .addbtn {
            padding-top: 1rem;
            padding-right: 1rem;
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            color: #1AAD19;
        }
    }
    
</style>