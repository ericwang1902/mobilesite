<template>
    <div :style="suiteCls">

        <div class="suiteClsBottom">
            <!--<div class="goodstr">{{suiteInfo.suitedes}}</div>-->
            <div class="suiterow">
                <div class="suiteinfo">
                    <span class="suitefont">{{suiteInfo.suitename}}</span>
                    <!--<i class="fa fa-info-circle" aria-hidden="true"></i>-->
                    <div class="suitepricediv">
                        <span class="suiteprice">¥ {{suiteInfo.suiteprice}} </span>
                        <span v-if="suiteInfo.suiteprice<suiteInfo.suiteshowprice" class="suiteshowprice">原价¥{{suiteInfo.suiteshowprice}}</span>
                    </div>

                </div>

                <div class="addbtn" @click.stop="">
                    <i @click.stop="movefromcart()" class="fa fa-minus-circle fa-2x" style="margin-right:0.5rem" aria-hidden="true"></i>
                    <p style="color:#fff">{{count}}</p>
                    <i @click.stop="addtocart()" class="fa fa-plus-circle fa-2x" style="margin-left:0.5rem" aria-hidden="true"></i>
                </div>
            </div>
            <div class="zhanwei" @click="itemClick()">

            </div>
        </div>


    </div>
</template>
<script>
    import { XButton } from 'vux'

    export default {

        props: ['suiteInfo', 'Cartcount'],
        components: {
            XButton
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
        background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
        font-size: 20px;
        .zhanwei {
            flex: 1 1 auto;
        }
        .goodstr {
            margin-top: 0.4rem;
            color: #fff;
            font-size: 0.7rem;
        }
        .suiterow {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            color: #fff;
            .suiteinfo {
                display: flex;
                flex-direction: column;
                justify-content:flex-start;
                align-items: flex-start;
                .suitefont {
                    color: #fff;
                    font-weight: 700;
                    font-size: 1rem;
                }
                .suitepricediv {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    .suiteprice {
                        color: #f60;
                        font-weight: 700;
                        font-size: 1rem;
                        font-weight: 600;
                    }
                    .suiteshowprice {
                        font-size: 0.8rem;
                        text-decoration: line-through;
                        margin-left: 1rem;
                    }
                }
            }
            .zhanwei {
                flex: 1 0 auto;
            }
            .addbtn {
                /*padding-top: 1rem;*/
                padding-right: 1rem;
                height: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                color: #1AAD19;
            }
        }
    }
</style>