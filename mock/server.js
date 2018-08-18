/**
 * Created by kaihui on 2018/6/11.
 */
let express = require("express");
let app = express();
let findOut = require("./findOut");
let fs = require("fs");
let bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
let {read, write} = require("./readAndWrite")//引用自己封装的异步读写插件
let formatTime = require("./formatTime")//添加订单时用，获取当前时间并格式化成“年-月-日 时:分:秒”

//设置跨域头
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.sendStatus(200); //让options请求快速返回
  }
  else {
    next();
  }
});

let slides = require("./slides")
app.get("/slides", function (req, res) {
  res.json(slides)
})
//首页，获取品牌列表
let femaleBrandList = require("./femaleBrandList")
let maleBrandList = require("./maleBrandList")
let brandList = []
app.get("/brand", function (req, res) {
  console.log(req.query);
  //根据传递的female：给brandList赋值：女生列表femaleBrandList、男生列表maleBrandList
  let female = req.query.female//可能值：true、false
  //console.log(typeof female);//->string
  //注意：female为字符串，"false"转为布尔仍为true，所以应该和字符串"true"作比较
  brandList = (female === "false") ? maleBrandList : femaleBrandList;

  //根据品牌详情页中是否存在id，判断是返回某个brand的详情数据，还是返回全部数据brandList
  let brandDetailList = require("./brandDetailList.json")
  let id = parseInt(req.query.id)
  if (!isNaN(id)) {
    // let brand = brandDetailList.find(item => item.page.id === id)
    //使用假数据，brandDetailList中只有id=44723这个品牌，所以每次请求，都返回44723品牌
    let brand = brandDetailList.find(item => item.page.id == "44723")
    if (!brand) {
      brand = {}
    } else {
      res.json(brand);
    }
  } else {//查找全部数据
    res.json(brandList);
  }
})

//9块9，获取商品列表或某个商品product
let femaleShopList = require("./femaleShopList.json")
let maleShopList = require("./maleShopList.json")
let productList = []
app.get("/productlist", function (req, res) {
  console.log(req.query);
  let female = req.query.female
  productList = (female === "false") ? maleShopList : femaleShopList;
  res.json(productList)
})

//获取某个产品的详细信息
app.get("/product", function (req, res) {
  //获取传递的id，通过id判断某个产品是否存在
  let id = parseInt(req.query.id)

  //这里使用假数据
  read("./productDetailList.json", function (productList) {
    let product = productList.find(item => {
      console.log(item.product["product_id"] == 11001908355);
      // return item.data.product["product_id"] == id
      return item.product["product_id"] == "11001908355"
    })
    res.json(product)//返回找到的产品
  })
})
//产品详情页中：评价
app.post("/product/evaluation", function (req, res) {
  let {product_id, page, page_size, rate_type} = req.body
  read("./productDetailList.json", function (productList) {
    let productDetail = productList.find(item => {
      console.log(item.product["product_id"] == 11001908355);
      // return item.data.product["product_id"] == product_id
      return item.product["product_id"] == "11001908355"
    })
    res.json(productDetail.evaluation_list)//返回产品的评价列表
  })
})


