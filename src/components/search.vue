<template>
  <div>
    <div class="header">
      <i class="iconfont icon-back back" @click="goBack"></i>
      <a @click="search">搜索</a>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="请输入商品关键词"
               v-model.trim="msg"
               @keyup="showtip" @keyup.delete="showtip"
               @focus="searching=false">
      </div>
    </div>
    <!--当输入框有内容时，显示提示信息-->
    <ul v-show="!flag" class="tips">
      <li v-for="tip in tips" @click="input(tip.key)">
        <span>{{tip.key}}</span>
        <span>{{tip.qre}}</span>
      </li>
    </ul>
    <!--当输入框无内容时，显示历史搜索、热门搜索-->
    <div v-show="flag" class="container">
      <div class="history_search" id="history_search">
        <h2 class="his_head"><i class="iconfont icon-history"></i><span>历史搜索</span><i class="iconfont icon-delete"
                                                                                      @click="historyList=[]"></i></h2>
        <div v-show="historyList.length" class="search_item clearfix" id="his_item">
          <span @click="input(history)" v-for="history in historyList">{{history}}</span>
        </div>
        <div v-show="!historyList.length" class="his_none hide">暂无历史搜索</div>
      </div>
      <div class="hot_search" id="hot_search">
        <h2 class="hot_head"><i class="iconfont icon-hot"></i>热门搜索</h2>
        <div class="search_item clearfix" id="hot_item">
          <span @click="input(hot)" v-for="hot in hotList">{{hot}}</span>
        </div>
      </div>
    </div>
    <!--当输入框有内容，并且按下搜索键时，显示搜索结果-->
    <div v-show="!flag&&searching">
      <!--加载特效-->
      <loading v-if="loading"></loading>
      <div v-else>
        <!----------没有搜到---------->
        <div v-if="!searchList.length" class="container" id="noProduct">
          <div class="nohave pd_top">
            <i class="iconfont icon-search-no"></i>
            <h2>没有搜索结果</h2>
            <p>没有找到相关宝贝</p>
          </div>
        </div>
        <!----------显示搜索结果---------->
        <div v-if="searchList.length" class="container" id="hasProduct">
          <!--搜索结果排序：人气、销量、最新、价格，默认按人气（收藏）-->
          <div class="tab-top">
            <ul class="clearfix">
              <li class="sort_tab" v-for="(tab,index) in tabs">
                <p @click="tabswitch(index)" :class="{active:iscur==index}">{{tab}}</p>
              </li>
            </ul>
          </div>
          <!--搜索结果内容-->
          <div class="data">
            <ul>
              <router-link
                v-for="(product,index) in searchList"
                :to="{name:'productdetail',params:{id:product.id}}"
                :key="index"
                tag="li">
                <div class="con">
                  <div><img v-lazy="product.imgUrl" alt=""></div>
                  <div class="info">
                    <!--显示标题title-->
                    <!--<div class="title">{{product.title}}</div>-->
                    <!--显示标签tag-->
                    <div class="taglist">
                      <span class="tag" v-for="tag in product.tagList">{{tag}}</span>
                    </div>
                    <div class="money">
                      <i>￥</i><em>{{product.newPrice}}</em>
                      <span class="fr ml10">月销{{product.collection}}件</span>
                    </div>
                  </div>
                </div>
              </router-link>
            </ul>
            <!--提交反馈信息-->
            <div class="bottom" @click="feedback=true">
              <span>还没选到心仪的宝贝？ 点我点我 ></span>
            </div>
            <!--反馈内容-->
            <div class="feedback" v-if="feedback">
              <div class="mask" @click.self="feedback=false">
                <div class="msg">
                  <p>找不到想要的宝贝？</p>
                  <p>快来告诉小编啦！小编帮你去砍价！</p>
                  <div>
                    <input type="text" placeholder="想要小编选什么宝贝？（必填）" autofocus v-model="feedbackmsg.main" required>
                  </div>
                  <div>
                    <textarea rows="3" cols="45" maxlength="60" placeholder="还有想跟小编说的？"
                              v-model="feedbackmsg.sub"></textarea>
                  </div>
                  <div class="btn">
                    <button @click="submit">提交！</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import loading from "../base/loading.vue"
  import {getSearchList, getHotList, getTipList} from "../api"
  export default {
    data(){
      return {
        msg: '',
        big: true,
        selected: "1",
        loading: false,
        tabs: ["人气", "销量", "最新", "价格"],
        iscur: 0,
        count: 1,//用于判断价格排序“顺逆”
        searchList: [],
        tips: [],
        historyList: [],
        hotList: ['限时抢秒杀', '儿童鞋', '¥0.01拼美国大熊', '保温杯', '耳机', '零食',],
        searching: false,
        feedback: false,
        feedbackmsg: {main: "", sub: ""}
      }
    },
    created(){
      //读取本地缓存中的历史搜索
      if (localStorage.getItem("historyList")) {
        this.historyList = JSON.parse(localStorage.getItem("historyList"))
      }
    },
    methods: {
      goBack(){
        this.$router.go(-1)//后退的是路由
        //如何后退一步？？？？
      },
      search(){
        this.getData()
      },
      async getData(){
        this.searching = true
        this.loading = true
        //let tab = this.tabs[this.iscur]
        if (!this.msg) {//如果搜索框没有输入任何值，则什么也不做
          return
        }
        this.searchList = await getSearchList(this.msg, this.iscur)
        this.loading = false
        //如果历史记录historyList中已经包含这一项，则先删除这一项，然后在数组开头添加
        this.historyList = this.historyList.filter((item) => {
          return item !== this.msg
        })
        this.historyList.unshift(this.msg)
        localStorage.setItem("historyList", JSON.stringify(this.historyList))
        console.log("getData");
      },
      //切换价格排序
      tabswitch(index){
        this.iscur = index
        if (Math.abs(this.iscur) == 3) {//当点击“价格”时，先从低到高，再次点击则从高到低
          this.count *= -1;
          if (this.count < 0) {//-1时，从低到高
            this.iscur = 3
          } else {//1时
            this.iscur = -3
          }
        }
        this.getData()
      },
      async showtip(){
        this.searching = false
        if (this.msg === '') {
          this.tips = []
          return
        } else {
          this.tips = []
          //console.log(this.msg);
          this.tips = await getTipList(this.msg)
        }
      },
      async input(searchitem){
        console.log("input");
        this.msg = searchitem
        this.getData()
      },
      async getHotList(){
        this.hotList = await getHotList()
      },
      submit(){
        this.feedback = false
        //提交反馈信息
        console.log(this.feedbackmsg);
        this.feedbackmsg = {}
      }
    },
    computed: {
      flag(){
        return this.msg === ''
      }
    },
    components: {loading}
  }
