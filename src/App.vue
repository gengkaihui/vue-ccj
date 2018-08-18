<template>
  <div id="app" class="app">
    <transition name="fadeIn">
      <!--vue2.1.0之后，keep-alive新加两个属性:include(包含的组件缓存生效)与exclude(排除的组件不缓存，优先级大于include)。-->
      <!--<keep-alive :include=['home','bargain','classification','search']>-->
      <keep-alive>
        <!--<router-view v-if="$route.meta.keepAlive" class="content"></router-view>-->
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fadeIn">
      <keep-alive>
        <!--<router-view v-if="!$route.meta.keepAlive"  class="content"></router-view>-->
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <tab class="foot"></tab>
    <download class="load"></download>
  </div>
</template>
<script>
  import tab from "./base/tab.vue"
  import download from "./base/download.vue"
  export default {
    name: 'App',
    components: {tab, download}
  }
</script>
<style lang="less">
  .app {
    /*写产品详情推荐时新增加的*/
    h1, h2, h3, p, div, ul, li, span, em, dl, dt, dd, input, textarea, img {
      margin: 0;
      padding: 0;
    }
    h1, h2, h3, strong, em, i {
      font-style: normal;
      font-weight: normal;
    }
    textarea, input, button, select {
      outline: 0;
      border: 0;

    }
    .iconfont {
      font-size: 25px;
    }
    overflow: hidden;
    /*页面内容区样式*/
    .content {
      position: fixed;
      top: 42px;
      bottom: 50px;
      overflow: auto;
      width: 100%;
    }
    /*底部导航样式，对应tab.vue组件*/
    .foot {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 50px;
    }
    /*APP下载样式，对应download.vue组件*/
    .download {
      position: fixed;
      bottom: 50px;
      left: 0;
      padding: 3px 0;
      width: 100%;
      background: rgba(0, 0, 0, 0.6);
      z-index: 10000;
      .content {
        position: relative;
        top: 0;
        padding: 12px 120px 0 100px;
        width: auto;
        height: 40px;
        color: #fff;
        font-size: 13px;
        line-height: 29px;
        .close {
          position: absolute;
          top: 50%;
          left: 3px;
          width: 20px;
          height: 20px;
          display: inline-block;
          margin-top: -15px;
          color: #999;
          font-size: 20px;
        }
        img {
          position: absolute;
          top: 50%;
          left: 28px;
          width: 50px;
          height: 50px;
          margin-top: -25px;
        }
        .load_btn {
          position: absolute;
          top: 50%;
          right: 5px;
          width: 90px;
          height: 30px;
          margin-top: -20px;
          padding: 5px 0 5px 15px;
          background: #77ae00 url("./assets/img/load.png") no-repeat 8px center;
          background-size: 16px 18px;
          border-radius: 5px;
          color: #fff;
          font-size: 14px;
          text-align: center;
          line-height: 15px;
        }
      }
    }
    /*页面切换动画，对应transition组件*/
    .fadeIn-enter {
      opacity: 0;
    }
    .fadeIn-enter-active {
      transition: all 0.3s linear;
    }
    .fadeIn-leave-active {
      transition: all 0.3s linear;
      opacity: 0;
    }
    //收货地址插件样式
    .area {
      display: inline-block;
      width: 250px;
      color: #000;
      .area-select-wrap {
        display: flex;
        .area-select {
          flex: 1;
          margin: 0 5px 0 0;
          font-size: 12px;
          height: 28px;
        }
        .area-select .area-selected-trigger {
          display: inline;
          font-size: 12px;
        }
      }
    }
  }
</style>
