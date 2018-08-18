<template>
  <div>
    <!--3.使用-->
    <headerNav class="header" :female="female"
               @change-female="changeFemale"
               @change-male="changeMale"></headerNav>
    <div class="content">
      <!--加载特效-->
      <loading v-if="loading"></loading>
      <!--内容区-->
      <div v-else class="container">
        <ul>
          <router-link
            v-for="(category,index) in categoryList"
            :to="{name:'categorydetail',params:{id:category.id}}"
            :key="index"
            tag="li">
            <div class="box">
              <div>
                <h2>{{category.title}}</h2>
                <p>{{category.subTitle}}</p>
              </div>
              <img v-lazy="category.imgUrl" alt="">
            </div>
            <span></span>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  //1.引入headerNav
  import headerNav from "../base/headernav.vue"
  import loading from "../base/loading.vue"
  import {getCategoryList} from "../api"
  export default {
    created(){
      this.getData();
    },
    data(){
      return {
        loading: true,
        categoryList: [],
        female: true,
      }
    },
    mounted(){
      this.$nextTick(() => {

      })
    },
    methods: {
      async getData(){
        this.categoryList = await getCategoryList(this.female);
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
      //6.22020:38思考：能否将改变female值的函数封装成插件，供三个页面级组件引用？
    },
    computed: {},
    components: {headerNav,loading}//2.注册
  }
</script>
<style scoped lang="less">
  .container {
    overflow: auto;
    margin: 0 auto;
    width: 100%;
    background-color: #fff;
    ul {
      li {
        position: relative;
        float: left;
        width: 50%;
        border-bottom: solid 1px #ddd;
        .box {
          position: relative;
          height: 50px;
          padding: 10px 60px 10px 10px;
          h2 {
            color: #666;
            font-size: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p {
            display: block;
            padding-top: 8px;
            color: #d9d9d9;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          img {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 50px;
            height: 50px;
          }
        }
        span {
          /*分隔线*/
          position: absolute;
          top: 0px;
          right: 0px;
          width: 1px;
          height: 100%;
          background-color: #ddd;
        }
        img[lazy=loading] {
          height: 100px;
          margin: auto;
          background: url("../assets/img/logo.png") no-repeat fixed center;
        }
      }
    }

  }
</style>