</script>
<style scoped lang="less">
  .header {
    position: fixed;
    top: 0;
    left: 0;
    height: auto;
    width: 100%;
    padding: 5px 0;
    background-color: #ffffff;
    border-bottom: 1px solid #eee;
    .back {
      position: absolute;
      top: 50%;
      left: 10px;
      margin-top: -17px;
      color: #464e55;
    }
    .search {
      position: relative;
      margin: 0 50px;
      padding: 5px 10px 5px 35px;
      width: auto;
      height: 28px;
      line-height: 28px;
      border: 1px solid #ddd;
      border-radius: 30px;
      background: #fff;
      color: #ccc;
      i {
        position: absolute;
        top: 7px;
        left: 7px;
      }
      input {
        float: left;
        width: 95%;
        height: 28px;
        font-size: 14px;
        border: none;
        background: none;
      }
    }
    a {
      position: absolute;
      top: 13px;
      right: 10px;
      color: #666;
      font-size: 18px;
    }
  }

  .tips {
    position: absolute;
    top: 51px;
    left: 0;
    bottom: 20%;
    width: 100%;
    background: #fff;
    overflow: hidden;
    li {
      width: auto;
      height: 30px;
      line-height: 30px;
      margin: 0 50px;
      border-bottom: 1px solid #eee;
    }
  }

  .container {
    position: absolute;
    top: 51px;
    left: 0;
    right: 0;
    bottom: 50px;
    width: 100%;
    height: auto;
    overflow: auto;
    background: #f7f7f7;
    .history_search, .hot_search {
      margin: 15px 10px;
      h2 {
        margin-bottom: 15px;
        height: 28px;
        line-height: 28px;
        color: #999;
        font-size: 16px;
        .icon-history {
          font-size: 20px;
        }
        .icon-delete {
          float: right;
          font-size: 16px;
        }
      }
      .search_item {
        overflow: hidden;
        white-space: nowrap;
        word-break: break-all;
        span {
          display: inline-block;
          float: left;
          margin: 0 10px 10px 0;
          padding: 0 10px;
          border: 1px solid #ddd;
          border-radius: 3px;
          height: 30px;
          line-height: 30px;
          color: #666;
          font-size: 12px;
        }
      }
      .his_none {
        font-size: 16px;
        line-height: 25px;
        height: 25px;
        margin-left: 25px;
        color: #999;
      }
    }
    .nohave {
      padding-top: 200px;
      text-align: center;
      i {
        font-size: 50px;
      }
      h2 {
        color: #444;
        font-size: 18px;
      }
      p {
        color: #aaa;
        font-size: 16px;
      }
    }
    .tab-top {
      z-index: 100;
      position: fixed;
      top: 51px;
      left: 0;
      width: 100%;
      height: 33px;
      background: #fff;
      color: #83797b;
      font-size: 14px;
      border-bottom: 1px solid #eee;
      ul {
        width: 100%;
        padding-top: 3px;
        height: 30px;
        .sort_tab {
          display: inline-block;
          float: left;
          width: 25%;
          height: 30px;
          line-height: 30px;
          text-align: center;
          p.active {
            display: inline-block;
            height: 28px;
            line-height: 28px;
            color: #df3130;
            border-bottom: 2px solid #df3130;
          }
        }
      }
    }
    .data {
      position: absolute;
      top: 33px;
      width: 100%;
      background: #fff;
      ul {
        margin: 5px;
        li {
          display: inline-block;
          width: 50%;
          .con {
            padding: 5px;
            img {
              width: 100%;
              border-radius: 3px;
            }
            .info {
              padding: 0 5px;
              .taglist, .title {
                padding: 5px 0 0;
                height: 46px;
                overflow: hidden;
                .tag {
                  display: inline-block;
                  margin: 0 5px 5px 0;
                  height: 18px;
                  line-height: 18px;
                  background-color: #f2f2f2;
                }
              }
              .money {
                padding-bottom: 10px;
                height: 14px;
                line-height: 14px;
                color: #df3130;
                em {
                  font-size: 16px;
                }
                .fr {
                  float: right;
                  color: #b0b0b0;
                }
              }
            }
          }
        }
      }
    }
    .bottom {
      position: relative;
      margin: 0 10px 20px;
      width: auto;
      height: 40px;
      line-height: 40px;
      border: 2px solid orangered;
      border-radius: 3px;
      background: cornsilk;
      color: orangered;
      font-size: 14px;
      text-align: center;
    }
    .feedback {
      .mask {
        z-index: 1000;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 3px;
        background-color: #000;
        .msg {
          margin: 80px 50px;
          padding: 20px 10px;
          background-color: #fff;
          p {
            padding-bottom: 10px;
          }
          div {
            margin: 10px 0 5px;
            padding: 5px 10px;
            background-color: #eee;
            border: 1px solid #ccc;
            border-radius: 3px;
            input {
              width: 100%;
              height: 20px;
              line-height: 20px;
              border: 0;
              background: none;
            }
            textarea {
              resize: none; /*禁止缩放*/
              border: 0;
              background: none;
            }
          }
          .btn {
            margin: 10px auto;
            width: 100px;
            height: 30px;
            line-height: 30px;
            background-color: red;
            text-align: center;
            button {
              color: #fff;
              font-size: 16px;
              font-family: 黑体;
              border: none;
              background: none;
            }
          }
        }
      }
    }
  }
</style>
