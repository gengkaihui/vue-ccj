// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//使用import命令引入组件时，可以使用在“webpack.base.conf”中配置的别名，如@表示resolve('src'),
import Vue from 'vue'
import App from './App.vue'//引入自己写的组件，需要用“./”
import router from './router'
import "./assets/reset.min.css"
import Mint from "mint-ui"//mint-ui
import "mint-ui/lib/style.css"
import ElementUI from 'element-ui';//饿了么UI
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyLoad from "vue-lazyload"//懒加载插件
import VueAwesomeSwiper from "vue-awesome-swiper"//轮播图插件
import "swiper/dist/css/swiper.css"
import 'vue-area-linkage/dist/index.css';//也可以不引入，自己写样式
import VueAreaLinkage from 'vue-area-linkage';//省市区三级联动选择器
import filters from "./common/filters/filters"//用于处理浮点数小数位数

Vue.config.productionTip = false

//初始化放在Vue.use(Mint)之前
Vue.use(VueLazyLoad,{
  loading:'./assets/img/load.png',
  // error:'./static/img/error-pic.jpeg'
})
Vue.use(Mint)
Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper)
Vue.use(crypto)
Vue.use(VueAreaLinkage)
//全局方法Vue.filter()统一注册自定义过滤器
Object.keys(filters).forEach(key => {//返回filters对象中属性名组成的数组
  Vue.filter(key, filters[key])
})

//全局钩子：每次进入路由之前都会执行，可以用于拦截，做一些设置
router.beforeEach(function (to,from,next) {
  if(to.path==='/personal'&&from.path==='/usermsg'){
    console.log("to"+to)
    console.log("from"+from)
  }
  document.title=to.meta.title//给即将进入的页面设置标题为即将进入路由的路由元中的title属性
  if(to.path==='/bargain'){//设置条件，根据条件拦截
    next()
  }else {
    next()
  }
})


new Vue({
  el: '#app',
  router,//通过配置router参数注入路由，从而让整个应用都有路由功能
  components: { App },
  template: '<App/>'
})