//将某个产品加入购物车
app.post("/addToCart", function (req, res) {
  let productInfo = req.body
  let {username, productData} = productInfo
  let {shop_id, product_id, sku_values, buy_num,statics_id} = productData[0]
  let newOrder = {
    "shop_info": {
      "id": shop_id,
      "shop_header": "",
    },
    "product_list": [
      {
        "shop_id": shop_id,
        "product_id": product_id,
        "product_sku_id": '',
        "product_select": false,
        "buy_num": buy_num,
        "sales_price": "",
        "title": "",
        "product_img_url": "",
        "original_price": "",
        "sku_values": sku_values,
        "stocks": 498,
        "id_delete": "0",
        "product_type": "0",
        "stateMap": 0,
        "message": "",
        "restrictionTag": "此商品限制最多购买498件",
        "statics_id":statics_id
      }
    ],
    "shop_id": shop_id,
    "shop_select": false,
    "user_id": "",
    "acceptable_coupon": "领券",
  }
  //从产品详情列表读取相关信息，给购物车新订单赋值
  read("./productDetailList.json", function (productDetailList) {
    let productDetail = productDetailList.find(item => {
      return item.product["product_id"] == product_id
    })
    let product = productDetail.product
    newOrder.shop_info.shop_header = product.shop_info.cn_name
    newOrder.product_list[0].sales_price = product.sales_price_real
    newOrder.product_list[0].original_price = product.original_price
    newOrder.product_list[0].title = product.title
    newOrder.product_list[0].product_img_url = product.image_urls_head[0]
    //console.log(newOrder);
    //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    //加入购物车中
    read("./cartList.json", function (cartList) {
      cartList.forEach((cart) => {
        let shop_list = cart.shop_list
        if (cart.username == username) {
          //判断username相等的cart中是否存在新增加的产品所在的店铺
          let flag = shop_list.some(shop => {
            return shop.shop_id == shop_id
          })
          if (!flag) {//如果shop_id的店铺不存在，则直接增加整个产品信息
            shop_list.unshift(newOrder)
          } else {//如果店铺存在，则判断增加的产品的id和型号是否存在
            shop_list.forEach(shop => {
              if (shop.shop_id == shop_id) {
                let flag = shop.product_list.some(product => {
                  return product.product_id == product_id && product.sku_values == sku_values
                })
                if (flag) {
                  shop.product_list.forEach((product, index) => {
                    //存在则buy_num+1，并将该产品放到shop.product_list的前面
                    if (product.product_id == product_id && product.sku_values == sku_values) {
                      product.buy_num = Number(product.buy_num) + Number(buy_num)

                      let temp = product
                      shop.product_list.splice(index, 1)//先删除该项
                      shop.product_list.unshift(temp)//将该项增加到列首
                    }
                  })
                } else {
                  shop.product_list.unshift(newOrder.product_list[0])
                }
              }
            })
          }
        }
      })
      //最后重写cartList.json
      write("./cartList.json", cartList, function () {
        res.send("成功加入购物车")
      })
    })
  })
})
//进入购物车，获取购物车列表
app.get("/cart", function (req, res) {
  let username = req.query.u
  console.log(username);
  read("./cartList.json", function (cartList) {
    let cartInfo = cartList.find((item) => {
      return item.username == username
    })
    let shop_list = cartInfo.shop_list
    res.json(shop_list)
  })
})
//购物车中获取店铺优惠券
app.get("/shopcoupon", function (req, res) {
  let shop_id = req.query.sid
  read("./shopCoupon.json", function (coupon) {
    let shop = coupon.find((item) => {
      return item.shop_id == shop_id
    })
    let coupon_list = shop.coupon_list
    //console.log(coupon_list);
    res.json(coupon_list)
  })
})
//购物车中：反馈已经领取优惠券
app.post("/shopcoupon", function (req, res) {
  let shop_id = req.query.sid
  let coupon_id = req.query.cid
  console.log(shop_id, coupon_id);
  read("./shopCoupon.json", function (coupon) {
    for (let i = 0; i < coupon.length; i++) {
      if (coupon[i].shop_id == shop_id) {
        for (let j = 0; j < coupon[i].coupon_list.length; j++) {
          if (coupon[i].coupon_list[j].id == coupon_id) {
            coupon[i].coupon_list[j].accpted = 1
            coupon[i].coupon_list[j].message = "已领取"
          }
        }
      }
    }
    write("./shopCoupon.json", coupon, function () {
      res.json("已领取")
    })
  })
})
//订单确认页面：根据选择的产品获取产品的详细信息
app.post("/confirmOrder", function (req, res) {
  let orderInfo = req.body;
  //console.log(orderInfo);

  //从“购物车页cart.vue”和“详情页productdetail立即购买”传递的参数应该一致
  let {username, orderData} = orderInfo
  //最终购买的商品数据
  let confirmOrder = {
    "username": username,
    "order_list": [],
    "shipping_fee": "0",//新订单中所有产品的海运费
    "product_fee": "0",
    "all_fee": "0",
    "coupon_fee": "0",
    "pay_list": [
      {
        "name": "支付宝支付",
        "payname": "alipay",
        "icon": "https://m.chuchujie.com/img/zfb.png",
        "payurl": "https://wappaygw.alipay.com/service/rest.htm?_input_charset=utf-8&format=xml&partner=2088901623911411&req_data=%3Cauth_and_execute_req%3E%3Crequest_token%3EUTP71d6b9446534427ea8328e3e0949ed83%2440%3C%2Frequest_token%3E%3C%2Fauth_and_execute_req%3E&req_id=20180706062805&sec_id=MD5&service=alipay.wap.auth.authAndExecute&v=2.0&sign=4749e1bf468964e5124f5a7f63bf114e",
        "status": 1,
        "actTitle": [],
        "actDescription": "",
        "defaultActive": true,
        "extend": true,
        "imgUrl": "https:\/\/image-shop.chuchujie.com\/culiu.cdn\/image\/201806\/13\/a0bb96266a8f5d2de7d93de1e954be9f1528874272_242_30.png"
      },
      {
        "name": "微信支付",
        "payname": "wechatpay",
        "icon": "https://m.chuchujie.com/img/weixin.png",
        "payurl": "https://wappaygw.alipay.com/service/rest.htm?_input_charset=utf-8&format=xml&partner=2088901623911411&req_data=%3Cauth_and_execute_req%3E%3Crequest_token%3EUTP71d6b9446534427ea8328e3e0949ed83%2440%3C%2Frequest_token%3E%3C%2Fauth_and_execute_req%3E&req_id=20180706062805&sec_id=MD5&service=alipay.wap.auth.authAndExecute&v=2.0&sign=4749e1bf468964e5124f5a7f63bf114e",
        "status": 1,
        "actTitle": [],
        "actDescription": "",
        "defaultActive": false,
        "extend": true,
        "imgUrl": "http:\/\/image-shop.chuchujie.com\/culiu.cdn\/image\/201609\/20\/d616c049d78b24b8054cc118713bad761474362620_162_28.png"
      },
      {
        "name": "QQ钱包",
        "payname": "qqpay",
        "icon": "https://m.chuchujie.com/img/qqpay.png",
        "payurl": "https://wappaygw.alipay.com/service/rest.htm?_input_charset=utf-8&format=xml&partner=2088901623911411&req_data=%3Cauth_and_execute_req%3E%3Crequest_token%3EUTP71d6b9446534427ea8328e3e0949ed83%2440%3C%2Frequest_token%3E%3C%2Fauth_and_execute_req%3E&req_id=20180706062805&sec_id=MD5&service=alipay.wap.auth.authAndExecute&v=2.0&sign=4749e1bf468964e5124f5a7f63bf114e",
        "status": 1,
        "actTitle": [],
        "actDescription": "",
        "defaultActive": false,
        "extend": false,
        "imgUrl": ""
      }
    ],
    "payActivity": {
      "actTitle": "",
      "actDesc": "",
      "active": false,
      "payType": "wechatpay"
    },
    "address": {
      "id": 46647813,
      "area_id": 110002007,
      "area_list": [
        "黑龙江省",
        "齐齐哈尔市",
        "梅里斯达斡尔族区"
      ],
      "street": "地方萨芬的",
      "user_name": "放散阀",
      "mobilephone": "18834345234",
      "province": "黑龙江省",
      "city": "齐齐哈尔市",
      "district": "梅里斯达斡尔族区",
      "is_default": 1,
      "isRealNameAuthed": false
    },
    "error_product_datas": [],
    "coupon": null,
    "bonusPoint": null,
    "request_data": {
      "url": "https:\/\/api-order.chuchujie.com\/api\/order\/makeorder",
      "delay": {
        "second": 0,
        "desc": "当前抢购人数较多\\n请您耐心等待"
      },
      "is_can_pay": {
        "status": true,
        "desc": "非常抱歉\\n宝贝已被抢光啦!"
      }
    },
    "isKepler": false,
    "couponShop": null,
    "unableAddress": {
      "notice": "抱歉，您所在地区超出商家发货范围，目前无法下单~",
      "ids": "",
      "status": true,
      "icon": "https:\/\/image-shop.chuchujie.com\/culiu.cdn\/image\/201710\/11\/af0dc198a969e78b53fd312969425c951507715865_30_30.png"
    }
  }
  //根据传递的orderData[0].statics_id判断来源于哪个页面（cart.vue或productdetail.vue）
  if(orderData[0].statics_id==141){
    //当从购物车页面转到订单确认页时，根据传递的商品信息orderInfo，读取购物车列表cartList.json，从中获取商品的详细信息confirmOrder，并更新其数量
    read("./cartList.json", function (cartList) {
      //1）从购物车列表cartList中找到给定username的购物车信息cart
      let cart = cartList.find((cart) => {
        return cart.username == username
      })
      //2）从cart.shop_list过滤出符合shop_id的order_list，保存在confirmOrder.order_list中
      orderData.forEach((order) => {
        let {shop_id, product_id, sku_values, buy_num} = order
        cart.shop_list.forEach((shop) => {
          if (shop.shop_id == shop_id) {
            //判断confirmOrder中的order_list是否存在shop_id的cOrder
            let flag = confirmOrder.order_list.some(cOrder => {
              return cOrder.shop_id == shop_id
            })
            if (!flag) {//如果不存在，则push；如果已经存在，则什么也不做
              confirmOrder.order_list.push(shop)
            }
          }
        })
      })
      //3）从confirmOrder.order_list.product_list中过滤出符合product_id和sku_values的product，并更新buy_num，先保存到item，然后替换product_list，最后重新写回confirmOrder。
      let item = []
      confirmOrder.order_list.forEach((cOrder) => {
        orderData.forEach((order) => {
          let {shop_id, product_id, sku_values, buy_num} = order
          if (cOrder.shop_id == shop_id) {//同一shop_id下，item持续push
            //由于每次循环，产品列表中只有一个是符合条件（product_id和sku_values），而forEach会遍历所有产品，性能不好；使用for循环+break代替，当遇到符合条件的产品之后，会跳出整个循环。
            let pList = cOrder.product_list
            for (let i = 0; i < pList.length; i++) {
              if (pList[i].product_id == product_id && pList[i].sku_values == sku_values) {
                pList[i].buy_num = buy_num //更新buy_num
                item.push(pList[i])//push符合条件的产品
                break
              }
            }
          }
        })
        cOrder.product_list = item//替换为sku_values相等的
        item = []//比较下一个cOrder之前，先清空item
        cOrder.current = cOrder.product_list.length
        cOrder.product_fee = cOrder.product_list.reduce((pre, next) => {
          return Number(pre) + Number(next.sales_price) * Number(next.buy_num)
        }, 0)
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        //计算当前shop_id下的优惠券费用cOrder.coupon_fee
        //同步读取文件：由于各项总费用的计算必须等到cOrder各项费用（product_fee，coupon_fee）都计算完成才能进行，所以必须同步执行
        let shopCouponList = JSON.parse(fs.readFileSync("./shopCoupon.json", 'utf8'))
        let shopCoupon = shopCouponList.find(item => item.shop_id == cOrder.shop_id)
        let flag = shopCoupon.coupon_list.some(coupon => coupon.accpted == 1 && cOrder.product_fee >= coupon.require_money)
        if (flag) {//只要有满足条件的，就给优惠券赋值
          shopCoupon.coupon_list.forEach(coupon => {
            if (coupon.accpted == 1 && cOrder.product_fee >= coupon.require_money) {
              cOrder.coupon_fee = coupon.face_value
            }
          })
        } else {//所有优惠券都不满足条件时，让其=0，否则为undefined，相加会导致NaN
          cOrder.coupon_fee = 0
        }
        cOrder.total_fee = Number(cOrder.product_fee) - Number(cOrder.coupon_fee)
        //产品总费用
        confirmOrder.product_fee = Number(confirmOrder.product_fee) + Number(cOrder.product_fee)
        //优惠券总费用
        confirmOrder.coupon_fee = Number(confirmOrder.coupon_fee) + Number(cOrder.coupon_fee)
        confirmOrder.all_fee = Number(confirmOrder.all_fee) + Number(cOrder.total_fee)
        //Number(confirmOrder.shipping_fee)//暂时忽略“海运费”
      })
      //console.log(confirmOrder);
      console.log(141);
      res.json(confirmOrder)
    })
  }else if (orderData[0].statics_id==37){
    //当从详情页直接购买时，读取产品详情列表productDetailList.json从中获取该产品详细信息
    let {shop_id, product_id, sku_values, buy_num} = orderData[0]
    read("./productDetailList.json", function (productList) {
      let product = productList.find(item => {
        //return item.product["product_id"] == product_id
        return item.product["product_id"] == "11001908355"
      })
      let p=product.product
      let product_list= [
        {
          "shop_id": p.shop_id,
          "product_id": p.product_id,
          "product_sku_id": "",
          "product_select": false,
          "buy_num": buy_num,
          "sales_price":p.sales_price,
          "title": p.title,
          "product_img_url": p.image_urls_head[0],
          "original_price": p.original_price,
          "sku_values": sku_values,
          "stocks": p.stocks,
          "id_delete": "0",
          "product_type": "0",
          "stateMap": 0,
          "message": "",
          "restrictionTag": "此商品限制最多购买498件"
        }
      ]
      let current = product_list.length
      let product_fee = product_list.reduce((pre, next) => {
        return Number(pre) + Number(next.sales_price) * Number(next.buy_num)
      }, 0)
      //计算当前shop_id下的优惠券费用coupon_fee，设置初始值为0
      let coupon_fee = 0
      //同步读取文件：由于各项总费用的计算必须等到各项费用（product_fee，coupon_fee）都计算完成才能进行，所以必须同步执行
      let shopCouponList = JSON.parse(fs.readFileSync("./shopCoupon.json", 'utf8'))
      let shopCoupon = shopCouponList.find(item => item.shop_id == shop_id)
      let flag = shopCoupon.coupon_list.some(coupon => coupon.accpted == 1 && product_fee >= coupon.require_money)
      if (flag) {//只要有满足条件的，就给优惠券赋值；不满足条件时，让其=0，否则为undefined，相加会导致NaN。
        shopCoupon.coupon_list.forEach(coupon => {
          if (coupon.accpted == 1 && product_fee >= coupon.require_money) {
            coupon_fee = coupon.face_value
          }
        })
      }
      let total_fee = Number(product_fee) - Number(coupon_fee)
      let cOrder={
        "shop_info": {
          "id": shop_id,
          "shop_header": p.shop_info.cn_name,
          "shop_message": null,
          "shop_type": p.shop_info.shop_type,
          "shopTag": null
        },
        "product_list": product_list,
        "marketing_activity": [],
        "shop_id": shop_id,
        "shop_select": false,
        "user_id": "94727437",
        "acceptable_coupon": "领券",
        "buy_give_activity": null,
        "current": current,
        "product_fee": product_fee,
        "coupon_fee": coupon_fee,
        "total_fee": total_fee
      }
      confirmOrder.order_list.push(cOrder)
      //产品总费用
      confirmOrder.product_fee = product_fee
      //优惠券总费用
      confirmOrder.coupon_fee = coupon_fee
      confirmOrder.all_fee = Number(cOrder.total_fee)+Number(confirmOrder.shipping_fee)//“海运费”
      //console.log(confirmOrder);
      console.log(37);
      res.json(confirmOrder)
    })
  }
})

