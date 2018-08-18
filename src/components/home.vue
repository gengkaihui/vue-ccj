<template>
  <div>
    <headerNav class="header" :female="female"
               @change-female="changeFemale"
               @change-male="changeMale"></headerNav>
    <div class="content">
      <!--加载特效-->
      <loading v-if="loading"></loading>
      <!--内容区-->
      <div v-else class="container" id="container">
          <h2 class="top border_bt">
            <i class="iconfont icon-clock"></i>
            今日特卖·每日9点更新
          </h2>
          <!--轮播图：通过swiperSlides属性向子组件swiper传递轮播图数据-->
          <swiper :swiperSlides="slides"></swiper>
          <ul>
            <router-link
              v-for="(brand,index) in brandList"
              :to="{name:'branddetail',params:{id:brand.id}}"
              :key="index"
              tag="li">
              <!--图片懒加载：使用vue-lazyload插件-->
              <div>
                <img v-lazy="brand.imgUrl" alt="">
              </div>
              <div class="sp-info">
                <div class="title">{{brand.title}}</div>
                <!--根据品牌的endTime判断标签信息-->
                <div v-if="(brand.endTime-1530410000)>0" class="new">今日上新</div>
                <div v-if="(brand.endTime-1530410000)<0" class="old">剩余2天</div>
                <div v-if="brand.id==0"></div>
              </div>
            </router-link>
          </ul>
          <div class="bottom tixing clearfix">
            <p class="mb5">每天早9点更新，记得来看呀</p>
            <div class="align-ct">
              <p>北京醋溜网络科技股份有限公司</p>
              <p>客服电话 010-56024702</p>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
  import headerNav from "../base/headernav.vue"
  import swiper from "../base/swiper.vue"
  import loading from "../base/loading.vue"
  import {getSlides, getBrandList} from "../api"
  export default {
    created(){
      console.log("home");
      this.getData();
    },
    activated(){
      console.log("activated");
    },
    deactivated(){
      console.log("deactivated");
    },
    data(){
      return {
        loading: true,
        slides: [],
        brandList: [],
        female: true
      }
    },
    methods: {
      async getData(){
        this.slides = await getSlides();
        this.brandList = await getBrandList(this.female);
        //setTimeout(()=>{
          this.loading = false
        //},1000)
      },
      //6.21日21：28当男女列表切换时，判断并重新加载数据
      changeFemale(){
        if (this.female) {
          return
        } else {
          this.loading = true
          this.female = true
          this.getData()
        }
      },
      changeMale(){
        if (!this.female) {
          return
        } else {
          this.loading = true
          this.female = false
          this.getData()
        }
      }
    },
    computed: {},
    components: {headerNav, swiper,loading}
  }
</script>
<style scoped lang="less">
  .container {
    overflow: auto;
    margin: 0 auto;
    width: 100%;
    background-color: #f7f7f7;
    .top{
      font-style: normal;
      font-weight: normal;
      padding: 5px 10px;
      color: #ff9999;
      font-size: 16px;
      height: 18px;
      line-height: 18px;
      border-bottom: 1px solid #f7f7f7;
      .icon-clock{
        font-size: 16px;
      }
    }
    ul {
      li {
        background-color: #fff;
        padding: 10px;
        img {
          width: 100%
        }
        .sp-info {
          position: relative;
          padding: 8px 60px 0 0;
          font-size: 14px;
        }
        .title {
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .new {
          position: absolute;
          top: 9px;
          right: 0;
          color: #df3130;
        }
        .old {
          color: rgb(0, 0, 238);
        }
      }
    }
    .bottom{
      padding: 10px 0;
      color: #999;
      font-size: 14px;
      text-align: center;
      .mb5{
        margin-bottom: 5px;
      }
    }

  }
</style>
