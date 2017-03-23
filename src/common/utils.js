
 var test=function(vueins) {
    console.log(vueins.$store.getFooter.isShow);
 };

var wxjssign = function(jsapi_ticket,noncestr,timestamp,url){
    var ret = {
        jsapi_ticket: jsapi_ticket,
        noncestr: noncestr,
        timestamp:timestamp,
        url:url
    };
    var string = raw1(ret);

    var crypto = require('crypto');
    var cryString = crypto.createHash('sha1').update(string, 'utf8').digest('hex');
  
    return cryString;
}

//大小写转换，字符串拼接等操作，待确认
function raw1(args) {
  var keys = Object.keys(args);
  keys = keys.sort()
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key] = args[key];
  });
  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
};



 export default {
     test,
     wxjssign
 }