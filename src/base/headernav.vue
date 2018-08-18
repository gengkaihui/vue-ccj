<template>
  <div class="header">
    <div class="search">
      <router-link to="/search">
        <i class="iconfont icon-search"></i>
        <!--搜索按钮-->
      </router-link>
    </div>

    <ul class="nav">
      <li :class="{active:!female}" @click="changeMale">
        <a>男生精选</a>
      </li>
      <li :class="{active:female}" @click="changeFemale">
        <a>女生精选</a>
      </li>
    </ul>
    <div class="cart">
      <router-link to="/cart">
        <i class="iconfont icon-cart"></i>
        <!--购物车-->
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    props: ["female"],
    methods: {
      changeFemale(){
        this.$emit("change-female")
      },
      changeMale(){
        this.$emit("change-male")
      }
    }
  }
</script>
<style scoped lang="less">
  .header {
    position: fixed;
    top: 0;
    left: 0;
    padding: 7px 0;
    width: 100%;
    height: 28px;
    line-height: 28px;
    background-color: #ffffff;
    .iconfont {
      color: #999;
    }
    .search {
      position: absolute;
      left: 15px;
      display: inline-block;
    }
    .nav {
      position: absolute;
      left: 50%;
      margin: 0 0 0 -80px;
      padding: 0;
      width: 160px;
      height: 26px;
      line-height: 26px;
      border: 1px solid #fc8c84;
      border-radius: 2px;
      li {
        display: inline-block;
        float: left;
        width: 80px;
        height: 26px;
        line-height: 26px;
        text-align: center;
      }
      li.active {
        color: #ffffff;
        background-color: #fc8c84;
      }
    }

    .cart {
      position: absolute;
      right: 15px;
      display: inline-block;
    }

  }
</style>
