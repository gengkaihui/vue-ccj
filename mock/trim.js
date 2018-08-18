/**
 * Created by kaihui on 2018/8/16.
 */
//在字符串原型上添加trim方法，用于去除字符串首尾空格
String.prototype.trim = function() {
  return this.replace(/(^\s*)|(\s*$)/g,"");
}
//原型上添加的方法，无需导出，任何地方也无需引入，即可使用该方法。