//将确认去支付的产品信息加入订单列表orderList
app.post("/addToOrder", function (req, res) {
  let order = req.body//
  //console.log(order);
  let {orderDetail, order_status_type, userId, num, page, token} = order
  let orderInfo = {
    "username": "",
    "notice": {
      "order_validity_notice": "以上为2017年1月1日之后的订单，如有问题，请联系楚楚街客服"
    },
    "other_source": [
      {
        "template": "WEB",
        "query": "{\"url\":\"http:\\\/\\\/pintuan.chuchujie.com\\\/#\\\/order\\\/0\"}",
        "title": "拼划算订单",
        "count_non_payment": 0,
        "iconUrl": "http:\/\/ads-cdn.chuchujie.com\/FsVfcV6V3qSBx6HDl9u6HLMjXuft.png"
      }
    ],
    "payActivity": {},
    "oversea_pay_url": "https:\/\/m.chuchujie.com\/order\/order_pay.html?client_type=wap",
    "pay_list": [],
    "page": 1,
    "total_page": 1,
    "order_list": []
  }
  orderInfo.username = orderDetail.username
  orderInfo.pay_list = orderDetail.pay_list
  orderInfo.payActivity = orderDetail.payActivity

  let newOrder = {
    "id": 230473468,
    "order_sn": "180724210118S4R837437",
    "user_id": 94727437,
    "shop_id": 19083,
    "add_time": "2018-07-24 21:01:18",
    "pay_time": "1970-01-01 08:00:00",
    "receipt_time": 0,
    "order_type": "normal",
    "shipping_fee": "0",
    "coupon_fee": "0.00",
    "is_shipping": 0,
    "total_fee": "29.90",
    "pay_fee": "29.90",
    "refund_fee": 0,
    "return_goods_fee": 0,
    "pay_way": 0,
    "message": "",
    "ip_address": "106.38.158.162",
    "delivery_address": "黑龙江省齐齐哈尔市梅里斯达斡尔族区地方萨芬的",
    "delivery_name": "放散阀",
    "delivery_mobilephone": "18834345234",
    "deal_way": "41",
    "area_id": 110002007,
    "shipping_company_id": "0",
    "shipping_sn": "",
    "delivery_time": 0,
    "deal_rule_summary": "",
    "status_order": 0,
    "status_pay": 0,
    "status_delivery": 0,
    "status_feedback": 0,
    "status_refund": 0,
    "receiving_time": 0,
    "edit_log": "",
    "shop_message": "",
    "trade_model": "DB",
    "comment_status": 0,
    "from_mode": 0,
    "is_delete": 0,
    "verify_key": "",
    "javaSource": null,
    "pc": null,
    "orderProductsUserNewModelList": null,
    "requirPayMoney": null,
    "orderSnList": null,
    "product_list": [],
    "order_product_total_num": 1,
    "order_product_total_fee": 29.9,
    "tagList": [],
    "coupon_list": [],
    "shop_info": {},
    "buy_give_activity": {},
    "platform": "ccj",
    "order_status_type": 1,
    "wap_pay_url": "https:\/\/m.chuchujie.com\/order\/order_pay.html?client_type=wap&order_sn=180724210118S4R837437",
    "order_info_url": "https:\/\/ccj.chuchutong.com\/order\/order_info.html?order_sn=180724210118S4R837437",
    "deletable": false,
    "has_refunding": 1,
    "extra_order_time": 1532437278,
    "extra_limit_activity_ttl": 0,
    "flash_sale": 0,
    "server_time": "",
    "pay_notice": "",
    "affirm_delivery_time": "1970-01-01 08:00:00",
    "deduct_fee": 0,
    "bonusPointFee": 0
  }
  newOrder.shipping_fee = orderDetail.shipping_fee
  newOrder.coupon_fee = orderDetail.coupon_fee
  newOrder.is_shipping = 0
  newOrder.total_fee = orderDetail.product_fee
  newOrder.pay_fee = orderDetail.all_fee
  newOrder.delivery_address = orderDetail.address.area_list.join(",")
  newOrder.delivery_name = orderDetail.address.user_name
  newOrder.delivery_mobilephone = orderDetail.address.mobilephone
  newOrder.area_id = orderDetail.address.area_id
  newOrder.order_status_type = order_status_type
  newOrder.extra_order_time = new Date().getTime() / 1000 + 86400//设置一天（24*60*60秒）之后过期

  read("./orderCenter.json", function (orderCenter) {
    //是否存在该用户的订单信息
    let flag = orderCenter.every(item => item.username != orderDetail.username)
    if (flag) {//如果不存在，则在orderCenter中增加该用户的整体订单信息orderInfo
      orderDetail.order_list.forEach(order => {
        newOrder.user_id = order.user_id
        newOrder.shop_id = order.shop_id
        newOrder.add_time = formatTime()
        newOrder.product_list = order.product_list
        newOrder.order_product_total_num = order.current
        newOrder.order_product_total_fee = order.total_fee
        newOrder.shop_info = {
          "id": order.shop_info.id,
          "owner_id": "1525590594",
          "cn_name": order.shop_info.shop_header,
          "service_qq": [
            "2850746712"
          ],
          "status": "0",
          "brand_story": "",
          "often_address_name": "张炜铭",
          "often_cell_phone_number": "13128279131",
          "level": 0,
          "shop_op_type": "0",
          "freight_status": "0",
          "remote_area": "",
          "shop_type": "0",
          "freight_desc": "",
          "service_im_h5": "https:\/\/m.chuchujie.com\/details\/webIm.html",
          "service_type": 2,
          "chat_native": 19083,
          "chat_url": "https:\/\/m.chuchujie.com\/im\/kefuIM.html?mcc=1&shopId="
        }

        newOrder.id = 230473468
        newOrder.order_sn = "180724210118S4R837437"
        orderInfo.order_list.unshift(newOrder)
      })
      orderCenter.unshift(orderInfo)//增加整体订单信息
    } else {
      //如果存在，则在订单中心orderCenter中该用户名的订单信息orderInfo的订单列表order_list前unshift
      orderCenter.forEach(orderInfo => {
        if (orderInfo.username == orderDetail.username) {
          orderDetail.order_list.forEach(order => {
            newOrder.user_id = order.user_id
            newOrder.shop_id = order.shop_id
            newOrder.add_time = formatTime()
            newOrder.product_list = order.product_list
            newOrder.order_product_total_num = order.current
            newOrder.order_product_total_fee = order.total_fee
            newOrder.shop_info = {
              "id": order.shop_info.id,
              "owner_id": "1525590594",
              "cn_name": order.shop_info.shop_header,
              "service_qq": [
                "2850746712"
              ],
              "status": "0",
              "brand_story": "",
              "often_address_name": "张炜铭",
              "often_cell_phone_number": "13128279131",
              "level": 0,
              "shop_op_type": "0",
              "freight_status": "0",
              "remote_area": "",
              "shop_type": "0",
              "freight_desc": "",
              "service_im_h5": "https:\/\/m.chuchujie.com\/details\/webIm.html",
              "service_type": 2,
              "chat_native": 19083,
              "chat_url": "https:\/\/m.chuchujie.com\/im\/kefuIM.html?mcc=1&shopId="
            }

            newOrder.id = Number(orderInfo.order_list[0].id) + 1
            //newOrder.order_sn = orderInfo.order_list[0].order_sn + 1
            orderInfo.order_list.unshift(newOrder)
          })
        }
        //console.log(orderInfo.order_list);
      })
    }
    //console.log(orderCenter[0].order_list);
    write("./orderCenter.json", orderCenter, function () {
      //加入订单后，把购物车列表中的相应商品删除
      read("./cartList.json", function (cartList) {
        //1.循环购物车列表
        cartList.forEach(cart => {
          //2.从购物车列表中找到username相同的cart
          if (cart.username == orderDetail.username) {
            //3.循环从购物车选择的加入订单的商品
            orderDetail.order_list.forEach(order => {
              //4.循环cart，从中找到shop_id相同的商品列表
              cart.shop_list.forEach(shop => {
                if (shop.shop_id == order.shop_id) {
                  //5.从商品列表中找到sku_values相同的都过滤掉
                  order.product_list.forEach(item => {
                    shop.product_list = shop.product_list.filter(product => {
                      return product.sku_values != item.sku_values
                    })
                    //console.log(order.product_list);//两次，不同的值3-2
                  })
                  console.log(shop.product_list);//1次2
                }
              })
            })
          }
        })
        write("./cartList.json", cartList, function () {
          console.log("已从购物车中删除该商品")
          //res.send("已从购物车中删除该商品")
          res.send("已加入订单")
        })
      })
    })
  })
})
//根据orderInfo获取订单列表orderList
app.post("/getOrderList", function (req, res) {
  let orderInfo = req.body
  let {username, order_status_type} = orderInfo
  console.log(username);
  read("./orderCenter.json", function (orderCenter) {
    //判断是否存在该用户的订单信息
    let flag = orderCenter.every(item => item.username != username)
    console.log(flag);
    if (flag) {//如果不存在，则返回
      res.json([])
    } else {
      //如果存在，则在订单中心orderCenter中该用户名的订单信息orderInfo的订单列表order_list前unshift
      orderCenter.forEach(item => {
        if (item.username == username) {
          let orderList = item.order_list
          switch (Number(order_status_type)) {
            case 0:
              orderList = item.order_list
              res.json(orderList)
              break
            case 1:
              orderList = item.order_list.filter(order => order.order_status_type == 1)
              res.json(orderList)
              break
            case 2:
              orderList = item.order_list.filter(order => order.order_status_type == 2)
              res.json(orderList)
              break
            case 3:
              orderList = item.order_list.filter(order => order.order_status_type == 3)
              res.json(orderList)
              break
            case 4:
              orderList = item.order_list.filter(order => order.order_status_type == 4)
              res.json(orderList)
              break
          }
        }
      })
    }
  })
})
//取消某个订单
app.post("/cancelOrder", function (req, res) {
  let orderInfo = req.body
  let {username, id} = orderInfo
  console.log(username);
  read("./orderCenter.json", function (orderCenter) {
    //在订单中心orderCenter中该用户名的订单信息orderInfo的订单列表order_list前unshift
    orderCenter.forEach(item => {
      if (item.username == username) {
        item.order_list.forEach(order => {
          if (order.id == id) {
            order.order_status_type = 6
          }
        })
      }
    })
    write("./orderCenter.json", orderCenter, function () {
      let resData = {
        "status": 0,
        "info": "取消成功，交易关闭",
        "data": {
          "order_sn": "180729211158YPE457437",
          "order_status_type": 6,
          "deletable": true
        }
      }
      res.json(resData)
    })
  })
})
//删除某个订单
app.post("/deleteOrder", function (req, res) {
  let orderInfo = req.body
  let {username, id} = orderInfo
  console.log(username);
  read("./orderCenter.json", function (orderCenter) {
    //在订单中心orderCenter中该用户名的订单信息orderInfo的订单列表order_list前unshift
    orderCenter.forEach(item => {
      if (item.username == username) {
        item.order_list = item.order_list.filter(order => order.id != id)
      }
    })
    write("./orderCenter.json", orderCenter, function () {
      let resData = {
        "status": 0,
        "info": "删除成功",
        "data": {
          "order_sn": "180729211158YPE457437",
          "order_status_type": 8,
        }
      }
      res.json(resData)
    })
  })
})
//更新某些订单的order_status_type
app.post("/changeStatus", function (req, res) {
  let changeInfo = req.body
  let {username, changeList} = changeInfo
  read("./orderCenter.json", function (orderCenter) {
    //在订单中心orderCenter中该用户名的订单信息orderInfo的订单列表order_list前unshift
    orderCenter.forEach(item => {
      if (item.username == username) {
        changeList.forEach(change => {
          item.order_list.forEach(order => {
            if (change.id == order.id) {
              order.order_status_type = 6
            }
          })
        })
      }
    })
    write("./orderCenter.json", orderCenter, function () {
      let resData = {
        "status": 0,
        "info": "order_status_type更新成功",
        "data": {
          "order_sn": "180729211158YPE457437",
          "order_status_type": 6,
        }
      }
      res.json(resData)
    })
  })
})

