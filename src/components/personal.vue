<template>
  <div>
    <!--个人中心-->
    <div v-if="flag" class="bg_f3">
      <div class="loading" v-if="loading">
        <div>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAANlBMVEUAAADfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTBHesYPAAAAEnRSTlMA/fF5o97FSww1Za0f1IwpVkAcANuOAAABh0lEQVRIx+2U27KDIAxFIwQMNy///7OnVSSMgJXj9K1rpi/K6k7ZmUIbcmIYhCP4B2aImH6XhkR/tmPZdcuCZdEtDxnflmcMStursWk2xlPNxWFD+eaFmXHD19yIoKIqduv2zGexviR+TFC7VlFfzzW5RXR4W/HjocbInBdWDcxcc+lC1plMvcl207ZyA1Qx+YU1517rMhXBjBfRldCA2C0gfOthhSb0nnz1UMcbgmsIfgBNQYgw0W3BWCntXtisxIaab2ZZuWFfaaRERN3LtjJiASaRmG7NLBMGAsvhZjBHi4w7ssx4JD8a+9GFPanq0ZI8Wc8fQP7jCWo8l0Ep5Uzb9BIRp6XmarWzNBvCnUqpTh2YRi4eSDgxqoSryxIT569HxdRlZGwxNeNrLiEjL2TqlSW7ASIWteYRJ5bPhXiWZXzi9IaLv2JhmaAVreMrpyOOTtEjQMM+jlqdsMcKslvgpXP8BlnG/F9gIfiMzoCCL8nl2B2UF9YL5VX1UC5JP9a91KuZ/wCIaBQFmaG1twAAAABJRU5ErkJggg=="
            alt=""><br>
          加载中...
        </div>
      </div>
      <!--头像部分 start-->
      <div class="top positionR" id="header">
        <img src="../assets/img/user_bg.jpg" class="img100 isBack" alt="背景图片">
        <a v-if="login" class="user_msg" @click="toUserMsg">
          <img :src="userinfo.head_image_url" class="photo" alt="头像">
        </a>
        <router-link v-else class="user_msg" :to="{name:'login'}" @click="flag=false">
          <img src="../assets/img/default_photo.png" class="photo" alt="默认头像" @click="">
        </router-link>
        <p class="name nameSet" v-if="login">{{userinfo.nickname}}</p>
        <!--未登录时显示-->
        <p class="name noLogin" v-else="">
          <router-link class="login_button" :to="{name:'login'}" @click="flag=false">
            <span class="ft3">登录</span>
          </router-link>
          <router-link class="reg_button" :to="{name:'register'}" @click="flag=false">
            <span class="ft3">注册</span>
          </router-link>
        </p>
        <div class="information" id="messageBtn">
          <i class="iconfont icon-msg"></i>
        </div>
      </div>
      <!--第一部分 start-->
      <ul class="user_sider" id="headMenu">
        <li data-url="/pay/shoppingcar.html" class="click_btn">
          <!--<router-link :to="{name:'cart',params:{id:a.id}}">-->
          <!--进入购物车时，应传递个人信息，是否登录-->
          <router-link :to="{name:'cart'}">
          <span class="cart">
            <i class="iconfont icon-cart"></i>
          </span>
            <p class="ftA">购物车</p>
          </router-link>
        </li>
        <li data-url="/user/collection.html" class="click_btn">
          <router-link :to="{name:'collection'}">
            <span class="collection"><i class="iconfont icon-collection"></i></span>
            <p class="ftA">我的收藏</p>
          </router-link>
        </li>
        <li data-url="/user/coupon.html" class="click_btn">
          <router-link :to="{name:'coupon'}">
          <span class="coupon">
            <i class="iconfont icon-coupon"></i>
          </span>
            <p class="ftA">红包/优惠券</p>
          </router-link>
        </li>
      </ul>
      <!--第二部分 start-->
      <div class="order">
        <ul class="total_order">
          <li class="click_btn" data-url="/js/order/vueorder/html/orderindex.html#/total">
            <a href="javascript:;" @click="allOrder">
              <span class="ft3">全部订单</span>
              <i class="iconfont icon-right"></i>
            </a>
          </li>
        </ul>
        <ul class="order_sider bd_t_f3" id="orderMenu">
          <li v-for="(nav,index) in navList" :key="index">
            <a href="javascript:;" class="Bdisplay" @click="toOrder(index)">
          <span class="Idisplay positionR">
            <i class="iconfont" :class="[nav.icon]"></i>
          </span>
              <p class="ftA">{{nav.name}}</p>
            </a>
          </li>
        </ul>
      </div>
      <!--第三部分 start-->
      <ul class="total_order mt10 mb10">
        <li class="click_btn" data-url="http://huodong.chuchujie.com/sign/index.html" id="integral">
          <a href="javascript:;">
            <span class="ft3">我的积分</span>
            <i class="iconfont icon-right"></i>
          </a>
        </li>
        <li class="click_btn help" id="help" data-url="https://wx.chuchujie.com/static/help/index.html">
          <a href="https://wx.chuchujie.com/static/help/index.html?pro=tps">
            <span class="ft3">帮助与反馈</span>
            <i class="iconfont icon-right"></i>
          </a>
        </li>
        <li class="downLoad">
          <a href="http://res.chuchujie.com/download/?package=chuchujie&ver=latest&channel=QD_cpa4&ref=zhuzhan">
            <span class="ft3">下载楚楚街app立即领12元</span>
            <i class="iconfont icon-right"></i>
          </a>
        </li>
      </ul>
      <!--文本展示弹窗 start-->
      <div v-if="warn" class="layer_text"><span>{{tip}}</span></div>
      <!--安全认证-->
      <div class="certificate">
        <a id="___szfw_logo___" href="https://credit.szfw.org/CX95070000388220170717.html" target="_blank">
          <img src="http://icon.szfw.org/app.png" border="0">
        </a>
      </div>
    </div>
    <!--登录/注册页面-->
    <!--<router-view v-else class="mask"></router-view>-->
  </div>
