<template>
  <!--评价-->
  <div class="evaluation" id="EveluationBox" style="height: 736px;">
    <ul class="pj_tab clearfix" id="eveClick" ref="tab">
      <li :class="{active:isActive==0}">全部<br><i></i></li>
      <li :class="{active:isActive==1}">有图<br><em>({{evaluation_list.with_img_count}})</em><i></i></li>
      <li :class="{active:isActive==2}">好评<br><em>({{evaluation_list.great_count}})</em><i></i></li>
      <li :class="{active:isActive==3}">中评<br><em>({{evaluation_list.general_count}})</em><i></i></li>
      <li :class="{active:isActive==4}">差评<br><em>({{evaluation_list.bad_count}})</em></li>
    </ul>
    <div id="eveBox">
      <ul class="s-pjlist pj_bottom clearfix Noe" v-for="(evaluation,index) in list" :key="index">
        <li>
          <div class="tel clearfix">
            <span>用户:{{evaluation.nick}}<i></i>
              <!--<em class="bg_1">{{rate(evaluation)}}</em>-->
              <em class="bg_1">{{evaluation.rate}}</em>
            </span><i>{{evaluation.rate_date}}</i>
          </div>
        </li>
        <li class="p-info">{{evaluation.rate_content}}</li>
        <li class="clearfix" v-if="evaluation.has_img">
          <a href="javascript:;">
            <img alt="" :src="evaluation.rate_imgs" class="shopimg lazy" style="display: block;"
                 @click="set(evaluation)"></a></li>
        <li class="p-mark">{{evaluation.sku_values}}</li>
      </ul>
    </div>
    <ul class="clearfix noNext mb60">
      <li class="p-info align-ct">木有更多评论了</li>
    </ul>
    <!--查看大图弹窗 start-->
    <div v-show="bigImg" class="tc_layer bgblack" id="bImgShow" @click="bigImg=false">
      <div class="tc_look" style="transform: translate(-50%, -50%);">
        <img :src="imgSrc" class="img100" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  import {getProductEvaluation} from "../../api"
  export default {
    data(){
      return {
        evaluation_list: {},
        list: [],
        page: 1,
        page_size: 20,
        rate_type: 0,
        isActive: 0,
        bigImg: false,
        imgSrc: ''
      }
    },
    props: ['product_id'],
    created(){
      this.getData()
    },
    mounted(){
      this.$nextTick(() => {
        //将获取的类数组转为数组
        let tabList = Array.from(this.$refs.tab.children)
        for (let i = 0; i < tabList.length; i++) {
          //使用箭头函数，this指向vue实例
          tabList[i].onclick = () => {
            this.isActive = i
            this.rate_type = i - 1
            console.log(this.rate_type);
            if (this.rate_type == -1) {
              this.list = this.evaluation_list.list
              return
            } else if (this.rate_type == 0) {
              console.log(this.rate_type);

              this.list = this.evaluation_list.list.filter((item, index) => {
                return item.has_img == 1
              })
              return
            } else {
              this.list = this.evaluation_list.list.filter((item, index) => {
                return item.rate == this.rate_type
              })
            }
          }
        }
      })
    },
    methods: {
      async getData(){
        let data = {
          "product_id": this.product_id,
          "page": this.page,
          "page_size": this.page_size,
          "rate_type": this.rate_type,
        }
        this.evaluation_list = await getProductEvaluation(data)
        this.list = this.evaluation_list.list
      },
      set(evaluation){
        this.imgSrc = evaluation.rate_imgs
        this.bigImg = true
      },
    },
    computed: {},
    components: {}
  }
</script>
<style scoped>
  .evaluation {
    margin-bottom: 60px;
    width: 100%;
    height: auto;
    padding-top: 10px;
    background: #FFF;

    font-size: 12px;
    font-family: "\5FAE\8F6F\96C5\9ED1";
    font-weight: 400;
    line-height: 1.5;
  }

  .pj_tab {
    display: flex;
    border-radius: 3px;
    margin: 0 10px;
    border: solid 1px #CCC;
  }

  .pj_tab li.active {
    background: #CCC;
    color: #FFF;
  }

  .pj_tab li {
    flex: 1;
    position: relative;
    padding-top: 3px;
    float: left;
    height: 32px;
    line-height: 15px;
    font-size: .8rem;
    text-align: center;
  }

  .pj_tab li i {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: 1px;
    height: 35px;
    background: #CCC;
  }

  .pj_bottom {
    border-bottom: solid 1px #e2e2e2;
  }

  .s-pjlist {
    padding-bottom: 8px;
  }

  .s-pjlist li {
    padding: 0 10px;
    display: block;
  }

  .s-pjlist li .tel {
    display: block;
    color: #ccc;
    font-size: .8rem;
    padding-top: 8px;
    overflow: hidden;
  }

  .s-pjlist li .tel span {
    position: relative;
    float: left;
  }

  .s-pjlist li .tel span i {
    width: 1px;
    height: 10px;
    background: #DDD;
    display: block;
    position: absolute;
    top: 50%;
    right: 55px;
    margin-top: -5px;
  }

  .s-pjlist li .tel span em.bg_1 {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAARVBMVEUAAADzQUHzQUHzQUHzQUHzQUH0Tk70Rkb0Tk70Tk7zQUHzQUHzQUH0Tk70Tk7zQUH0Tk70Tk70Tk70Tk70Tk70Tk70Tk6Xl/nZAAAAFnRSTlMA/u30f+CAErDgzpQl0MCGQPCgYFAw88tjjQAAAI1JREFUKM+1klsOAyEIRbmKI+q8+mL/Sy1palKdsR9NehLDxyFCACLigI7AZGQY/hMA2fLhOVJD3ACmYO9AQSD4eBSzB8HRCe53MalONTZCjRqH4vtXf2hX5D2YR7o2YtF0J+N20aURUVTTuiZViV2NXdSQvdYYjz1gO18UA2Xu8gvAr2PwrsEDmYbn8wSinQYvidq0tAAAAABJRU5ErkJggg==) no-repeat left center;
    background-size: 13px 13px;
  }

  .s-pjlist li .tel span em {
    margin-left: 26px;
    padding-left: 16px;
    color: #666;
    display: inline-block;
  }

  .s-pjlist li .tel i {
    float: right;
  }

  .s-pjlist li.p-info {
    padding: 5px 10px 0;
    line-height: 20px;
    color: #666;
    font-size: .8rem;
  }

  .s-pjlist li .shopimg {
    width: 50px;
    height: 50px;
    padding-top: 5px;
    margin-right: 5px;
    float: left;
  }

  .s-pjlist li.p-mark {
    padding: 5px 10px 0;
    line-height: 20px;
    color: #CCC;
    font-size: .8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .align-ct {
    text-align: center;
  }

  .clearfix:after {
    clear: both;
    content: '';
    font-size: 0;
    display: block;
    visibility: hidden;
    height: 0;
  }

  .tc_layer {
    background: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1998;
  }

  .tc_layer.bgblack {
    background: rgba(0, 0, 0, 1);
  }

  .tc_look {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
  }

  .img100 {
    width: 100%;
    display: block;
  }
</style>
