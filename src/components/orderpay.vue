<template>
  <!--付款选择遮层-->
  <div class="bgf3">
    <ul class="pay_list pl20 pr20 mt10 ft18 ft2 bgFFF" id="paySelect">
      <li v-for="(pay,index) in payList" :key="index" :pay="pay.payname" @click="changePay(index)">
        <img :src="pay.icon" class="align-middle" alt="">{{pay.name}}
        <i v-show="pay.defaultActive"  class="iconfont icon-select" :class="{active:pay.defaultActive}"></i>
        <i v-show="!pay.defaultActive" class="iconfont icon-select-no"></i>
      </li>
    </ul>
    <!--底部 start-->
    <footer class="positionF ft16 bgFFF">
      <p class="pl20 lh40 ft2" id="showSelect">已选:支付宝支付</p>
      <a href="javascript:;" class="submit bgred align-ct positionA" id="gotoPay">
        <span class="ftFFF">确认</span>
      </a>
    </footer>
  </div>
</template>
<script>
  import {getPayList} from "../api"
  export default {
    data(){
      return {
        payList: []
      }
    },
    created(){
        this.getData()
    },
    methods: {
      async getData(){
        let orderInfo = this.$route.params.orderInfo
        /*orderInfo={
         "username": this.username,
         "id": order.id,
         "userId": "",
         "token": "ccj051564032088d4f0000947274372a1564032088",
         "order_sn": "180729211158YPE457437",
         "isRepeat": false,
         "subChannel": "shop"
         }*/
        let id = orderInfo.id
        this.payList = await getPayList(orderInfo)
      }
    },
    computed: {},
    components: {}
  }
