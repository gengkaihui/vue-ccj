<template>
  <div>
    <div class="tab-top">
      <ul class="clearfix" id="tabtop" ref="tab">
        <li :class="{active:iscur==0}"><p>人气</p></li>
        <li :class="{active:iscur==1}"><p>销量</p></li>
        <li :class="{active:iscur==2}"><p>最新</p></li>
        <li :class="{active:iscur==3}">
          <p id="tabprice" @click="up=!up">价格
            <img v-show="up" src="../../assets/img/up.png" alt="" data-sort="0">
            <img v-show="!up" src="../../assets/img/up.png" alt="" data-sort="0" style="transform: rotateX(180deg);">
          </p>
        </li>
      </ul>
    </div>
    <div class="margintop container" id="contenttab">
      <!----------宝贝列表1 start---------->
      <ul class="list clearfix">
        <li class="gotoP" :id="p.product_id" v-for="(p,index) in list">
          <div class="bg"></div>
          <router-link :to="{name:'productdetail',params:{id:p.product_id}}" href="javascript:;">
            <div class="box">
              <div class="s_img clearfix">
                <img class="lazy"
                     alt="商品图片"
                     v-lazy="p.image_url_detail"
                     style="display: block;">
              </div>
              <div class="info">
                <h2>{{p.cn_title}}</h2>
                <p class="price_one clearfix">
                  <em class="small">￥</em><em class="big">{{p['sales_price']}}</em>
                </p>
                <p class="price_two clearfix">
                  <del><em>￥</em>{{p['original_price']}}</del>
                  <em class="count">销量:{{p['sales_num']}}</em>
                </p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        iscur: 0,
        up: true,
        list: [
          {
            "product_id": "110019083146",
            "cn_title": "\u5a07\u5c0f\u77ee\u4e2a\u5b50\u5973\u88c5\u65f6\u9ae6\u642d\u914d2018\u590f\u88c5\u65b0\u6b3e\u663e\u9ad8\u4e24\u4ef6\u5957\u6f6e\u65f6\u5c1a\u5957\u88c5\u5973",
            "ctime": "1527590695",
            "original_price": "180.00",
            "sales_price": 39.9,
            "version": "3",
            "status": "1",
            "product_type": "0",
            "image_url_detail": "https:\/\/image-shop.chuchujie.com\/culiu.cdn\/image\/201805\/29\/60f978b45bc5eb11be3d7cac552c76c2.jpeg",
            "image_urls_head": "https:\/\/image-shop.chuchujie.com\/culiu.cdn\/image\/201805\/29\/60f978b45bc5eb11be3d7cac552c76c2.jpeg?imageView2\/2\/w\/350",
            "limited_buy": "\uffe539.9\u5143\u6b63\u5728\u62a2",
            "tags": [],
            "buy_num": 29,
            "sales_num": 29,
            "product_detail_url": "https:\/\/m.chuchujie.com\/details\/detail.html?id=110019083146",
            "stock": 2471
          },
          {
            "product_id": "110019083147",
            "cn_title": "\u5bbd\u677e\u706f\u7b3c\u88e4\u602a\u5473\u5c11\u5973\u4e5d\u5206\u4f11\u95f2\u88e4\u5973\u590f\u5b632018\u65b0\u6b3e\u9ad8\u8170\u54c8\u4f26\u5fae\u5587\u53ed\u88e4\u5b50",
            "ctime": "1527596792",
            "original_price": "180.00",
            "sales_price": 29.9,
            "version": "2",
            "status": "1",
            "product_type": "0",
            "image_url_detail": "https:\/\/image-shop.chuchujie.com\/culiu.cdn\/image\/201805\/29\/95ef5f3a88d679b844c33793bdff20ba.jpeg",
            "image_urls_head": "https:\/\/image-shop.chuchujie.com\/culiu.cdn\/image\/201805\/29\/95ef5f3a88d679b844c33793bdff20ba.jpeg?imageView2\/2\/w\/350",
            "limited_buy": "\uffe529.9\u5143\u6b63\u5728\u62a2",
            "tags": [],
            "buy_num": 47,
            "sales_num": 47,
            "product_detail_url": "https:\/\/m.chuchujie.com\/details\/detail.html?id=110019083147",
            "stock": 7975
          },
          {
            "product_id": "110019083164",
            "cn_title": "2018\u8fd0\u52a8\u4f11\u95f2\u5957\u88c5\u5973\u590f\u5bbd\u677e\u5b57\u6bcd\u5370\u82b1T\u6064+\u5f00\u53c9\u6761\u7eb9\u9614\u817f\u88e4\u4e24\u4ef6\u5957",
            "ctime": "1527752771",
            "original_price": "180.00",
            "sales_price": 29.9,
            "version": "1",
            "status": "1",
            "product_type": "0",
            "image_url_detail": "https:\/\/image-shop.chuchujie.com\/culiu.cdn\/image\/201805\/31\/fd8ed6a89af2fcfc3718f3d164d34b81.jpeg",
            "image_urls_head": "https:\/\/image-shop.chuchujie.com\/culiu.cdn\/image\/201805\/31\/fd8ed6a89af2fcfc3718f3d164d34b81.jpeg?imageView2\/2\/w\/350",
            "limited_buy": "\uffe529.9\u5143\u6b63\u5728\u62a2",
            "tags": [],
            "buy_num": 88,
            "sales_num": 88,
            "product_detail_url": "https:\/\/m.chuchujie.com\/details\/detail.html?id=110019083164",
            "stock": 2411
          },
          {
            "product_id": "110019083107",
            "cn_title": "\u767d\u8272\u957f\u6b3e\u886c\u886b\u5973\u957f\u8896\u5bbd\u677e\u590f\u97e9\u7248\u68c9\u9ebb\u9632\u6652\u8863\u4e2d\u957f\u6b3e\u5f00\u886b\u8584\u6b3e\u886c\u8863\u5916\u5957",
            "ctime": "1527054663",
            "original_price": "180.00",
            "sales_price": 39.9,
            "version": "3",
            "status": "1",
            "product_type": "0",
            "image_url_detail": "https:\/\/image-shop.chuchujie.com\/culiu.cdn\/image\/201805\/23\/2a9360b901fc47e29bb681e24a836f54.jpeg",
            "image_urls_head": "https:\/\/image-shop.chuchujie.com\/culiu.cdn\/image\/201805\/23\/2a9360b901fc47e29bb681e24a836f54.jpeg?imageView2\/2\/w\/350",
            "limited_buy": "\uffe539.9\u5143\u6b63\u5728\u62a2",
            "tags": [],
            "buy_num": 65,
            "sales_num": 65,
            "product_detail_url": "https:\/\/m.chuchujie.com\/details\/detail.html?id=110019083107",
            "stock": 2435
          },
          {
            "product_id": "110019083148",
            "cn_title": "\u590f\u88c52018\u65b0\u6b3e\u540a\u5e26\u8fde\u4f53\u77ed\u88e4\u5957\u88c5\u5973\u857e\u4e1d\u9632\u6652\u5f00\u886b\u7701\u5fc3\u642d\u914d\u65f6\u5c1a\u4e24\u4ef6\u5957",
            "ctime": "1527597262",
            "original_price": "180.00",
            "sales_price": 58,
            "version": "1",
            "status": "1",
            "product_type": "0",
            "image_url_detail": "https:\/\/image-shop.chuchujie.com\/culiu.cdn\/image\/201805\/29\/4ec97b3871e0d49647fd492095dd87f0.jpeg",
            "image_urls_head": "https:\/\/image-shop.chuchujie.com\/culiu.cdn\/image\/201805\/29\/4ec97b3871e0d49647fd492095dd87f0.jpeg?imageView2\/2\/w\/350",
            "limited_buy": "\uffe558\u5143\u6b63\u5728\u62a2",
            "tags": [],
            "buy_num": 79,
            "sales_num": 79,
            "product_detail_url": "https:\/\/m.chuchujie.com\/details\/detail.html?id=110019083148",
            "stock": 3935
          },
          {
            "product_id": "110019083186",
            "cn_title": "\u590f\u88c5\u65b0\u6b3e\u97e9\u8303\u4e94\u5206\u8896\u9732\u80a9\u7acb\u4f53\u82b1\u6735\u767d\u8272\u96ea\u7eba\u886b\u5973\u5bbd\u677e\u5957\u5934\u906e\u809a\u5b50\u4e0a\u8863",
            "ctime": "1528120516",
            "original_price": "180.00",
            "sales_price": 29.9,
            "version": "2",
            "status": "1",
            "product_type": "0",
            "image_url_detail": "https:\/\/image-shop.chuchujie.com\/culiu.cdn\/image\/201806\/04\/b1d18a0150865726770849f635cdd809.jpeg",
            "image_urls_head": "https:\/\/image-shop.chuchujie.com\/culiu.cdn\/image\/201806\/04\/b1d18a0150865726770849f635cdd809.jpeg?imageView2\/2\/w\/350",
            "limited_buy": "\uffe529.9\u5143\u6b63\u5728\u62a2",
            "tags": [],
            "buy_num": 71,
            "sales_num": 71,
            "product_detail_url": "https:\/\/m.chuchujie.com\/details\/detail.html?id=110019083186",
            "stock": 3960
          },
          {
            "product_id": "110019083119",
            "cn_title": "\u5973\u88e4\u5b502018\u65b0\u6b3e\u6625\u590f\u5b66\u751f\u97e9\u7248\u5bbd\u677e\u8fd0\u52a8\u88e4\u6e2f\u5473\u767e\u642d\u602a\u5473\u5c11\u5973\u4f11\u95f2\u88e4\u5b50",
            "ctime": "1527232873",
            "original_price": "180.00",
            "sales_price": 29.9,
            "version": "4",
            "status": "1",
            "product_type": "0",
            "image_url_detail": "https:\/\/image-shop.chuchujie.com\/culiu.cdn\/image\/201805\/25\/6017684f0bcfb93640dca62fcfbf9eef.jpeg",
            "image_urls_head": "https:\/\/image-shop.chuchujie.com\/culiu.cdn\/image\/201805\/25\/6017684f0bcfb93640dca62fcfbf9eef.jpeg?imageView2\/2\/w\/350",
            "limited_buy": "\uffe529.9\u5143\u6b63\u5728\u62a2",
            "tags": [],
            "buy_num": 43,
            "sales_num": 43,
            "product_detail_url": "https:\/\/m.chuchujie.com\/details\/detail.html?id=110019083119",
            "stock": 2458
          },
          {
            "product_id": "11001908355",
            "cn_title": "\u5bbd\u677e\u4e2d\u957f\u6b3e\u5b57\u6bcdT\u6064\u5973\u590f\u88c5\u65b0\u6b3e\u97e9\u7248\u540a\u5e26\u6253\u5e95\u4e24\u4ef6\u5957\u4e03\u5206\u8896\u4e0a\u8863\u4f53\u6064",
            "ctime": "1526359774",
            "original_price": "180.00",
            "sales_price": "35.00",
            "version": "3",
            "status": "1",
            "product_type": "0",
            "image_url_detail": "https:\/\/image-shop.chuchujie.com\/culiu.cdn\/image\/201805\/15\/bf140265eb85b4d208b9392a41679d66.jpeg",
            "image_urls_head": "https:\/\/image-shop.chuchujie.com\/culiu.cdn\/image\/201805\/15\/bf140265eb85b4d208b9392a41679d66.jpeg?imageView2\/2\/w\/350",
            "limited_buy": "",
            "tags": [],
            "buy_num": 51,
            "sales_num": 51,
            "product_detail_url": "https:\/\/m.chuchujie.com\/details\/detail.html?id=11001908355",
            "stock": 6954
          },
          {
            "product_id": "110019083165",
            "cn_title": "\u590f\u5929\u77ed\u8896\u65f6\u5c1a\u4f11\u95f2\u8fd0\u52a8\u670d\u77ed\u88e4\u5957\u88c5\u5973\u6f6e2018\u65b0\u6b3e\u97e9\u7248\u5bbd\u677e\u663e\u7626\u4e24\u4ef6\u5957",
            "ctime": "1527753647",
            "original_price": "180.00",
            "sales_price": 29.9,
            "version": "2",
            "status": "1",
            "product_type": "0",
            "image_url_detail": "https:\/\/image-shop.chuchujie.com\/culiu.cdn\/image\/201805\/31\/4c2e09a1a3396a875c9573a779f950b1.jpeg",
            "image_urls_head": "https:\/\/image-shop.chuchujie.com\/culiu.cdn\/image\/201805\/31\/4c2e09a1a3396a875c9573a779f950b1.jpeg?imageView2\/2\/w\/350",
            "limited_buy": "\uffe529.9\u5143\u6b63\u5728\u62a2",
            "tags": [],
            "buy_num": 33,
            "sales_num": 33,
            "product_detail_url": "https:\/\/m.chuchujie.com\/details\/detail.html?id=110019083165",
            "stock": 4967
          },
          {
            "product_id": "110019083171",
            "cn_title": "pphome\u534a\u8eab\u88d9\u5b50\u5973\u590f2018\u65b0\u6b3e\u51b7\u6de1\u98ce\u8fde\u8863\u88d9\u5c0f\u6e05\u65b0\u683c\u5b50\u5957\u88c5\u88d9\u4e24\u4ef6\u5957",
            "ctime": "1527921079",
            "original_price": "180.00",
            "sales_price": 49.9,
            "version": "2",
            "status": "1",
            "product_type": "0",
            "image_url_detail": "https:\/\/image-shop.chuchujie.com\/culiu.cdn\/image\/201806\/02\/573a4c985e248de0a94cf3752c69c3f7.jpeg",
            "image_urls_head": "https:\/\/image-shop.chuchujie.com\/culiu.cdn\/image\/201806\/02\/573a4c985e248de0a94cf3752c69c3f7.jpeg?imageView2\/2\/w\/350",
            "limited_buy": "\uffe549.9\u5143\u6b63\u5728\u62a2",
            "tags": [],
            "buy_num": 47,
            "sales_num": 47,
            "product_detail_url": "https:\/\/m.chuchujie.com\/details\/detail.html?id=110019083171",
            "stock": 1964
          }
        ]
      }
    },
    created(){},
    mounted(){
      this.$nextTick(() => {
        let tabList = this.$refs.tab.children
        //使用let选项卡绑定事件：点击选项卡时，给tab加样式
        for (let i = 0; i < tabList.length; i++) {
          //使用箭头函数，this指向vue实例
          tabList[i].onclick = () => {
            switch (i) {
              case 0:
                this.list.sort(function (a, b) {
                  return parseInt(a.stock) - parseInt(b.stock)
                })
                break
              case 1:
                this.list.sort(function (a, b) {
                  return parseInt(b.sales_num) - parseInt(a.sales_num)
                })
                break
              case 2:
                this.list.sort(function (a, b) {
                  return parseInt(b.ctime) - parseInt(a.ctime)
                })
                break
              case 3:
                this.list.sort((a, b) => {
                  if (this.up) {//使用箭头函数，this指向vue实例
                    return parseInt(a.sales_price) - parseInt(b.sales_price)
                  } else {
                    return parseInt(b.sales_price) - parseInt(a.sales_price)
                  }
                })
                break
            }
            this.iscur = i
          }
        }
      })

    },
    methods: {},
    computed: {},
    components: {}
  }
