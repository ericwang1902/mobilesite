import Vue from 'vue'
import Vuex from 'vuex'

// 告诉 vue “使用” vuex
Vue.use(Vuex)

var userid = "";
var totalamount = 0;
var totalcount=0;
//order info
var cartlist =[];
var regionid ='';
var districtid ='';

var xdialogshow = false;
var suiteinfo = {};

const state = {
    userid: userid,//当前粉丝的id
    totalamount:totalamount,//购物车总金额
    totalcount:totalcount,//购物车总数量
    cartlist:cartlist,//购物车所有物品清单
    regionid:regionid,//配送商圈id
    districtid:districtid,//区县id
    xdialogshow:xdialogshow,//xdialog显示选项
    suiteinfo:suiteinfo//dialog suiteinfo
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
    },
    setCartList:function(state,cartlist){
        state.cartlist = cartlist;
    },
    setRegionId:function(state,regionid){
        state.regionid = regionid;
    },
    setDistrictId:function(state,districtid){
        state.districtid = districtid;
    },
    setXdialogShow:function(state,xdialogshow){
        state.xdialogshow = xdialogshow;
    },
    setsuiteinfo:function(state,suiteinfo){
        state.suiteinfo = suiteinfo;
    }
}

const getters = {
    //用户id的getter函数
    getUserId: state => { return state.userid },
    //购物车总金额的getter函数
    getTotalAmount :state=>{return state.totalamount},
    //购物车总数量的getter函数
    getTotalCount :state=>{return state.totalcount},
    //购物车所有物品清单的getter函数
    getCartList:state=>{return state.cartlist},
    //配送商圈id
    getRegionId:state=>{return state.regionid},
    //区县id
    getDistrictId:state=>{return state.districtid},
    //xdialogshow
    getXdialogShow:state=>{return state.xdialogshow},
    //getsuiteinfo
    getsuiteinfo:state=>{return  state.suiteinfo}

}

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
    state,
    getters,
    mutations
})
