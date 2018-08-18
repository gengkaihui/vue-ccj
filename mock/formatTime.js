/**
 * Created by kaihui on 2018/8/16.
 */
//添加订单时用：获取当前时间并格式化成“年-月-日 时:分:秒”
let addZero = value => value < 10 ? "0" + value : value
let formatTime = () => {
  let time = new Date();
  let year = time.getFullYear();
  let month = time.getMonth() + 1;//0-11代表1-12月，所以要在后面+1得到正常月份
  let day = time.getDate();
  let hour = time.getHours();
  let minute = time.getMinutes();
  let second = time.getSeconds();
  return year + "-" + addZero(month) + "-" + addZero(day) + " " + addZero(hour) + ":" + addZero(minute) + ":" + addZero(second);
}
module.exports=formatTime
