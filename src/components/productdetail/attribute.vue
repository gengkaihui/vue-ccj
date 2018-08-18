<template>
  <!--属性-->
  <div class="container attribute">
    <div id="attribiteBox" style="width:100%;height:600px; background:#f4f4f4;">
      <div id="id_main">
        <div class="container  p_padding bgFFF clearfix">
          <!--产品参数 start-->
          <div class="parameter clearfix" id="canshu" style="min-height:100px">
            <h2 class="parameter_biaoti" style="display:none"></h2>
            <div class="margin10">
              <p class="ft08 ft2 lh20">宝贝属性</p>
              <table width="100%" class="bgDDD align-ct" border="0" cellpadding="0" cellspacing="1">
                <tbody>
                <tr class="bgFFF">
                  <td width="15%" class="bg-e ft6">主要材质</td>
                  <td width="35%">聚酯纤维</td>
                  <td width="15%" class="bg-e ft6">衣长</td>
                  <td width="35%">短款</td>
                </tr>
                <tr class="bgFFF">
                  <td width="15%" class="bg-e ft6">袖长</td>
                  <td width="35%">短袖</td>
                  <td width="15%" class="bg-e ft6">领型</td>
                  <td width="35%">圆领</td>
                </tr>
                <tr class="bgFFF">
                  <td width="15%" class="bg-e ft6">风格</td>
                  <td width="35%">通勤;休闲</td>
                  <td width="15%" class="bg-e ft6">颜色分类</td>
                  <td width="35%">黑;白</td>
                </tr>
                <tr class="bgFFF">
                  <td width="15%" class="bg-e ft6">尺码</td>
                  <td width="35%">M;XL;XXL</td>
                  <td width="15%" class="bg-e ft6">图案</td>
                  <td width="35%">字母;文字</td>
                </tr>
                <tr class="bgFFF">
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!--产品参数 end-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {msg: 'hello'}
    },
    methods: {},
    computed: {},
    components: {}
  }
