/**
 * Created by kaihui on 2018/7/2.
 */
//findOut.js中引用后，导出到server.js中处理搜索数据
//数组去重，用于对搜索后的结果，根据id去重
function distinct(ary) {
  let obj = {}
  for (let i = 0; i < ary.length; i++) {
    let cur = ary[i].id
    if (obj[cur] != cur) {
      obj[cur] = cur
    } else {
      ary[i] = ary[ary.length - 1]//将该值替换为末尾的值
      ary.length--//删掉末尾的值
      i--//再次验证替换的值是否存在
    }
  }
  return ary
}
module.exports = distinct

