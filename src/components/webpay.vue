<template>
  <div class="bgF7 ft6">
    <!--加载特效-->
    <loading v-if="isLoading"></loading>
    <!--最外层-->
    <div v-else="" class="mb60 clearfix" id="bigdiv">
      <!--最外层的margin-->
      <div class="ml10 mr10">
        <!--有地址-->
        <div v-if="isAddress" class="address d_msg" id="addressDiv">
          <div class="dizhi_one border clearfix">
            <h1>收货人:放散阀<label>18834345234</label></h1>
            <p class="ftC ft08">黑龙江省齐齐哈尔市梅里斯达斡尔族区地方萨芬的</p>
          </div>
          <div class="dizhi_two clearfix changeAdress" data-id="46647813" data-address="edit"><i
            class="iconfont icon-address"></i>修改地址<i class="iconfont icon-right"></i>
          </div>
        </div>
        <!--无地址-->
        <div v-else="" class="address d_msg" id="noAddress">
          <div class="dizhi_one border clearfix">
            <h1>添加新地址</h1>
          </div>
          <div class="dizhi_two clearfix changeAdress" data-address="edit" data-id="46647813">
            请准确填写您的地址<img src="" alt="">
          </div>
        </div>
        <div class="pt5 pb5 pl10 pr10 bgFFF mt10" id="yanzheng" style="display: none;">
          <p class="bg_jt lh16"><em class="ftred">请补充收货人身份证信息</em><br>仅用于海外购进境凭证</p>
        </div>
        <!----------支付方式 start---------->
        <div class="bank-biaoti mt10">支付方式</div>
        <ul class="d_bank bgFFF clearfix" id="cl_div_pay_type">
          <li v-for="(pay,index) in orderDetail.pay_list" :key="index" :pay="pay.payname" @click="changePay(index)">
            <i v-show="pay.defaultActive" class="iconfont icon-select" :class="{active:pay.defaultActive}"></i>
            <i v-show="!pay.defaultActive" class="iconfont icon-select-no"></i>
            <img :src="pay.icon" class="bank_img align-middle" alt="">
            <em>{{pay.name}}</em>
          </li>
        </ul>
        <!----------楚楚街优惠券 start---------->
        <ul class="yhq_box mt10 bgFFF Ndisplay couponC" id="chuchu_fee">
          <li></li>
        </ul>
        <ul class="yhq_box mt10 bgFFF Ndisplay" id="bonusPoint">
          <li class="nobg">
            <a href="javascript:;">
              <img src="" class="align-middle icon_img" alt=""><span></span>
            </a>
            <i class="open"></i>
          </li>
        </ul>
        <!----------店铺商品列表 start---------->
        <div id="shopBox">
          <div class="shopList" v-for="order in orderDetail.order_list">
            <!--店铺名称-->
            <ul class="yhq_box mt10 bgFFF gotoShop">
              <li class="nobg">
                <router-link :to="{name:'shop',params:{id:order.shop_id}}">
                  <img src="" class="align-middle icon_dp" alt="">
                  <em class="pl10 shopTitle">{{order.shop_info.shop_header}}</em>
                </router-link>
              </li>
            </ul>
            <!--产品列表-->
            <ul class="dp_shop bgFFF productList">
              <li class="waresList gotoProduct" v-for="product in order.product_list">
                <router-link :to="{name:'productdetail',params:{id:product.product_id}}">
                  <img :src="product.product_img_url" class="s_img" alt="">
                  <p class="s_price">
                    <span class="price ftred">￥<em class="waresPrice">{{product.sales_price}}</em></span>
                    <span class="num ft08">x<em class="waresNum">{{product.buy_num}}</em>件</span>
                  </p>
                  <h2>{{product.title}}</h2>
                  <p class="attribute ftC">{{product.sku_values}}</p>
                </router-link>
              </li>
            </ul>
            <!--根据返回优惠券的值判断是否显示优惠券信息，>0显示，=0则不显示-->
            <div v-if="order.coupon_fee">
              <ul class="yhq_box border_bt bgFFF ">
                <li class="couponC">
                  <a href="javascript:;">优惠券</a>
                  <span class="youhui ft08 ftred" data-price="149.70">减<em>{{order.coupon_fee}}</em>元</span>
                </li>
              </ul>
              <p class="mb10 pt10 pb10 ft08 align-ct bgFFF showCoupon">
                <span class="dianpuyouhui">店铺优惠券<em class="ftred">-￥{{order.coupon_fee}}</em></span>
              </p>
            </div>
            <!--商品总价-->
            <div class="sum_price ft08 bgFFF">
              <div class="container">商品总价:￥
                <span class="ftred thisShopP">{{order.product_fee | toFixed(2)}}</span>
                <span class="ftC"></span>
              </div>
              <div class="d_form mt10">
                <textarea class="txt_default ft08" placeholder="给卖家留言" id="ly"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!----------底部购买---------->
      <div class="p_buy bgFFF">
        <p>合计：<span class="ftred">￥<em class="allPrice">{{orderDetail.all_fee | toFixed(2)}}</em></span></p>
        <div class="buy_btn align-ct">
          <!--跳转到支付页alipay.vue-->
          <a href="javascript:;" id="payBtn" style="background: rgb(223, 49, 48);" @click="toPay">去支付</a>
        </div>
      </div>
    </div>
    <div class="container Ndisplay" id="showAlert">
      <div class="layer"></div>
      <div class="layer_box bgFFF small bd_radius">
        <div class="msg align-ct">
          <p class="explain"></p>
          <p class="mt20"><a href="javascript:;" class="anniu ftFFF ft1 bgred bd_radius Bdisplay">确定</a></p>
        </div>
      </div>
    </div>
    <div class="popuplayer Ndisplay" id="couponMask">
      <div class="layer"></div>
      <div class="layer_box Ht">
        <i class="close popupclose"></i>
        <div class="info">
        </div>
      </div>
    </div>
    <div class="container popuplayer Ndisplay" id="gotoDown">
      <div class="tc_layer"></div>
      <div class="tc_layer_box top2">
        <div class="content">
          <p class="ft08">请下载楚楚街客户端进行安全支付</p>
          <div class="align-ct">
            <a href="javascript:;" class="tj_btn small_pd">确定</a>
            <a href="javascript:;" class="tj_btn small_pd bgorange">取消</a>
          </div>
        </div>
      </div>
    </div>
    <!--遮层-->
    <div class="container_1 Ndisplay" id="mask"><!--遮层-->
      <div class="layer"></div>
      <div class="layer_content clearfix">
        <div class="p_margin">
          <div class="d_add">
            <ul>
              <li class="border_1"><label>收货人姓名：</label><input type="text" name="username" id="username"></li>
              <li class="border_1"><label>手机号码：</label><input type="tel" name="tel-phone" style="width:98%" class="ft1"
                                                              id="tel-phone"></li>
              <li class="border_1 clearfix"><label>所在地区：</label>
                <div class="dizhi">
                  <p>
                    <select name="area" class="SelectDiv1">
                    </select>
                  </p>
                </div>
                <div class="dizhi">
                  <p>
                    <select name="city" class="SelectDiv2">
                    </select>
                  </p>
                </div>
                <div class="dizhi">
                  <p>
                    <select name="town" class="SelectDiv3">
                    </select>
                  </p>
                </div>
              </li>
              <li><label>街道地址：</label><textarea id="roadContent"></textarea></li>
            </ul>
          </div>
        </div>
        <div class="btn clearfix">
          <div class="btn_two ftFFF makeTrue">保存</div>
        </div>
      </div>
    </div>

    <div class="layer Ndisplay" id="alerty" style="z-index: 1001">
      <p class="text align-ct">
        <span class="bd_radius ftFFF ft08 lh18 Idisplay"></span>
      </p>
    </div>
  </div>
