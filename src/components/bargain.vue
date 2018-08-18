<template>
  <div>
    <headerNav class="header" :female="female"
               @change-female="changeFemale"
               @change-male="changeMale"></headerNav>
    <div class="content">
      <!--加载特效-->
      <loading v-if="loading"></loading>
      <!--内容区-->
      <div v-else class="container">
        <!--加载更多-->
        <!--<ul v-infinite-scroll="loadMore"-->
        <!--infinite-scroll-disabled="loading"-->
        <!--infinite-scroll-distance="10">-->
        <h2 class="top border_bt">
          <i class="iconfont icon-clock"></i>
          9块9·每日9点更新
        </h2>
        <!--下拉更新-->
        <mt-loadmore :top-method="loadTop"
                     ref="loadmore"
                     @top-status-change="handleTopChange"
                     :topDistance="50"
                     :maxDistance="200">
          <ul class="productList">
            <router-link
              v-for="(product,index) in productList"
              :to="{name:'productdetail',params:{id:product.id}}"
              :key="index"
              tag="li">
              <span>
                <img v-lazy="product.imgUrl" class="cpimg" alt="">
                <!--<img v-lazy="product.imgUrl" class="cpimg" alt="">-->
              </span>
              <div class="sp-info">
                <h1 class="clearfix"><i>{{product.subTitle}}</i>{{product.title}}</h1>
                <p class="money clearfix"><i>￥</i><em>{{product.newPrice}}</em></p>
                <p class="s-other clearfix">
                  <label class="fl-l">原价：
                    <del>￥{{product.oldPrice}}</del>
                  </label>
                  <label class="fr ml10">{{product.saleCount}}人已买</label></p>
              </div>
            </router-link>
          </ul>
          <!--//自定义的 HTML 模板-->
          <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus === 'pull'">
              <img src="../assets/img/pull.gif" alt="">刚刚更新
            </span>
            <span v-show="topStatus === 'drop'">智能推荐中</span>
            <span v-show="topStatus === 'loading'">为你更新{{productList.length}}条内容</span>
          </div>
        </mt-loadmore>
        <div class="bottom tixing clearfix">
          <p>每天早9点更新，记得来看呀</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import headerNav from "../base/headernav.vue"
  import loading from "../base/loading.vue"
  import {getProductList} from "../api"
  export default {
    data(){
      return {
        loading: true,
        productList: [],
        female: true,
        topStatus: '',
      }
    },
    created(){
      console.log("bargain");
      this.getData();
    },
    methods: {
      async getData(){
        this.productList = await getProductList(this.female);
        this.loading = false
      },
      async loadMore(){
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 2500);
      },

      loadTop() {
        // 加载更多数据
        this.getData()
        this.$refs.loadmore.onTopLoaded();
      },
      handleTopChange(status) {
        this.topStatus = status;
      },

      //6.21日21：28当男女列表切换时，判断并重新加载数据
      changeFemale(){
        if (this.female) {
          return
        } else {
          this.loading = true;
          this.female = true
          this.getData()
        }
      },
      changeMale(){
        if (!this.female) {
          return
        } else {
          this.loading = true;
          this.female = false
          this.getData()
        }
      }
    },
    computed: {},
    components: {headerNav, loading}
  }
</script>
<style scoped lang="less">
  .container {
    overflow: auto;
    margin: 0 auto;
    width: 100%;
    background-color: #f7f7f7;
    .border_bt {
      border-bottom: solid 1px #f7f7f7;
    }
    .top {
      font-style: normal;
      font-weight: normal;
      padding: 5px 10px;
      color: #ff9999;
      font-size: 16px;
      height: 18px;
      line-height: 18px;
      border-bottom: 1px solid #f7f7f7;
      .icon-clock {
        font-size: 16px;
      }
    }
    .productList {
      width: 100%;
      li {
        position: relative;
        padding: 10px;
        display: block;
        width: auto;
        height: 120px;
        background-color: #fff;
        border-bottom: solid 1px #f7f7f7;
        span {
          width: 120px;
          height: 120px;
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 5;
          img {
            width: 100%
          }
        }
        .sp-info {
          display: inline-block;
          /*width: auto;*/
          width: 259px;
          padding-left: 135px;
          h1 {
            display: block;
            width: 100%;
            height: 40px;
            line-height: 20px;
            margin: 9px 0 2px 0;
            color: #444;
            font-size: 14px;
            font-style: normal;
            font-weight: normal;
            overflow: hidden;
            word-break: break-all;
            i {
              display: inline-block;
              float: left;
              margin-right: 3px;
              padding: 0 3px;
              height: 18px;
              line-height: 18px;
              font-size: 12px;
              color: #ff9999;
              border: solid 1px #ff9999;
              border-radius: 3px;
            }
          }
          .money {
            display: block;
            margin-top: 24px;
            height: 14px;
            line-height: 14px;
            color: #df3130;
            font-size: 16px;
            em {
              font-size: 20px;
              padding-left: 2px;
            }
          }
          .s-other {
            display: block;
            padding: 10px 0 2px;
            color: #b0b0b0;
            font-size: 12px;
            line-height: 24px;
            .fr {
              float: right;
              margin-left: 10px;
            }
          }
        }
        .title {
          float: left;
        }
      }
    }
    .bottom {
      text-align: center;
      padding: 10px 0;
      color: #999;
      font-size: 14px;
    }
  }
</style>