</script>
<style scoped>
  body{font-size:12px;min-width:320px;font-family:"\5FAE\8F6F\96C5\9ED1";font-weight:400;line-height:1.5}html,body,h1,h2,h3,p,div,ul,li,span,em,dl,dt,dd,input,textarea,img{margin:0;padding:0}ul,li{list-style:none}html,body,img{border:0}em{font-style:normal}h1,h2,h3,strong,em,i{font-style:normal;font-weight:400}a,a:hover{text-decoration:none}a,input,button,textarea{-webkit-tap-highlight-color:rgba(255,0,0,0)}.clearfix:after{clear:both;content:'';font-size:0;display:block;visibility:hidden;height:0}.container{width:100%}html *{-webkit-tap-highlight-color:rgba(0,0,0,0);-moz-tap-highlight-color:rgba(0,0,0,0);-o-tap-highlight-color:rgba(0,0,0,0);-ms-tap-highlight-color:rgba(0,0,0,0);tap-highlight-color:rgba(0,0,0,0)}textarea,input,button,select{outline:0;border:0}textarea{resize:none}.fl{float:left}.fr{float:right}.Ndisplay{display:none}.Idisplay{display:inline-block}.Bdisplay{display:block}.positionF{position:fixed}.positionR{position:relative}.positionA{position:absolute}.img100{width:100%;display:block}.align-ct{text-align:center}.align-lt{text-align:left}.align-rt{text-align:right}.align-middle{vertical-align:middle}.lh14{line-height:14px}.lh16{line-height:16px}.lh18{line-height:18px}.lh20{line-height:20px}.lh22{line-height:22px}.lh26{line-height:26px}.lh30{line-height:30px}.lh40{line-height:40px}.ft07{font-size:.7rem}.ft08{font-size:.8rem}.ft09{font-size:.9rem}.ft1{font-size:1rem}.ftbig{font-size:1.1rem}.ft10{font-size:10px}.ft12{font-size:12px}.ft13{font-size:13px}.ft14{font-size:14px}.ft16{font-size:16px}.ft18{font-size:18px}.ft2{color:#222}.ft3{color:#333}.ft4{color:#444}.ft6{color:#666}.ft9{color:#999}.ftred{color:#fe3355}.ftFFF{color:#FFF}.ftC{color:#CCC}.ftA{color:#AAA}.ftblue{color:#77cdcc}.wordall{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.m10{margin:10px}.mt3{margin-top:3px}.mt5{margin-top:5px}.mt10{margin-top:10px}.mt15{margin-top:15px}.mt20{margin-top:20px}.mt30{margin-top:30px}.mt40{margin-top:40px}.mt45{margin-top:45px}.mt50{margin-top:50px}.mt55{margin-top:55px}.mt60{margin-top:60px}.mt70{margin-top:70px}.mt80{margin-top:80px}.mb5{margin-bottom:5px}.mb10{margin-bottom:10px}.mb15{margin-bottom:15px}.mb20{margin-bottom:20px}.mb30{margin-bottom:30px}.mb40{margin-bottom:40px}.mb50{margin-bottom:50px}.mb55{margin-bottom:55px}.mb60{margin-bottom:60px}.mb65{margin-bottom:65px}.mb70{margin-bottom:70px}.ml3{margin-left:3px}.ml5{margin-left:5px}.ml10{margin-left:10px}.ml15{margin-left:15px}.ml20{margin-left:20px}.mr3{margin-right:3px}.mr5{margin-right:5px}.mr10{margin-right:10px}.mr15{margin-right:15px}.mr20{margin-right:20px}.p5{padding:5px}.p10{padding:10px}.pt5{padding-top:5px}.pt10{padding-top:10px}.pt15{padding-top:15px}.pt20{padding-top:20px}.pb5{padding-bottom:5px}.pb8{padding-bottom:8px}.pb10{padding-bottom:10px}.pb15{padding-bottom:15px}.pb20{padding-bottom:20px}.pl5{padding-left:5px}.pl10{padding-left:10px}.pl15{padding-left:15px}.pl20{padding-left:20px}.pr5{padding-right:5px}.pr10{padding-right:10px}.pr15{padding-right:15px}.pr20{padding-right:20px}.bg_jt{background:url(/img/icon_jt_1.png) no-repeat right center;background-size:5px 9px}.down_jt{background:url(/img/icon_jt_2.png) no-repeat right center;background-size:10px 6px}.bgno{background:0 0}.bgred{background:#fe3355}.bgF7{background:#F7F7F7}.bgF8{background:#F8F8F8}.bgFFF{background:#FFF}.bgEEE{background:#EEE}.bgDDD{background:#DDD}.bgCCC{background:#CCC}.bgblue{background:#47d2d0}.bgf3{background:#f3f3f3}.bdno{border:0}.bd_radius{border-radius:3px}.bd_radius50{border-radius:50%}.border_bt{border-bottom:solid 1px #F7F7F7}.border_d{border:solid 1px #ddd}.border_tp_d{border-top:solid 1px #ddd}.border_bt_d{border-bottom:solid 1px #ddd}.border_lt_d{border-left:solid 1px #ddd}.border_rt_d{border-right:solid 1px #ddd}.border_rt_b{border-right:solid 1px #bbb}.border_tp_e{border-top:solid 1px #EEE}.border_bt_e{border-bottom:solid 1px #EEE}.border_C{border:solid 1px #CCC}.border_tp_c{border-top:solid 1px #ccc}.border_bt_a{border-bottom:solid 1px #aaa}.border_tp_f3{border-top:solid 1px #f3f3f3}.border_bt_f3{border-bottom:solid 1px #f3f3f3}.border_red{border:solid 1px #f35}.layer_text{position:fixed;top:50%;left:0;width:100%;margin-top:-50px;z-index:999}.layer_text_content{background:rgba(0,0,0,.8)}@keyframes loading{to{transform:rotate(360deg)}}@-webkit-keyframes loading{to{-webkit-transform:rotate(360deg)}}@-moz-keyframes loading{to{-moz-transform:rotate(360deg)}}@-o-keyframes loading{to{-o-transform:rotate(360deg)}}.layer_load{position:fixed;top:0;left:0;width:100%;height:100%;background:#FFF;z-index:500}.layer_load .content{position:absolute;top:50%;margin-top:-40px;left:0;width:100%;color:#000;text-align:center;font-size:.8rem}.layer_load .content img{width:20px;height:20px;-webkit-animation:5s loading linear infinite}.box_nohave{top:50%;left:0;margin-top:-66px;width:100%}.box_nohave .img{width:80px}.box_nohave .go{padding:6px 30px;border-radius:5px}

  .pay_list li {
    padding: 10px 0 6px;
    line-height: 30px;
    border-bottom: solid 1px #EEE;
    position: relative;

    font-size: 1rem;
    color: #444;
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

  .pay_list li:last-child {
    border-bottom: 0
  }

  .pay_list img {
    width: 30px;
    height: 30px;
    margin: 0 5px 4px 0
  }

  .pay_list i {
    width: 20px;
    height: 19px;
    position: absolute;
    top: 50%;
    right: 0;
    margin-top: -9px;
    background: url(/img/check_no.png) no-repeat;
    background-size: 100% 100%
  }

  .pay_list i.active {
    background: url(/img/check_yes.png) no-repeat;
    background-size: 100% 100%
  }

  footer {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    padding: 5px 0;
    border-top: solid 1px #e6e5e5;
    z-index: 100
  }

  footer .submit {
    width: 100px;
    line-height: 51px;
    display: block;
    top: -1px;
    right: 0
  }
</style>
