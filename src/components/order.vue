<template>
  <div class="bgf3 body">
    <!--加载特效-->
    <loading v-if="isLoading"></loading>
    <div v-else="" id="main">
      <div id="linkBack" style="width: 100%;height: 41px;background: #ffffff;z-index: 1000;position: absolute"
           class="Ndisplay"></div>

      <!----------选项卡：导航---------->
      <div class="tabnav" id="tabnav">
        <ul class="tab align-ct ft14 ft3 bgFFF border_bt_e clearfix">
          <li v-for="(nav,index) in navList" :key="index" class="ft3 total" :class="{active:iscur==index}"
              @click="changeNav(index)">{{nav}}<i></i><em></em></li>
        </ul>
        <div v-if="iscur!=1" class="mt50 mb10 ml10 mr10 ">
          <div class="ccj_title bgDDD align-ct positionR">
            <p class="positionA">
              <span class="pl10 pr10 lh30 ft12 bgf3">楚楚街订单</span>
            </p>
          </div>
          <div class="order_box"></div>
        </div>
        <div v-else="" class="mt40">
          <a class="pl20 pr20 pt10 pb10 ft12 bgEEE Bdisplay toPayHelp">
            <p class="bg_jt ft2">支付遇到问题？点这帮您解决！</p>
          </a>
          <div class="order_box"></div>
        </div>
      </div>
      <!----------选项卡：内容---------->
      <div id="id_tab_content" class="containerMain">
        <div class="ml10 mr10 mt10 mb10">
          <div v-for="(order,index) in orderList" :key="index" :order="order.order_sn" class="listBox">
            <p class="mt10 clearfix">
              <span v-if="order.order_status_type==1" class="state mr5 ft13 ftred align-ct fr">未付款</span>
              <span v-if="order.order_status_type==2" class="state mr5 ft13 ftred align-ct fr">未发货</span>
              <span v-if="order.order_status_type==3" class="state mr5 ft13 ftred align-ct fr">未评价</span>
              <span v-if="order.order_status_type==6" class="state mr5 ft13 ftred align-ct fr">交易关闭</span>
            </p>
            <div class="storeBox bgFFF imgclick">
              <p class="pt10 pr10 pb8 lh20 ft1 ft3 positionR">
                <span :shopid="order.shop_id" class="storeName Idisplay" @click="toShop(order.shop_id)">{{order.shop_info.cn_name}}</span>
                <a href="javascript:;" class="see bg_jt pr10 ft12 positionA" @click="">
                  <span class="ftA">查看订单详情</span>
                </a>
              </p>
              <ul class="orderList bgFFF">
                <li v-for="(product,index) in order.product_list">
                  <div :id="product.product_id" class="box isProduct positionR">
                    <img
                      :src="product.product_img_url"
                      class="shop_img positionA img_lazy">
                    <span class="price ft3 ft09 lh16 align-rt positionA">￥ <em
                      class="ft1 isPrice">{{product.sales_price}}</em><br>x<em
                      class="ft1 isCount">{{product.buy_num}}</em>件 </span>
                    <div class="info">
                      <h2 class="ft09 lh18 isTitle">{{product.title}}</h2>
                      <p class="ft6 ft08 mt3 wordall">{{product.sku_values}}</p>
                    </div>
                  </div>
                </li>
              </ul>
              <p class="border_tp_e pt10 pb10 ft1 ft3 align-ct Ndisplay">满减
                <span class="ftred">-<em class="ftbig">0.00</em></span>
              </p>
              <p class="border_tp_e pt10 pb10 ft1 ft3 align-ct">共
                <em class="ftbig">{{order.order_product_total_num}}</em>件商品，实付：
                <span class="ftred mr5">￥
                  <em class="ftbig">{{order.order_product_total_fee | toFixed(2)}}</em>
                </span>
                <span class="ft08 ftA">(运费￥<em class="ft09">0</em>)</span>
              </p>
              <div class="border_tp_e pt10 ft3 align-ct">
                <p class="ft08 mb10 ftred"></p>
                <p v-if="order.order_status_type==1" class="operation ft1">
                  <a href="javascript:;" :order="order.order_sn"
                     class="border_d seeBtn ft3" @click="cancelOrder(order)">取消订单</a>
                  <a href="javascript:;" :order="order.order_sn"
                     class="border_d seeBtn ft3" @click="toOrderPay(order)">付款</a>
                </p>
                <p v-if="order.order_status_type==6" class="operation ft1">
                  <a href="javascript:;" data-evaluateid="1" :order="order.order_sn"
                     class="border_d seeBtn ft3" @click="deleteOrder(order)">删除订单</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <p class="box_nohave ft16 ftA align-ct positionA Ndisplay">
          <img src="/img/test/order/no_list.png" alt="" class="img mb10"><br>
          还没有相关的订单~
        </p>
      </div>
      <!--删除订单确认遮层-->
      <div v-show="deleteWarn" id="deleteComfirm" class="container">
        <div class="layer"></div>
        <div class="layer_box bd_radius bgFFF">
          <div class="con align-ct">
            确定删除订单?
            <p class="ft12 ftA mt5">删除之后将无法恢复</p>
          </div>
          <div class="btn ft14 align-ct clearfix">
            <a href="javascript:;" class="lh30 bd_radius bgred Idisplay fl maketrue ftFFF" @click="submitDel(deleteId)">确定</a>
            <a href="javascript:;" class="lh30 bd_radius bgDDD Idisplay fr cancel ftFFF" @click="cancelDel">取消</a>
          </div>
        </div>
      </div>
      <div class="layer_text align-ct warm Ndisplay">
        <span class="layer_text_content ft12 ftFFF lh18 p10 bd_radius"></span>
      </div>
      <!--取消订单确认遮层-->
      <div v-show="cancelWarn" id="cancelComfirm" class="container">
        <div class="layer"></div>
        <div class="layer_box bd_radius bgFFF">
          <div class="con">
            <p class="mb5">
              <label>
                <input type="radio" name="select2" class="align-middle mr5" value="1">我不想买了
              </label>
            </p>
            <p class="mb5">
              <label>
                <input type="radio" name="select2" class="align-middle mr5" value="2">信息填写错误
              </label>
            </p>
            <p class="mb5">
              <label>
                <input type="radio" name="select2" class="align-middle mr5" value="4">卖家缺货
              </label>
            </p>
            <p class="mb5">
              <label><input type="radio" name="select2" class="align-middle mr5" value="8">其他
              </label>
            </p>
          </div>
          <div class="btn ft14 align-ct clearfix">
            <a href="javascript:;" data-index="1" class="lh30 bd_radius bgred Idisplay rt fl maketrue ftFFF"
               @click="submitCl">确定</a>
            <a href="javascript:;" class="lh30 bd_radius bgDDD Idisplay lt fr cancel ftFFF" @click="cancelCl">取消</a>
          </div>
        </div>
      </div>
      <div id="confirmReciveBox" class="container Ndisplay">
        <div class="layer"></div>
        <div class="layer_box bd_radius bgFFF">
          <div class="con">
            确定已收货?
            <p class="ft12 ftA mt5">确认后交易金额将支付到商家账户</p>
          </div>
          <div class="btn ft14 align-ct clearfix">
            <a href="javascript:;" class="lh30 bd_radius bgred Idisplay rt fl maketrue ftFFF">确定</a>
            <a href="javascript:;" class="lh30 bd_radius bgDDD Idisplay lt fr cancel ftFFF">取消</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  //在入口文件main.js中全局注册过滤器filters
  import loading from "../base/loading.vue"
  import {getOrderList, cancelOrder, deleteOrder, changeStatus} from "../api"
  export default {
    data(){
      return {
        isLoading: true,
        navList: ["全部", "待付款", "待发货", "待收货", "待评价"],
        username: "",
        iscur: 0,//当前显示的order_status_type
        orderList: [],
        deleteWarn: false,//控制显示/隐藏删除订单确认layer
        cancelWarn: false,//控制显示/隐藏取消订单原因layer
        deleteId: 0,//用于在deleteOrder和submitDel之间传递order.id
        cancelId: 0,//用于在cancelOrder和submitCl之间传递order.id
      }
    },
    created(){
      this.getData()
    },
    watch:{
      '$route': function (to, from) {
        if (from.name == "personal"||from.name == "alipay") {
          //this.orderList = []
          if(to.name=="order"){
            console.log(to);
            this.getData()
            console.log("order-watch");
          }
        }
      }
    },
    methods: {
      async getData(){
        let orderInfo= this.$route.params.orderInfo
        //模拟数据
        /*if(orderInfo==undefined){
          this.username = 15810454325
          this.iscur =0
        }else {
          this.username = orderInfo.username
          this.iscur = orderInfo.order_status_type
          console.log(this.username);
        }*/
        this.username = orderInfo.username
        //页面alipay传来的orderInfo和页面personal传来的orderInfo中的属性应一致，应该把它们统一为order_status_type（即订单类型）
        this.iscur = orderInfo.order_status_type
        this.getOrderList()
      },
      async getOrderList(){
        let orderInfo = {
          "username": this.username,
          "order_status_type": this.iscur,
          "userId": "",
          "num": "20",
          "page": 1,
          "token": "ccj051564032088d4f0000947274372a1564032088"
        }
        this.orderList = await getOrderList(orderInfo)
        //当获取的订单列表有值时，判断过期时间，并反馈到后台数据库
        if (this.orderList != []) {
          let curTime = new Date().getTime() / 1000//获取当前时间距离1970年1月1日午夜（00:00）之间的毫秒差
          let changeList = []//发送到后台，需要改变order_status_type的订单列表
          this.orderList.forEach(order => {
            if (curTime >= order.extra_order_time&&order.order_status_type!= 6) {//如果当前时间超过订单里设置的过期时间，并且该订单的order_status_type不=6时，
              order.order_status_type = 6//则让其=6，标签为“交易关闭”
              //console.log(order);
              changeList.push(order)
            }
          })
          if (changeList.length > 0) {//将后台对应数据改成6
            let changeInfo = {username: this.username, changeList: changeList}
            changeStatus(changeInfo)
          }
          this.isLoading = false
        }
      },
      changeNav(index){
        this.iscur = index
        this.getOrderList()
      },
      //取消订单
      cancelOrder(order){
        this.cancelWarn = true
        this.cancelId = order.id
      },
      async submitCl(){
        //取消前端的订单
        this.orderList.forEach(item => {
          if (item.id == this.cancelId) {
            item.order_status_type = 6
          }
        })
        this.cancelWarn = false
        let orderInfo = {
          "username": this.username,
          "id": this.cancelId,
          "userId": "",
          "num": "20",
          "page": 1,
          "token": "ccj051564032088d4f0000947274372a1564032088",
          "order_status_type": 1,
          "gender": "1",
          "order_sn": "180729211158YPE457437",
          "cancellation_status": "1"
        }
        await cancelOrder(orderInfo)//取消后台订单
        console.log("取消订单")
      },
      cancelCl(){
        this.cancelWarn = false
        return
      },

      //删除订单
      deleteOrder(order){
        this.deleteWarn = true
        this.deleteId = order.id
      },
      async submitDel(){
        //删除前端的订单
        this.orderList = this.orderList.filter(item => item.id != this.deleteId)
        this.deleteWarn = false
        let orderInfo = {
          "username": this.username,
          "id": this.deleteId,
          "userId": "",
          "num": "20",
          "page": 1,
          "token": "ccj051564032088d4f0000947274372a1564032088",
          "order_status_type": 1,
          "gender": "1",
          "order_sn": "180729211158YPE457437",
          "cancellation_status": "1"
        }
        //删除后台的订单
        await deleteOrder(orderInfo)
        console.log("删除订单")
      },
      cancelDel(){
        this.deleteWarn = false
        return
      },
      //去付款
      toOrderPay(order){
        let orderInfo={
          "username": this.username,
          "id": order.id,
          "userId": "",
          "token": "ccj051564032088d4f0000947274372a1564032088",
          "order_sn": "180729211158YPE457437",
          "isRepeat": false,
          "subChannel": "shop"
        }
        this.$router.push({name:"orderpay",params:{orderInfo:orderInfo}})
        console.log("付款")
      },
      //去店铺
      toShop(shopId){
          this.$router.push({name:"shop",params:{shopId:shopId}})
      }
    },
    computed: {},
    components: {loading}
  }