</script>
<style scoped>
  body {
    color: #444;
    font-size: 12px;
    min-width: 320px;
    font-family: "Helvetica Neue";
    font-weight: 400;
    line-height: 1.5
  }

  html, body, h1, h2, h3, p, div, ul, li, span, p {
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

  h2, h2, h3, strong, em, i {
    font-style: normal;
    font-weight: 400
  }

  a, a:hover {
    text-decoration: none
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

  .bgFFF {
    background: #FFF
  }

  .Nodisplay {
    display: none
  }

  .margintop {
    margin-top: 39px
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

  .tab-top {
    width: 100%;
    height: 39px;
    font-size: 1rem;
    border-bottom: solid 1px #ddd;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100
  }

  .tab-top ul {
    width: 100%;
    position: absolute;
    top: -1px;
    left: 0;
    z-index: 800;
    background: #FFF
  }

  .tab-top ul li {
    width: 25%;
    text-align: center;
    color: #83797b;
    cursor: pointer;
    float: left
  }

  .tab-top ul li p {
    display: inline-block;
    height: 40px;
    line-height: 40px
  }

  .tab-top ul li p img {
    width: 6px;
    height: 10px;
    margin-left: 2px;
    vertical-align: middle
  }

  .tab-top ul li.active p {
    height: 38px;
    line-height: 38px;
    border-bottom: solid 2px #ff4965;
    color: #ff4965
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

  .list li .box {
    padding: 10px 10px 4px
  }

  .list li .box .s_img {
    width: 100%;
    position: relative
  }

  .list li .box .s_img img {
    width: 100%;
    display: block
  }

  .list li .box .tishi {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: 20px;
    text-align: center;
    background: rgba(255, 255, 255, .7);
    color: #ff4965
  }

  .list li .box .info {
    padding: 5px;
    margin-top: 10px
  }

  .list li .box .info h2 {
    font-size: .9rem;
    color: #444;
    margin-top: -7px;
    height: 36px;
    line-height: 18px;
    overflow: hidden;
    word-break: break-all
  }

  .list li .box .info .price_one {
    line-height: 20px;
    font-size: 1rem;
    padding-top: 4px;
    color: #ff4965
  }

  .list li .box .info .price_one em {
    color: #ff4965;
    float: left
  }

  .list li .box .info .price_one em.small {
    margin-top: 6px
  }

  .list li .box .info .price_one em.big {
    font-size: 1.2rem;
    margin-top: 5px
  }

  .list li .box .info .price_two {
    line-height: 14px;
    color: #aaa;
    font-size: .8rem
  }

  .list li .box .info .price_two del {
    float: left
  }

  .list li .box .info .price_two del em {
    font-size: .7rem
  }

  .list li .box .info .price_two .count {
    float: right
  }

  .list li a {
    display: block
  }

  .lazy {
    width: 100%;
    height: 100%
  }
</style>