</template>
<script>
  import loading from"../base/loading.vue"
  import {getOrderDetail} from "../api"
  export default {
    data(){
      return {
        isLoading: true,
        isAddress: true,
        orderDetail: {},
        payurl: "",
        hasCoupon: false
      }
    },
    created(){
      console.log("webpay-created");
      this.getData()
    },
    /*beforeRouteEnter(to, from, next){
     // 每次进入路由执行
     console.log("beforeRouteEnter");
     },*/
    mounted(){
      this.$nextTick(() => {
        // 只执行一次的方法
      })
    },
    watch: {
      '$route': function (to, from) {
        //从其它路由进入时，
        let ary = ["cart", "productdetail"]
        let flag = ary.some(item => item == from.name)
        if (flag) {
          localStorage.removeItem("m_ccj_Pdata")
          //this.orderDetail={}
          this.getData()
          console.log("webpay-watch");
        }
      }
    },
    methods: {
      async getData(){
        //刷新时
        let orderInfo = JSON.parse(localStorage.getItem("m_ccj_Pdata"))
        console.log(orderInfo);//null
        if (!orderInfo) {
          orderInfo = this.$route.params.orderInfo
        }
        if (!orderInfo) {
          return
        }
        localStorage.setItem("m_ccj_Pdata", JSON.stringify(orderInfo))
        this.orderDetail = await getOrderDetail(orderInfo)
        console.log("ok");
        console.log(this.orderDetail);
        this.isLoading = false
        this.payurl = this.orderDetail.pay_list.find(item => item.defaultActive).payurl
      },
      changePay(index){
        //改变付款方式，并反馈到订单中，将选中的付款方式放到第一个（先从数组中删除，然后unshift）
        this.payurl = this.orderDetail.pay_list[index].payurl
        this.orderDetail.pay_list.forEach((pay, i) => {
          if (i == index) {
            pay.defaultActive = true
          } else {
            pay.defaultActive = false
          }
        })
      },
      toPay(){
        //跳转到支付页面
        this.$router.push({name: "alipay", params: {"orderDetail": this.orderDetail}})
      }

    },
    components: {loading}
  }