</script>
<style scoped>
  .body {
    position: fixed;
    top: 0;
    bottom: 50px;
    left: 0;
    width: 100%;
    overflow: scroll;
  }

  body {
    font-size: 12px;
    min-width: 320px;
    font-family: "\5FAE\8F6F\96C5\9ED1";
    font-weight: normal;
    line-height: 1.5;
  }

  html, body, h1, h2, h3, p, div, ul, li, span, em, dl, dt, dd, input, textarea, img {
    margin: 0;
    padding: 0;
  }

  ul, li {
    list-style: none;
  }

  html, body, img {
    border: 0;
  }

  em {
    font-style: normal;
  }

  h1, h2, h3, strong, em, i {
    font-style: normal;
    font-weight: normal;
  }

  a, a:hover {
    text-decoration: none;
  }

  a, input, button, textarea {
    -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
  }

  .clearfix:after {
    clear: both;
    content: '';
    font-size: 0;
    display: block;
    visibility: hidden;
    height: 0
  }

  .container {
    width: 100%;
  }

  html * {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -moz-tap-highlight-color: rgba(0, 0, 0, 0);
    -o-tap-highlight-color: rgba(0, 0, 0, 0);
    -ms-tap-highlight-color: rgba(0, 0, 0, 0);
    tap-highlight-color: rgba(0, 0, 0, 0);
  }

  textarea, input, button, select {
    outline: none;
    border: 0;
  }

  textarea {
    resize: none;
  }

  /*定位*/
  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .Ndisplay {
    display: none;
  }

  .Idisplay {
    display: inline-block;
  }

  .Bdisplay {
    display: block;
  }

  .positionF {
    position: fixed;
  }

  .positionR {
    position: relative;
  }

  .positionA {
    position: absolute;
  }

  .img100 {
    width: 100%;
    display: block;
  }

  /*文字排版*/
  .align-ct {
    text-align: center;
  }

  .align-lt {
    text-align: left;
  }

  .align-rt {
    text-align: right;
  }

  .align-middle {
    vertical-align: middle;
  }

  .lh14 {
    line-height: 14px;
  }

  .lh16 {
    line-height: 16px;
  }

  .lh18 {
    line-height: 18px;
  }

  .lh20 {
    line-height: 20px;
  }

  .lh22 {
    line-height: 22px;
  }

  .lh26 {
    line-height: 26px;
  }

  .lh30 {
    line-height: 30px;
  }

  .lh40 {
    line-height: 40px;
  }

  .ft07 {
    font-size: 0.7rem;
  }

  .ft08 {
    font-size: 0.8rem;
  }

  .ft09 {
    font-size: 0.9rem;
  }

  .ft1 {
    font-size: 1rem;
  }

  .ftbig {
    font-size: 1.1rem;
  }

  .ft10 {
    font-size: 10px;
  }

  .ft12 {
    font-size: 12px;
  }

  .ft13 {
    font-size: 13px;
  }

  .ft14 {
    font-size: 14px;
  }

  .ft16 {
    font-size: 16px;
  }

  .ft18 {
    font-size: 18px;
  }

  .ft2 {
    color: #222;
  }

  .ft3 {
    color: #333;
  }

  .ft4 {
    color: #444;
  }

  .ft6 {
    color: #666;
  }

  .ft9 {
    color: #999;
  }

  .ftred {
    color: #fe3355;
  }

  .ftFFF {
    color: #FFF;
  }

  .ftC {
    color: #CCC;
  }

  .ftA {
    color: #AAA;
  }

  .ftblue {
    color: #77cdcc;
  }

  .wordall {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /*边距*/
  .m10 {
    margin: 10px;
  }

  .mt3 {
    margin-top: 3px;
  }

  .mt5 {
    margin-top: 5px;
  }

  .mt10 {
    margin-top: 10px;
  }

  .mt15 {
    margin-top: 15px;
  }

  .mt20 {
    margin-top: 20px;
  }

  .mt30 {
    margin-top: 30px;
  }

  .mt40 {
    margin-top: 40px;
  }

  .mt45 {
    margin-top: 45px;
  }

  .mt50 {
    margin-top: 50px;
  }

  .mt55 {
    margin-top: 55px;
  }

  .mt60 {
    margin-top: 60px;
  }

  .mt70 {
    margin-top: 70px;
  }

  .mt80 {
    margin-top: 80px;
  }

  .mb5 {
    margin-bottom: 5px;
  }

  .mb10 {
    margin-bottom: 10px;
  }

  .mb15 {
    margin-bottom: 15px;
  }

  .mb20 {
    margin-bottom: 20px;
  }

  .mb30 {
    margin-bottom: 30px;
  }

  .mb40 {
    margin-bottom: 40px;
  }

  .mb50 {
    margin-bottom: 50px;
  }

  .mb55 {
    margin-bottom: 55px;
  }

  .mb60 {
    margin-bottom: 60px;
  }

  .mb65 {
    margin-bottom: 65px;
  }

  .mb70 {
    margin-bottom: 70px;
  }

  .ml3 {
    margin-left: 3px;
  }

  .ml5 {
    margin-left: 5px;
  }

  .ml10 {
    margin-left: 10px;
  }

  .ml15 {
    margin-left: 15px;
  }

  .ml20 {
    margin-left: 20px;
  }

  .mr3 {
    margin-right: 3px;
  }

  .mr5 {
    margin-right: 5px;
  }

  .mr10 {
    margin-right: 10px;
  }

  .mr15 {
    margin-right: 15px;
  }

  .mr20 {
    margin-right: 20px;
  }

  .p5 {
    padding: 5px;
  }

  .p10 {
    padding: 10px;
  }

  .pt5 {
    padding-top: 5px;
  }

  .pt10 {
    padding-top: 10px;
  }

  .pt15 {
    padding-top: 15px;
  }

  .pt20 {
    padding-top: 20px;
  }

  .pb5 {
    padding-bottom: 5px;
  }

  .pb8 {
    padding-bottom: 8px;
  }

  .pb10 {
    padding-bottom: 10px;
  }

  .pb15 {
    padding-bottom: 15px;
  }

  .pb20 {
    padding-bottom: 20px;
  }

  .pl5 {
    padding-left: 5px;
  }

  .pl10 {
    padding-left: 10px;
  }

  .pl15 {
    padding-left: 15px;
  }

  .pl20 {
    padding-left: 20px;
  }

  .pr5 {
    padding-right: 5px;
  }

  .pr10 {
    padding-right: 10px;
  }

  .pr15 {
    padding-right: 15px;
  }

  .pr20 {
    padding-right: 20px;
  }

  /*背景和边框*/
  .bg_jt {
    background: url(https://m.chuchujie.com/img/icon_jt_1.png) no-repeat right center;
    background-size: 5px 9px;
  }

  .down_jt {
    background: url(https://m.chuchujie.com/img/icon_jt_2.png) no-repeat right center;
    background-size: 10px 6px;
  }

  .bgno {
    background: none;
  }

  .bgred {
    background: #fe3355;
  }

  .bgF7 {
    background: #F7F7F7;
  }

  .bgF8 {
    background: #F8F8F8;
  }

  .bgFFF {
    background: #FFF;
  }

  .bgEEE {
    background: #EEE;
  }

  .bgDDD {
    background: #DDD;
  }

  .bgCCC {
    background: #CCC;
  }

  .bgblue {
    background: #47d2d0;
  }

  .bgf3 {
    background: #f3f3f3;
  }

  .bdno {
    border: none;
  }

  .bd_radius {
    border-radius: 3px;
  }

  .bd_radius50 {
    border-radius: 50%;
  }

  .border_bt {
    border-bottom: solid 1px #F7F7F7;
  }

  .border_d {
    border: solid 1px #ddd;
  }

  .border_tp_d {
    border-top: solid 1px #ddd;
  }

  .border_bt_d {
    border-bottom: solid 1px #ddd;
  }

  .border_lt_d {
    border-left: solid 1px #ddd;
  }

  .border_rt_d {
    border-right: solid 1px #ddd;
  }

  .border_rt_b {
    border-right: solid 1px #bbb;
  }

  .border_tp_e {
    border-top: solid 1px #EEE;
  }

  .border_bt_e {
    border-bottom: solid 1px #EEE;
  }

  .border_C {
    border: solid 1px #CCC;
  }

  .border_tp_c {
    border-top: solid 1px #ccc;
  }

  .border_bt_a {
    border-bottom: solid 1px #aaa;
  }

  .border_tp_f3 {
    border-top: solid 1px #f3f3f3;
  }

  .border_bt_f3 {
    border-bottom: solid 1px #f3f3f3;
  }

  .border_red {
    border: solid 1px #ff3355;
  }

  /*文本提示框*/
  .layer_text {
    position: fixed;
    top: 50%;
    left: 0;
    width: 100%;
    margin-top: -50px;
    z-index: 999;
  }

  .layer_text_content {
    background: rgba(0, 0, 0, .8);
  }

  /*加载load图片*/
  @keyframes loading {
    to {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes loading {
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @-moz-keyframes loading {
    to {
      -moz-transform: rotate(360deg);
    }
  }

  @-o-keyframes loading {
    to {
      -o-transform: rotate(360deg);
    }
  }

  .layer_load {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #FFF;
    z-index: 500;
  }

  .layer_load .con {
    position: absolute;
    top: 50%;
    margin-top: -40px;
    left: 0;
    width: 100%;
    color: #000;
    text-align: center;
    font-size: 0.8rem;
  }

  .layer_load .con img {
    width: 20px;
    height: 20px;
    -webkit-animation: 5s loading linear infinite;
  }

  /*空内容提示*/
  .box_nohave {
    top: 50%;
    left: 0;
    margin-top: -66px;
    width: 100%;
  }

  .box_nohave .img {
    width: 80px;
  }

  .box_nohave .go {
    padding: 6px 30px;
    border-radius: 5px;
  }

  /*导航条*/
  .tab {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }

  .tab li {
    width: 20%;
    line-height: 40px;
    float: left;
    position: relative;
  }

  .tab li em {
    position: absolute;
    top: 50%;
    right: 0;
    margin-top: -6px;
    width: 1px;
    height: 12px;
    background: #ddd;
    display: block;
  }

  .tab li i {
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -10px;
    width: 20px;
    height: 10px;
    background: url(https://m.chuchujie.com/img/test/order/icon_on.png) no-repeat;
    background-size: 100% 100%;
    display: none;
  }

  .tab li.active {
    color: #ff3355;
  }

  .tab li.active i {
    display: block;
  }

  /*淘宝订单和楚楚街订单*/
  .order_other {
    padding: 10px 0 6px 10px;
  }

  .order_other img {
    width: 30px;
    margin: 0 10px 4px 0;
  }

  .ccj_title {
    margin: 20px 0 20px;
    height: 1px;
  }

  .ccj_title p {
    top: 50%;
    left: 0;
    margin-top: -15px;
    width: 100%;
  }

  /*店铺部分和订单状态和订单商品列表*/
  .storeBox {
    padding: 0 10px 10px;
  }

  .storeBox i {
    width: 20px;
    height: 19px;
    vertical-align: middle;
    margin-bottom: 3px;
    background: url(https://m.chuchujie.com/img/test/check_no.png) no-repeat;
    background-size: 100% 100%;
  }

  .storeBox i.active {
    background: url(https://m.chuchujie.com/img/test/check_yes.png) no-repeat;
    background-size: 100% 100%;
  }

  .storeName {
    padding-left: 22px;
    background: url(https://m.chuchujie.com/img/test/icon_store.png) no-repeat left center;
    background-size: 16px 15px;
  }

  .see {
    top: 10px;
    right: 0px;
  }

  .state {
    padding: 0 15px;
    line-height: 20px;
    background: url(https://m.chuchujie.com/img/test/order/icon_3.png) no-repeat;
    background-size: 100% 100%;
  }

  .orderList li {
    padding: 5px 0 12px;
    border-top: solid 1px #EEE;
  }

  .orderList li .box {
    padding: 12px 0 0 100px;
    min-height: 90px;
  }

  .orderList li .shop_img {
    width: 90px;
    height: 90px;
    top: 10px;
    left: 0;
  }

  .orderList li .info {
    padding-right: 65px;
  }

  .orderList li h2 {
    height: 54px;
    overflow: hidden;
    padding-top: 2px;
    margin-bottom: 9px;
  }

  .orderList li .price {
    top: 14px;
    right: 0;
  }

  /*订单操作*/
  .operation a {
    width: 70px;
    padding: 3px 10px;
    margin: 0 2px;
    display: inline-block;
  }

  .operation.big a {
    width: 60%;
  }

  @media screen and (min-width: 320px) and (max-width: 359px) {
    .operation a {
      width: 60px;
      font-size: 0.9rem;
    }
  }

  @media screen and (min-width: 400px) {
    .operation a {
      width: 80px;
    }
  }

  /*赠品*/
  .icon_flag {
    width: 24px;
    height: 24px;
    top: 10px;
    left: 0;
    background: url(https://m.chuchujie.com/img/test/icon_zeng.png) no-repeat;
    background-size: 100% 100%;
    z-index: 3;
  }

  /*底部结算*/
  footer {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    padding: 5px 0;
    border-top: solid 1px #e6e5e5;
    z-index: 100;
  }

  footer .btn_go {
    padding: 0 20px;
    line-height: 40px;
    display: block;
    top: 5px;
    right: 10px;
  }

  footer .totalPrice {
    line-height: 40px;
  }

  footer .totalPrice em {
    font-size: 18px;
  }

  /*弹窗*/
  .layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    z-index: 200;
  }

  .layer_box {
    position: fixed;
    top: 50%;
    left: 5%;
    width: 90%;
    min-height: 80px;
    margin-top: -100px;
    z-index: 210;
  }

  .layer_box .con {
    padding: 20px 8%;
    line-height: 20px;
    font-size: 0.9rem;
  }

  .layer_box .btn {
    margin: 0 8% 20px 8%;
  }

  .layer_box .btn a {
    width: 47%;
  }

  .layer_box .btn a.lt {
    margin-left: 3%;
  }

  .layer_box .btn a.rt {
    margin-right: 3%;
  }

  header {
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    padding: 5px 0;
    z-index: 100;
  }

  header .back {
    top: 5px;
    left: 10px;
    width: 30px;
    height: 30px;
    background: url(https://m.chuchujie.com/img/test/icon_back.png) no-repeat center center;
    background-size: 10px 20px;
  }

  header .text {
    top: 5px;
    right: 10px;
  }

  /* 加载中*/
  #loading {
    position: absolute;
    top: 41px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background: #FFFFFF
  }

  #loading .load_content {
    position: absolute;
    top: 40%;
    width: 100%;
    color: #000;
    text-align: center;
    font-size: 12px;
    font-family: 微软雅黑
  }

  #loading img {
    width: 20px;
    height: 20px;
    -webkit-animation: 4.5s loading linear infinite
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }

  @-webkit-keyframes loading {
    0% {
      -webkit-transform: rotate(0deg)
    }
    100% {
      -webkit-transform: rotate(360deg)
    }
  }

  .tabnav {
    overflow: hidden;
    zoom: 1;
  }
</style>
