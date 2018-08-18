/**
 * Created by kaihui on 2018/6/22.
 */
/*//6.21日21：28当男女列表切换时，判断并重新加载数据
module.exports={
  changeFemale(female){
    if(female){
      return
    }else {
      this.female=true
      this.getData()
    }
  },
  changeMale(){
    if(!this.female){
      return
    }else {
      this.female=false
      this.getData()
    }
  }
}*/
//6.22日20：41通过传参在函数内部获取female
module.exports={
  changeFemale(female,cb){
    if(female){
      return
    }else {
      female=true
      cb()
    }
  },
  changeMale(female,cb){
    if(!female){
      return
    }else {
      female=false
      cb()
    }
  }
}
