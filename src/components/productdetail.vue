<template>
  <div class="content" ref="scroll" @scroll="fix">
    <!--加载特效-->
    <div v-show="loading" class="loading">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAANlBMVEUAAADfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTBHesYPAAAAEnRSTlMA/fF5o97FSww1Za0f1IwpVkAcANuOAAABh0lEQVRIx+2U27KDIAxFIwQMNy///7OnVSSMgJXj9K1rpi/K6k7ZmUIbcmIYhCP4B2aImH6XhkR/tmPZdcuCZdEtDxnflmcMStursWk2xlPNxWFD+eaFmXHD19yIoKIqduv2zGexviR+TFC7VlFfzzW5RXR4W/HjocbInBdWDcxcc+lC1plMvcl207ZyA1Qx+YU1517rMhXBjBfRldCA2C0gfOthhSb0nnz1UMcbgmsIfgBNQYgw0W3BWCntXtisxIaab2ZZuWFfaaRERN3LtjJiASaRmG7NLBMGAsvhZjBHi4w7ssx4JD8a+9GFPanq0ZI8Wc8fQP7jCWo8l0Ep5Uzb9BIRp6XmarWzNBvCnUqpTh2YRi4eSDgxqoSryxIT569HxdRlZGwxNeNrLiEjL2TqlSW7ASIWteYRJ5bPhXiWZXzi9IaLv2JhmaAVreMrpyOOTtEjQMM+jlqdsMcKslvgpXP8BlnG/F9gIfiMzoCCL8nl2B2UF9YL5VX1UC5JP9a91KuZ/wCIaBQFmaG1twAAAABJRU5ErkJggg=="
        alt="">
      加载中...
    </div>
    <!--内容区-->
    <div v-show="!loading" class="container">
      <div class="primary">
        <div class="show">
          <router-link :to="{name:'cart',params:{username:username}}" class="cart" id="gotoCart">
            <i v-show="cartNum" class="cartNum"></i>
          </router-link>
          <router-link :to="{name:'home'}" class="home" id="goHome"></router-link>
          <!--商品图幻灯片-->
          <swiper :options="swiperOption1">
            <swiper-slide v-for="(slide,index) in slides" :key="index">
              <img :src="slide" alt="">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="info">
          <div class="price">
            <div class="nprice">
              <p class="border_rt_b pr10">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAeCAMAAABOrS0HAAAATlBMVEUAAAD/M1X/M1X/M1X/M1X/M1X/M1X/M1X/M1X/M1X/ZoD/zNT/mar/////TWr/gJX/8vT/2d//pbT/QGD/WXX/5er/c4r/sr//v8r/jaDrbgE/AAAACXRSTlMADu3axzYjrUxngdUdAAAA+0lEQVQ4y+WUSW4DIRBFnTk1MEN3cv+LRhgCCKrd8s6S34INeqr6v4cL3M8l82SiibCAeC5qpWGB+VzcCTuTGOmKKGpFDacmER0iGiuKP35I5q6nqiBgHua9JG42DCKVs0ykKlotiNoyFvSRaAgqXy9NDM6To0ziI5G2ttF7NsuilK8zfCRqC523z5bxVAxuH8zXD1E0JLQa0jaI300cM7LYKqZxYBd/e6vsJRFs7BGnjAWdDJiwioSt1FUMOZQHsLiKqU7M3joRy62aVg2I3onvKhkY2NzUaiTatSiy9dzYLf8/zTrxxvdoeABzR6Ze6CPxnBAf6y/36OIfg2Y7ee+agZoAAAAASUVORK5CYII="
                  class="baoyou" alt="">￥<em class="nowPrice">{{product["sales_price"]}}</em></p>
            </div>
            <div class="oprice">
              <p class="pl10">
                  <span class="Bdisplay lh18 ft07">
                    <del>￥<em class="ft08 oldPrice">{{product["original_price"]}}</em></del>
                  </span>
                <span class="Bdisplay ft07 ">
                    <em class="ft08 buyPeople">{{product["buy_num"]}}</em>个人购买</span>
              </p>
            </div>
          </div>
          <div class="title">{{product.productTitle}}</div>
          <p class="activityTime" id="activityTime">
            <span class="time">剩余1天23小时37分钟</span>
          </p>
          <p class="fahuo">
            <span class="oversea"></span>
          </p>
        </div>
      </div>
      <!--楚楚街服务承诺-->
      <div class="service">
        <a href="https://public.chuchujie.com/Public/Chuchujie/oversea_question.html">
          <p><img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAMAAAAPkIrYAAAAk1BMVEUAAABVpf9Vpf9Vpf9Vpf9Vpf9Vpf9Vpf9Vpf9Vpf9Vpf9Vpf9Vpf9Vpf9Vpf9Vpf9Vpf9Vpf9Vpf////8oeNI0gddnq/qp0v81lP/n8/9GlvKKwv/a7P+12P+Zyf9YmN9EjNvy+P97uf85juw5iePD4P/R5ftyp+Ieab0XX65ZofIPUZugxOtkoukPgP+tzO6ItOaK0e17AAAAEnRSTlMAC5PPGN0mr3c2uYNpw6LoVULqi2nKAAAC/0lEQVRYw62Y63aqMBBGBQQUvH4ngCLiXeuxp+37P91JBY1mEiFptz8U1mI7JMOQSecVznTgRv4Y3/iRO5g6HTv6vQiEYdw3FnV7PjT4cdfI5OIlo8DSpLa1i22AVvSaTYGHlnhNszCBAYOXKhdGjPQmJ4IhkaNTDWGMp5nPCBZ4yshC4LdkLiwJDZLBODUC/AApaT38AP9J1YMl9Nns4pm0CUgE2jlcsSYSyRbqwvrHmklIYOqw1qwFUmAjzWglFi4E6klkFW9v1CDO/sMzscgt6jpfLm8K1eVyVrrGypT/W7uQnKnrzFCdXUFiKm6RuJhm3MDULleULYUrV6l29V+slQ8SZFdSgTxRkGN9/SYu8Arbh8TiT0XKf1BKVN8FcU0Ur9ayvmqbUpM4S12xop5m9wgKqtrcwp6r6mukcx35ZYQlDjepjKeogsvbdSnmxJViU/8CaLb6kDiIGLY0rFJYZWhK4PgQRPasKoCNkUuM+OEapGCeYikmFDJOZwyJh0HKxOhxilTMhtoFmc1TZmIxF+LHiV1ARjH20mBzw7IoDmVaZ8vxlHx960uFy1O5BPPq/3c5tgU/el9VVeJzngF5vodgTJckKUn1ZblYsDvrr+NJHD3nqktcKhhLGCfZ7643+nla84PVkyukz/ZW40LFLCNna2Jacxa2rgmphfauLq3RpaXLV7w7MkuXq3inLS1dU/KutXb5qmbqoHHNKj40rli1NjlqXFlFyT93HlyBas1UaFz3OvQxu8MYWcwFRq7Z4yqGLqVHJCcMXZFm7ZvNFTS4ApM1OWPHFy7XqFfYsRN17dm+yi3HrIdh7CS79rew+obdf85lm8olVLlmR8Btjmz9Llx5clOFNr0ov3r1zl21KcGVoWPebteG9WqHHf9mOWlriazRdiXJpd6dykI0w4PacxO5wZ823aHza3swvV/bG/L7SoFNv+w6rfbSRmgkDDotCRpsYd9oxzD2oWEcB+Z7orEHgu9OO3Y405479GuLF/YmNMvNnU6nDf8BrJVBrM9i0s4AAAAASUVORK5CYII="
            alt=""><br>正品保障</p>
          <p><img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAMAAAAPkIrYAAAAclBMVEUAAAD/zAH/zAH/zAH/zAH/zAH/zAH/zAH/zAH/zAH/zAH/zAH/zAH/zAH/zAH/zAH/zAH/zAH////k5OTb29v70Cb/7Jn+0Bbz1l7l38n/20j/4GT51Dzn3rX/5Xr/++n/88T/8LLp3KXu1XL/9tLs2o7E0rxAAAAAEXRSTlMADcy3jW025vApmh2nT9xfefgItY8AAAJoSURBVFjDtdjdkrIwDAZgWyogApplseC/oPd/i5/fumNm0p9Axn3PPHkmhFrSLqJZV6bUdQ7PZLrcVuuFMFVRA01WVPOhlcnAn8ysZklpArEk6fSaUApq02pTBqbEKJ5Ka5iWmn3QJUzPMk6VMCelirQqgXnRKkhpACHGU3IsAUkSH2VAlsKlNiDNhlJrkGdFLA3yaHa5S/8AKocZOdyu9/sBMLmSvsPb1/80LWAM03iGao4AmLWorN2LIpbBbs2mqAVq/ks8v6nGel+lllAnssbczu930SDVW7r4nUe8fDEJUbCle81ZRuHekzNlsRS+yRR/2vNdTEHqrIj2fOWok5eCJS56hkOqacEbE9jm7eEapL4DVoIrleGQCln108oAQ7mbSwWtHJcEwyEVsuBpAZM9oSKWYih7IVTQUmxdV0rJrR2h4v3KmGYhxVs6QrUXpDirZsab+5saWSvxfoTa/W92753hCANnGd+Ac/TuDB1a4UEgdXpEqQc8YzkrXTh/InunVAc/OTGWZ7a0Z6zrt1WvjHEr8X9q9ze3KoA2bm1Dk8nhTaEFPVrh4VB7rYZaj5ilcZ5wrcaxjmiFR0MF7hJrXAv6iKXC89fDZz3ClonNhd0wDD2xurC15ubVkVg2aBXsHG2JBUPAyhU/35/I7NAFrOWEc0dHZgfrtzS9R/BZdqCFeq2V6Jw2ohU9whfAp/VYpfRc23/3HWmW+Lw9jvbjh3ek/vJ+ArFyFpWoj93nbNl7pmyilKUfu/8qlPSGj0aTouSarubdPhZ58OnSxdyoqsjchpeVWsiy2phEZy9Fl2YTv738B9XAKIdDQe7DAAAAAElFTkSuQmCC"
            alt=""><br>海外直采</p>
          <p><img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAMAAAAPkIrYAAAAYFBMVEUAAAB3zcx3zcx3zcx3zcx3zcx3zcx3zcx3zcx3zcx3zcx3zcx3zcx3zcwcu7n///+Q2Neu4+Of3dzP7+9JxcSB1NNtzcy75+c2wsBXyMft+fnF6upiy8nj9vb0+/vb8/NkeyjkAAAADXRSTlMA0O5MmmA7unch3xOHGc5aEwAAAzRJREFUWMPFmFmSqzAMRdtAgJAWGGMbCCTsf5ePMMkGD6T5ePejU11UnZKuZHn4ceoR36KEkCwIMpJEafj4+aPCiMBeJAq/B8VRAGYFUfxdSARcIuHXpOu0ewJnlNz9qBTOKvWQHgmcF3GGFgfwjQJHRW/wrW7XUajUg7oeWQioi7AY/qr40AzOClJWjmLCXM19ayR2Tj0Uq54dNfXZyW4vn4WqlxH2q61BC6l+q6CKgWzb3mSZN0OmxdQJyfOPGkOWvnaotJjoSFrEoaLWxiAGknipqBLaHCXrgoGmzBUWVfN7UuC5Ik6LPexmD0toKAFNrgnGz9TkWOz2ClEoOX5/mUoZGTKsqmFrB7qiUH09eagqmliW1cOWNmUbCtWW44e3vpJc84GxybQKbUdxVoyqQVU4sn5tq4dOxRR9flQ7sd6HJImdNcJKyK2sgu1a7AF21kfcxOpnVgWq7j+hh5WbBGWBSaJhqYfVNiZWt7SLvo1EHhbQWrZcBzawLNZSNz/xser5t+eK9TCj9K5IfoiPtRkst+DkaP3RfGJn1WJOUcmDLyluy3XQmyKzs9YfVK+nWLz0VRR4WHoPSeyI71mY4kweYRzeZpYjx42I6ij0nwm9atBYDu+PKZZsNyg7vY6Jk8UwReUfUXavY68m9r7v5j8oqkXBDmsosq9HyvUUhZ5uR9+7tZ3a50TzGVNMKaFQ9wMGwHS7IDTNL+xxLtUSopVzXQa6m1+WQsp1JEgs4SJWLQyx37ot5osVlnO9nqIqwajItg/JZ1G1OGJoh54LMCu07Y/l1D3NmmipeG5RYNu3RTGL5Wgbem5UZDtPdHiWQNtGz/2naXLsB7qOArStYeAQsZy/5GRRsapusJ7+GwMxtGnOp3GAtkkXKrOcV7fO6l9omy8s8zlaPZniSXNwooj1fI+bF9pWOlmx497RY2i82w12170Ds7Qk2g849FwZYpbBsck2CWeGwd1zf0TbvP0Qnroi9wuNe9rBD0PbLl/e0bbWgzoPk/xMgtffTcKLj0wocr/8zoTd7lVMzgV17qXvlnlJGZrupRF3TLf/8I554X3VqUeYRgnJglHTu6+7Cf4B+Q3tVPzYC28AAAAASUVORK5CYII="
            alt=""><br>全场包邮</p>
          <p><img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAMAAAAPkIrYAAAAUVBMVEUAAADEk//Ek//Ek//Ek//Ek//Ek//Ek//Ek//Ek//Ek//Ek//Ek//Ek//Ek/////+lW//w5P/Ws/+tav/o1P/cvv/58//Rqv/Knv/hx/+2ef/3XZy2AAAADnRSTlMA2+6azE+7cl1EFzaDItibCnYAAAJvSURBVFjDtZiLsqowDEXpCwQ0WC5P//9DL4dzMNQmUNpxzeiMFrdJuktDs0OqslC5FkJKoXNVlFUWSakEfCJUeV2oVhJopKovKRkNR2iTroSIMLVHDiHkj3OpAkK5nyhVOYSjD0OrBVxBHhjkBle5pZcKKU6iShczgCSmWUMspWcGAbHIT2vkEI9OnEJ+BTwgjTo5Q0STdkg2hgaPqe8sTTe34CH4sOahOcSOXmBMWD0qsdjJC4xyvG2CaCn3K7dQtgmkhz1q1ZJ+VBGRyXVLhT1dcwGnZmbRusOOsbmC/UxSsxkOw/LqkJ9B62eJM1kxYQ39BO3yW3d0WN47JrDKLZd1riK11q/fjIAY926DUa0f248ct+/7ZmMGpHDcNdqNX+/M3NTZN07x871WvzGtH9mpa/sNQHJnGq1Th4lclrN3Id7EBCADXuKtAGZoF5hgtCanWLZtLU7LMtZRWtJZjeOu9NNuTp8L+EfdMvi+MQKjxSxMeK4AuQwdLQEkEyb4/OOt3nFaGkhmrPWmNZ4EJrjtrDnSmoEizxQT1ptu05p3s0GhmN1/b9PXc+W1NyzdCZRA0DvL5rVKocOYwExWsWEh8zTN/L6B9y/KFG1zxkBu3VTxbfgehCjsAC5uIJYo14IkDHGO7/qMSnJqA/BSpDvo1zMAppvWyVrYgJl0LWwMRbKWwH41WevG9dGvfwHAHv2l/j67Qwr3rz0PZZUEJO45DSkhFpPwiMy5NP25r/jKOUD6+QRLKSPPTdLPc6rsmHuE21lqHRZUnYVwE3CGwKKfqukIpZhzzJhjUUOer5osksqs575yQeSqMMcm+A+FwPtFSjufrgAAAABJRU5ErkJggg=="
            alt=""><br>专业咨询</p>
          <i class="iconfont icon-right"></i>
        </a>
      </div>
      <!--优惠券-->
      <div class="counponShow" id="counponShow">
        <div class="counpon" @click="getShopCoupon(product.shop_id)">
          店铺优惠券({{couponInfo.count}})
          <span class="mark" :class="[coupon.bg_color]" v-for="coupon in couponInfo.list"><i>{{coupon.coupon_description}}</i></span>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <!--小编验货-->
      <div class="check" id="goodscheck"></div>
      <!--店铺信息-->
      <div class="store">
        <i class="brand_icon"></i>
        <div class="gotoShop">
          <router-link :to="{name:'shop',params:{id:product.shop_id}}">
            <div class="photo">
              <img :src="shop_info.shop_header_image_url" alt="" class="shopImg">
            </div>
            <div class="name">
              <h3 class="ft09 ft4 shopTitle wordall">{{shop_info.cn_name}}</h3>
              <p class="ft08 ftA shopAddress">{{shop_info.delivery}}</p>
            </div>
            <!-- <em class="sc_dp border_d align-ct ft07"><img src="../img/icon_sc.png" class="align-middle mr5" alt=""/>收藏店铺</em> -->
          </router-link>
        </div>
        <!--楚楚街服务承诺-->
        <ul class="promiseShow">
          <li class="bigwd"><p class="item fw_wd">9天无理由退货</p></li>
          <li class="bigwd"><p class="item fw_wd">24小时发货</p></li>
          <li><p class="item fw_wd">交易保障</p></li>
        </ul>
        <!--店铺热销-->
        <div class="isList" id="isList" v-for="special in special_list">
          <div class="wrap">
            <div class="border_tp_e">
              <p class="rx_line"><span class="isTitle">{{special.specialInfo.title}}</span></p>
              <p></p>
            </div>
          </div>
          <!--商品图幻灯片-->
          <div class="slides">
            <swiper :options="swiperOption2">
              <swiper-slide v-for="(slide,index) in special.productList" :key="index">
                <a :href="slide.product_detail_url">
                  <div class="img">
                    <img v-lazy="slide.imgUrl" alt="">
                  </div>
                  <div class="info">
                    <p class="price">￥{{slide.newPrice}}</p>
                    <h2 class="title">{{slide.title}}</h2>
                  </div>
                </a>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
        </div>
        <!--链接至：全部商品、进入店铺-->
        <div class="link">
          <a class="allproduct">
            <i class="iconfont icon-allproduct"></i>
            <span>全部商品</span>
          </a>
          <router-link class="tostore" :to="{name:'shop',params:{id:product.shop_id}}">
            <i class="iconfont icon-tostore"></i>
            <span>进入店铺</span>
          </router-link>
        </div>
      </div>
      <!--选项卡：导航-->
      <div class="tabnav" id="tabnav" ref="nav">
        <ul class="" id="tab" ref="tab" :class="{fixTop:isFix}">
          <!--<li class="detail" :class="{active:iscur==index}" v-for="(tab,index) in tabs"><p>{{tab}}</p></li>-->
          <li class="detail" :class="{active:iscur==0}"><p>详情</p></li>
          <li class="evaluation" :class="{active:iscur==1}"><p>评价(30)</p></li>
          <li class="attribute" :class="{active:iscur==2}"><p>属性</p></li>
          <li class="recommend" :class="{active:iscur==3}"><p>推荐</p></li>
        </ul>
      </div>
      <!--选项卡：内容，使用动态组件引入-->
      <div class="tabcontent" id="tabcontent">
        <swiper ref="mySwiper">
          <swiper-slide v-for="(slide,index) in slides3" :key="index">
            <component :is="slide.component" :product_id="product_id"></component>
          </swiper-slide>
        </swiper>
      </div>
      <!--底部购买-->
      <div class="buy">
        <a :href="shop_info.chat_url">
          <i class="iconfont icon-service"></i>客服</a>
        <!--<a href="javascript:;"><i class="iconfont icon-collection"></i>收藏</a>-->
        <a class="addToCart" id="addToCart" @click="addToCart">加入购物车</a>
        <a class="gotoPay" id="gotoPay" @click="gotoPay">立即购买</a>
      </div>
      <!--返回顶部-->
      <div v-show="isTop" id="oneKeyToTop" @click="toTop">
        <i class="iconfont icon-top"></i>
      </div>
      <div class="mask" v-show="mask">
        <div class="bg"></div>
        <div class="dialog" v-if="count==1">
          <span class="dialog-text">优惠券领取成功</span>
          <button class="dialog-btn">确定</button>
        </div>
        <div class="dialog" v-else="">
          <span class="dialog-text">领取已达上限</span>
          <button class="dialog-btn" @click="">确定</button>
        </div>
      </div>
      <!--购买遮层-->
      <div v-show="isLayer" class="layer">
        <div class="layer_box" id="layer_box">
          <div class="close" @click="isLayer = false">
            <i class="iconfont icon-close"></i>
          </div>
          <div class="info">
            <img
              src="https://image-shop.chuchujie.com/culiu.cdn/image/201805/15/bf140265eb85b4d208b9392a41679d66.jpeg?imageView2/2/w/720"
              alt="">
            <div class="text">
              <p class="title">{{product.productTitle}}</p>
              <span class="price">￥{{product.sales_price}}</span>
              <span class="stock">
                <em class="ftA pr5">库存<span id="skuStock">{{product.stocks}}</span>件</em>
              </span>
            </div>
          </div>
          <!--size-->
          <div class="size">
            <h1>选择
              <span class="selectTitle">尺码</span>
            </h1>
            <ul class="optionList">
              <li v-for="(size,index) in sizeList" :key="index"
                  :id="size.id"
                  @click="selectSize(index)"
                  :class="{select:isSize==index}">{{size.name}}
              </li>
            </ul>
          </div>
          <!--color-->
          <div class="color">
            <h1>选择
              <span class="selectTitle">颜色</span>
            </h1>
            <ul class="optionList">
              <li v-for="(color,index) in colorList" :key="index"
                  :id="color.id"
                  @click="selectColor(index)"
                  :class="{select:isColor==index}">{{color.name}}
              </li>
            </ul>
          </div>
          <div class="count clearfix">
            <h1 class="ft1 ft4 mb5 lh30">数量</h1>
            <div class="p_num">
              <div class="num_btn" @click="reduce">-</div>
              <div class="btn_txt"><label class="sku_count">{{buy_num}}</label></div>
              <div class="num_btn" @click="add">+</div>
            </div>
            <p class="">*已超出限购数量</p></div>
          <div class="btn">
            <a href="javascript:;" :class="{active:isBtn}" @click="submit">确定</a>
          </div>
        </div>
      </div>
      <!--优惠券弹窗-->
      <div v-if="couponLayer" class="coupon-layer" id="coupon">
        <div class="layer-box">
          <i class="iconfont icon-close" @click="couponLayer=false"></i>
          <div class="info">
            <h2>领取店铺优惠券</h2>
            <div class="coupon">
              <div class="price" v-for="(coupon,index) in couponList">
              <span>
                <em><i>{{coupon.face_value}}</i>元</em>（{{coupon.limit_description_price}}）
              </span>
                <p class="date">使用期限：{{coupon.start_time}}-{{coupon.end_time}}</p>
                <button v-if="!isAccept" :cid="coupon.id" class="btn" @click="acceptCoupon(coupon.id)">
                  {{coupon.message}}
                </button>
                <button v-else="" :cid="coupon.id" class="btn">{{coupon.message}}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {findOneProduct, getShopCoupon, acceptCoupon, addToCart} from "../api"
  import detail from "./productdetail/detail"
  import evaluation from "./productdetail/evaluation"
  import attribute from "./productdetail/attribute"
  import recommend from "./productdetail/recommend"
  export default {
    data(){
      return {
        username: '',
        product_id: '',
        product: {},
        loading: true,
        couponLayer: false,
        couponInfo: {},
        couponList: [],
        isAccept: false,
        swiperOption1: {
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            //分页器类型必须设置为custom,即采用用户自定义配置
            /*type: 'custom',
             //在页面上生成自定义的分页器
             renderCustom: function(swiper, current, total) {
             let customPaginationHtml = "";
             for(let i = 0; i < total; i++) {
             //判断哪个分页器此刻应该被激活
             if(i == (current - 1)) {
             customPaginationHtml += '<span class="swiper-pagination-customs swiper-pagination-customs-active"></span>';
             } else {
             customPaginationHtml += '<span class="swiper-pagination-customs"></span>';
             }
             }
             return customPaginationHtml;
             }*/
          },
        },
        slides: [],
        special_list: [],
        swiperOption2: {
          // 设置分页器
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          //自动轮播
          /*autoplay:{
           delay:1000,
           disableOnInteraction:false//操作swiper后，不停止切换
           },*/
          slidesPerView: 3,//设置显示器同时显示的数量
          slidesPerGroup: 3,//定义一组slides的数量(每次滑动的数量)
          //loop:true,//循环轮播
          //loopFillGroupWithBlank: true,//在loop模式下，为group填充空白slide
        },
        slides2: [],
        mask: false,
        count: 0,
        tabs: ["详情", "评价", "属性", "推荐"],
        iscur: 0,
        index: 0,
        slides3: [
          {path: '/detail', component: detail},
          {path: '/evaluation', component: evaluation,},
          {path: '/attribute', component: attribute},
          {path: '/recommend', component: recommend},
        ],
        isTop: false,
        isFix: false,
        isLayer: false,
        cartNum: false,
        sizeList: [],
        colorList: [],
        isSize: null,//不能为空字符串''，因为转为布尔时为0
        size: '',
        isColor: null,
        color: '',
        buy_num: 1,
        btn: 'addToCart',
        productInfo: {},
        orderInfo: {},
        shop_info: {}
      }
    },
    watch: {
      $route(n, o){
        this.cartNum = false
      }

    },
    created(){
      this.getData();
    },
    mounted(){
      //注意：应在生命周期函数mounted的this.$nextTick()中获取dom元素
      this.$nextTick(() => {
        let tabList = this.$refs.tab.children
        let swiper = this.$refs.mySwiper.swiper
        //console.log(swiper);
        //使用let选项卡绑定事件：点击选项卡时，给tab加样式，并跳转到对应的slide
        for (let i = 0; i < tabList.length; i++) {
          //使用箭头函数，this指向vue实例
          tabList[i].onclick = () => {
            this.iscur = i
            swiper.slideTo(i, 0, false)
          }
        }
        //滑动slide时，给对应的tab加样式
        swiper.on("slideChange", () => {
          this.iscur = swiper.activeIndex//左右滑动时将当前slide的索引传给iscur
        })
      })
    },
    methods: {
      async getData(){
        let userinfo = JSON.parse(localStorage.getItem("m_ccj_userinfo"))
        this.username = userinfo.username
        this.product_id = this.$route.params.id
        let productDetail = await findOneProduct(this.product_id)
        this.product = productDetail.product
        //如果返回的是空对象，则跳转到首页
        Object.keys(this.product).length > 0 ? void 0 : this.$router.push('/')
        //Object.keys()返回对象自身所有可枚举属性名组成的数组，但不包括原型中的属性。
        document.title = this.product.title//设置页面标题
        this.slides = this.product["image_urls_head"]
        this.special_list = this.product["special_list"]
        this.shop_info = this.product.shop_info
        this.sizeList = this.product.attr_keys[0].attr_values
        this.colorList = this.product.attr_keys[1].attr_values
        this.loading = false
        //从产品详情列表productDetailList.json获取优惠券信息
        this.couponInfo = productDetail.coupon_tmpl
      },
      //从店铺优惠券数据shopCoupon.json中获取店铺优惠券列表
      async getShopCoupon(shop_id){
        this.couponLayer = true
        this.couponList = await getShopCoupon(shop_id)
      },
      //将“已领取”反馈到店铺优惠券数据shopCoupon.json中
      async acceptCoupon(coupon_id){
        let coupon = this.couponList.find((item) => {
          return item.id == coupon_id
        })
        let shop_id = coupon.shop_id
        await acceptCoupon(shop_id, coupon_id)
        this.getShopCoupon(shop_id)
      },
      //固定导航条tabnav
      fix(){
        let scroll = this.$refs.scroll
        let nav = this.$refs.nav
        //当滚动条滚去的高度scroll.scrollTop>=导航条"外层盒子"距离可视区域上边框的高度nav.offsetTop时，给导航条tab添加fixTop样式固定。注意：一定是监视“外层盒子”，给内层加样式。
        if (scroll.scrollTop >= nav.offsetTop) {
          this.isTop = true
          this.isFix = true
        } else {
          this.isTop = false
          this.isFix = false
        }
      },
      //回到顶部
      toTop(){
        this.$refs.scroll.scrollTop = 0
      },
      //加入购物车
      addToCart(){
        this.$refs.scroll.scrollTop = 0//页面回到顶部
        this.btn = 'addToCart'//确定按钮执行加入购物车
        this.isLayer = true//显示蒙层
      },
      //立即购买
      gotoPay(){
        this.$refs.scroll.scrollTop = 0
        this.btn = 'gotoPay'
        this.isLayer = true
      },
      selectSize(index){
        this.isSize = index//对应的尺寸有选中样式
        this.size = this.sizeList[index]//保存选中的尺寸
      },
      selectColor(index){
        this.isColor = index
        this.color = this.colorList[index]
      },
      reduce(){
        if (this.buy_num <= 1) {
          return
        }
        this.buy_num -= 1
      },
      add(){
        this.buy_num += 1
      },
      async submit(){
        //选取的产品的信息
        this.productInfo = {
          "username": this.username,
          productData: [{
            "shop_id": this.product.shop_id,
            "product_id": this.product.product_id,
            "sku_values": "尺码:" + this.size.name + ";颜色:" + this.color.name,
            "buy_num": this.buy_num,
            "statics_id": 141//用于服务端server判断从哪个页面进入到订单确认页webpay.vue，141表示从购物车cart.vue，37表示从产品详情页productdetail.vue直接进入，根据statics_id的值返回不同的数据
          }]
        }
        //根据btn的值，决定加入购物车，还是立即购买
        if (this.btn == 'addToCart') {//先加入购物车，从购物车再跳转到订单确认页webpay.vue
          await addToCart(this.productInfo)
          this.cartNum = true
        } else if (this.btn == 'gotoPay') {//直接跳转到订单确认页webpay.vue
          //从详情页productdetail.vue直接“立即购买”应该和购物车页cart.vue“去支付”传递的参数一致，这样后台才能统一解析获取的参数，所以这里将上一步加入购物车使用的参数名productInfo和productData修改为orderInfo和orderData，参数的值不变。
          this.productInfo.productData[0].statics_id = 37//直接购买时，更新statics_id
          this.orderInfo = {username: this.username, orderData: this.productInfo.productData}
          this.$router.push({name: 'webpay', params: {orderInfo: this.orderInfo}})
        }
        this.isSize = null
        this.size = ''
        this.isColor = null
        this.color = ''
        this.buy_num = 1
        this.isLayer = false
      },
    },
    computed: {
      isBtn(){
        if (this.size == '' || this.color == '') {
          return false
        } else {
          return true
        }
      }
    },
    components: {swiper, swiperSlide, detail, evaluation, attribute, recommend}
  }
