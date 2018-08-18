<template>
  <div class="tab">
    <router-link to="/home">
      <i class="iconfont icon-icon-test"></i>
      <span>首页</span>
    </router-link>
    <router-link to="/bargain">
      <i class="iconfont icon-99"></i>
      <span>9块9</span>
    </router-link>
    <router-link to="/classification">
      <i class="iconfont icon-classify"></i>
      <span>分类</span>
    </router-link>
    <router-link to="/personal">
      <i class="iconfont icon-smile"></i>
      <span>我的</span>
    </router-link>
  </div>
</template>
<style scoped lang="less">
  .tab{
    display: flex;
    justify-content: center;
    a{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #8d8d8d;
    }
    a.router-link-active{
      color: #eb0046;
    }
  }

</style>
