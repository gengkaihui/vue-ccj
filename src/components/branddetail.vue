<template>
  <div class="content" ref="scroll" @scroll="fix">
      <!--加载特效-->
      <loading v-if="loading"></loading>
      <!--内容区-->
      <div class="container">
        <div id="main">
          <!--模块1：优惠券，1元秒杀-->
          <div class="module_item"
               v-for="(module,index) in module1"
               :key="index"
               :id="'module__'+module.id"
               :index="index" :type="module.type_id+'_1_0'">
            <div>
              <section>
                <div class="hotspot">
                  <!--优惠券：通过vuex保存领取“店铺优惠券”的数量，已领取过的再领取显示领取状态为：领取已达上限-->
                  <div class="hotzone"
                       v-for="(nhotzone,index) in module.value.nhotzone.slice(0,1)"
                       :key="index">
                    <img :src="nhotzone.url"
                         :usemap="'#map'+module.id+'-0'">
                    <!--根据当前屏幕宽度计算图片热点链接区域的高度-->
                    <div class="area"
                         v-if="nhotzone.area.length"
                         :style="{height:(nhotzone.height/nhotzone.width)*window.innerWidth+'px'}">
                      <!--点击某个图片热区时，对应索引index的count+1-->
                      <a class="hotAreaClickEvent"
                         v-for="(a,index) in nhotzone.area"
                         :key="index"
                         @click="mask=true"
                         shape="rect"
                         :data-moduleid="module.id"
                         data-zoneindex="0"
                         :data-areaindex="index"
                         :coords="a.rect">
                      </a>
                    </div>
                  </div>
                  <!--一元秒杀-->
                  <div class="hotzone"
                       v-for="(nhotzone,index) in module.value.nhotzone.slice(1)"
                       :key="index+1">
                    <img :src="nhotzone.url"
                         :usemap="'#map'+module.id+'-0'">
                    <!--根据当前屏幕宽度计算图片热点链接区域的高度-->
                    <div class="area"
                         v-if="nhotzone.area.length"
                         :style="{height:(nhotzone.height/nhotzone.width)*window.innerWidth+'px'}">
                      <!--点击某个图片热区时，对应索引index的count+1-->
                      <a class="hotAreaClickEvent"
                         v-for="(a,index) in nhotzone.area"
                         :key="index"
                         :href="a.id"
                         shape="rect"
                         :data-moduleid="module.id"
                         data-zoneindex="0"
                         :data-areaindex="index"
                         :coords="a.rect">
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <!--模块2：限时秒杀，今日推荐-->
          <div class="module_item"
               v-for="(module,index) in module2"
               :key="index+2"
               :id="'module__'+module.id"
               :index="index+2" :type="module.type_id+'_1_0'">
            <div>
              <section>
                <div class="hotspot">
                  <div class="hotzone"
                       v-for="(nhotzone,index) in module.value.nhotzone"
                       :key="index">
                    <img :src="nhotzone.url"
                         :usemap="'#map'+module.id+'-0'">
                    <!--根据当前屏幕宽度计算图片热点链接区域的高度-->
                    <div class="area"
                         v-if="nhotzone.area.length"
                         :style="{height:(nhotzone.height/nhotzone.width)*window.innerWidth+'px'}">
                      <router-link class="hotAreaClickEvent"
                                   v-for="(a,index) in nhotzone.area"
                                   :key="index"
                                   :to="{name:'productdetail',params:{id:a.id}}"
                                   shape="rect"
                                   :data-moduleid="module.id"
                                   data-zoneindex="0"
                                   :data-areaindex="index"
                                   :coords="a.rect">
                      </router-link>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <!--模块4：导航条-->
          <div ref="nav">
            <div class="module_item"
                 v-for="(module,index) in module3"
                 :key="4+index"
                 :id="'module__'+module.id"
                 :index="4+index" :type="module.type_id+'_1_0'">
              <div class="nav-floor" id="navbarBox">
                <div class="nav-main" :class="{fixTop:isFix}" id="navbar">
                  <!--显示部分-->
                  <div class="bgcNavSet">
                    <!--导航条左右滑动必须是行内样式-->
                    <ul class="mui-slide clearfix"
                        style="margin-left: 0"
                        ref="navmove">
                      <li v-for="(floor,index) in module.value.floors"
                          :key="index"
                          @click="tabSwitch(index)"
                          :data-click_num="module.id+'-0'"
                          data-show_type=""
                          :data-id="'floor_'+floor.id"
                          :class="{active:iscur==index}">
                        <span>{{floor.title}}</span>
                      </li>
                    </ul>
                  </div>
                  <!--隐藏部分-->
                  <ul class="hide-list clearfix" v-show="!isdown">
                    <li v-for="(floor,index) in module.value.floors"
                        :key="index"
                        @click="tabSwitch(index)"
                        :data-id="'floor_'+floor.id"
                        data-show_type="">
                      <span>{{floor.title}}</span>
                    </li>
                  </ul>
                  <!--控制“隐藏部分”显示/隐藏-->
                  <div class="nav-control" id="toggle" @click="down">
                    <span class="bgcNavSet" v-show="isdown" >
                    <img style="margin-top:0.33rem;"
                       src="https://afp-cdn.chuchujie.com/afp/img/down.png?imageMogr2/quality/75">
                    </span>
                    <span class="bgcNavSet" v-show="!isdown">
                      <img style="margin-top:0.33rem;"
                           src="https://afp-cdn.chuchujie.com/afp/img/up.png?imageMogr2/quality/75">
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--模块5：导航区内容-->
          <div v-for="(module,index) in module4" ref="con">
            <!--module=["id": 572533,"id": 572506]-->
            <div class="module_item" :id="'module__'+module[0].id"
                 :index="5+2*index" :type="module.type_id+'_1_0'">
              <div class="floor-title " id="floor_572533">
                <img src="https://afp-cdn.chuchujie.com/afp/img/titpicL.png?imageMogr2/quality/75">
                <span style=" ">{{module[0].value.name}}</span>
                <img src="https://afp-cdn.chuchujie.com/afp/img/titpicR.png?imageMogr2/quality/75">
                <h5 style=" ">{{module[0].value.second_title}}</h5>
              </div>
            </div>
            <div class="module_item" :id="'module__'+module[1].id"
                 :index="5+(2*index+1)" :type="module[1].type_id+'_1_b'">
              <div class="rTpl" :id="'module__'+module[1].id">
                  <div class="wrap">
                    <div class="module-five">
                      <ul class="mui-flex">
                        <li class="mui-basis" v-for="(p,index) in module[1].product_list" :key="index">
                          <router-link class="buyNativeClickEvent"
                                       :to="{name:'productdetail',params:{id:p.product_id}}"
                                       :productindex="index"
                                       :moduleid="'module__'+module[1].id">
                            <div class="shop-pic">
                              <img :src="p.image_urls_head">
                              <ul class="merit">
                                <li>
                                  <span>{{p.selling_point}}</span>
                                </li>
                              </ul>
                            </div>
                            <div class="shop-info">
                              <h5 class="wordall">{{p.product_promotion_title}}</h5>
                              <div class="item-detail clearfix">
                              <span class="mui-price fl">
                                <i class="mui-price-rmb">¥</i>
                                <span class="mui-price-integer">{{p.minprice}}</span>
                              </span>
                                <del class="mui-price-del fr">￥{{p.price}}</del>
                              </div>
                              <div class="btn btn-default">
                                {{module[1].btnLetters}}
                              </div>
                            </div>
                          </router-link>
                        </li>
                      </ul>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <p id="bottomTip">亲，已经到底了呦~</p>
      </div>
      <div id="oneKeyToTop" @click="toTop">
        <i class="iconfont icon-top"></i>
      </div>
    <!--由领取“店铺”优惠券的数量n决定显示-->
      <div class="mask" v-show="mask">
        <div class="bg"></div>
        <div class="dialog" v-if="n">
          <span class="dialog-text">优惠券领取成功</span>
          <button class="dialog-btn" @click="mask=false">确定</button>
        </div>
        <div class="dialog" v-else="">
          <span class="dialog-text">领取已达上限</span>
          <button class="dialog-btn" @click="mask=false">确定</button>
        </div>
      </div>
    </div>
