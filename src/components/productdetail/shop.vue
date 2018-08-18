<template>
  <div class="main bgF7">
    <!--下载App弹窗 start-->
    <div class="container Ndisplay">
      <div class="tc_layer"></div>
      <div class="tc_layer_box tc_wd top2">
        <div class="content align-ct ft3">
          <p class="lh30 ft1">下载APP参加活动</p>
          <p class="lh30 ft09">楚楚街APP里有更多优惠活动等着你</p>
          <div>
            <a href="javascript:;" class="tj_btn bgred">下载APP</a>
            <a href="javascript:;" class="tj_btn bgCCC">取消</a>
          </div>
        </div>
      </div>
    </div>
    <!--领取店铺优惠券-->
    <div class="cont popuplayer Ndisplay" id="couponShow">
      <div class="layer"></div>
      <div class="layer_box">
        <i class="close popupclose"></i>
        <div class="info">
          <h2 class="lingq">领取店铺优惠券</h2>
          <div class="big_H">
          </div>
        </div>
      </div>
    </div>
    <!----------top start---------->
    <div class="store_bg positionR" id="shopBackground"
         style="background: url('https://shopcdn.chuchujie.com/Uploads/desc/201510/144488116674134.jpg') 0 0 / 100% 100%;">
      <router-link :to="{name:'home'}" id="goHome">
        <i class="icon_mark icon_home" data-index="1"></i>
      </router-link>
      <router-link :to="{name:'cart',params:{username:username}}" id="gotoCart">
        <!--<i v-show="cartNum" class="cartNum"></i>-->
        <i class="icon_mark icon_car" data-index="2"></i>
      </router-link>

      <!--<i class="icon_mark icon_home" data-index="1"></i>-->
      <!--<i class="icon_mark icon_car" data-index="2"></i>-->
      <div class="store_info ftFFF positionR" id="shopInformation">
        <img :src="shop.shop_header_image_url" class="photo" alt="">
        <h2 class="ft1">{{shop.cn_name}}</h2>
        <p class="link">
          <a href="javascript:" class="ftFFF Idisplay kefu_sc">
            <img src="https://m.chuchujie.com/img/kf.png?__inline" class="align-middle" alt="">联系卖家
          </a>
        </p>
      </div>
    </div>
    <div class="dp_miaoshu align-ct bgFFF ft2 clearfix">
      <span>描述相符:{{shopRate.desc_scale}}</span>
      <span>服务态度:{{shopRate.serv_scale}}</span>
      <span>发货速度:{{shopRate.ship_scale}}</span>
    </div>
    <!----------tab---------->
    <ul class="tab_enter align-ct ft08 bgFFF clearfix" id="gotoWhere">
      <li data-go="shop_list_all" style="width: 50%;">
        <a href="javascript:;" class="ft2">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAM1BMVEUAAACqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqoNNXyEAAAAEHRSTlMAIPN57rmP5C8Us6diWUc8xM15RgAAAKlJREFUOMvt1NEKwjAMheGlaV3Xdtv//k8rWBnMbLUKgqDnplA+SCAhwyu5eJrxl7vjaar0rO2KK/72QktV8VE4Eq2IjAY6JgsnXDd8v3SgWFgIBirJwoQaKCB7Vf8MHDLhEQbyYKE4dO8UJ0eTmUH3jvl4hApBtv4C6NmsFwepxEliSeDm86WQzJYsze0RDaNzY9DKauA7FvcPfwF6lrZb8N2nuf/Y9+cK64kVEo9XB4sAAAAASUVORK5CYII="
            alt=""><br>
          全部商品
        </a>
        <i></i>
      </li>
      <li data-go="newproduct" style="width: 50%;">
        <a href="javascript:;" class="ft2">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAM1BMVEUAAACqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqoNNXyEAAAAEHRSTlMANKztleETelnQZ78oPxyGoKeNOQAAAVhJREFUOMuNlVuShCAQBIFGQFEn73/abcGBdR4y9WEYklh0Ia25ykY3C8jsojVftT8m6Joe+0cs+GPQJxv03iZ/TPLhnUsC7mJnHUh65Tzk9fXhmsFfHzlYzActanPl5EuRVv6THmm2b/bS3RPchGYhnbmIru9GCxJO42xulav5Dus9uMKxRw8tayDHQ68T2wjcmLQovQw1aSwRPwY90biSEgUHQ9VxWxTKTdI6ZmxBsCfoDhUwspygZTZCqOCs1/amMj/jtI5c3ivnCKqlglZVl44Oe5Y63sCIhLZG0ZCnDdiEvY43azXzBVxU6fDOQNYVVetWjLGXanXDQEBzqcXUeM4ie9VrmbeVMM544jNBdes5lt1wWvfUAv91C3//KEz89TPbYcCttDDHR6GBg8PVwdFx7eCoAXRw1FI6OGxS0hrKoO15nnLbfSP1QtGgNXeFOG7249/HH2mPFqnEG0RTAAAAAElFTkSuQmCC"
            alt=""><br>
          新品上架
        </a>
        <i></i>
      </li>
    </ul>
    <!----------优惠券 start---------->
    <section class="dp_yhq bgFFF dp_yhq_ft mt10 clearfix Ndisplay" id="coupons">
    </section>
    <div class="main_visual bgFFF clearfix Ndisplay" id="main_image">
      <div class="main_image clearfix">
        <ul class="clearfix">

        </ul>
      </div>
    </div>
    <div style="text-align:center;clear:both"></div>
    <div class="positionR">
      <div class="flicking_con">
        <div class="flicking_inner" id="imgIndex">

        </div>
      </div>
    </div>
    <!----------flash end---------->
    <div id="specialBox">
      <div class="bgFFF mt10" v-for="p in newProduct">
        <div class="biaoti_pd">
          <div class="align-ct">
            <span class="title-hr"></span>
            <span class="title-text">{{p.title}}</span>
            <span class="title-hr"></span>
          </div>
        </div>
        <ul class="list border_tp_e clearfix">
          <li class="imgclick" v-for="(product,index) in p.product_list" @click="toProductDetail(product.product_id)">
            <a href="javascript:;">
              <div class="box">
                <div class="positionR">
                  <img v-lazy="product.image_urls_head" alt="">
                </div>
                <div class="info">
                  <p class="price_one ft1 ftred align-ct clearfix">￥<em class="big">{{product.sales_price}}</em>
                    <del class="ft08"><i class="ft07">￥</i>{{product.original_price}}</del>
                  </p>
                  <h2 class="align-ct ft09 ft2">{{product.cn_title}}</h2>
                  <p class="price_two ft08 ftA align-ct">{{product.buy_num}}人已购买</p></div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="bgFFF mt10" id="productBox" v-for="">
      <div class="biaoti_pd">
        <div class="align-ct">
          <span class="title-hr"></span>
          <span class="title-text">全部商品</span>
          <span class="title-hr"></span>
        </div>
      </div>
      <div class="tab-top ft1 border_bt_d bgFFF">
        <ul class="align-ct ft2 clearfix" id="tabtop">
          <li :class="{active:Math.abs(iscur)==index}" v-for="(tab,index) in tabs" @click="tabSwitch(index)">{{tab}}
            <span v-if="index==3">
              <img v-if="count<0"
                   src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAMAAACOLiwjAAAAQlBMVEUAAADfMTDd3d3fMTDfMTDd3d3d3d3fMTDfMTDd3d3d3d3d3d3fMTDd3d3fMTDd3d3fMTDd3d3fMTDd3d3d3d3fMTBmKInZAAAAFHRSTlMA6uQhwL+0szEwG/DepaKZlomGJ3eVQNUAAABmSURBVBjTrYlLFoAgDANTBAX8Au39r2opT07gbDJJYNSKySPyfH4JkVzDN6EYSbbuXmgBFhLf90Nd26Ff9OrWfMS/pJCH5JCwssvmjlcgsGtAcxyg6JdS342T951PYHAz35iUYvECwmMDkch56CoAAAAASUVORK5CYII="
                   class="align-middle" alt="">
              <img v-else=""
                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAMAAACOLiwjAAAAQlBMVEUAAADfMTDd3d3fMTDfMTDd3d3d3d3fMTDfMTDd3d3d3d3d3d3fMTDd3d3fMTDd3d3fMTDd3d3fMTDd3d3d3d3fMTBmKInZAAAAFHRSTlMA6uQhwL+0szEwG/DepaKZlomGJ3eVQNUAAABmSURBVBjTrYlLFoAgDANTBAX8Au39r2opT07gbDJJYNSKySPyfH4JkVzDN6EYSbbuXmgBFhLf90Nd26Ff9OrWfMS/pJCH5JCwssvmjlcgsGtAcxyg6JdS342T951PYHAz35iUYvECwmMDkch56CoAAAAASUVORK5CYII="
                 class="align-middle" alt="" style="transform: rotateX(180deg);">
            </span>
          </li>
        </ul>
      </div>
      <loading v-if="isLoading"></loading>
      <div v-else="" class="container" id="contenttab">
        <ul class="list clearfix">
          <li class="imgclick" v-for="(product,index) in allProductList" @click="toProductDetail(product.product_id)">
            <div class="bg"></div>
            <a href="javascript:;">
              <div class="box">
                <div class="positionR">
                  <img v-lazy="product.image_urls_head" alt="" :key="product.image_urls_head">
                </div>
                <div class="info">
                  <p class="price_one ft1 ftred align-ct clearfix">￥<em class="big">{{product.sales_price}}</em>
                    <del class="ft08"><i class="ft07">￥</i>{{product.original_price}}</del>
                  </p>
                  <h2 class="align-ct ft09 ft2">{{product.cn_title}}</h2>
                  <p class="price_two ft08 ftA align-ct">{{product.buy_num}}人已购买</p></div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import loading from "../../base/loading.vue"
  import {getShopInfo,getAllProductList} from "../../api"
  export default {
    data(){
      return {
        username:"",
        shopInfo: {},
        shopDetail: {},
        shop: {},
        shopRate: {},
        newProduct: [],
        allProduct: {},
        allProductList:[],
        tabs: ["人气", "销量", "最新", "价格"],
        iscur: 0,
        isLoading:true,
        count: 1,//用于判断价格排序“顺逆”
      }
    },
    watch: {},
    created(){
      this.getData();
    },
    mounted(){
      //注意：应在生命周期函数mounted的this.$nextTick()中获取dom元素
      this.$nextTick(() => {
      })
    },
    methods: {
      async getData(){
        document.title = "店铺详情页"//设置页面标题
        let userinfo = JSON.parse(localStorage.getItem("m_ccj_userinfo"))
        this.username = userinfo.username
        this.shopId = this.$route.params.id
        this.shopInfo = await getShopInfo(this.shopId)
        this.shopDetail = this.shopInfo.shop_detail
        this.shop = this.shopDetail.shop
        this.shopRate = this.shop.rate
        this.newProduct = this.shopInfo.shop_product_list
        this.allProduct = this.shopInfo.get_product_all_list
        this.allProductList = this.shopInfo.get_product_all_list.list
        this.isLoading=false
      },
      //切换价格排序，重新获取所有产品列表
      async tabSwitch(index){
        this.iscur = index
        if (Math.abs(this.iscur) == 3) {//当点击“价格”时，先从低到高，再次点击则从高到低
          this.count *= -1;
          if (this.count < 0) {//-1时，从低到高
            this.iscur = 3
          } else {//1时
            this.iscur = -3
          }
        }
        //改变排序时，重新获取数据
        this.allProductList=await getAllProductList(this.shopId,this.iscur)
      },
      toProductDetail(id){
        console.log(id);
        this.$router.push({name:"productdetail",params:{id:id}})
      }
    },
    computed: {},
    components: {loading}
  }
