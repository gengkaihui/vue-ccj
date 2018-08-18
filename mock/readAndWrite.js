/**
 * Created by kaihui on 2018/7/12.
 */
//封装异步读写文件，在server.js中引用，用于读取/更新信息，如userList、addressList
let fs=require("fs")
function read(path,cb) {//登录时：读取用户列表
  fs.readFile(path, 'utf8', function (err, data) {
    if (err || data.length === 0) {
      cb([])
    } else {
      cb(JSON.parse(data))
    }
  })
}
function write(path,data, cb) {//注册时：写入用户列表
  fs.writeFile(path, JSON.stringify(data), cb)
}
module.exports={
  read,write
}