</script>
<style scoped>
  body {
    font-size: 12px;
    min-width: 320px;
    font-family: "\5FAE\8F6F\96C5\9ED1";
    font-weight: 400;
    line-height: 1.5
  }

  html, body, h1, h2, h3, p, div, ul, li, span, em, dl, dt, dd, input, textarea, img {
    margin: 0;
    padding: 0
  }

  ul, li {
    list-style: none
  }

  html, body, img {
    border: 0
  }

  em {
    font-style: normal
  }

  h1, h2, h3, strong, em, i {
    font-style: normal;
    font-weight: 400
  }

  a, a:hover {
    text-decoration: none
  }

  a, input, button, textarea {
    -webkit-tap-highlight-color: rgba(255, 0, 0, 0)
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
    width: 100%
  }

  html * {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -moz-tap-highlight-color: rgba(0, 0, 0, 0);
    -o-tap-highlight-color: rgba(0, 0, 0, 0);
    -ms-tap-highlight-color: rgba(0, 0, 0, 0);
    tap-highlight-color: rgba(0, 0, 0, 0)
  }

  textarea, input, button, select {
    outline: 0;
    border: 0
  }

  textarea {
    resize: none
  }

  .fl {
    float: left
  }

  .fr {
    float: right
  }

  .Ndisplay {
    display: none
  }

  .Idisplay {
    display: inline-block
  }

  .Bdisplay {
    display: block
  }

  .positionF {
    position: fixed
  }

  .positionR {
    position: relative
  }

  .positionA {
    position: absolute
  }

  .img100 {
    width: 100%;
    display: block
  }

  .align-ct {
    text-align: center
  }

  .align-lt {
    text-align: left
  }

  .align-rt {
    text-align: right
  }

  .align-middle {
    vertical-align: middle
  }

  .lh14 {
    line-height: 14px
  }

  .lh16 {
    line-height: 16px
  }

  .lh18 {
    line-height: 18px
  }

  .lh20 {
    line-height: 20px
  }

  .lh22 {
    line-height: 22px
  }

  .lh26 {
    line-height: 26px
  }

  .lh30 {
    line-height: 30px
  }

  .lh40 {
    line-height: 40px
  }

  .ft07 {
    font-size: .7rem
  }

  .ft08 {
    font-size: .8rem
  }

  .ft09 {
    font-size: .9rem
  }

  .ft1 {
    font-size: 1rem
  }

  .ftbig {
    font-size: 1.1rem
  }

  .ft10 {
    font-size: 10px
  }

  .ft12 {
    font-size: 12px
  }

  .ft13 {
    font-size: 13px
  }

  .ft14 {
    font-size: 14px
  }

  .ft16 {
    font-size: 16px
  }

  .ft18 {
    font-size: 18px
  }

  .ft2 {
    color: #222
  }

  .ft3 {
    color: #333
  }

  .ft4 {
    color: #444
  }

  .ft6 {
    color: #666
  }

  .ft9 {
    color: #999
  }

  .ftred {
    color: #fe3355
  }

  .ftFFF {
    color: #FFF
  }

  .ftC {
    color: #CCC
  }

  .ftA {
    color: #AAA
  }

  .ftblue {
    color: #77cdcc
  }

  .wordall {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  .m10 {
    margin: 10px
  }

  .mt3 {
    margin-top: 3px
  }

  .mt5 {
    margin-top: 5px
  }

  .mt10 {
    margin-top: 10px
  }

  .mt15 {
    margin-top: 15px
  }

  .mt20 {
    margin-top: 20px
  }

  .mt30 {
    margin-top: 30px
  }

  .mt40 {
    margin-top: 40px
  }

  .mt45 {
    margin-top: 45px
  }

  .mt50 {
    margin-top: 50px
  }

  .mt55 {
    margin-top: 55px
  }

  .mt60 {
    margin-top: 60px
  }

  .mt70 {
    margin-top: 70px
  }

  .mt80 {
    margin-top: 80px
  }

  .mb5 {
    margin-bottom: 5px
  }

  .mb10 {
    margin-bottom: 10px
  }

  .mb15 {
    margin-bottom: 15px
  }

  .mb20 {
    margin-bottom: 20px
  }

  .mb30 {
    margin-bottom: 30px
  }

  .mb40 {
    margin-bottom: 40px
  }

  .mb50 {
    margin-bottom: 50px
  }

  .mb55 {
    margin-bottom: 55px
  }

  .mb60 {
    margin-bottom: 60px
  }

  .mb65 {
    margin-bottom: 65px
  }

  .mb70 {
    margin-bottom: 70px
  }

  .ml3 {
    margin-left: 3px
  }

  .ml5 {
    margin-left: 5px
  }

  .ml10 {
    margin-left: 10px
  }

  .ml15 {
    margin-left: 15px
  }

  .ml20 {
    margin-left: 20px
  }

  .mr3 {
    margin-right: 3px
  }

  .mr5 {
    margin-right: 5px
  }

  .mr10 {
    margin-right: 10px
  }

  .mr15 {
    margin-right: 15px
  }

  .mr20 {
    margin-right: 20px
  }

  .p5 {
    padding: 5px
  }

  .p10 {
    padding: 10px
  }

  .pt5 {
    padding-top: 5px
  }

  .pt10 {
    padding-top: 10px
  }

  .pt15 {
    padding-top: 15px
  }

  .pt20 {
    padding-top: 20px
  }

  .pb5 {
    padding-bottom: 5px
  }

  .pb8 {
    padding-bottom: 8px
  }

  .pb10 {
    padding-bottom: 10px
  }

  .pb15 {
    padding-bottom: 15px
  }

  .pb20 {
    padding-bottom: 20px
  }

  .pl5 {
    padding-left: 5px
  }

  .pl10 {
    padding-left: 10px
  }

  .pl15 {
    padding-left: 15px
  }

  .pl20 {
    padding-left: 20px
  }

  .pr5 {
    padding-right: 5px
  }

  .pr10 {
    padding-right: 10px
  }

  .pr15 {
    padding-right: 15px
  }

  .pr20 {
    padding-right: 20px
  }

  .bg_jt {
    background: url(/img/icon_jt_1.png) no-repeat right center;
    background-size: 5px 9px
  }

  .down_jt {
    background: url(/img/icon_jt_2.png) no-repeat right center;
    background-size: 10px 6px
  }

  .bgno {
    background: 0 0
  }

  .bgred {
    background: #fe3355
  }

  .bgF7 {
    background: #F7F7F7
  }

  .bgF8 {
    background: #F8F8F8
  }

  .bgFFF {
    background: #FFF
  }

  .bgEEE {
    background: #EEE
  }

  .bgDDD {
    background: #DDD
  }

  .bgCCC {
    background: #CCC
  }

  .bgblue {
    background: #47d2d0
  }

  .bgf3 {
    background: #f3f3f3
  }

  .bdno {
    border: 0
  }

  .bd_radius {
    border-radius: 3px
  }

  .bd_radius50 {
    border-radius: 50%
  }

  .border_bt {
    border-bottom: solid 1px #F7F7F7
  }

  .border_d {
    border: solid 1px #ddd
  }

  .border_tp_d {
    border-top: solid 1px #ddd
  }

  .border_bt_d {
    border-bottom: solid 1px #ddd
  }

  .border_lt_d {
    border-left: solid 1px #ddd
  }

  .border_rt_d {
    border-right: solid 1px #ddd
  }

  .border_rt_b {
    border-right: solid 1px #bbb
  }

  .border_tp_e {
    border-top: solid 1px #EEE
  }

  .border_bt_e {
    border-bottom: solid 1px #EEE
  }

  .border_C {
    border: solid 1px #CCC
  }

  .border_tp_c {
    border-top: solid 1px #ccc
  }

  .border_bt_a {
    border-bottom: solid 1px #aaa
  }

  .border_tp_f3 {
    border-top: solid 1px #f3f3f3
  }

  .border_bt_f3 {
    border-bottom: solid 1px #f3f3f3
  }

  .border_red {
    border: solid 1px #f35
  }

  .layer_text {
    position: fixed;
    top: 50%;
    left: 0;
    width: 100%;
    margin-top: -50px;
    z-index: 999
  }

  .layer_text_content {
    background: rgba(0, 0, 0, .8)
  }

  @keyframes loading {
    to {
      transform: rotate(360deg)
    }
  }

  @-webkit-keyframes loading {
    to {
      -webkit-transform: rotate(360deg)
    }
  }

  @-moz-keyframes loading {
    to {
      -moz-transform: rotate(360deg)
    }
  }

  @-o-keyframes loading {
    to {
      -o-transform: rotate(360deg)
    }
  }

  .layer_load {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #FFF;
    z-index: 500
  }

  .layer_load .content {
    position: absolute;
    top: 50%;
    margin-top: -40px;
    left: 0;
    width: 100%;
    color: #000;
    text-align: center;
    font-size: .8rem
  }

  .layer_load .content img {
    width: 20px;
    height: 20px;
    -webkit-animation: 5s loading linear infinite
  }

  .box_nohave {
    top: 50%;
    left: 0;
    margin-top: -66px;
    width: 100%
  }

  .box_nohave .img {
    width: 80px
  }

  .box_nohave .go {
    padding: 6px 30px;
    border-radius: 5px
  }

  header {
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 1.1rem;
    border-bottom: solid 1px #EEE;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100
  }

  header .goback {
    position: absolute;
    top: 12px;
    left: 10px;
    width: 20px;
    height: 20px
  }

  .d_msg {
    margin-top: 10px;
    background: #fff url(/img/qrdd_03.png) repeat-x
  }

  .d_msg .dizhi_one {
    padding: 20px 10px 8px;
    border-bottom: solid 1px #faf4f4
  }

  .d_msg .dizhi_one h1 {
    width: 100%;
    font-size: 1rem;
    color: #666
  }

  .d_msg .dizhi_one h1 label {
    font-size: 1rem;
    float: right
  }

  .d_msg .dizhi_one p {
    width: 100%;
    line-height: 20px;
    padding-top: 5px
  }

  .d_msg .dizhi_two {
    padding: 10px 5px 10px 5px;
    font-size: 16px;
  }

  .d_msg .dizhi_two .icon-address {
    margin-right: 5px;
    color: #aaa;
    font-size: 20px;
  }

  .d_msg .dizhi_two .icon-right {
    float: right;
    color: #aaa;
    font-size: 20px;
  }

  .d_msg a {
    color: #999;
    text-decoration: none
  }

  .bank-biaoti {
    padding-left: 10px;
    color: #666;
    height: 40px;
    line-height: 40px;
    font-size: 1rem;
    background: #fff;
    border-bottom: solid 1px #f7f7f7
  }

  .d_bank {
    width: 100%
  }

  .d_bank li {
    padding: 10px;
    line-height: 30px;
    font-size: 1rem;
    color: #444;
    border-bottom: solid 1px #f7f7f7;
    position: relative
  }

  .d_bank li .iconfont.icon-select {
    color: #ff4656;
    font-size: 18px;
  }

  .d_bank li .iconfont.icon-select-no {
    color: #999;
    font-size: 18px;
  }

  .d_bank li .bank_img {
    width: 30px;
    height: 30px;
    margin: 0 5px 2px 6px;
  }

  .d_bank li .mark {
    padding: 0 3px;
    margin-left: 10px;
    display: inline-block;
    line-height: 20px;
    font-size: 12px;
    background: #df3130;
    border-radius: 3px;
    color: #FFF;
    position: relative
  }

  .d_bank li .mark em {
    position: absolute;
    top: 50%;
    margin-top: -4px;
    left: -4px;
    width: 8px;
    height: 8px;
    display: block;
    background: url(/img/square_red.png) no-repeat;
    background-size: 100% 100%
  }

  .d_bank li .prompt {
    margin-top: 2px;
    line-height: 12px;
    display: block;
    font-size: .7rem
  }

  .yhq_box {
    padding: 0 10px
  }

  .yhq_box li {
    font-size: 1rem;
    padding: 10px 0;
    background: url(/img/rtjt_new.png) no-repeat right center;
    background-size: 5px 10px;
    position: relative
  }

  .yhq_box li.nobg {
    background: 0 0
  }

  .yhq_box li .icon_img {
    width: 16px;
    height: 16px;
    margin: 0 13px 4px 0
  }

  .yhq_box li .icon_dp {
    width: 16px;
    height: 16px;
    margin: 0 5px 4px 0
  }

  .yhq_box li .icon_kim {
    width: 15px;
    height: 20px;
    margin: 0 -2px 5px 0
  }

  .yhq_box li a {
    display: block;
    color: #666
  }

  .yhq_box li .youhui {
    position: absolute;
    top: 12px;
    right: 15px
  }

  .yhq_box li .youhui em {
    font-size: .9rem
  }

  .yhq_box li .open {
    width: 35px;
    height: 20px;
    position: absolute;
    top: 12px;
    right: 0;
    background: url(/img/kg_2.png) no-repeat;
    background-size: 100% 100%;
    display: block
  }

  .yhq_box li .open.on {
    background: url(/img/kg_1.png) no-repeat;
    background-size: 100% 100%
  }

  .dp_shop {
    margin: 1px 0
  }

  .dp_shop li {
    padding: 10px 80px 8px 100px;
    position: relative
  }

  .dp_shop li .s_img {
    width: 80px;
    height: 80px;
    position: absolute;
    top: 10px;
    left: 10px
  }

  .dp_shop li .s_price {
    line-height: 18px;
    position: absolute;
    top: 10px;
    right: 10px
  }

  .dp_shop li .s_price span {
    display: block;
    text-align: right
  }

  .dp_shop li .s_price .price {
    font-size: .9rem
  }

  .dp_shop li .s_price .price em {
    font-size: 1rem
  }

  .dp_shop li .s_price .num {
    color: #c7bdbd
  }

  .dp_shop li .s_price .num em {
    font-size: .9rem;
    padding-left: 4px
  }

  .dp_shop li .s_price .num i {
    font-size: .7rem
  }

  .dp_shop li h2 {
    height: 36px;
    line-height: 18px;
    margin-bottom: 30px;
    font-size: .9rem;
    overflow: hidden;
    color: #666
  }

  .dp_shop li h2.ftC {
    color: #CCC
  }

  .dp_shop li .attribute {
    font-size: .7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  .see_more {
    padding: 8px 0
  }

  .see_more img {
    width: 14px;
    height: 14px;
    margin: 0 0 2px 6px
  }

  .sum_price {
    padding: 10px
  }

  .sum_price .price {
    font-size: .9rem
  }

  .sum_price .d_form {
    background: #f7f7f7;
    padding: 10px 10px 0
  }

  .sum_price .d_form textarea {
    border: 0;
    line-height: 20px;
    background: 0 0
  }

  .sum_price .d_form textarea.txt_default {
    width: 89%;
    height: 25px;
    background: url(/img/srwb.png) no-repeat left 2px;
    background-size: 12px 12px;
    color: #CCC;
    padding: 0 5px 5px 18px
  }

  .sum_price .d_form textarea.txt_focus {
    width: 97%;
    height: 20px;
    color: #444;
    padding: 5px;
    background: 0 0
  }

  .p_buy {
    width: 100%;
    padding: 5px 0;
    border-top: solid 1px #DDD;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99
  }

  .p_buy p {
    line-height: 40px;
    padding-left: 15px;
    font-size: 1rem;
    color: #83797c
  }

  .p_buy p span {
    font-size: 1rem
  }

  .p_buy p span em {
    font-size: 1.1rem
  }

  .p_buy .buy_btn {
    position: absolute;
    top: 5px;
    right: 10px;
    width: 140px;
    height: 40px;
    line-height: 40px;
    border-radius: 3px;
    background: #df3130;
    font-size: 1rem
  }

  .p_buy .buy_btn a {
    display: block;
    color: #fff
  }

  .container_1 {
    width: 100%;
    padding-bottom: 20px;
    background: #f0f0f0
  }

  form {
    padding-top: 20px
  }

  .p_margin {
    margin: 10px
  }

  .border_1 {
    border-bottom: solid 1px #eee
  }

  .ft_color {
    color: #f2488c
  }

  .d_add {
    padding: 10px;
    background: #fff
  }

  .d_add ul {
    width: 100%
  }

  .d_add ul li {
    display: block;
    padding-left: 80px;
    padding: 0 0 8px 80px;
    margin-bottom: 10px;
    line-height: 28px;
    position: relative
  }

  .d_add ul li label {
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    font-size: .8rem
  }

  .d_add ul li input[type=text] {
    width: 80%;
    height: 25px;
    line-height: 25px;
    display: inline-block;
    font-size: 1rem;
    border: 0;
    background: 0 0
  }

  .d_add ul li textarea {
    width: 80%;
    height: 52px;
    font-size: 1rem;
    border: 0;
    background: 0 0
  }

  .btn {
    width: 70%;
    padding-left: 15%;
    margin-top: 30px
  }

  .btn_two {
    width: 80%;
    margin: 0 auto;
    padding: 8px 0;
    text-align: center;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -o-border-radius: 5px;
    border-radius: 5px;
    background: #df3130;
    letter-spacing: 2px
  }

  .btn_nr a {
    display: block;
    color: #fff;
    text-decoration: none
  }

  .dizhi {
    width: 33.3%;
    float: left
  }

  .dizhi p {
    padding: 0 5px 7px 3px;
    height: 23px;
    border: solid 1px #ddd;
    margin: 0 4px 2px 0
  }

  .dizhi select {
    width: 100%;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    font-size: .7rem;
    overflow: hidden;
    border: 0;
    background: 0 0
  }

  .layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .6);
    z-index: 999
  }

  .layer_content {
    position: fixed;
    width: 92%;
    left: 4%;
    top: 15%;
    padding: 15px 0 40px;
    background: #fff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -o-border-radius: 5px;
    border-radius: 5px;
    z-index: 1000
  }

  .layer_content h1 {
    width: 100%;
    padding-bottom: 10px;
    text-align: center;
    font-size: 1rem;
    color: #444;
    border-bottom: solid 1px #eee
  }

  .layer_box {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2999;
    width: 100%;
    height: 285px
  }

  .layer_box.Ht {
    height: 190px
  }

  .big_H {
    width: 100%;
    height: 150px;
    overflow-y: scroll
  }

  .layer_box .close {
    background: url(/img/closelayer.png);
    position: absolute;
    right: 10px;
    top: 10px;
    background-size: 100% 100%;
    width: 15px;
    height: 15px;
    display: block
  }

  .layer_box .info {
    width: 100%;
    background: #fff
  }

  .layer_box .info .lingq {
    text-align: center;
    height: 40px;
    color: #666;
    line-height: 40px
  }

  .priceM {
    width: 100%;
    height: 43px;
    border-top: 1px solid #eee;
    line-height: 18px;
    position: relative;
    padding-top: 5px
  }

  .priceM span {
    margin-left: 10px;
    color: #ccc
  }

  .priceM span em {
    color: #666;
    font-size: .8rem
  }

  .priceM span em i {
    color: #666;
    font-size: 1rem
  }

  .info button {
    position: absolute;
    right: 5px;
    top: 8px;
    display: block;
    width: 60px;
    height: 25px;
    border-radius: 3px
  }

  .info .style_1 {
    border: 1px solid #ccc;
    color: #666;
    background: 0 0
  }

  .info .style_2 {
    color: #ccc;
    background: #eee
  }

  .info .style_3 {
    border: 1px solid #df3130;
    color: #df3130;
    background: 0 0
  }

  .info .date {
    color: #666;
    margin-left: 10px
  }

  .warm {
    width: 150px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background: #666;
    color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -75px;
    margin-top: -15px
  }

  #one {
    display: block
  }

  .layer_box.small {
    width: 80%;
    height: 100px;
    bottom: 50%;
    margin-bottom: -50px;
    left: 10%
  }

  .layer_box .msg {
    padding: 20px 10px
  }

  .layer_box .msg .anniu {
    width: 60px;
    height: 30px;
    line-height: 30px;
    margin: 0 auto
  }

  .tc_layer {
    background: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1998
  }

  .tc_layer_box {
    position: fixed;
    top: 50%;
    left: 10%;
    width: 80%;
    border-radius: 3px;
    background: #FFF;
    z-index: 1999
  }

  .tc_layer_box.top1 {
    margin-top: -60px
  }

  .tc_layer_box.top2 {
    margin-top: -100px
  }

  .tc_layer_box .content {
    border: solid 1px #df3030;
    padding: 15px 10px 0;
    border-radius: 3px;
    color: #333;
    line-height: 20px
  }

  .tc_layer_box .content p {
    text-align: center
  }

  .tc_layer_box .icon_img {
    width: 16px;
    height: 16px;
    vertical-align: middle;
    margin: 0 3px 2px 0
  }

  .tc_layer_box .tj_btn {
    height: 36px;
    line-height: 36px;
    margin: 20px 0 10px;
    padding: 0 30px;
    color: #FFF;
    font-size: 1rem;
    border-radius: 3px;
    display: inline-block;
    background: #df3030
  }

  .tc_layer_box .tj_btn.bgorange {
    background: #ffa346
  }

  .tc_layer_box .tj_btn.small_pd {
    width: 90px;
    padding: 0;
    margin: 20px 5% 10px
  }

  @keyframes loading {
    to {
      transform: rotate(360deg)
    }
  }

  @-webkit-keyframes loading {
    to {
      -webkit-transform: rotate(360deg)
    }
  }

  @-moz-keyframes loading {
    to {
      -moz-transform: rotate(360deg)
    }
  }

  @-o-keyframes loading {
    to {
      -o-transform: rotate(360deg)
    }
  }

  .layer_load {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #FFF;
    z-index: 500
  }

  .layer_load .content {
    position: absolute;
    top: 50%;
    margin-top: -40px;
    left: 0;
    width: 100%;
    color: #000;
    text-align: center;
    font-size: .8rem
  }

  .layer_load .content img {
    width: 20px;
    height: 20px;
    -webkit-animation: 5s loading linear infinite
  }
</style>
