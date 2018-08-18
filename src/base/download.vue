<template>
  <div class="download" v-if="flag">
    <div class="content">
      <i class="close iconfont icon-close" @click="close"></i>
      <img src="../assets/img/logo.png?__inline" class="logo" alt="">
      <a href="http://res.chuchujie.com/download/?package=chuchujie&ver=latest&channel=QD_cpa4&ref=zhuzhan" target="_blank" class="load_btn load_wd">
        下载APP<br>
        立领<em>12</em>元
      </a>
      0元抽iphoneX,100件宝贝1分领<br>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {flag: true}
    },
    methods: {
        close(){
            this.flag=false
        }
    },
    computed: {},
    components: {}
  }
</script>
<style scoped lang="less">
  /*.download{
    position: fixed;
    bottom: 50px;
    left: 0;
    padding: 3px 0;
    width: 100%;
    height: 52px;
    background: rgba(0, 0, 0, 0.6);
    z-index: 10000;
    color: #fff;
    line-height: 29px;
    .close{
      position: absolute;
      top: 50%;
      left: 3px;
      display: inline-block;
      margin-top: -13px;
      color: #999;
      font-size: 20px;
    }
    img{
      position: absolute;
      top: 50%;
      left: 28px;
      width: 50px;
      height: 50px;
      margin-top: -25px;
    }
    .load_btn{
      position: absolute;
      top: 50%;
      right: 5px;
      width: 90px;
      height: 30px;
      margin-top: -20px;
      padding: 5px 0 5px 15px;
      background:#77ae00 url("../assets/img/load.png") no-repeat 8px center;
      background-size: 16px 18px;
      border-radius: 5px;
      font-size: 16px;
    }
  }*/
</style>