</template>
<script>
  //获取屏幕宽度
  //  console.log(screen.width);
  //  console.log(window.innerWidth);
  //  console.log(document.documentElement.clientWidth);

  import loading from "../base/loading.vue"
  import {findOneBrand} from "../api"
  export default {
    data(){
      return {
        brand: {},
        module: [],
        loading: true,
        mask: false,
        count: [0,0,0],
        n:true,
        iscur: 0,
        isFix: false,
        isdown:true
      }
    },
    created(){
      this.getData();
    },
    mounted(){
      this.$nextTick(() => {
        //在此操作dom
      })
    },
    methods: {
      async getData(){
        this.brand = await findOneBrand(this.bid)
        this.loading = false
        Object.keys(this.brand).length > 0 ? void 0 : this.$router.push('/')
        //Object.keys()返回对象的可枚举的属性名组成的数组(不包括原型中的)。
        this.module = this.brand.module
        document.title = this.brand.page.title
      },
      /*goBack(){
       window.history.length > 1
       ? this.$router.go(-1)
       : this.$router.push('/')
       },*/
      //点击某个nav时，
      tabSwitch(index){
        this.isFix = true//导航条置顶
        this.iscur = index//给该nav加样式
        this.isdown=true//隐藏“隐藏部分”
        //根据nav索引，导航条整体左右滑动
        //console.log(this.$refs.navmove);
        //console.log(this.$refs.navmove[0].style.marginLeft);
        switch(index){
          case 0:
          case 1:
          case 2:
            this.$refs.navmove[0].style.marginLeft=0
                break
          case 3:
            this.$refs.navmove[0].style.marginLeft=-84+'px'//-252
                break
          case 4:
          case 5:
            this.$refs.navmove[0].style.marginLeft=-140+'px'//-420
                break
        }
        //因为nav和对应的内容都是通过for循环加载的数据，所以对应的index相等，通过index可以获取nav对应的内容所在dom元素：$refs
        //console.log(this.$refs.con[index]);
        //console.log(this.$refs.con[index].offsetTop);
        //将nav对应的内容区置顶：50指导航条的高度，加定时器是为了避免：内容区先于导航条置顶引起的页面闪动
        setTimeout(()=>{
          this.$refs.scroll.scrollTop=this.$refs.con[index].offsetTop-50
        },0)
      },
      //滚动内容区
      fix(){
        this.isdown=true//滚动时，隐藏“隐藏部分”
        let scroll=this.$refs.scroll
        let nav = this.$refs.nav
  //当滚动条滚去的高度>导航条距离可视区域上边框的高度时，固定导航条（即添加fixTop样式
        if (scroll.scrollTop >= nav.offsetTop) {
          this.isFix = true
        } else {
          this.isFix = false
        }

        //当页面滚动到某个nav对应的内容区时，给该nav加样式
        let con=this.$refs.con
        con.forEach((item,index)=>{
            if(scroll.scrollTop>=item.offsetTop-50){
              this.iscur = index
            }
        })
      },
      down(){
        this.isdown=!this.isdown//切换隐藏列表
      },
      up(){
        this.isdown=true//收起隐藏列表
      },
      toTop(){
        this.$refs.scroll.scrollTop = 0
      }
    },
    computed: {
      bid(){
        return this.$route.params.id
      },
      module1(){
        return this.module.slice(0, 2)
      },
      module2(){
        return this.module.slice(2, 4)
      },
      module3(){
        return this.module.slice(4, 5)
      },
      module4(){
        let ary = this.module.slice(5)
        let newAry = []
        let len = ary.length
        if (len % 2 == 0) {
          for (let i = 0; i < len; i = i + 2) {
            newAry.push([ary[i], ary[i + 1]])
          }
        } else {
          for (let i = 0; i < len - 1; i = i + 2) {
            newAry.push([ary[i], ary[i + 1]])
          }
        }
        return newAry
      },
      window(){
        return window
      }
    },
    components: {loading}
  }