//根据orderInfo获取支付方式列表payList
app.post("/getPayList", function (req, res) {
  let orderInfo = req.body
  let {username, id} = orderInfo
  console.log(username);
  let payList = []
  read("./orderCenter.json", function (orderCenter) {
    //从订单中心orderCenter中获取该用户名的支付方式列表pay_list
    orderCenter.forEach(item => {
      if (item.username == username) {
        payList = item.pay_list
      }
    })
    res.json(payList)
  })
})

//获取店铺信息
app.get("/shop",function (req,res) {
  let shopId=req.query.shopId
  console.log(shopId);
  read("./shopList.json",function (shopList) {
    let shop=shopList.find(shop=>shop.shop_id==shopId)
    res.json(shop)
  })


})
//获取店铺中的所有产品
app.get("/allproductlist", function (req, res) {
  console.log(req.query);
  let shopId = req.query.shopId
  let iscur = req.query.iscur
  read("./shopList.json",function (shopList) {
    let shop=shopList.find(shop=>shop.shop_id==shopId)
    let allProductList=shop.get_product_all_list.list
    //根据cur返回产品列表
    //数组按tab值排序，默认按人气（switch是全等===，数值类型不会自动转换，因此统一用Number处理成数值类型再比较）
    switch (Number(iscur)) {
      case 0://"人气"
        break
      case 1://"销量"
        allProductList.sort(function (a, b) {
          return parseInt(b.sales_num) - parseInt(a.sales_num)
        })
        break
      case 2://"最新"
        allProductList.sort(function (a, b) {
          return parseInt(b.ctime) - parseInt(a.ctime)

        })
        break
      case 3://"价格"从低到高
        allProductList.sort(function (a, b) {
          return parseInt(a.sales_price) - parseInt(b.sales_price)
        })
        break
      case -3://"价格"从高到低
        allProductList.sort(function (a, b) {
          return parseInt(b.sales_price) - parseInt(a.sales_price)
        })
        break
    }
    console.log("allProductList:" + allProductList.length);
    if (allProductList.length > 20) {
      allProductList = allProductList.filter((item, index) => {
        return index < 20
      })
    }
    res.json(allProductList)
  })
})



