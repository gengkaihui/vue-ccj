/**
 * Created by kaihui on 2018/6/11.
 */
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'//设置请求的基本路径
// axios.interceptors.response.use(res => res.data)//将返回的结果res处理成res.data
axios.interceptors.response.use(res => {
  console.log(res);//{data: "注册成功", status: 200, statusText: "OK", …}
  return res.data
})
//获取轮播图数据
export let getSlides = () => {
  return axios.get('/slides')
}

//获取品牌列表：传递参数female
export let getBrandList = (female) => {
  return axios.get(`/brand?female=${female}`)
}

//获取某个品牌的详细信息
export let findOneBrand = (id) => {
  return axios.get(`/brand?id=${id}`)
}

//获取商品列表：传递参数female
export let getProductList = (female) => {
  return axios.get(`/productlist?female=${female}`)
}

//获取分类列表：传递参数female
export let getCategoryList = (female) => {
  return axios.get(`/category?female=${female}`)
}
//获取某个分类的详细信息
export let findOneCategory = (id) => {
  return axios.get(`/category?id=${id}`)
}

//获取搜索结果
export let getSearchList=(search,iscur)=>{
  return axios.get(`/search?s=${search}&c=${iscur}`)
}

//获取热门搜索结果
export let getHotList=()=>{
  return axios.get(`/hot`)
}

//根据输入值获取提示词
export let getTipList=(tip)=>{
  return axios.get(`/tip?tip=${tip}`)
}

//获取某个产品的信息
export let findOneProduct = (product_id) => {
  return axios.get(`/product?id=${product_id}`)
}
//详细信息
export let getProductDetail = (id) => {
  return axios.get(`/product/detail?id=${id}`)
}
//评价
export let getProductEvaluation= (data) => {
  return axios.post(`/product/evaluation`,data)
}
//属性
export let getProductAttribute = (id) => {
  return axios.get(`/product?id=${id}`)
}
//推荐
export let getProductRecommend = (id) => {
  return axios.get(`/product?id=${id}`)
}

//将某个产品加入购物车
export let addToCart=(productInfo)=>{
  return axios.post(`/addToCart`,productInfo)
}
//进入购物车，获取购物车列表
export let getCartList=(username)=>{
  return axios.get(`/cart?u=${username}`)
}
//购物车中获取店铺优惠券
export let getShopCoupon=(shop_id)=>{
  return axios.get(`/shopcoupon?sid=${shop_id}`)
}
//购物车中：反馈已经领取优惠券
export let acceptCoupon=(shop_id,coupon_id)=>{
  return axios.post(`/shopcoupon?sid=${shop_id}&cid=${coupon_id}`)
}
//订单确认：获取订单详细信息
export let getOrderDetail=(orderInfo)=>{
  //console.log(orderInfo);
  return axios.post(`/confirmOrder`,orderInfo)
}
//将确认去支付的产品信息加入订单列表orderList
export let addToOrder=(order)=>{
  console.log(order);
  return axios.post(`/addToOrder`,order)
}
//订单页order.vue
//1）将确认去支付的产品信息加入订单列表orderList
export let getOrderList=(orderInfo)=>{
  console.log(orderInfo);
  return axios.post(`/getOrderList`,orderInfo)
}
//2）取消某个订单
export let cancelOrder=(orderInfo)=>{
  console.log(orderInfo);
  return axios.post(`/cancelOrder`,orderInfo)
}
//3）删除某个订单
export let deleteOrder=(orderInfo)=>{
  console.log(orderInfo);
  return axios.post(`/deleteOrder`,orderInfo)
}
//4）更新某些订单的order_status_type
export let changeStatus=(changeInfo)=>{
  console.log(changeInfo);
  return axios.post(`/changeStatus`,changeInfo)
}
//支付方式页orderpay.vue：获取支付方式列表
export let getPayList=(orderInfo)=>{
  console.log(orderInfo);
  return axios.post(`/getPayList`,orderInfo)
}

//根据shopId获取店铺信息
export let getShopInfo=shopId=>axios.get(`/shop?shopId=${shopId}`)
//获取店铺中所以产品
export let getAllProductList=(shopId,iscur)=>axios.get(`/allproductlist?shopId=${shopId}&iscur=${iscur}`)


//个人中心
//注册
export let register=(userinfo)=>{
  return axios.post(`/user/register`,userinfo)
}

//登录
export let login=(userinfo)=>{
  return axios.post(`/user/login`,userinfo)
}

//更新用户信息
export let updateUserinfo=(userinfo)=>{
  //console.log(userinfo);
  return axios.post(`/user/updateUserinfo`,userinfo)
}

//获取某个用户username的地址列表
export let getAddress=(username)=>{
  console.log(username);
  return axios.get(`/user/getAddress?u=${username}`)
}

//更新/添加收货地址
export let updateAddress=(user)=>{
  return axios.post(`/user/updateAddress`,user)
}



