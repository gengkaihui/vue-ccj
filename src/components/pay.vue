<template>
  <div class="cor-sgrey">
    <p class="pay-count">付款金额：<span id="real_price">1</span>元</p>
    <div class="bg-white">
      <p class="pay-caption">选择支付方式</p>
      <ul class="pay-list" id="pay_list">
        <li data-pay="alipay" @click="active=true,payurl=alipayurl">
          <i class="iconfont icon-select" v-if="active"></i>
          <i class="iconfont icon-select-no" v-else=""></i>
          <i class="iconfont icon-ali active"></i>
          <em>支付宝支付</em>
        </li>
        <li data-pay="wechatpay" @click="active=false,payurl=wechatpayurl">
          <i class="iconfont icon-select" v-if="!active"></i>
          <i class="iconfont icon-select-no pay-icon" v-else=""></i>
          <i class="iconfont icon-wechat pay-icon"></i>
          <em>微信支付</em>
        </li>
      </ul>
    </div>
    <a :href="payurl">
      <p class="pay-btn" id="pay_btn">立即支付</p>
    </a>
    <p class="pay-warn">
      <i class="iconfont icon-warn"></i>
      支付后请耐心等待，切勿轻易放弃支付
    </p>
    <div class="container" id="waitRes" style="display:none;z-index:500;position:fixed;">
      <div class="layer">
        <div class="layer_load">
          <div class="contentZ"><img
            src="http://image-shop.chuchujie.com/culiu.cdn/image/201608/08/bf7c487a39e141f98c1eff404f5e90b91470620574_60_60.png"
            alt="">
            <p id="waitdesc" style="color: #ffffff; font-size: 0.5rem;">当前抢购人数较多<br>请您耐心等待</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  //
  //获取设备可视区域宽度：document.documentElement.clientWidth
  //根据宽度设置页面的fontSize:50px
  /*(function (doc, win) {
   var docEl = doc.documentElement,
   resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
   recalc = function () {
   var clientWidth = docEl.clientWidth;
   if (!clientWidth) return;
   if (clientWidth > 750) {
   docEl.style.fontSize = '100px';
   } else {
   docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
   }
   };

   if (!doc.addEventListener) return;
   win.addEventListener(resizeEvt, recalc, false);
   doc.addEventListener('DOMContentLoaded', recalc, false);
   })(document, window);*/
  export default {
    data(){
      return {
        active: true,
        payurl:"https://wappaygw.alipay.com/service/rest.htm?_input_charset=utf-8&format=xml&partner=2088901623911411&req_data=%3Cauth_and_execute_req%3E%3Crequest_token%3EUTP71d6b9446534427ea8328e3e0949ed83%2440%3C%2Frequest_token%3E%3C%2Fauth_and_execute_req%3E&req_id=20180706062805&sec_id=MD5&service=alipay.wap.auth.authAndExecute&v=2.0&sign=4749e1bf468964e5124f5a7f63bf114e",
        alipayurl:"https://wappaygw.alipay.com/service/rest.htm?_input_charset=utf-8&format=xml&partner=2088901623911411&req_data=%3Cauth_and_execute_req%3E%3Crequest_token%3EUTP71d6b9446534427ea8328e3e0949ed83%2440%3C%2Frequest_token%3E%3C%2Fauth_and_execute_req%3E&req_id=20180706062805&sec_id=MD5&service=alipay.wap.auth.authAndExecute&v=2.0&sign=4749e1bf468964e5124f5a7f63bf114e",
        wechatpayurl:"https://www.baidu.com"
      }
    }
  }
</script>
<style scoped lang="less">
  .cor-sgrey {
    color: #333;
    font-size: 12px;
    background-color: #f7f7f7;
    .pay-count {
      padding: 10px;
    }
    .bg-white{
      background-color: #fff;
      .pay-caption{
        padding-left: 10px;
        font-size: 14px;
        line-height: 42px;
        border-top: 1px solid #e1e1e1;
      }
      .pay-list{
        border-top: 1px solid #e1e1e1;
        li{
          padding: 15px 10px;
          font-size: 13px;
          line-height: 20px;
          border-bottom: 1px solid #e1e1e1;
          .iconfont{
            margin: 0;
            padding: 0;
            font-size: 15px;
            vertical-align: middle;
          }
          .icon-select{
            color: #df3130;
          }
          .icon-ali{
            color: #1296db;
            font-size: 23px;
            margin: 0 10px 0 5px;
          }
          .icon-wechat{
            color: #1afa29;
            font-size: 23px;
            margin: 0 10px 0 5px;
          }
        }

      }
    }
    .pay-btn{
       margin: 15px auto;
       width: 300px;
       height: 40px;
      line-height: 40px;
       color: #fff;
       font-size: 14px;
      text-align: center;
       background-color: #df3130;
       border-radius: 3px;
     }
    .pay-warn{
      color: #999;
      line-height: 15px;
      text-align: center;
      .icon-warn{
        color: #df3130;
        font-size: 15px;
      }
    }
  }
</style>