</template>
<script>
  export default {
    data(){
      return {
        loading: false,//默认为true，加载中，当数据加载完毕，为false。
        userinfo: {},
        username:"",
        login: false,
        flag: true,
        warn: false,
        tip: "",
        navList: [
          {icon: "icon-obligation", name: "待付款"},
          {icon: "icon-delivery", name: "待发货"},
          {icon: "icon-receive", name: "待收货"},
          {icon: "icon-comment", name: "待评价"},
          {icon: "icon-exchange", name: "退换货"},
        ],
      }
    },
    created(){
      this.getData()
    },
    watch:{
        '$route':function(t,f){
            if(f.name=="login"){//当从登录页面返回时，重新加载数据
                this.getData()
            }
        }
    },
    methods: {
      getData(){
        //获取本地存储的userinfo
        let userinfo = localStorage.getItem("m_ccj_userinfo")
        //如果没有，则userinfo为null，布尔值为false，什么也不做，否则走下一步
        if (!userinfo) {
          return
        }
        this.userinfo = JSON.parse(userinfo)
        this.login = this.userinfo.login
        this.username = this.userinfo.username
      },
      toUserMsg(){
        this.$router.push({name: 'usermsg'})
      },
      allOrder(){
        let orderInfo = {
          "username": this.username,
          "order_status_type": 0,
          "userId": "",
          "num": "20",
          "page": 1,
          "token": "ccj051564032088d4f0000947274372a1564032088"
        }
        this.$router.push({name: 'order', params: {orderInfo:orderInfo}})
      },
      toOrder(index){
        let orderInfo = {
          "username": this.username,
          "order_status_type": index+1,//由于0在另一个ul列表中，所以这里的第一个应该为1
          "userId": "",
          "num": "20",
          "page": 1,
          "token": "ccj051564032088d4f0000947274372a1564032088"
        }
          if(index<4){//跳转到“订单”页
            this.$router.push({name: 'order', params: {orderInfo:orderInfo}})
          }else if(index==4){//跳转到“退换货”页
            this.$router.push({name: 'refund', params: {orderInfo:orderInfo}})
          }
      }
    },
  }