</script>
<style scoped lang="less">
  .content {
    position: fixed;
    top: 0;
    bottom: 50px;
    overflow: auto;
    width: 100%;
    .container {
      overflow: auto;
      margin: 0 auto;
      width: 100%;
      background-color: #fff;
      .hotspot {
        .hotzone {
          position: relative;
          img {
            width: 100%;
          }
          .area {
            display: flex;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            .hotAreaClickEvent {
              flex: 1;
              margin: 5px;
              /*height: 50px;*/
              height: auto;
            }
          }
        }
      }
      .nav-floor {
        height: 50px;
        .nav-main {
          position: relative;
          width: 100%;
          z-index: 3;
          .bgcNavSet {
            width: 100%;
            /*overflow: hidden;*/
            overflow-x: scroll;
            overflow-y: hidden;
            background: #fff;
            .mui-slide {
              background: #fff;
              width: 554px;
              height: 50px;
              line-height: 50px;
              font-size: 15px;
              transition: 0.3s;
              /*margin-left: 0px;*/
              li {
                float: left;
                width: 64px;
                padding: 0 10px;
                text-align: center;
              }
              li.active {
                color: #ff2559;
                span {
                  display: inline-block;
                  height: 40px;
                  border-bottom: 2px solid #ff2559;
                }
              }
            }
          }
          .hide-list {
            position: absolute;
            padding: 10px 0;
            width: 100%;
            background-color: #f6f9fb;
            color: #333;
            font-size: 15px;
            z-index: 10;
            li {
              box-sizing: border-box;
              float: left;
              width: 25%;
              padding: 6px 3px;
              text-align: center;
              line-height: 1.5;
              span{
                display: inline-block;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
          .nav-control {
            position: absolute;
            top:0;
            right: 0;
            width: 54px;
            height: 50px;
            background-color: #fff;
            border-left: 1px solid #ddd;
            text-align: center;
            span{
              line-height: 50px;
            }
          }
          .Ndisplay {
            display: none;
          }
        }
        .fixTop {
          position: fixed;
          top: 0;
          left: 0;
        }
      }
      .floor-title{
        margin-top: 5px;
        /*height: 50px;*/
        line-height: 25px;
        color: #ff4c3d;
        text-align: center;
        img{
          display: inline-block;
          vertical-align: top;
          height: 20px;
        }
        span{
          display: inline-block;
          font-weight:700;
          font-size: 18px;
        }
        h5{
          font-size: 13px;
          font-weight: 400;
          font-style: normal;
          line-height: 1.5;
        }
      }
      .wrap{
        padding: 10px 7px 0;
        .mui-flex{
          width: 100%;
          overflow: hidden;
          li{
            position: relative;
            box-sizing: border-box;
            float: left;
            width: 50%;
            margin-bottom: 8px;
            z-index: 0;
            a{
              display: block;
              color: #333;
              margin: 0 3px;
              background-color: #fff;
              overflow: hidden;
              .shop-pic{
                position: relative;
                width: 100%;
                img{
                  display: block;
                  width: 100%;
                }
                .merit{
                  position: absolute;
                  bottom: 10px;
                  left: 0;
                  width: 100%;
                  color: #fff;
                  font-size: 12px;
                  li{
                    max-width: 80%;
                    overflow: hidden;
                    span{
                      display: inline-block;
                      box-sizing: border-box;
                      margin-top: 1px;
                      padding: 0 10px 0 8px;
                      height: 22px;
                      line-height: 22px;
                      border-top-right-radius: 100px;
                      border-bottom-right-radius: 100px;
                      background: #FC5474;
                      opacity:0.8;
                      max-width: 100%;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                  }
                }
              }
              .shop-info{
                padding: 0 5px 11px;
                text-align: left;
                background: #fff;
                h5{
                  line-height: 25px;
                  font-size: 13px;
                  font-weight: 400;
                  font-style: normal;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  word-break: break-all;
                }
                .item-detail{
                  line-height: 28px;
                  margin-bottom: 5px;
                  .mui-price{
                    display: inline-block;
                    line-height: 30px;
                    color: #fc5474;
                    font-size: 14px;
                    i{
                      line-height: 1.5;
                      font-weight: 400;
                      font-style: normal;
                    }
                    .mui-price-integer{
                      display: inline-block;
                      font-size: 17px;
                      font-weight: 700;
                    }
                  }
                  .mui-price-del{
                    float: right;
                    color: #999;
                    font-size: 11px;
                    line-height: 30px;
                  }
                }
                .btn{
                  margin: 0 auto;
                  width: 180px;
                  height: 32px;
                  line-height: 32px;
                  color: #fff;
                  font-size: 16px;
                  text-align: center;
                  background-color: #ff5b82;
                  border-radius: 3px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  word-break: break-all;
                  white-space: nowrap;
                }
              }


            }
          }
        }
      }
      #bottomTip {
        text-align: center;
        line-height: 60px;
      }
    }
    #oneKeyToTop {
      position: fixed;
      right: 30px;
      bottom: 90px;
      width: 40px;
      height: 40px;
      line-height: 40px;
      /*background-color: #fff;*/
      /*border-radius: 20px;*/
      z-index: 10;
      /*display: none;*/
      i {
        color: #ccc;
        font-size: 39px;
      }
    }
    .mask {
      .bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.6;
        z-index: 1000;
      }
      .dialog {
        position: fixed;
        top: 30%;
        left: 50%;
        margin-left: -150px;
        z-index: 5002;
        width: 300px;
        height: 150px;
        box-sizing: border-box;
        padding: 30px 20px 20px;
        border-radius: 3px;
        background: #fff;
        box-shadow: 0 0 3px 0 #aaa;
        text-align: center;
        .dialog-text {
          display: block;
          font-size: 18px;
          font-family: '微软雅黑';
          line-height: 30px;
          text-align: center;
        }
        .dialog-btn {
          margin-top: 20px;
          width: 55%;
          height: 32px;
          line-height: 32px;
          color: #fff;
          font-size: 16px;
          font-family: 'Microsoft Yahei';
          border: none;
          border-radius: 3px;
          background: #ed6478;
        }
      }
    }
  }
</style>
