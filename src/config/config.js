//var baseURL="http://localhost:8085"

var baseURL = "http://121.42.56.71:8085";

var config = {
    msuite: baseURL + "/sysmanage/msuite",//套餐接口
    mdistricts: baseURL + "/sysmanage/mdistrict",//地区选择器的数据
    mregions:baseURL + "/sysmanage/mregion",//获取region的接口
    address:baseURL + "/sysmanage/address",//添加address接口
    maddress:baseURL + "/sysmanage/maddress",//获取本人的address的列表
    fans:baseURL +"/sysmanage/fans",//更新fans接口
    morder:baseURL +"/sysmanage/order",//客户下单接口
    morderbyficid:baseURL+"/sysmanage/morder/orderbyficorder",//根据ficorderid获取用户订单
    mshoporderbyficid:baseURL+"/sysmanage/mshoporder/orderbyficorder",//根据ficorderid获取商户订单
    morderlist :baseURL +"/sysmanage/morder/fan",//粉丝获取其订单列表的接口
    morderlistagent :baseURL +"/sysmanage/morder/agent",//代理获取订单列表的接口，根据后面是否拼接delivered
    mshoporderlistsupplier:baseURL +"/sysmanage/mshoporder/supplier",//根据店主的id来获取店铺订单

    muserbind :baseURL +"/mobile/userbind",//店主、配送员、管理员的微信绑定
    muser:baseURL +"/sysmanage/muser",//根据openid去获取用户信息
    mficorder:baseURL +"/sysmanage/mficorder/ficorderbyregion",//根据regionid去获取ficorder
    mficorderupdate:baseURL+'/sysmanage/mficorder/ficorderstate',//跟新ficorder的状态
    mwxjsapiticketurl:baseURL+"/mobile/jsapiticket"//获取微信的jsapiticket的网址

}

export default  config;
