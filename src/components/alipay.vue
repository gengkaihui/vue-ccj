<template>
  <div class="main">
    <div class="loading"></div>
    <div class="am-content">
      <div class="result">
        <div class="result-logo"></div>
        <div v-if="countNum" class="result-title">正在尝试打开支付宝客户端 {{countNum}}s</div>
        <div v-else="!countNum" class="result-title"></div>
        <div class="result-tips">1.如果未打开支付宝客户端或未完成付款，请点击“继续支付”;</div>
        <div class="result-tips" style="margin-bottom: 60px;">2.如果你已完成，请点击“已完成付款”；</div>
        <div class="result-button">
          <!--点击“继续支付”，将订单加入“待付款”-->
          <a class="am-button am-button-blue" href="javascript:;" @click="addToOrder(1)">继续支付</a>
        </div>
        <div class="result-button">
          <!--点击“已完成付款”，将订单加入“待发货”-->
          <a class="am-button am-button-white" href="javascript:;" @click="addToOrder(2)">已完成付款</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {addToOrder} from "../api"
  export default {
    data(){
      return {
        countNum: 6,
        orderDetail: {},
        username:""
      }
    },
    created(){
      this.getData()
      this.countDown()
    },
    watch: {
        //监视路由变化，当点击“后退”再进入该页面时，执行下面的方法
      '$route': function (to, from) {
        if (from.name == "webpay") {
          this.getData()
        }
      }
    },
    methods: {
      getData(){
        this.orderDetail = this.$route.params.orderDetail
        console.log(this.orderDetail);
        if(this.orderDetail!=undefined){
          this.username=this.orderDetail.username
        }
      },
      //倒计时
      countDown(){
        this.countNum -= 1
        if (this.countNum == 0) {
          this.countDown = null
          return
        }
        setTimeout(() => {
          this.countDown()
        }, 1000)
      },
      //点击“”或“”时，向orderCenter增加订单，并标识“1待付款”或“2待发货”
      async addToOrder(num){
        console.log(num);
        if (this.orderDetail!=undefined) {
          let order={
            "orderDetail": this.orderDetail,
            "order_status_type": num,//1待付款，2待发货
            "userId": "",
            "num": "20",
            "page": 1,
            "token": "ccj7b15640183658b6000094727437651564018365",
          }
          //加入订单，标识“待付款”或“待发货”，并在购物车中删除
          await addToOrder(order)
          //跳转到订单页面
          let orderInfo = {
            "username": this.username,
            "order_status_type": num,//1待付款，2待发货
            "userId": "",
            "num": "20",
            "page": 1,
            "token": "ccj7b15640183658b6000094727437651564018365",
          }
          this.$router.push({name:"order",params:{orderInfo:orderInfo}})
        }else {
            return
        }
      }
    },
    computed: {},
    components: {}
  }
</script>
<style scoped>
  .main {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 1001;
    font-weight: 500;
    font-family: PingFangSC-Regular, "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
  }

  .am-content {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .result {
    position: absolute;
    top: 50%;
    margin-top: -215px;
    width: 100%;
  }

  .result-logo {
    width: 70px;
    height: 98px;
    margin: auto;
    background-image: url(data:image/png;base64,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);
    background-repeat: no-repeat;
    background-size: contain;
  }

  .result-title {
    margin: 40px 0 14px;
    text-align: center;
    font-size: 21px;
    color: #00a0e8;
    line-height: 25px;
  }

  .result-tips {
    max-width: 370px;
    margin: 0 auto 10px;
    padding: 0 15px;
    line-height: 18px;
    font-size: 15px;
    color: #a5a5a5;
    text-align: left;
    word-break: break-all;
    word-wrap: break-word;
  }

  .result-button {
    margin: 0 15px 20px;
  }

  .result-button a {
    display: block;
    box-sizing: border-box;
    margin: auto;
    padding: 4px 8px;
    width: 100%;
    max-width: 384px; /*a标签最大宽度*/
    height: 44px;
    line-height: 2;
    color: #fff;
    font-size: 18px;
    text-align: center;
    border-radius: 4px;
  }

  .result-button a.am-button-blue {
    color: #fff;
    border: 1px solid #0ae;
    background: #0ae;
  }

  .result-button a.am-button-white {
    color: #00aaee;
    background: #ffffff;
    border: 1px solid #00aaee;
  }

  .am-button-blue:visited, .am-button:visited {
    color: #fff;
  }

  .result-button .am-button[disabled=disabled] {
    color: #e6e6e6;
    background: #f8f8f8;
    border: 1px solid #dedede;
  }
</style>
