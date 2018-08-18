/**
 * Created by kaihui on 2018/7/1.
 */
//server.js中引用，用来处理搜索结果

//搜索列表list中包含str的项，返回组成的数组
let distinct = require('./distinct')//引入数组去重，用于对搜索后的结果，根据id去重

function findOut(list, str) {
  let commonList = ["手机", "耳机", "电脑", "电视机","儿童鞋","保温杯","零食","美国大熊"]
  let arrPY = [], resArr = []
  let flag = commonList.some((item) => {
    return item === str.trim()//去除字符串首尾空格后再比较
  })
  if (flag) {//如果是常用词，则直接去商品列表的title中找
    list.forEach((item) => {
      if (item.title.indexOf(str) >= 0) {
        arrPY.push(item);
      }
    })
  } else {//如果不是常用词，则将字符串分隔成数组再分别查找 "耳塞 蓝牙"->[耳,塞, ,蓝,牙]，
    let arr = str.split('');
    //console.log("arr:" + arr);
    arr.forEach((item1, index) => {
      let search = arr[index]
      console.log("search:" + search);
      if (item1 !== '') {
        list.forEach((item2) => {
          if (item2.title.indexOf(arr[index]) >= 0) {
            arrPY.push(item2);
          }
        })
      }
    })
  }
  //console.log("arrPY.length:" + arrPY.length);
  //数组去重：对搜索结果去重
  arrPY = distinct(arrPY)
  //console.log("arrPY.length:" + arrPY.length);
  return arrPY;
}
module.exports = findOut
// let searchList = require("./searchList.json")
// let res=findOut(searchList,"衣")
// console.log(res.length);

