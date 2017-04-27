<template>
    <div>
        <group title="选择所属区县" label-width="4em" label-margin-right="2em" label-align="right">
            <popup-picker required value-text-align="left" placeholder="必填" title="所属地区" show-name @on-change="distritconChange" :data="districtData" :columns="3" v-model="selectDistrict" ref="picker3"></popup-picker>
        </group>
        <div class="sbbtn">
            <x-button type="primary" @click.native="submitform">提交</x-button>
        </div>
        <confirm v-model="isshowalert" :title="title" @on-cancel="onCancel" @on-confirm="onConfirm" @on-show="onShow" @on-hide="onHide">
            <p style="text-align:center;">{{ content}}</p>
        </confirm>
    </div>
</template>
<script>
import { PopupPicker, Group, XInput, Selector, XButton, Confirm } from 'vux'
import config from '../../config/config'

export default {
    components: {
        PopupPicker,
        Group,
        XInput,
        Selector,
        XButton,
        Confirm
    },
    data() {
        return {
            districtData: [],//popup－picker 数据源
            selectDistrict: [],//选择,作废，使用的onchange事件来获取数据
            regionData: [],//selector的数据源
            district: '',//获取到的districtid

            isshowalert: false,
            title: '',
            content: ''
        }
    },
    created() {
        console.log(config.mdistricts)
        this.getdistricts();
    },
    methods: {
        getdistricts: function () {
            this.axios.get(config.mdistricts)
                .then((response) => {
                    console.log(response.data);
                    this.districtData = response.data;
                })
                .catch(function (err) {
                    console.log(err);
                })
        },
        distritconChange: function (val) {
            this.district = val[2];//取选择的区县的id
            console.log("this.district:" + this.district);
            console.log('!this.district bool:' + !this.district);
        },
        submitform: function () {
            console.log("this.district:" + this.district);
            console.log('!this.district bool:' + !this.district);
            if (!this.district) {
                this.$store.commit("setAlertinfo", {
                    isshow: true,
                    title: "提示!",
                    content: "请选择区域！"
                })

            } else {
                this.showAlert('提示', "确认选择该区域为所在区域？")
            }

        },
        showAlert(title, content) {
            this.isshowalert = true;
            this.title = title;
            this.content = content;
        },
        onHide() {
            console.log('on hide')
        },
        onShow() {
            console.log('on show')
        },
        onCancel() {
            console.log('on cancel')
        },
        onConfirm() {
            var formdata = {
                district: this.district
            }
            this.axios.put(config.fans + "/" + this.$store.getters.getUserId, formdata)
                .then((response) => {
                    console.log(response.data)
                    if (response.data._id) {
                        this.$router.push({ name: 'home' });
                    }
                })
                .catch(function (err) {
                    console.log(err);
                })
        }
    }
}

</script>
<style>
.sbbtn {
    margin-top: 10px;
    margin-left: 2px;
    margin-right: 2px;
}
</style>