//分类，获取分类列表或某个分类
let categoryList = require("./categoryList.json")

app.get("/category", function (req, res) {
  console.log(req.query);
  let female = req.query.female
  let shopList = (female === "false") ? categoryList.male : categoryList.female;

  //根据是否存在id，判断是返回某一个数据brand，还是返回全部数据brandList
  let id = parseInt(req.query.id)
  if (!isNaN(id)) {
    let goods = shopList.find(item => item.id === id)
    if (!goods) {
      goods = {}
    } else {
      res.json(goods);
    }
  } else {//查找全部数据
    res.json(shopList)
  }
})

//搜索，按照tab项获取搜索列表
//let searchList = require("./searchList.json")
app.get("/search", function (req, res) {
  //console.log(req.query);
  let search = req.query.s
  let iscur = req.query.c
  let resultList = []//根据search搜索相关商品，保存到resultList
  if (search) {
    console.log("存在");
    read("./searchList.json",function (searchList) {
      //从数据库searchList.json中搜索title和description中的相关字
      resultList = findOut(searchList, search)
      //数组按tab值排序，默认按人气（switch是全等===，数值类型不会自动转换，因此统一用Number处理成数值类型再比较）
      switch (Number(iscur)) {
        case 0://"人气"
          break
        case 1://"销量"
          resultList.sort(function (a, b) {
            return parseInt(b.collection) - parseInt(a.collection)
          })
          break
        case 2://"最新"
          resultList.sort(function (a, b) {
            return parseInt(b.collect) - parseInt(a.collect)
          })
          break
        case 3://"价格"从低到高
          resultList.sort(function (a, b) {
            return parseInt(a.newPrice) - parseInt(b.newPrice)
          })
          break
        case -3://"价格"从高到低
          resultList.sort(function (a, b) {
            return parseInt(b.newPrice) - parseInt(a.newPrice)
          })
          break
      }
      //console.log("resultList:" + resultList.length);
      if (resultList.length > 20) {//数据大于20条时，只显示前20条
        resultList = resultList.filter((item, index) => {
          return index < 20
        })
      }
      res.json(resultList)
    })
  } else {
    console.error("不存在");
    //不存在时，随机返回20条数据
  }
})