</script>
<style scoped lang="less">
  /*想要改变分页器的背景等样式，不能加scoped；
  如果不加scoped，即为公共样式，注意：这里的样式可能会影响其它组件中相同类名的样式；
  所以暂时不改变分页器样式*/
  .content {
    position: fixed;
    top: 0;
    bottom: 0;
    overflow: auto;
    width: 100%;
    z-index: 9;
    font-size: 12px;
    font-family: "\5FAE\8F6F\96C5\9ED1";
    font-weight: 400;
    line-height: 1.5;
    .container {
      width: 100%;
      background-color: #f7f7f7;
      .primary {
        width: 100%;
        margin-bottom: 10px;
        background: #FFF;
        border-bottom: solid 1px #EEE;
        .show {
          position: relative;
          overflow: hidden;
          height: 414px;
          .cart {
            position: absolute;
            top: 10px;
            right: 60px;
            width: 40px;
            height: 40px;
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAY1BMVEX39/cAAABzc3MsLCz39/f39/f39/f39/c4ODiCgoKurq7l5eX39/f39/dOTk5bW1v39/f39/f39/eSkpKenp739/f39/e8vLz39/dmZmbQ0NDZ2dn39/f39/fFxcVEREQiIiLhSwqWAAAAIHRSTlPMAOv9sju7G/rn3NGVEfPwqXxI4uBfWNl07dTTn4bX9rGECe4AAAK0SURBVFjDzZnn0tsgEEWvJUC9N3fz/k8Zx58TxgtIgDKenJ8az5HWXFFWOKxT8flYtgKAYG15nHl1WGdVyI8tNNojDxPyG6zcuLdwZliFzV7CSWATMTkLewYnWO8kTEo4Uybbwh5e9FvCDp50q8LqCm+ulV2YMATAEpswEQhCJERIfKFGKqwYgmGVQXjFDq5EqOclOD0gea6jYSkQQP8pTPBG/iatowt8ST6EJd6k8ocRvpRvIX2Bi2WIaimjkKKVkCYmlQ28YUo4gdDINBuXC/yY/goFCJH8Ia1P2ZDfHc3ij3AGZZCE+NFET/VyXo3U/BYyUHIp83M+ZlHzSKk7rZvnY4+/5dTOfoQcGhcpBzXu5yUfnu46jaVmjz6k/CW8QceWm+Jyz8en/dTUj/R1gxOguL2EUHjnJpMxoPhtUxWT3MCFMxHyA9Q0Q3IDF3JZk0kHaoxJbs5wIJIZGWdUMLFImcOBh7zjgwocCpKbbQoZ4xOOCUZip/lm1MIwobPVUmObkzZvdiiB8Nykks4bJVogODdn/a4tBIyMLrkZtD9a6YJy06jfOASCRNYchQIGgnOzGJMgEJybzFgEQ3BuarkYnq+13l4WTu8djU0Ja27uW1NXA40SnT0341ZoRmh0mEJzk5sqxgRuz80JdoohNlbAUdnHcBVLARUOzDo1rRHXOQwwskiR3NzhS6eWUY27WsTd4Wqh16kD9rF0K0IfUWYFfLiRzRIhj+UKMMDJdo5yidLYR8jIhnM3M9kS70WQTftuJnKs2AsjBx8zURxHlkuU3nQ0M54vIuMlSkkOj2ZeqYmNlygJOd7uFfbaAXxfyZ2xRRA+KNcvNDH+dZslvLEEsMTaqmoRQJt8oZmmOMKT41ZDkgt4IPhXWqbhTd2vt53DG+P7W/f/w8cF+vkDwunzxy85W0AtpTnQHwAAAABJRU5ErkJggg==") no-repeat;
            background-size: 100% 100%;
            z-index: 2;
            .cartNum {
              position: absolute;
              top: -1px;
              right: -1px;
              width: 8px;
              height: 8px;
              background: #fe3355;
              border-radius: 50%;
              border: solid 2px #FFF;
              z-index: 12;
            }
          }
          .home {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 40px;
            height: 40px;
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAY1BMVEX39/cAAACBgYH39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/dSUlJ3d3f39/f39/fm5uY1NTVBQUG9vb3Gxsbd3d2Li4tcXFyrq6v39/dsbGwiIiIO+rNLAAAAIHRSTlPMAOazBzvDvJUaEap8SF9YdfLon4bQ+vfZ1tLk79wh6nIwbZ8AAAJoSURBVFjDzdlvk5owEAbwnNkQ/iMooKh3+/0/Zbc2V8+jeUJsOtPnDSNsfgMzIMmi3nBK0+3zymZKWV3l+86UgQEIJLOv1CrV3tBLoDlmypPsaGJB6rSC0R1FgNRaFYxtaSvYaLUputkEFrnanLwIg02mIpI1AZBqFZmaEFgeVHQOpR8stHohuvCB78CD4vsKDJ5f+BzXYIk9LJZrkA7qL3KgFQjvl9N1mq4nePd8BxtUfeF7LqimeQYL9HzsmOdhmJl36JkpnsAce4OSDFjMv4IN9pyzw2LzAEmHvbCo6TfYhrxtYvsJkg14G0VLDuwC3maxc6DG3nZR/wIN9mJEcweP0IsSjz9ByoAXeSQjAQ0aFXvMCFiDMdFiLaAGI6JF/aZKUB8vCmdAdbwoXAtq40XhalAZLwqXg7p4UbhqXeWCLFeyEoWzPg+DHlE439sJgOiocGlBlR60qS9ZpwWtqpKCwuVJQeHqpKBwbVJQOJMUFK5MCgr3psNDTh8z8/xxCoPavaQguPTs0i8hsBbQBMDzxLw7y3bHPJ0DoBGQMgguE/ejumfseVogmJGbigDwyv1jZ89XCB7dZAmAZ+blsXNhPiPQuOkcAAcelIv7CUD9OeEE4MynpxUQzwDs0JSY2W1G9SUjsx+0hCbtnpEIbOGyIh7UBBc+zKMfHP8ENnhp1vPFD164X/+1BhaPN+bL6AOZb2jx+Ljo9RzCAw6eC4YL8FvvBW+hBXj6FkH6Jkb6Nkv6RpCkqF7xquLfN9MeoX2st6dAQ9LYGM6a1C3TxE3d1G3nxI3xtK37/+HjwvfPH5nd9PnjB57qORr7lUuyAAAAAElFTkSuQmCC") no-repeat;
            background-size: 100% 100%;
            z-index: 2;
          }
          img {
            width: 100%;
            height: 100%;
          }

          /*方法一：直接改变样式*/
          .swiper-pagination {
            box-sizing: border-box;
            padding-right: 13px;
            bottom: 13px;
            text-align: right;
            /*!*想要样式生效，不能加scoped*!
            .swiper-pagination-bullet{
              !*display: inline-block;*!
              margin: 0 2px;
              !*width: 8px;*!
              !*height: 8px;*!
              !*border-radius: 50%;*!
              background: #dadcdd;
              opacity: 1;
            }
            .swiper-pagination-bullet-active{
              background:#ff5a5a;
              opacity: 1;
            }*/
          }
          /*方法二：自定义样式类名*/
          /*包裹自定义分页器的div的位置等CSS样式*/
          /*.swiper-pagination-custom {
            box-sizing: border-box;
            padding-right: 13px;
            bottom: 13px;
            text-align: right;
            !*自定义分页器的样式，想要什么样子自己写*!
            .swiper-pagination-customs {
              display: inline-block;
              margin: 0 2px;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: #dadcdd;
            }
            !*自定义分页器激活时的样式*!
            .swiper-pagination-customs-active {
              background-color: #ff5a5a;
            }
          }*/

        }
        .info {
          margin: 10px;
          color: #aaa;
          text-align: center;
          .price {
            position: relative;
            .nprice {
              display: inline-block;
              padding-right: 10px;
              line-height: 32px;
              color: #fe3355;
              font-size: 19px;
              border-right: 1px solid #bbb;
              .baoyou {
                display: none;
                margin: 0 2px 6px 0;
                height: 18px;
                vertical-align: middle;
              }
              em {
                font-size: 24px;
              }
            }
            .oprice {
              position: absolute;
              bottom: 0;
              display: inline-block;
              padding-left: 10px;
              span {
                display: block;
                line-height: 16px;
                text-align: left;
              }
              .lh18 {
                line-height: 18px;
              }

            }
          }
          .title {
            width: 90%;
            margin: 10px auto;
            color: #444;
            font-size: 12.8px;
            overflow: hidden;
            -ms-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .activityTime {
          }
          /*.fahuo {
            margin-bottom: 10px;
            line-height: 18px;
            span {
              display: inline-block;
              margin-top: 5px;
              padding-left: 15px;
              line-height: 18px;
              color: #77cdcc;
              background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAM1BMV…wrp91E8ZUeMj6ziavtZVqOsyT981B/n/YMA59heI+PnfH5AJVYBnQF3C4JAAAAAElFTkSuQmCC) no-repeat left center;
              background-size: 12px 12px;
            }
          }*/
        }
      }
      .service {
        margin-bottom: 10px;
        background-color: #fff;
        a {
          position: relative;
          display: flex;
          margin-right: 10px;
          padding: 10px;
          text-align: center;
          p {
            flex: 1;
            line-height: 16px;
            color: #6a6a6a;
            img {
              width: 30px;
              height: 30px;
            }
          }
          .icon-right {
            position: absolute;
            right: 10px;
            display: inline-block;
            line-height: 49px;
            color: #aaa;
            font-size: 16px;
          }
        }
      }
      .counponShow {
        margin: 10px;
        padding: 10px;
        line-height: 24px;
        font-size: 16px;
        background-color: #fff;
        border-top: 1px solid #ffcc01;
        .counpon {
          position: relative;
          .mark {
            display: inline-block;
            margin-right: 4px;
            padding: 5px 8px;
            line-height: 20px;
            width: auto;
            color: #fff;
            font-size: 12.8px;
            text-align: center;
          }
          .bg_red {
            background: indianred;
            background-size: 100% 30px;
          }
          .bg_blue {
            background: lightskyblue;
            background-size: 100% 30px;
          }
          .bg_orange {
            background: orange;
            background-size: 100% 30px;
          }
          .icon-right {
            position: absolute;
            right: 0;
            display: inline-block;
            line-height: 30px;
            color: #aaa;
            font-size: 16px;
          }
        }

      }
      .store {
        position: relative;
        margin: 0 10px 10px;
        font-size: 12.8px;
        background-color: #fff;
        border-top: 1px solid #fe5164;
        /*.brand_icon {
          position: absolute;
          top: 0;
          left: 0;
          width: 30px;
          height: 30px;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAM1BMV…eSx5LHkseSx5LHkseSx5LHkseSx5LHkseSx5LHkseSx/4AblQWVRY0kM4AAAAASUVORK5CYII=) no-repeat;
          background-size: 100% 100%;
        }*/
        .gotoShop {
          padding: 10px 10px 0;
          a {
            position: relative;
            display: block;
            height: 65px;
            overflow: hidden;
            zoom: 1;
            div {
              display: inline-block;
            }
            div.photo {
              position: absolute;
              top: 5px;
              left: 0;
              width: 50px;
              height: 50px;
              img {
                width: 100%;
                height: 100%;
                border-radius: 5px;
              }
            }
            div.name {
              position: absolute;
              padding: 3px 10px 0 65px;
              h3 {
                height: 25px;
                line-height: 25px;
                color: #444;
                font-size: 14.4px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              p {
                padding-top: 3px;
                height: 23px;
                line-height: 23px;
                color: #AAA;
                font-size: 12.8px;
              }
            }
          }
        }
        .promiseShow {
          display: flex;
          margin-bottom: 10px;
          padding-left: 10px;
          color: #444;
          text-align: left;
          li {
            flex: 1;
            height: 25px;
            line-height: 25px;
            padding-left: 18px;
            font-size: 12px;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAM1BMVEUAAAD/mZn/mZn/mZn/mZn/mZn/mZn/mZn/mZn/mZn/mZn/mZn/mZn/mZn/mZn/mZn/mZlKUZZcAAAAEHRSTlMAGVAK77GcLWzh2YfLfb5DQdISIwAAANBJREFUKM9tklESwyAIRBEFidaU+5+2EElGO/Enzuo+FgzESoM+qo0khRAyF8YKUJELLjqWnu99Xixy1M2fO8/7x879Nu0Xv+z3h04duG8YUmWYhrzGs8zk+ATCq95Uz+wYAUL349QP1ZkECZptjDucbxydSWoDNaeYwDmf9pHIUK4D6CZ9SL1wHCjMrkmvVYwbKC8e+BsUxYUjqNNC9rhPg7Wofp/+nckjZqfnY+i0DhG9WrjT/9hjAPj6UHjI29MmKvj+M3DauULNGjnHLf8AqqYHXkkr8CAAAAAASUVORK5CYII=) no-repeat left center;
            background-size: 14px 14px;
          }
        }
        .isList {
          .wrap {
            padding: 10px 10px 20px;
            .border_tp_e {
              position: relative;
              border-top: 1px solid #eee;
              text-align: center;
              .rx_line {
                position: absolute;
                top: -11px;
                left: 5%;
                width: 90%;
                line-height: 22px;
                color: #444;
                font-size: 12.8px;
              }
            }
          }
          .slides {
            padding: 0 5px;
            .swiper-container {
              padding-bottom: 30px;
              .swiper-slide {
                a {
                  display: block;
                  margin: 0 5px;
                  .img {
                    overflow: hidden;
                    img {
                      float: left;
                      width: 100%;
                    }
                  }
                  .info {
                    .price {
                      line-height: 22px;
                      color: #fe3355;
                      font-size: 16px;
                      text-align: center;
                    }
                    .title {
                      line-height: 18px;
                      color: #444;
                      font-size: 12.8px;
                      overflow: hidden;
                      text-overflow: ellipsis; //省略
                      white-space: nowrap; //规定段落中的文本不进行换行
                    }
                  }
                }
              }
            }

          }
        }
        .link {
          display: flex;
          padding: 15px 0;
          border-top: 1px solid #eee;
          a {
            display: inline-block;
            flex: 1;
            height: 32px;
            line-height: 32px;
            color: #444;
            font-size: 14px;
            text-align: center;
            .iconfont {
              display: inline-block;
              color: #aaa;
              font-size: 20px;
            }
          }
          .allproduct {
            border-right: solid 1px #bbb;
          }
          .tostore {

          }
        }
      }
      .tabnav {
        width: 100%;
        height: 45px;
        background-color: #fff;
        font-size: 16px;
        ul {
          display: flex;
          width: 100%;
          background-color: #fff;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #ddd;
          li {
            flex: 1;
            height: 40px;
            line-height: 40px;
            border-bottom: solid 2px #fff;
            cursor: pointer;
            text-align: center;
          }
          li.active {
            p {
              display: inline-block;
              color: #df3130;
              border-bottom: 2px solid #df3130;
            }
          }
        }
      }
      .fixTop {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9;
      }
      .tabcontent {
        background-color: #fff;
      }
      .buy {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 44px;
        background-color: #fff;
        border-top: 1px solid #ccc;
        z-index: 120;
        display: flex;
        a {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #aaa;
          font-size: 12.8px;
          text-align: center;
          .iconfont {
            font-size: 20px;
          }
        }
        a.addToCart {
          color: #fff;
          font-size: 16px;
          background-color: #47d2d0;

        }
        a.gotoPay {
          color: #fff;
          font-size: 16px;
          background-color: #fe3355;
        }

      }
      #oneKeyToTop {
        position: fixed;
        right: 30px;
        bottom: 90px;
        z-index: 10;
        .icon-top {
          color: #aaa;
          font-size: 40px;
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
      .layer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /*设置背景透明度的两种方法*/
        /*方法一：*/
        /*background: #000;*/
        /*filter: alpha(opacity=60);*/
        /*opacity: .6;*/
        /*方法二：*/
        background: rgba(0, 0, 0, 0.6);
        z-index: 1000;
        .layer_box {
          position: fixed;
          padding-top: 10px;
          width: 100%;
          left: 0;
          top: 20%;
          height: 90%;
          background: #FFF;
          z-index: 2000;
          .close {
            position: absolute;
            top: 0;
            right: 5px;
            z-index: 100;
            .iconfont {
              color: #aaa;
            }
          }
          .info {
            position: relative;
            border-bottom: solid 1px #EEE;
            overflow: hidden;
            zoom: 1;
            img {
              position: absolute;
              top: 0;
              left: 10px;
              width: 60px;
              height: 60px;
            }
            .text {
              display: inline-block;
              float: left;
              padding: 0 35px 8px 80px;
              .title {
                color: #666;
                font-size: 14.4px;
              }
              .price {
                color: #fe3355;
                font-size: 16px;
              }
              .stock {
                position: absolute;
                bottom: 10px;
                right: 10px;
                font-size: 12.8px;
                em {
                  padding-right: 5px;
                  color: #aaa;
                }
              }
            }
          }
          .size, .color {
            padding: 10px 10px 5px;
            border-bottom: 1px solid #eee;
            h1 {
              color: #444;
              font-size: 16px;
            }
            .optionList {
              padding: 5px;
              word-wrap: break-word; /**/
              overflow: hidden;
              zoom: 1;
              li {
                float: left;
                min-width: 10%;
                margin: 5px 3px;
                padding: 4px 10px;
                color: #999;
                font-size: 16px;
                text-align: center;
                white-space: nowrap;
                background: #fff;
                border: solid 1px #EEE;
                cursor: pointer;
              }
              li.select {
                color: #fe5164;
                border: solid 1px #fe5164;
              }
            }

          }
          .count {
            padding: 6px 10px 60px;
            h1 {
              margin-bottom: 5px;
              color: #444;
              font-size: 16px;
              line-height: 30px;
            }
            .p_num {
              overflow: hidden;
              zoom: 1;
              .num_btn {
                width: 30px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                font-weight: 700;
                font-size: 19.2px;
                background: #FFF;
                color: #aaa;
                cursor: pointer;
                border: solid 1px #CCC;
                border-radius: 3px;
                float: left;
              }
              .btn_txt {
                width: 40px;
                height: 28px;
                line-height: 28px;
                margin: 0 3px;
                text-align: center;
                border: solid 1px #CCC;
                color: #333;
                background: #fff;
                font-size: 12px;
                font-weight: 700;
                float: left;
              }
            }
            p {
              display: none;
              color: #fe3355;
              font-size: 12.8px;
            }
          }
          .btn {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 70%;
            padding: 5px 15%;
            border-top: solid 1px #DDD;
            background: #FFF;
            z-index: 2001;
            a {
              width: 100%;
              height: 30px;
              line-height: 30px;
              display: block;
              color: #FFF;
              font-size: 16px;
              text-align: center;
              border-radius: 3px;
              text-decoration: none;
              background: #CCC;
            }
            a.active {
              background: #fe3355;
            }
          }
        }
      }
      .coupon-layer {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        z-index: 1000;
        .layer-box {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          background: #fff;
          z-index: 1010;
          .iconfont {
            position: absolute;
            top: 8px;
            right: 10px;
            font-size: 18px;
          }
          .info {
            h2 {
              height: 40px;
              line-height: 40px;
              color: #666;
              font-size: 18px;
              text-align: center;
            }
            .coupon {
              margin-bottom: 40px;
              .price {
                position: relative;
                width: 100%;
                height: 48px;
                border-top: 1px solid #eee;
                line-height: 24px;
                span {
                  margin-left: 10px;
                  color: #ccc;
                }
                .date {
                  margin-left: 10px;
                  color: #666;
                }
                .btn {
                  position: absolute;
                  right: 5px;
                  top: 8px;
                  display: block;
                  width: 60px;
                  height: 25px;
                  background: 0 0; /*无背景*/
                  border: 1px solid #ccc;
                  border-radius: 3px;
                  color: #666;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