</script>
<style scoped>
  html,body,h1,h2,h3,p,div,ul,li,dl,dt,dd{margin:0;padding:0;}
  ul,li,ol{list-style:none;}
  html,body,img{border:0;}
  em,i{font-style:normal;}
  body{color:#999;font-size:12px; font-family:"Helvetica Neue"; min-width:320px; line-height:1.5;background:#F4F4F4;}
  h1,h2,h3,strong,em{font-weight:normal;}
  a,a:hover{text-decoration:none;}
  a:active{ background:none; outline:none;}
  .clearfix:after{clear:both; content:'';font-size:0; display:block; visibility:hidden; height:0}
  .container{width:100%;}
  .border{ border-bottom:solid 1px #E6E6E6;}
  .bgFFF{ background:#FFF;}
  .bordertop{ border-top:solid 1px #E6E6E6;}
  .dis-none{display:none;}
  .s-height{ overflow:hidden;}
  .p_img{ width:100%;}
  .p_img img{display:block; width:100%; height:auto;}
  .font-s{font-size:1rem;}
  .pd-tb{padding:30px 0 5px 10px;}
  .font-w{font-weight:bold;}
  .color-b{color:#444;}
  .lh20{ line-height:20px;}
  .ft6{ color:#666;}
  .ft2{ color:#222;}
  .ft08{ font-size:0.8rem;}
  .bgDDD{ background:#DDD;}
  .bg-e{ background:#EEE;}

  .fl-l{ float:left;}
  .fl-r{ float:right;}
  .ft-pink{ color:#df3130;}
  .big_margin{ margin-bottom:20px;}
  .p_margin{ margin:0px 10px;}
  .p_margin_all{ margin:10px 0px;}
  .p_padding{padding-bottom:0px;}
  .p_padding2{padding-bottom:10px;}
  .margintop{ margin-top:10px;}
  .margintop2{ margin-top:45px;}
  .bg{ background:#fff;}
  .ft_small{ font-size:0.8rem;}
  .bggrey{ background:#f7f7f7; padding:5px;}
  .p_top{ padding:15px 0 5px 10px;}

  /*图文详情*/
  .p_detail{ margin:0 5px; padding-top:10px; font-size:0.8rem;}
  .p_detail img{ max-width:100%; height:auto;}
  #product_detail{word-break:break-all;word-wrap:break-word;}
  #tab_recommend img{background-color: #FAFAFA}
  /*产品说明*/
  .p_detail .p_title{ width:100%; font-size:1rem;}

  /*商品详情选项卡*/
  .tab-top{ width:100%; border-bottom:solid 1px #ddd; font-size:1rem;}
  .tab-top li{ width:50%; height:23px; line-height:23px; padding:8px 0; border-bottom:solid 2px #fff; text-align:center; cursor:pointer; float:left;}
  .tab-top li p{ width:auto; border-right:solid 1px #ddd;}
  .tab-top li.active{ height:23px; line-height:23px; border-bottom:solid 2px #ef394c; color:#ef394c;}

  .s-pj{ width:100%; padding:0 0 10px 0; font-size:1rem;border-bottom:1px solid #ccc}
  .s-pj .score{ height:24px; line-height:24px; color:#ef394c; float:left;}
  .s-pj .score .zscore{ height:22px; line-height:22px; padding:2px 5px 0 0; float:left;}
  .s-pj .score .star{ width:75px; height:15px; margin-top:5px; display:inline-block; background:url(http://7o503d.com2.z0.glb.qiniucdn.com/Public/SQE/img/nostar.png) repeat-x; background-size:15px 15px; position:relative; z-index:5;}
  .s-pj .score .yesstar{ position:absolute; top:0; left:0; height:15px; display:inline-block; background:url(http://7o503d.com2.z0.glb.qiniucdn.com/Public/SQE/img/yesstar.png) repeat-x; background-size:15px 15px;}

  .s-pj .good{ height:24px; line-height:24px; color:#999; float:right;}
  .s-pj em{ color:#ef394c;}

  .pj-bd {border-bottom:dotted 1px #cecece;}
  .s-pjlist{ padding:10px 10px 0 10px;}
  .s-pjlist li{ width:100%; display:block; float:left;}
  .s-pjlist li .tel{ color:#ccc; height:24px; line-height:24px; font-size:0.8rem; float:left;}
  .s-pjlist li .star{ width:75px; height:15px; margin-top:4px; display:inline-block; background:url(http://7o503d.com2.z0.glb.qiniucdn.com/Public/SQE/img/nostar.png) repeat-x; background-size:15px 15px; position:relative; z-index:5; float:right;}
  .s-pjlist li .star .yesstar{ position:absolute; top:0; left:0; width:75px; height:15px; display:inline-block; background:url(http://7o503d.com2.z0.glb.qiniucdn.com/Public/SQE/img/yesstar.png) repeat-x; background-size:15px 15px;}
  .s-pjlist li.p-info{ width:100%; line-height:20px; padding:5px 0; color:#444; font-size:0.8rem;}
  .s-pjlist li.time{ width:100%; line-height:20px; margin-bottom:10px; padding-bottom:5px; color:#ccc; font-size:0.8rem;}

  .depressed{font-size:1rem;text-align:center;}

  .load{ width: 100%;text-align: center;color: #aaa;font-size: 1rem;height: 38px;}

  .see-list{ padding:10px 5px;}
  .see-list li{ width:50%; margin-bottom:10px; float:left;}
  .see-list li .box{ padding:0 5px;}
  .see-list li .see-img{ width:100%; text-align:center; height:150px; overflow:hidden;}
  .see-list li .see-img img{ width:150px; height:100%;}
  .see-list li h2{ line-height:20px; height:40px; margin-top:2px; overflow:hidden; font-size:0.8rem;}
  .see-list li p{ width:100%; padding-top:3px; display:block; font-size:1rem;}
  .see-list li a h2{ color:#666; text-decoration:none;}
  .see-list li a p{ color:#ee2b3f; text-decoration:none;}

  /*查看更多商品*/
  .see-more {width: 80%;height: 40px;line-height: 40px;font-size: 1rem;display: block;color: #444;text-decoration: none;background: #eee;border: solid 1px #ddd;border-radius: 3px;margin-bottom:20px;}
  .ft-pink{ color:#df3130;}
  .more-see{ margin:20px 0 30px 0; text-align:center; font-size:0.8rem; color:#5c5c5c;}
  .more-see img{ vertical-align:middle; margin:0 0 2px 3px; width:14px; height:14px;}

  /*参数*/
  .margin10{margin:0 10px; padding:10px 0;}
  .parameter{ color:#222; font-size:0.8rem;}
  .parameter_bg{ height:10px; background:#f7f7f7;}
  .parameter_biaoti{ height:40px; line-height:40px; font-size:1rem; padding:10px 0 0 10px; background:#f7f7f7;}
  .parameter td{ line-height:20px; padding:5px 0; text-align:center;}
  .pd_top{ padding:5px 0;}

  /*大家都在看*/
  .like{ width: 100%;}
  .like ul{ margin:0 5px;}
  .like ul li{ width:50%; margin-bottom:10px; position:relative; float:left;}
  .like ul li .box{ margin:0 5px;}
  .like ul li .box img{ width:100%; display:block;}
  .like ul li .box .info{ padding:5px;}
  .like ul li .box .info h2{ font-size:0.9rem; color:#333; height:36px; line-height:18px; overflow:hidden; word-break:break-all;}
  .like ul li .box .info .price_one{ font-size:1rem; letter-spacing:0px; padding-top:6px; color:#FF3355;}
  .like ul li .box .info .price_one em.big{ font-size:1.1rem;}
  .like ul li .box .info .price_two{ color:#aaa; font-size:0.8rem;}
  .like ul li .box .info .price_two del{ float:left;}
  .like ul li .box .info .price_two del i{ font-size:0.7rem;}
  .like ul li .box .info .price_two span{ float:right;}
  .like ul li a{ display:block;}
  .align-ct{ text-align:center;}
  .p_mark{padding:10px; color:#666;}

  table{
    width: 100%;
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 0px;
    border-left-width: 0px;
    -webkit-border-horizontal-spacing: 1px;
    -webkit-border-vertical-spacing: 1px;
    display: table;
    border-collapse: separate;
    /*border-spacing: 2px;*/
    border-color: grey;
  }


</style>
