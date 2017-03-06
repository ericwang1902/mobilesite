import Vue from 'vue'
import Vuex from 'vuex'

// 告诉 vue “使用” vuex
Vue.use(Vuex)

var userid = "";
var footer={
    isShow:true//是否显示
};//底部的固定按钮类型，用来决定footer的显示内容


const state = {
    userid: userid,//当前用户的id
    footer:footer//
}

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
    // TODO: 放置我们的状态变更函数
    setUserId: function (state, userid) {
        state.userid = userid;
    },
    setFooter:function(state,footer){
        state.footer = footer; 
    }
}

const getters = {
    //用户id的getter函数
    getUserId: state => { return state.userid },
    //footer配置信息的获取
    getFooter:state =>{return state.footer}

}

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
    state,
    getters,
    mutations
})