</script>
<style scoped lang="less">
  .bg_f3 {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 50px;
    right: 0;
    background-color: #f3f3f3;
  }

  .bg_fff {
    background-color: #fff;
  }

  .bd_t_f3 {
    border-top: 1px solid #f3f3f3;
  }

  .mt10 {
    margin-top: 10px;
  }

  .mb10 {
    margin-bottom: 10px;
  }

  .loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #FFF;
    z-index: 500;
    div {
      position: absolute;
      top: 50%;
      margin-top: -40px;
      left: 0;
      width: 100%;
      color: #000;
      font-size: 0.8rem;
      text-align: center;
      img {
        width: 20px;
        height: 20px;
        -webkit-animation: 5s loading linear infinite;
      }
    }
  }

  .top {
    position: relative;
    width: 100%;
    height: 170px;
    .img100 {
      width: 100%;
      height: 100%;
    }
    .user_msg {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -31px 0 0 -31px;
      width: 60px;
      height: 60px;
      border: 3px solid rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      overflow: hidden;
      .photo {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      position: absolute; //positionA
      top: 50%;
      left: 0;
      margin-top: 45px;
      width: 100%;
      color: #fff; //ftFFF
      font-size: 0.8rem; //ft08
      text-align: center; //align-ct
      a {
        display: inline-block; //Idisplay
        width: 28px;
        height: 26px;
        line-height: 26px; //lh26
        padding: 0 15px; //pl15 pr15
        color: #000;
        font-size: 14px;
        background-color: #efebe9;
        border-radius: 3px; //bd_radius
      }
      a.login_button {
        margin-right: 15px; //mr15
      }
      a.reg_button {
        margin-left: 15px; //ml15
      }
    }
    .information {
      position: absolute;
      top: 30px;
      right: 20px;
      .icon-msg {
        color: #fff;
        font-size: 30px;
      }
    }
  }

  .user_sider {
    /*ft08 align-ct bgFFF pt10 pb5*/
    display: flex;
    padding: 10px 0 5px;
    background-color: #fff;
    font-size: 12.8px;
    li {
      flex: 1;
      a {
        display: block;
        text-align: center;
        span {
          display: inline-block;
          padding-top: 10px;
          box-sizing: border-box;
          width: 50px;
          height: 50px;
          background-color: aqua;
          border-radius: 50%;
          .iconfont {
            color: #fff;
            font-size: 30px;
          }
        }
        span.cart {
          background-color: aqua;
        }
        span.collection {
          background-color: yellow;
        }
        span.coupon {
          background-color: crimson;
        }
        p {
          margin-top: 4px;
          line-height: 18px;
          color: #aaa;
        }
      }
    }
  }

  .order_sider {
    display: flex;
    padding: 10px 0;
    background-color: #fff;
    font-size: 12.8px;
    li {
      flex: 1;
      a {
        display: block;
        text-align: center;
        span {
          display: inline-block;
          .iconfont {
            color: #000;
            font-size: 30px;
          }
        }
        p {
          line-height: 14px;
          color: #aaa;
        }
      }

    }
  }

  .total_order {
    margin-top: 10px;
    background-color: #fff;
    color: #222;
    font-size: 0.9rem;
    li {
      border-bottom: solid 1px #EEE;
      a {
        display: block;
        padding: 12px 15px;
        line-height: 21px;
        span {
          color: #333;
        }
        .icon-right {
          float: right;
          color: #ccc;
          font-size: 20px;
        }
      }
    }
    li:last-child {
      border-bottom: 0;
    }

  }

  .layer_text {
    position: fixed;
    top: 50%;
    left: 0;
    width: 100%;
    margin-top: -50px;
    z-index: 999;
    text-align: center;
    span {
      padding: 10px;
      line-height: 18px;
      color: #fff;
      background: rgba(0, 0, 0, 0.8);
      border-radius: 3px;
    }

  }

  .certificate {
    position: fixed;
    bottom: 50px;
    width: 100%;
    text-align: center;
  }
</style>