</script>
<style scoped>
  .main{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
    overflow: auto;
    z-index: 100;
  }
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
    font-size: 1rem;
    color: #464e55;
    border-bottom: solid 1px #CCC;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100
  }

  header .back {
    position: absolute;
    top: 12px;
    left: 10px;
    width: 20px;
    height: 20px
  }

  .store_bg {
    padding-top: 30%;
    background-size: 100% 100%
  }

  .icon_mark {
    position: absolute;
    top: 10px;
    width: 40px;
    height: 40px;
    display: block
  }

  .icon_mark.icon_back {
    left: 10px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAV1BMVEX39/cAAAA/Pz/h4eH39/f39/eZmZmGhob39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/fR0dG9vb0iIiKxexw/AAAAHHRSTlPMAPfQCLLg5sK8lTkRfEhfWBl0P7arn4Yfp9TYUZVKmgAAAdZJREFUWMPN2dly2zAMheFjG2hILdQWSXHr93/Osm1a1HJMLTyZyX+v705DAsQpXVW2fTF6B+f1WvRtWa18kAJl6K946NoPcggsZ4cnubncC0qrSKat7ACl8VjNN7IVDIpNadgEdgU2V3TrYHDYkQsroNTYWS0psJqwu6l6DnaKA2n3DHx7xaFe35agefmigZXicFo9gjIho0kewBrJvr0gWb0Ew4p3u/1AsnAPdm7Ne0E6192BxVHPKv4Hw3HPCgaKEjyo/AObHM9q/oLiKR68vINtnme176CSPOgfsMz1rPI3ONM8zL9AcTQPTiI45HvWEMGa6KGOoBI96AkV00PkSqoXuYbqRa6mepErqF7kRqoXOU/1IueonnHm7S1NunM26EHNQbmgx5ULjii4YPHRr3c5386Xw79eA6rYoARVLFGBKlY4KVNUO6Q4Ym3HKEcc7KCniE7sKkIRZ7ssccTSrnMUUe3CyRFbuxJTRC92aaeIjY0VyhBV7gaffDHcjWb5YrEYHnNF1y3H20wxbBvATTx/R6p674rgkvYmYS8x2GuWz10EWd14xBu7z1+mWdLv9XpZWUgOfg/nB/bKlLzUZa+dyYtx7ur+KzwuLJ4/4Py45fnjJ9fhJqkZbIetAAAAAElFTkSuQmCC) no-repeat;
    background-size: 100% 100%
  }

  .icon_mark.icon_home {
    right: 10px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAY1BMVEX39/cAAACBgYH39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/dSUlJ3d3f39/f39/fm5uY1NTVBQUG9vb3Gxsbd3d2Li4tcXFyrq6v39/dsbGwiIiIO+rNLAAAAIHRSTlPMAOazBzvDvJUaEap8SF9YdfLon4bQ+vfZ1tLk79wh6nIwbZ8AAAJoSURBVFjDzdlvk5owEAbwnNkQ/iMooKh3+/0/Zbc2V8+jeUJsOtPnDSNsfgMzIMmi3nBK0+3zymZKWV3l+86UgQEIJLOv1CrV3tBLoDlmypPsaGJB6rSC0R1FgNRaFYxtaSvYaLUputkEFrnanLwIg02mIpI1AZBqFZmaEFgeVHQOpR8stHohuvCB78CD4vsKDJ5f+BzXYIk9LJZrkA7qL3KgFQjvl9N1mq4nePd8BxtUfeF7LqimeQYL9HzsmOdhmJl36JkpnsAce4OSDFjMv4IN9pyzw2LzAEmHvbCo6TfYhrxtYvsJkg14G0VLDuwC3maxc6DG3nZR/wIN9mJEcweP0IsSjz9ByoAXeSQjAQ0aFXvMCFiDMdFiLaAGI6JF/aZKUB8vCmdAdbwoXAtq40XhalAZLwqXg7p4UbhqXeWCLFeyEoWzPg+DHlE439sJgOiocGlBlR60qS9ZpwWtqpKCwuVJQeHqpKBwbVJQOJMUFK5MCgr3psNDTh8z8/xxCoPavaQguPTs0i8hsBbQBMDzxLw7y3bHPJ0DoBGQMgguE/ejumfseVogmJGbigDwyv1jZ89XCB7dZAmAZ+blsXNhPiPQuOkcAAcelIv7CUD9OeEE4MynpxUQzwDs0JSY2W1G9SUjsx+0hCbtnpEIbOGyIh7UBBc+zKMfHP8ENnhp1vPFD164X/+1BhaPN+bL6AOZb2jx+Ljo9RzCAw6eC4YL8FvvBW+hBXj6FkH6Jkb6Nkv6RpCkqF7xquLfN9MeoX2st6dAQ9LYGM6a1C3TxE3d1G3nxI3xtK37/+HjwvfPH5nd9PnjB57qORr7lUuyAAAAAElFTkSuQmCC) no-repeat;
    background-size: 100% 100%
  }

  .icon_mark.icon_car {
    right: 60px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAY1BMVEX39/cAAABzc3MsLCz39/f39/f39/f39/c4ODiCgoKurq7l5eX39/f39/dOTk5bW1v39/f39/f39/eSkpKenp739/f39/e8vLz39/dmZmbQ0NDZ2dn39/f39/fFxcVEREQiIiLhSwqWAAAAIHRSTlPMAOv9sju7G/rn3NGVEfPwqXxI4uBfWNl07dTTn4bX9rGECe4AAAK0SURBVFjDzZnn0tsgEEWvJUC9N3fz/k8Zx58TxgtIgDKenJ8az5HWXFFWOKxT8flYtgKAYG15nHl1WGdVyI8tNNojDxPyG6zcuLdwZliFzV7CSWATMTkLewYnWO8kTEo4Uybbwh5e9FvCDp50q8LqCm+ulV2YMATAEpswEQhCJERIfKFGKqwYgmGVQXjFDq5EqOclOD0gea6jYSkQQP8pTPBG/iatowt8ST6EJd6k8ocRvpRvIX2Bi2WIaimjkKKVkCYmlQ28YUo4gdDINBuXC/yY/goFCJH8Ia1P2ZDfHc3ij3AGZZCE+NFET/VyXo3U/BYyUHIp83M+ZlHzSKk7rZvnY4+/5dTOfoQcGhcpBzXu5yUfnu46jaVmjz6k/CW8QceWm+Jyz8en/dTUj/R1gxOguL2EUHjnJpMxoPhtUxWT3MCFMxHyA9Q0Q3IDF3JZk0kHaoxJbs5wIJIZGWdUMLFImcOBh7zjgwocCpKbbQoZ4xOOCUZip/lm1MIwobPVUmObkzZvdiiB8Nykks4bJVogODdn/a4tBIyMLrkZtD9a6YJy06jfOASCRNYchQIGgnOzGJMgEJybzFgEQ3BuarkYnq+13l4WTu8djU0Ja27uW1NXA40SnT0341ZoRmh0mEJzk5sqxgRuz80JdoohNlbAUdnHcBVLARUOzDo1rRHXOQwwskiR3NzhS6eWUY27WsTd4Wqh16kD9rF0K0IfUWYFfLiRzRIhj+UKMMDJdo5yidLYR8jIhnM3M9kS70WQTftuJnKs2AsjBx8zURxHlkuU3nQ0M54vIuMlSkkOj2ZeqYmNlygJOd7uFfbaAXxfyZ2xRRA+KNcvNDH+dZslvLEEsMTaqmoRQJt8oZmmOMKT41ZDkgt4IPhXWqbhTd2vt53DG+P7W/f/w8cF+vkDwunzxy85W0AtpTnQHwAAAABJRU5ErkJggg==) no-repeat;
    background-size: 100% 100%
  }

  .store_info {
    height: 70px;
    background: rgba(0, 0, 0, .5);
    padding: 5px 0 0 96px
  }

  .store_info .photo {
    width: 70px;
    height: 70px;
    border: solid 3px rgba(255, 255, 255, .5);
    border-radius: 10px;
    position: absolute;
    top: -12px;
    left: 10px
  }

  .link a {
    line-height: 22px;
    padding: 0 10px;
    font-size: 12px;
    margin: 3px 10px 0 0;
    border: solid 1px #FFF
  }

  .link a img {
    width: 14px;
    margin: 0 3px 3px 0
  }

  .dp_miaoshu {
    line-height: 30px;
    font-size: 12px
  }

  .dp_miaoshu span {
    width: 33%;
    float: left
  }

  .dp_miaoshu span:nth-child(even) {
    width: 34%
  }

  .tab_enter {
    padding: 12px 0 8px
  }

  .tab_enter li {
    width: 33%;
    line-height: 18px;
    float: left;
    position: relative
  }

  .tab_enter li:nth-child(even) {
    width: 34%
  }

  .tab_enter li i {
    display: block;
    width: 1px;
    height: 36px;
    background: #EEE;
    position: absolute;
    top: 0;
    right: 0
  }

  .tab_enter li img {
    width: 18px;
    height: 18px
  }

  .dp_yhq {
    padding: 10px 15px 10px 10px;
    position: relative
  }

  .dp_yhq .icon {
    width: 16px;
    height: 16px;
    margin-right: 5px
  }

  .dp_yhq .yhq_mark {
    padding: 5px 0;
    line-height: 20px
  }

  .yqh_bg_red {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAAAoBAMAAADtdNK5AAAAJFBMVEUAAAD/fYv/fYv/fYv/fYv/fYv/fYv/fYv/fYv/fYv/fYv/fYuNagabAAAAC3RSTlMA9dJHF7qWjoM8DzQDAzUAAABySURBVEjH7ZTLDUBgEAYnIVEAF9EBFzqgDiW46MNJCzogIRLN6WGS/7Z7n2Rf37B9pl4Kxa2wCOwBJsFVkHeCu0YONV/LrLibXXE1WSOws4dBcCWWs33avdg72LvbP7N/bXNkc2s9EX4Jv4Rfwi+p/PIDAYYQI+utHEMAAAAASUVORK5CYII=) no-repeat;
    background-size: 100% 30px
  }

  .yqh_bg_blue {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAAAoBAMAAADtdNK5AAAAIVBMVEUAAACC3dyC3dyC3dyC3dyC3dyC3dyC3dyC3dyC3dyC3dxW0Wg2AAAACnRSTlMA9hTSR7qWjoM8VoqaWQAAAHBJREFUSMftlL0NQHAUBy8i0YuGithAqWINI6jMoTOCCBFT2uGSf/def8n7+h37Z+qlUNwGq8AeoBNcCdkouKulV/MNLIq7ORRXkzcCOyeYBVdhOdun3Yu9g727/TP71zZHNrfWE+GX8Ev4JfySyi8/YgKCgDWk9r8AAAAASUVORK5CYII=) no-repeat;
    background-size: 100% 30px
  }

  .yqh_bg_orange {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAAAoBAMAAADtdNK5AAAAIVBMVEUAAAD/sFr/sFr/sFr/sFr/sFr/sFr/sFr/sFr/sFr/sFodrx2YAAAACnRSTlMA9RTSR7qWjoM8bwemnAAAAHBJREFUSMftlL0NQHAUBy8i0YuGithAqWINI6jMoTOCCBFT2uGSf/def8n7+h37Z+qlUNwGq8AeoBNcCdkouKulV/MNLIq7ORRXkzcCOyeYBVdhOdun3Yu9g727/TP71zZHNrfWE+GX8Ev4JfySyi8/YgKCgDWk9r8AAAAASUVORK5CYII=) no-repeat;
    background-size: 100% 30px
  }

  @media screen and (min-width: 320px) and (max-width: 359px) {
    .dp_yhq_ft {
      font-size: .7rem
    }

    .yhq_wd {
      width: 68px;
      font-size: .7rem;
      margin-left: 1px
    }

    .dp_yhq em {
      font-size: .8rem
    }
  }

  @media screen and (min-width: 359px) and (max-width: 370px) {
    .dp_yhq_ft {
      font-size: .8rem
    }

    .yhq_wd {
      width: 73px;
      font-size: .7rem;
      margin-left: 1px
    }

    .dp_yhq em {
      font-size: .9rem
    }
  }

  @media screen and (min-width: 370px) and (max-width: 400px) {
    .dp_yhq_ft {
      font-size: .9rem
    }

    .yhq_wd {
      width: 76px;
      font-size: .7rem;
      margin-left: 1px
    }
  }

  @media screen and (min-width: 400px) {
    .dp_yhq_ft {
      font-size: 1rem
    }

    .yhq_wd {
      width: 80px;
      font-size: .8rem;
      margin-left: 2px
    }
  }

  .biaoti_pd {
    padding: 20px 0
  }

  .biaoti {
    width: 60%;
    margin: 0 auto;
    height: 1px;
    background: #eaeaea
  }

  .biaoti p {
    font-size: 16px;
    position: absolute;
    top: -10px;
    left: 50%;
    margin-left: -40px;
    width: 80px
  }

  .list {
    width: 100%
  }

  .list li {
    width: 50%;
    position: relative;
    border-bottom: solid 1px #EEE;
    float: left
  }

  .list li .bg {
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: #EEE
  }

  @media screen and (min-width: 320px) and (max-width: 359px) {
    .list li .box {
      padding: 5px 5px 4px
    }

    .tc_wd {
      left: 6%;
      width: 88%
    }
  }

  @media screen and (min-width: 359px) {
    .list li .box {
      padding: 10px 10px 4px
    }

    .tc_wd {
      left: 12%;
      width: 76%
    }
  }

  .list li .box img {
    width: 100%;
    display: block
  }

  .list li .box .info {
    padding: 5px
  }

  .list li .box .info h2 {
    height: 36px;
    line-height: 18px;
    overflow: hidden;
    word-break: break-all
  }

  .list li .box .info .price_one {
    letter-spacing: 0;
    padding-top: 6px
  }

  .list li .box .info .price_one em.big {
    font-size: 1.1rem
  }

  .list li .box .info .price_one del {
    color: #ff8500;
    padding-left: 5px;
    margin-left: 2px;
    border-left: solid 1px #DDD
  }

  .list li .box .info .price_two {
    margin-top: 5px
  }

  .list li a {
    display: block
  }

  .qgou {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: 24px;
    background: rgba(255, 255, 255, .7)
  }

  .main_visual {
    margin-bottom: 10px;
    position: relative
  }

  .main_image {
    width: 100%;
    overflow: hidden;
    position: relative
  }

  .main_image ul {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0
  }

  .main_image li {
    float: left;
    width: 100%;
    height: 100%
  }

  .main_image li img {
    width: 100%;
    float: left
  }

  .main_image li a {
    display: block;
    width: 100%;
    height: 100%
  }

  .flicking_con {
    position: absolute;
    top: -10px;
    right: 10px;
    z-index: 60
  }

  .flicking_con .flicking_inner {
    position: absolute;
    bottom: 3px;
    right: 0;
    z-index: 50;
    width: 150px;
    text-align: right
  }

  .flicking_con a {
    width: 8px;
    height: 8px;
    margin: 0 1px;
    background: rgba(255, 255, 255, .7);
    border-radius: 50%;
    display: inline-block;
    text-indent: -1000px
  }

  .flicking_con a.on {
    background: #ff5a5a
  }

  .tab-top {
    height: 39px;
    position: relative
  }

  .tab-top ul {
    width: 100%;
    position: absolute;
    top: -1px;
    left: 0;
    z-index: 800
  }

  .tab-top ul li {
    width: 25%;
    line-height: 40px;
    cursor: pointer;
    float: left;
    position: relative
  }

  .tab-top ul li i {
    display: block;
    width: 1px;
    height: 14px;
    background: #EEE;
    position: absolute;
    top: 13px;
    right: 0
  }

  .tab-top ul li img {
    width: 6px;
    height: 10px;
    margin-left: 5px
  }

  .tab-top ul li.active {
    color: #fe5164
  }

  .leimu_tab {
    width: 100%;
    height: 40px;
    top: 0;
    left: 0;
    z-index: 900
  }

  .leimu_list {
    width: 100%;
    height: 40px;
    top: 0;
    right: 0;
    z-index: 90;
    overflow: hidden
  }

  .leimu_list ul {
    width: 500px;
    height: 40px;
    top: 0;
    left: 0
  }

  .leimu_list ul li {
    width: auto;
    line-height: 40px;
    float: left;
    padding: 0 10px;
    font-size: 12px
  }

  .leimu_list ul li.active {
    color: #fe5164;
    font-size: 14px
  }

  .leimu_search {
    width: 54px;
    height: 40px;
    top: 0;
    right: 0;
    z-index: 100
  }

  .leimu_box {
    width: 80px;
    padding: 0 10px;
    box-shadow: -2px 2px 2px #c3c3c3;
    top: 41px;
    right: 0;
    z-index: 100
  }

  .leimu_box li {
    line-height: 30px;
    border-bottom: solid 1px #EEE
  }

  .leimu_box li img {
    width: 6px;
    height: 10px;
    margin-left: 5px
  }

  .leimu_box li.active {
    color: #fe5164;
    font-size: 14px
  }

  .bd_red {
    border-top: solid 1px #ff5a5a
  }

  .bd_blue {
    border-top: solid 1px #55a5ff
  }

  .bd_green {
    border-top: solid 1px #77cdcc
  }

  .bd_orange {
    border-top: solid 1px #ffcc01
  }

  .type_biaoti {
    margin: 10px 15px;
    padding-right: 10px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAcCAMAAACwLaQWAAAAM1BMVEUAAADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d329vbd3d3d3d3////d3d3n5+ft7e355kYCAAAADXRSTlMA8eJsW0s9KiDBlXoz83nrbwAAAFxJREFUGNN90VkKwEAIA9Dpvsb2/qftIAw2E9DPByIm5Tz2wvPY2BEqbSyVBiI43SROKwsTGi0seM0aIWgOYcKfJhchMF2ZxBZDet0h+4I/1TQENFVNXtvRBrXlD3KkDH255xDWAAAAAElFTkSuQmCC) no-repeat right center;
    background-size: 6px 10px
  }

  .type_biaoti.all {
    margin: 10px 10px 10px 15px
  }

  .type_biaoti em {
    margin-top: 2px
  }

  .type_list {
    padding: 0 5px
  }

  .type_list li {
    width: 50%;
    margin-bottom: 5px;
    float: left
  }

  .type_list li a {
    display: block;
    line-height: 20px;
    margin: 0 5px;
    padding: 10px 10px 10px 15px;
    background: #f8f8f8
  }

  .type_list2 {
    width: 100%;
    border-top: solid 1px #EEE
  }

  .type_list2 li {
    width: 47%;
    line-height: 30px;
    padding-left: 3%;
    border-bottom: solid 1px #EEE;
    float: left;
    position: relative
  }

  .type_list2 li:nth-child(2n+2) i {
    display: none
  }

  .type_list2 li i {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: #EEE
  }

  .tc_layer {
    background: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100
  }

  .tc_layer_box {
    position: fixed;
    top: 50%;
    border-radius: 5px;
    background: #FFF;
    z-index: 1999
  }

  .tc_layer_box.top2 {
    margin-top: -100px
  }

  .tc_layer_box .content {
    padding: 15px 10px 0
  }

  .tc_layer_box .tj_btn {
    width: 80px;
    height: 30px;
    line-height: 30px;
    margin: 20px 5% 10px;
    color: #FFF;
    font-size: .9rem;
    border-radius: 3px;
    display: inline-block
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
    height: 285px;
    background: #fff
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
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnBAMAAAB+jUwGAAAAElBMVEUAAADNzc3Nzc3Nzc3Nzc3Nzc2hFiwOAAAABXRSTlMAn2FakN4GcM4AAACESURBVCjPhdNBDkUwFAXQ938sgIG5ibmJhRDd/1ZIOjjp66BNcPUeUUL044j4z2nu90TsV5pcy/FtcwvLFXVnVISCKOgICqCUoaiWtU6UaAtREAUDBdEFRAuIgmlydLkbDZdk8aPH9EIyREElqBXVXdILAEiAKNjQE0Sn7vO+68/Q0i1ej6koSapo25EAAAAASUVORK5CYII=);
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

  .title-hr {
    display: inline-block;
    width: 20%;
    line-height: 20px;
    height: 1px;
    background: #eaeaea;
    vertical-align: middle
  }

  .title-text {
    display: inline-block;
    overflow: hidden;
    height: 20px;
    font-size: 16px;
    line-height: 20px;
    vertical-align: middle;
    margin-left: 5px;
    margin-right: 5px
  }
</style>
