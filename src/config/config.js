//var baseURL="http://localhost:8085"

var baseURL = "http://121.42.56.71:8085";

var config = {
    suite: baseURL + "/sysmanage/suite",//套餐接口
    mdistricts: baseURL + "/sysmanage/mdistrict",//地区选择器的数据
    mregions:baseURL + "/sysmanage/mregion",//获取region的接口
    maddress:baseURL + "/sysmanage/address"//address接口
}

export default  config;
