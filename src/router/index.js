import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


//前端路由，当在路由之间切换时，页面保持原先的滚动位置，或者滚到顶部
/*const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position
  }
}*/

export default new Router({
  mode: "history",//默认不设置是hash模式，url路径中带#
  //scrollBehavior:scrollBehavior,//
  scrollBehavior(to, from, savedPosition){
    if (savedPosition) {
      return savedPosition
    } else {
      return {//当返回一个空对象时，不发生滚动
        //对于所有路由导航，让页面滚动到顶部。
        // x: 0,y: 0
      }
    }
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
      name:"me",
    },
    {
      path: '/home',
      component: () => import("../components/home.vue"),
      name:"home",
      meta: {keepAlive: true,title:"楚楚街-每天为您精选..."}
    },
    {
      path: '/bargain',
      component: () => import("../components/bargain.vue"),
      name:"bargain",
      meta: {keepAlive: true,title:"9块9"}
    },
    {
      path: '/classification',
      component: () => import("../components/classification.vue"),
      name:"classification",
      meta: {keepAlive: true,title:"分类"}
    },
    {
      path: '/personal',
      component: () => import("../components/personal.vue"),
      name:"personal",
      meta: {title:"个人中心"},
      //嵌套路由：移动端一般一级路由
      children:[
        {//收藏
          path: 'collection',
          component: () => import("../components/personal/collection.vue"),
          name:"collection",
          meta: {keepAlive: true,title:"我的收藏"},
        },
        {//优惠券
          path: 'coupon',
          component: () => import("../components/personal/coupon.vue"),
          name:"coupon",
          meta: {keepAlive: true,title:"优惠券"},
        },
      ]
    },
    {//登录
      path: '/login',
      component: () => import("../components/personal/login.vue"),
      name:"login",
      meta: {title:"登录"},
    },
    {//注册
      path: '/register',
      component: () => import("../components/personal/register.vue"),
      name:"register",
      meta: {title:"注册"},
    },
    {//个人信息
      path: '/usermsg',
      component: () => import("../components/personal/usermsg.vue"),
      name:"usermsg",
      meta: {title:"个人信息"},
    },
    {//收货地址
      path: '/address',
      component: () => import("../components/personal/address.vue"),
      name:"address",
      meta: {title:"收货地址"},
    },
    {//测试地址插件
      path: '/area-data',
      component: () => import("../components/personal/area-data.vue"),
      name:"area-data",
      meta: {title:"收货地址"},
    },
    {
      path: '/search',
      component: () => import("../components/search.vue"),
      name:"search",
      meta:{keepAlive: true,title:"搜索"}
    },
    {
      path: '/cart',
      component: () => import("../components/cart.vue"),
      name:"cart",
      meta:{title:"购物车"}
    },
    {
      path: '/webpay',
      component: () => import("../components/webpay.vue"),
      name:"webpay",
      meta:{title:"订单确认"}
    },
    {
      path: '/alipay',
      component: () => import("../components/alipay.vue"),
      name:"alipay",
      meta:{title:"支付宝"}
    },
    {
      path: '/orderpay',
      component: () => import("../components/orderpay.vue"),
      name:"orderpay",
      meta:{title:"支付方式"}
    },
    {
      path: '/order',
      component: () => import("../components/order.vue"),
      name:"order",
      meta:{title:"订单列表"}
    },
    {
      path: '/refund',
      component: () => import("../components/refund.vue"),
      name:"refund",
      meta:{title:"售后/退款"}
    },

    {
      path: '/branddetail/:id',
      component: () => import("../components/branddetail.vue"),
      name: 'branddetail',
      meta: {title: "品牌详情页"}
    },
    {//某个产品详情页
      path: '/details/productdetail/:id',
      component: () => import("../components/productdetail.vue"),
      name: 'productdetail',
      meta: {title: "产品详情页"}
    },
    {//详情页中"查看更多"
      path: '/details/more',
      component: () => import("../components/productdetail/more.vue"),
      name: 'more',

    },
    {//店铺详情页
      path: '/details/shop/:id',
      component: () => import("../components/productdetail/shop.vue"),
      name: 'shop',
    },
    {
      path: '/categorydetail/:id',
      component: () => import("../components/categorydetail.vue"),
      name: 'categorydetail',
    },
    {
      path: '/pay',
      component: () => import("../components/pay.vue"),
      name: 'pay',
    },
    {
      path: '*',
      redirect: '/home',
      name:"ome",//因为name不能重复，所以这里随便起了一个名字
    },
  ]
})

















