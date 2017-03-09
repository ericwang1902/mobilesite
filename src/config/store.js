import Vue from 'vue'
import Vuex from 'vuex'

// 告诉 vue “使用” vuex
Vue.use(Vuex)

var userid = "";
var totalamount = 0;
var totalcount=0;

const state = {
    userid: userid,//当前用户的id
    totalamount:totalamount,//购物车总金额
    totalcount:totalcount//购物车总数量
}

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
    // TODO: 放置我们的状态变更函数
    setUserId: function (state, userid) {
        state.userid = userid;
    },
    setTotalAmount:function(state,totalamount){
        state.totalamount = totalamount
    },
    setTotalCount:function(state,totalcount){
        state.totalcount = totalcount;
    }
}

const getters = {
    //用户id的getter函数
    getUserId: state => { return state.userid },
    //购物车总金额的getter函数
    getTotalAmount :state=>{return state.totalamount},
    //购物车总数量的getter函数
    getTotalCount :state=>{return state.totalcount}

}

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
    state,
    getters,
    mutations
})
