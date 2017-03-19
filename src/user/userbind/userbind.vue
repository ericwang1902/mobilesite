<template>
    <div>
        <group title="绑定微信" label-width="4em" label-margin-right="2em" label-align="right">
            <x-input required placeholder="必填" title="用户名" align="right" v-model="formdata.username"></x-input>
            <x-input required placeholder="必填" type="text" title="密码" align="right" v-model="formdata.password"></x-input>
        </group>

        <div slot="content" class="card-padding">
            <p style="color:#999;font-size:12px;">说明</p>
            <p style="font-size:14px;line-height:1.2;">
                系统用户输入系统用户名和密码，来登陆系统。
            </p>
        </div>


        <div class="sbbtn">
            <x-button type="primary" @click.native="submitform">提交</x-button>
        </div>
    </div>
</template>
<script>
    import { Group, XInput, XButton, Alert, Card } from 'vux'
    import config from '../../config/config'

    export default {
        components: {
            Group, XInput, XButton, Alert, Card
        },
        data() {
            return {
                formdata: {
                    username: '',
                    password: '',
                    openid: ''
                }
            }
        },
        created() {

        },
        methods: {
            checkform() {
                if (this.formdata.username.length != 0 && this.formdata.password.length != 0) {
                    return true;
                } else {

                    return false;
                }
            },
            submitform() {
                if (this.checkform()) {
                    this.formdata.openid = this.$route.query.openid;//1.获取当前query串中的openid
                    console.log(this.formdata.openid)
                    this.axios.post(config.muserbind, this.formdata)
                        .then((response) => {
                            var userinfo = response.data;
                            if(userinfo){
                                //将userinfo存储在本地store中
                                this.$store.commit('setUserinfo',userinfo);
                                
                                //跳转到admin
                                if(userinfo.role[0].roleName=='ADMIN'){
                                    
                                    this.$router.push({name:"admin",query: { openid: userinfo.openid }})
                                }
                                //跳转到配送员页面
                                if(userinfo.role[0].roleName=='COURIER'){
                                    
                                    this.$router.push({name:"courier" ,query: { openid: userinfo.openid }})
                                }
                                //跳转到配送员页面
                                if(userinfo.role[0].roleName=='SHOPPER'){   
                                    this.$router.push({name:"shopowner", query: { openid: userinfo.openid }})
                                }
                                //跳转到区域代理页面
                                if(userinfo.role[0].roleName=='AGENT'){
                                    
                                    this.$router.push({name:"agent",query: { openid: userinfo.openid }})
                                }
                            }
                            console.log("user bind:" + JSON.stringify(response.data));
                        })
                        .catch(function (err) {
                            console.log(err);
                        })
                }

            }
        }
    }

</script>
<style>

</style>