//var baseURL="http://localhost:8085"

var baseURL = "http://121.42.56.71:8085";


var footerType = [
    { type: "addaddress", title: "新增收货地址" },
    { type: "sure", title: "确认" },
    { type: "shopcart", title: "购物车" }
]



var config = {
    suite: baseURL + "/sysmanage/suite"//套餐接口
}

export default {
    config
};