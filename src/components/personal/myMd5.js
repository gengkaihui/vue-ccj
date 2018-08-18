/**
 * Created by kaihui on 2018/7/9.
 */
//将crypto封装为myMd5插件，在“注册reg、登录log”页面分别引入、使用。
let myMd5=function (str) {
  let crypto=require("crypto")
  let md5=crypto.createHash("md5");
  md5.update(str);
  let passWord=md5.digest('hex');
  return passWord;
}

export default myMd5
