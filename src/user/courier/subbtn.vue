<template>
    <div class="f1">
        <x-button @click.native="btnclick">{{getBtnTitle($store.getters.getBtntype)}}</x-button>
        <confirm v-model="isshowalert" :title="title" @on-cancel="onCancel" @on-confirm="onConfirm" @on-show="onShow" @on-hide="onHide">
            <p style="text-align:center;">{{ content}}</p>
        </confirm>
    </div>
</template>
<script>
    import { XButton, Confirm } from 'vux'
    import config from '../../config/config';
    export default {
        data() {
            return {
                isshowalert: false,
                title: '',
                content: ''
            }
        },
        components: {
            XButton, Confirm
        },
        methods: {
            showAlert(title, content) {
                this.isshowalert = true;
                this.title = title;
                this.content = content;
            },
            onConfirm() {
                console.log('on confirm')
                this.updateFicorder();

            },
            onHide() {
                console.log('on hide')
            },
            onShow() {
                console.log('on show')
            },
            btnclick(){
                var type = this.$store.getters.getBtntype;
                if (type == 0) {
                    this.showAlert('提示', "确认本批次订单，全部取件完成？")
                } else if (type == 1) {
                    this.showAlert('提示', "确认本批次订单，已经送达客户手中？")
                }
            },
            updateFicorder: function () {
                var type = this.$store.getters.getBtntype;
                var ficorder = this.$route.query.ficid;
                var targetstate = 0;

                if (type == 0) {
                    console.log("更新fic状态为2")
                    targetstate = 2;
                } else if (type == 1) {
                    console.log("更新fic状态为3")
                    targetstate = 3;
                }

                this.axios.post(config.mficorderupdate, { ficorder: ficorder, targetstate: targetstate })
                    .then((response) => {
                        console.log(response.data);
                        this.$store.commit('setTicksign',type);
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            },
            getBtnTitle(val) {
                console.log("val:" + val)
                if (val == 0) {
                    return "确认取件";
                } else if (val == 1) {
                    return "确认送达";
                }
            }
        }
    }

</script>
<style>
    .f1 {
        margin-bottom: 2px;
    }
</style>