<template>
    <div v-if="$store.getters.getShowDoBtn" class="f1">
        <x-button @click.native="btnclick">一键分发</x-button>
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
        onCancel() {
            console.log("取消")
        },
        onConfirm() {
            console.log('on confirm')
            this.deliverOrder();

        },
        onHide() {
            console.log('on hide')
        },
        onShow() {
            console.log('on show')
        },
        btnclick() {
            if (!this.$store.getters.getDeRegonid) {
                alert("没选择分发区域，无法分发！")
            } else {
                this.showAlert('提示', "确认将本次客户订单全部分发？")
            }

        },
        deliverOrder: function () {
            console.log("分发订单")
            var postData = {
                regionid: this.$store.getters.getDeRegonid
            }
            this.axios.post(config.mdeorder, postData)
                .then((response) => {
                    console.log(response.data);
                    this.$store.commit("setSearchorder",!this.$store.getters.getSearchorder)
                    console.log("ddd")
                })
                .catch(function (err) {
                    console.log(err);
                })


        }
    }
}

</script>
<style>
.f1 {
    margin-bottom: 2px;
}
</style>