//根据输入值从tipList.json获取提示词
app.get("/tip", function (req, res) {
  let tip = req.query.tip
  console.log(tip);
  let ary = []
  read("./tipList.json",function (tipList) {
    console.log(tipList.length);
    for (let i = 0, len = tipList.length; i < len; i++) {
      if (tipList[i].key.indexOf(tip) >= 0) {
        //console.log(tipList[i]);
        ary.push(tipList[i])
        //console.log("ary:"+ary);
      }
    }
    res.json(ary)
  })
})

//个人中心
//注册
app.post('/user/register', function (req, res) {
  //默认注册的用户信息
  let defaultUserinfo = {
    "id": "94727437",
    "username": "",
    "password": "",
    "nickname": "楚楚动人",
    "login": true,
    "head_image_url": "http://thirdwx.qlogo.cn/mmopen/vi_32/7xuoicUQqhptkqh66XfKrI1qQKEvGuvEyqNnhlYIUavHDgDPTsbP0m2wkA5RvfqFBwkVFlArVibkP1pXtW9X0XSw/132",
    "tel": "",
    "gender": 1,
    "email": "",
    "ctime": 1520951224,
    "is_shangjia": "N",
    "u_type": 0,
    "ascription": 1,
    "occupation": "初入社会",
    "real_name": "NONE",
    "birthday": "1969-02-02",
    "id_number": "0",
    "location": "北京",
    "delivery-address": []
  }
  let {username, password} = req.body//解构赋值：req.body={username：，password：}
  read('./userList.json', function (userList) {
    let flag = userList.some((item) => {
      return item.username === username
    })
    if (flag) {
      res.send("手机号已经存在，请直接登录")
      return
    }
    //更新默认用户信息
    defaultUserinfo.username = username
    defaultUserinfo.tel = username
    defaultUserinfo.password = password
    userList.push(defaultUserinfo)
    write('./userList.json', userList, function () {
      res.send("注册成功")
    })
  })
})
//登录
app.post('/user/login', function (req, res) {
  let {username, password} = req.body//解构赋值
  read('./userList.json', function (userList) {
    let flag = userList.every((item, index) => {
      return item.username !== username
    })
    if (flag) {
      res.send("账号不存在")
    } else {
      userList.forEach((item) => {
        if (item.username === username) {
          if (item.password === password) {//登录成功
            res.send(item)
          } else {
            res.send(null)
          }
        }
      })
    }
  })
})
//更新
app.post('/user/updateUserinfo', function (req, res) {
  let userinfo = req.body//
  //查找username对应用户
  read('./userList.json', function (userList) {
    for (let i = 0; i < userList.length; i++) {
      if (userList[i].username === userinfo.username) {
        userList[i] = userinfo
      }
    }
    write('./userList.json', userList, function () {
      res.send("更新成功")
    })
  })
})

//收货地址
//获取
app.get('/user/getAddress', function (req, res) {
  let username = req.query.u
  console.log(username);

  read('./addressList.json', function (addressList) {
    addressList.forEach((item) => {
      if (item.username === username) {
        res.send(item.consigneeList)
      }
    })
  })
})
//添加或更新
app.post('/user/updateAddress', function (req, res) {
  let {username, consigneeList} = req.body
  read('./addressList.json', function (addressList) {
    for (let i = 0; i < addressList.length; i++) {
      if (addressList[i].username === username) {
        addressList[i].consigneeList = consigneeList
      }
    }
    write('./addressList.json', addressList, function () {
      res.send("更新成功")
    })
  })
})


app.listen(3000)
