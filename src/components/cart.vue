<template>
  <div class="cart">
    <p v-show="isSelected" class="warn">未选中任何商品，不能支付</p>
    <!--信息提醒弹窗-->
    <div v-if="order_list.length" class="main" id="content">
      <!--有产品（order.product_list.length>0）时才显示“店铺”和“产品”信息-->
      <div v-if="order.product_list.length" class="container" v-for="(order,index) in order_list" :key="index">
        <div class="shop">
          <div class="select" @click="selectShop(order)">
            <i v-show="!order.shop_select" class="iconfont icon-select-no"></i>
            <i v-show="order.shop_select" class="iconfont icon-select"></i>
          </div>
          <router-link :to="{name:'shop',params:{id:order.shop_id}}" class="gotoshop">
            <i class="iconfont icon-tostore"></i>
            <div class="text">{{order.shop_info.shop_header}}</div>
          </router-link>
          <!--领取优惠券-->
          <label class="coupon" @click="getShopCoupon(order.shop_id)">{{order.acceptable_coupon}}</label>
        </div>
        <ul class="product-list">
          <li class="product" v-for="(product,index) in order.product_list" :key="index">
            <div class="select" @click="selectProduct(product,order)">
              <i v-show="!product.product_select" class="iconfont icon-select-no"></i>
              <i v-show="product.product_select" class="iconfont icon-select"></i>
            </div>
            <router-link
              :to="{name:'productdetail',params:{id:product.product_id}}"
              class="clearfix">
              <span class="bd-999 s-have" data-id="88691623"></span>
              <div class="img">
                <img :src="product.product_img_url" alt="">
              </div>
              <div class="info">
                <h1>{{product.title}}</h1>
                <p>{{product.sku_values}}</p>
                <!--+/-放在a标签外面，防止事件冒泡-->
                <!--<div class="p-update">
                  <div class="p_num clearfix">
                    <div class="num_btn no_R" @click.stop="reduce">-</div>
                    <div class="btn_txt">
                      <input type="text" v-model="product.buy_num">
                    </div>
                    <div class="num_btn no_L" @click.stop="add">+</div>
                  </div>
                </div>-->
              </div>
            </router-link>
            <div class="p-update">
              <div class="p_num clearfix">
                <div class="num_btn no_R" @click="product.buy_num=parseInt(product.buy_num)-1">-</div>
                <div class="btn_txt">
                  <input type="text" v-model="product.buy_num">
                </div>
                <div class="num_btn no_L" @click="product.buy_num=parseInt(product.buy_num)+1">+</div>
              </div>
            </div>
            <em class="price">￥<i>{{product.sales_price}}</i></em>
          </li>
        </ul>
        <p class="count" v-show="productCount">共{{}}件商品，合计：<em>￥{{}}</em>
        </p>
      </div>
    </div>
    <div v-else="" class="null" id="nothing">
      <div class="cart-img">
        <i class="iconfont icon-cart"></i>
      </div>
      <span class="cart-txt">购物车空空</span><br>
      <a class="stroll" href="javascript:;">去逛逛</a>
    </div>
    <div class="bottom">
      <ul class="btn">
        <li class="selectAll">
          <div class="select" @click="selectAll">
            <i v-show="!all_select" class="iconfont icon-select-no"></i>
            <i v-show="all_select" class="iconfont icon-select"></i>
          </div>
          全选
        </li>
        <li class="total">合计：<em>￥{{sum | toFixed(2)}}</em></li>
        <li class="pay" @click="orderAffirm">去支付</li>
      </ul>
      <ul class="btn" style="display: none">
        <li class="fl">
          <p class="select">
            <span class="bd-999"></span>
            全选
          </p>
        </li>
        <li class="fr">删除（{{}}）</li>
      </ul>
    </div>
    <!--优惠券弹窗-->
    <div v-if="couponLayer" class="coupon-layer" id="coupon">
      <div class="layer-box">
        <i class="iconfont icon-close" @click="couponLayer=false"></i>
        <div class="info">
          <h2>领取店铺优惠券</h2>
          <div class="coupon">
            <div class="price" v-for="(coupon,index) in couponList">
              <span>
                <em><i>{{coupon.face_value}}</i>元</em>（{{coupon.limit_description_price}}）
              </span>
              <p class="date">使用期限：{{coupon.start_time}}-{{coupon.end_time}}</p>
              <button v-if="!isAccept" :cid="coupon.id" class="btn" @click="acceptCoupon(coupon.id)">
                {{coupon.message}}
              </button>
              <button v-else="" :cid="coupon.id" class="btn">{{coupon.message}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--购买遮层效果-->
    <!--<div class="container h-display" id="zcid">
      <div class="layer"></div>
      <div class="layer_box">
        <div class="p_shop_close" data-con="zcid"></div>
        <div class="box_one">&lt;!&ndash;第一部分&ndash;&gt;
          <div class="big_shop bgFFF clearfix">
            <img src="" class="../img/tc_shopimg" alt="">
            <p>商品名称</p>
            <span class="tc_price ftbig">￥50.0</span>
            <span class="tc_count ft08">库存仅剩50件</span>
          </div>
        </div>&lt;!&ndash;第一部分&ndash;&gt;
        <div class="p_bg bgFFF">&lt;!&ndash;nr&ndash;&gt;
          <div class="p_color">&lt;!&ndash;01&ndash;&gt;
            <h1 class="ftbig">选择颜色</h1>
          </div>&lt;!&ndash;01&ndash;&gt;
          <ul class="p_color_check ftbig bd_bottom clearfix">&lt;!&ndash;01 nr&ndash;&gt;
            <li>蓝色</li>
            <li class="nocolor">黄色</li>
            <li>蓝色</li>
            <li>蓝色</li>
            <li class="selectstr">红色</li>
          </ul>&lt;!&ndash;01 nr&ndash;&gt;
          <div class="p_color">&lt;!&ndash;02&ndash;&gt;
            <h1 class="ftbig">选择尺寸</h1>
          </div>&lt;!&ndash;02&ndash;&gt;
          <ul class="p_color_check ftbig bd_bottom clearfix">&lt;!&ndash;02 nr&ndash;&gt;
            <li class="selectstr">S</li>
            <li class="nocolor">L</li>
            <li>XXL</li>
            <li>XXXL</li>
            <li>XXXXL</li>
          </ul>&lt;!&ndash;02 nr&ndash;&gt;
          <div class="p_count clearfix">&lt;!&ndash;03&ndash;&gt;
            <h1 class="ftbig">数量</h1>
            <div class="p_num clearfix">&lt;!&ndash;03 nr&ndash;&gt;
              <div class="num_btn">-</div>
              <div class="btn_txt"><label>1</label></div>
              <div class="num_btn">+</div>
            </div>&lt;!&ndash;03 nr&ndash;&gt;
          </div>&lt;!&ndash;03&ndash;&gt;
        </div>&lt;!&ndash;nr&ndash;&gt;
        <div class="btn ftbig clearfix">&lt;!&ndash;按钮&ndash;&gt;
          <a id="hasYes">确定</a>
        </div>&lt;!&ndash;按钮&ndash;&gt;
      </div>
    </div>-->
  </div>
</template>
<script>
  import {getCartList, getShopCoupon, acceptCoupon} from "../api"
  export default {
    data(){
      return {
        username: '',
        order_list: [],
        productCount: false,
        couponLayer: false,
        couponList: [],
        isAccept: false,
        isSelected: false
      }
    },
    created(){
      this.getData();
    },
    mounted(){
      this.$nextTick(() => {
      })
    },
    watch: {
      // 从其它路由前进到cart页时，重新获取数据，从webpay后退到cart页时，不获取
      '$route': function (to, from) {
        let ary = ["home", "bargain", "classification", "personal", "productdetail"]
        let flag = ary.some(item => item == from.name)
        if (flag) {
          this.getData()
          console.log("cart-watch");
        }
      }
    },
    methods: {
      async getData(){
        let userinfo = JSON.parse(localStorage.getItem("m_ccj_userinfo"))
        this.username = userinfo.username
        this.order_list = await getCartList(this.username)
      },
      selectProduct(product, order){
        product.product_select = !product.product_select
        order.shop_select = order.product_list.every((item) => {
          return item.product_select
        })
      },
      selectShop(order){
        order.shop_select = !order.shop_select
        order.product_list.forEach((item) => {
          item.product_select = order.shop_select
        })
      },
      selectAll(){
        this.all_select = !this.all_select
        this.order_list.forEach((item) => {
          item.shop_select = this.all_select
          item.product_list.forEach((item) => {
            item.product_select = this.all_select
          })
        })
      },
      reduce(){
        if (this.buy_num <= 1) {
          return
        }
        this.buy_num -= 1
      },
      add(){
        this.buy_num += 1
      },
      async getShopCoupon(shop_id){
        this.couponLayer = true
        this.couponList = await getShopCoupon(shop_id)
      },
      async acceptCoupon(coupon_id){
        let coupon = this.couponList.find((item) => {
          return item.id == coupon_id
        })
        let shop_id = coupon.shop_id
        await
          acceptCoupon(shop_id, coupon_id)
        this.getShopCoupon(shop_id)
      },
      async orderAffirm(){
        let orderData = []
        this.order_list.forEach((shop) => {
            shop.product_list.forEach((product) => {
              if (product.product_select == true) {
                orderData.push(
                  {
                    "shop_id": product.shop_id,
                    "product_id": product.product_id,
                    "sku_values": product.sku_values,
                    "buy_num": product.buy_num,
                    "statics_id":product.statics_id
                  })
              }
            })
          }
        )
        let orderInfo = {username: this.username, orderData: orderData}
        if (orderData.length > 0) {//有选中商品时跳转到订单确认页webpay.vue
          this.$router.push({name: 'webpay', params: {orderInfo: orderInfo}})
          console.log(orderInfo);
          console.log(1);
        } else {//否则，显示警告信息：“未选中任何商品，不能支付”，2秒后自动隐藏
          this.isSelected = true
          setTimeout(() => {
            this.isSelected = false
          }, 2000)
        }
      }
    },
    computed: {
      all_select: {
        get()
        {
          return this.order_list.every((item) => {
            return item.shop_select
          })
        }
        ,
        set(val)
        {
          this.order_list.forEach((item) => {
            item.shop_select = val
          })
        }
      }
      ,
      sum()
      {
        let money = 0
        this.order_list.forEach((item) => {
          item.product_list.forEach((item) => {
            if (item.product_select) {
              money += item.sales_price * item.buy_num
            }
          })
        })
        return money
      }
    }
    ,
    components: {}
  }
</script>
<style scoped lang="less">
  .cart {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    color: #333;
    font-size: 12px;
    font-family: "Helvetica Neue";
    line-height: 1.5;
    background: #f7f7f7;
    overflow: auto;
    z-index: 10;
    .warn {
      height: 30px;
      text-align: center;
      line-height: 30px;
      background: #666;
      color: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -75px;
      margin-top: -15px;
      padding-left: 5px;
      padding-right: 5px;
      z-index: 9999;
    }
    a {
      color: #333;
    }
    h1 {
      font-weight: 700;
    }
    .main {
      margin-bottom: 50px;
      .container {
        margin-top: 10px;
        width: 100%;
        background-color: #fff;
        .shop {
          position: relative;
          padding: 10px 25% 10px 0;
          height: 20px;
          border-bottom: solid 1px #DDD;
          border-radius: 3px 3px 0 0;
          .select {
            position: absolute;
            top: 50%;
            margin-top: -13px;
            left: 10px;
            display: inline-block;
            .iconfont {
              color: #999;
              font-size: 18px;
            }
            .icon-select {
              color: #ff4656;
              font-size: 20px;
            }
          }
          .gotoshop {
            position: absolute;
            top: 2px;
            left: 35px;
            display: inline-block;
            width: 65%;
            height: 33px;
            line-height: 33px;
            font-size: 16px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            .iconfont {
              position: absolute;
              top: 2px;
              display: inline-block;
              color: #eee;
              font-size: 25px;
            }
            .text {
              display: inline-block;
              position: absolute;
              left: 30px;
            }
          }
          .coupon {
            position: absolute;
            top: 10px;
            right: 10px;
            line-height: 20px;
            color: #ff4656;
            font-size: 16px;

          }
        }
        .product-list {
          margin: 0 10px;
          .product {
            position: relative;
            padding: 10px 0;
            border-bottom: solid 1px #DDD;
            .select {
              position: absolute;
              top: 50%;
              margin-top: -13px;
              left: 0;
              display: inline-block;
              .iconfont {
                color: #999;
                font-size: 18px;
              }
              .icon-select {
                color: #ff4656;
                font-size: 20px;
              }
            }
            a {
              position: relative;
              left: 30px;
              width: 70%;
              display: block;
              overflow: hidden;
              zoom: 1;
              .img {
                display: inline-block;
                width: 80px;
                height: 80px;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              .info {
                position: absolute;
                left: 0;
                display: inline-block;
                box-sizing: border-box;
                float: left;
                padding-left: 85px;
                width: 100%;
                h1 {
                  display: block;
                  height: 25px;
                  line-height: 20px;
                  font-size: 14.4px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                p {
                  padding: 2px;
                  border: 1px solid #fff;
                  color: #aaa;
                  font-size: 12.8px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                /*点击+/-数量时，事件冒泡到a标签上，使用stop修饰符不起作用，只好把+/-放到a标签外面，利用position定位*/
                /*.p-update {
                  z-index: 1000;
                  display: inline-block;
                  div {
                    display: inline-block;
                  }
                  div.num_btn {
                    float: left;
                    width: 30px;
                    height: 28px;
                    line-height: 28px;
                    text-align: center;
                    color: #aaa;
                    font-size: 19.2px;
                    font-weight: 700;
                    background: #FFF;
                    cursor: pointer;
                    border: solid 1px #CCC;
                  }
                  div.btn_txt {
                    float: left;
                    width: 40px;
                    height: 28px;
                    line-height: 28px;
                    text-align: center;
                    color: #333;
                    font-size: 12px;
                    font-weight: 700;
                    background: #fff;
                    border: solid 1px #CCC;
                    border-right: 0;
                    border-left: 0;
                    input {
                      width: 38px;
                      height: 24px;
                      line-height: 24px;
                      text-align: center;
                      font-size: 12.8px;
                      border: 0;
                      background: 0 0;
                    }
                  }
                }*/
              }
            }
            .p-update {
              position: absolute;
              left: 115px;
              bottom: 10px;
              display: inline-block;
              div {
                display: inline-block;
              }
              div.num_btn {
                float: left;
                width: 30px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                color: #aaa;
                font-size: 19.2px;
                font-weight: 700;
                background: #FFF;
                cursor: pointer;
                border: solid 1px #CCC;
              }
              div.btn_txt {
                float: left;
                width: 40px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                color: #333;
                font-size: 12px;
                font-weight: 700;
                background: #fff;
                border: solid 1px #CCC;
                border-right: 0;
                border-left: 0;
                input {
                  width: 38px;
                  height: 24px;
                  line-height: 24px;
                  text-align: center;
                  font-size: 12.8px;
                  border: 0;
                  background: 0 0;
                }
              }
            }
            .price {
              position: absolute;
              top: 6px;
              right: 5px;
              color: #5d5d5d;
              font-size: 14.4px;
            }
          }

        }
      }
    }
    .bottom {
      position: fixed;
      left: 0;
      bottom: 0;
      height: 40px;
      width: 100%;
      background-color: #fff;
      .btn {
        display: flex;
        li {
          flex: 1;
          line-height: 40px;
          color: #212121;
          font-size: 14.4px;
          text-align: center;

        }
        li.total {
          em {
            color: #fe5164;
            font-size: 16px;
          }
        }
        li.selectAll {
          text-align: left;
          div.select {
            display: inline-block;
            padding: 0 7px 0 10px;
            .iconfont {
              color: #999;
              font-size: 18px;
            }
            .icon-select {
              color: #ff4656;
              font-size: 20px;
            }
          }
        }
        li.pay {
          color: #fff;
          background: #fe5164;
        }
      }
    }
    .null {
      position: absolute;
      top: 50%;
      margin-top: -68px;
      left: 0;
      width: 100%;
      height: 135px;
      text-align: center;
      .cart-img {
        margin: 0 auto;
        width: 80px;
        height: 80px;
        background: #eee;
        border-radius: 50%;
        .iconfont {
          color: #fff;
          font-size: 50px;
        }
      }
      .cart-txt {
        line-height: 35px;
        text-align: center;
        color: #999;
        font-size: .9rem;
      }
      .stroll {
        color: #333;
        font-size: .8rem;
        padding: 3px 12px;
        border-radius: 3px;
        border: 1px solid #ccc;
      }
    }
    .coupon-layer {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      z-index: 1000;
      .layer-box {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #fff;
        z-index: 1010;
        .iconfont {
          position: absolute;
          top: 8px;
          right: 10px;
          font-size: 18px;
        }
        .info {
          h2 {
            height: 40px;
            line-height: 40px;
            color: #666;
            font-size: 18px;
            text-align: center;
          }
          .coupon {
            margin-bottom: 40px;
            .price {
              position: relative;
              width: 100%;
              height: 48px;
              border-top: 1px solid #eee;
              line-height: 24px;
              span {
                margin-left: 10px;
                color: #ccc;
              }
              .date {
                margin-left: 10px;
                color: #666;
              }
              .btn {
                position: absolute;
                right: 5px;
                top: 8px;
                display: block;
                width: 60px;
                height: 25px;
                background: 0 0; /*无背景*/
                border: 1px solid #ccc;
                border-radius: 3px;
                color: #666;
              }
            }
          }
        }
      }
    }
  }
</style>
