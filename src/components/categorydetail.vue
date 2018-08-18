<template>
  <div>
    <div class="back clearfix no_position">
      <div class="goBack" @click="goBack">
        <i class="iconfont icon-back"></i>
      </div>
      <div class="put clearfix">
        <input type="text" placeholder="输入商品关键词" readonly="readonly"><i class="iconfont icon-search"></i>
      </div>
    </div>
    <div class="content">
      <!--加载特效-->
      <loading v-if="loading"></loading>
      <!--内容区-->
      <div v-else="" class="container" id="classifyShow">
          <div id="classifyShowBanner">
            <div class="bgFFF mb10"><h2 class="hot_biaoti">♥热门抢购♥</h2>
              <ul class="f_hot clearfix">
                <li
                  data-query="{&quot;adWord&quot;:&quot;\u5973\u6027-\u70ed\u5356\u5973\u88c5-\u590f\u4e0a\u65b0&quot;,&quot;function&quot;:&quot;v3&quot;,&quot;group&quot;:1,&quot;keyword&quot;:&quot;\u590f\u6b3e\u65b0\u6b3e\u5973\u88c5&quot;,&quot;keywordId&quot;:&quot;982942&quot;,&quot;module&quot;:&quot;search&quot;,&quot;page&quot;:1,&quot;pic_square&quot;:&quot;1&quot;,&quot;tagId&quot;:&quot;4366&quot;,&quot;title&quot;:&quot;\u590f\u6b3e\u65b0\u6b3e\u5973\u88c5&quot;,&quot;type&quot;:&quot;category&quot;}"
                  data-title="夏上新" data-keyword="982942" class="lazyonlyImg ">
                  <div class="item"><img
                    src="http://ads-cdn02.ccjlook.com/b878932e9cf18591213074bc6ac5cc8b.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    _src="http://ads-cdn02.ccjlook.com/b878932e9cf18591213074bc6ac5cc8b.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    alt="">
                    <p>夏上新</p></div>
                </li>
                <li
                  data-query="{&quot;adWord&quot;:&quot;\u5973\u6027-\u70ed\u5356\u5973\u88c5-\u4eba\u6c14T\u6064&quot;,&quot;function&quot;:&quot;v3&quot;,&quot;group&quot;:1,&quot;keyword&quot;:&quot;T\u6064\u5973&quot;,&quot;keywordId&quot;:&quot;1871188&quot;,&quot;module&quot;:&quot;search&quot;,&quot;page&quot;:1,&quot;pic_square&quot;:&quot;1&quot;,&quot;tagId&quot;:&quot;345345&quot;,&quot;title&quot;:&quot;T\u6064\u5973&quot;,&quot;type&quot;:&quot;category&quot;}"
                  data-title="人气T恤" data-keyword="1871188" class="lazyonlyImg ">
                  <div class="item"><img
                    src="http://ads-cdn04.ccjlook.com/f7affaf8bdddc39384d05e1795010e13.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    _src="http://ads-cdn04.ccjlook.com/f7affaf8bdddc39384d05e1795010e13.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    alt="">
                    <p>人气T恤</p></div>
                </li>
                <li
                  data-query="{&quot;adWord&quot;:&quot;\u5973\u6027-\u70ed\u5356\u5973\u88c5-\u4f11\u95f2\u88e4&quot;,&quot;function&quot;:&quot;v3&quot;,&quot;group&quot;:1,&quot;keyword&quot;:&quot;\u4f11\u95f2\u88e4\u5973&quot;,&quot;keywordId&quot;:&quot;1871005&quot;,&quot;module&quot;:&quot;search&quot;,&quot;page&quot;:1,&quot;pic_square&quot;:&quot;1&quot;,&quot;tagId&quot;:&quot;3123131&quot;,&quot;title&quot;:&quot;\u4f11\u95f2\u88e4\u5973&quot;,&quot;type&quot;:&quot;category&quot;}"
                  data-title="休闲裤" data-keyword="1871005" class="lazyonlyImg ">
                  <div class="item"><img
                    src="http://ads-cdn03.ccjlook.com/5e835418af4172676b43b42585ee06f4.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    _src="http://ads-cdn03.ccjlook.com/5e835418af4172676b43b42585ee06f4.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    alt="">
                    <p>休闲裤</p></div>
                </li>
                <li
                  data-query="{&quot;adWord&quot;:&quot;\u5973\u6027-\u70ed\u5356\u5973\u88c5-\u767e\u642d\u5916\u5957&quot;,&quot;function&quot;:&quot;v3&quot;,&quot;group&quot;:1,&quot;keyword&quot;:&quot;\u5916\u5957\u5973&quot;,&quot;keywordId&quot;:&quot;983049&quot;,&quot;module&quot;:&quot;search&quot;,&quot;page&quot;:1,&quot;pic_square&quot;:&quot;1&quot;,&quot;tagId&quot;:&quot;123213&quot;,&quot;title&quot;:&quot;\u5916\u5957\u5973&quot;,&quot;type&quot;:&quot;category&quot;}"
                  data-title="百搭外套" data-keyword="983049" class="lazyonlyImg ">
                  <div class="item"><img
                    src="http://ads-cdn03.ccjlook.com/867e87b316a7a49107151287e9c4bb2a.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    _src="http://ads-cdn03.ccjlook.com/867e87b316a7a49107151287e9c4bb2a.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    alt="">
                    <p>百搭外套</p></div>
                </li>
                <li
                  data-query="{&quot;function&quot;:&quot;keyword&quot;,&quot;group&quot;:1,&quot;module&quot;:&quot;search&quot;,&quot;page&quot;:1,&quot;pic_square&quot;:&quot;1&quot;,&quot;q&quot;:&quot;\u725b\u4ed4\u88e4\u5973&quot;,&quot;type&quot;:&quot;keyword&quot;,&quot;keywordId&quot;:&quot;1922153&quot;}"
                  data-title="百变牛仔裤" data-keyword="1922153" class="lazyonlyImg ">
                  <div class="item"><img
                    src="http://ads-cdn04.ccjlook.com/7ad128db7496b3b3f7d704a933b962b2.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    _src="http://ads-cdn04.ccjlook.com/7ad128db7496b3b3f7d704a933b962b2.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    alt="">
                    <p>百变牛仔裤</p></div>
                </li>
                <li
                  data-query="{&quot;adWord&quot;:&quot;\u5973\u6027-\u70ed\u5356\u5973\u88c5-\u886c\u886b\u5973\u795e&quot;,&quot;function&quot;:&quot;v3&quot;,&quot;group&quot;:1,&quot;keyword&quot;:&quot;\u886c\u886b\u5973&quot;,&quot;keywordId&quot;:&quot;982965&quot;,&quot;module&quot;:&quot;search&quot;,&quot;page&quot;:1,&quot;pic_square&quot;:&quot;1&quot;,&quot;tagId&quot;:&quot;53456346&quot;,&quot;title&quot;:&quot;\u886c\u886b\u5973&quot;,&quot;type&quot;:&quot;category&quot;}"
                  data-title="衬衫女神" data-keyword="982965" class="lazyonlyImg ">
                  <div class="item"><img
                    src="http://ads-cdn02.ccjlook.com/87564473b938dc8073b2fd38db29488a.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    _src="http://ads-cdn02.ccjlook.com/87564473b938dc8073b2fd38db29488a.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    alt="">
                    <p>衬衫女神</p></div>
                </li>
                <li
                  data-query="{&quot;adWord&quot;:&quot;\u5973\u6027-\u70ed\u5356\u5973\u88c5-\u9ad8\u989c\u503c\u306e\u88d9&quot;,&quot;function&quot;:&quot;v3&quot;,&quot;group&quot;:1,&quot;keyword&quot;:&quot;\u8fde\u8863\u88d9\u5973&quot;,&quot;keywordId&quot;:&quot;1925703&quot;,&quot;module&quot;:&quot;search&quot;,&quot;page&quot;:1,&quot;pic_square&quot;:&quot;1&quot;,&quot;tagId&quot;:&quot;34344&quot;,&quot;title&quot;:&quot;\u8fde\u8863\u88d9\u5973&quot;,&quot;type&quot;:&quot;category&quot;}"
                  data-title="高颜值の裙" data-keyword="1925703" class="lazyonlyImg ">
                  <div class="item"><img
                    src="http://ads-cdn03.ccjlook.com/bc0ae3dd6929561c21a5c1c214319a11.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    _src="http://ads-cdn03.ccjlook.com/bc0ae3dd6929561c21a5c1c214319a11.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    alt="">
                    <p>高颜值の裙</p></div>
                </li>
                <li
                  data-query="{&quot;function&quot;:&quot;keyword&quot;,&quot;group&quot;:1,&quot;module&quot;:&quot;search&quot;,&quot;page&quot;:1,&quot;pic_square&quot;:&quot;1&quot;,&quot;q&quot;:&quot;\u96ea\u7eba\u886b\u5973&quot;,&quot;type&quot;:&quot;keyword&quot;,&quot;keywordId&quot;:&quot;2492711&quot;}"
                  data-title="雪纺衫" data-keyword="2492711" class="lazyonlyImg ">
                  <div class="item"><img
                    src="http://ads-cdn03.ccjlook.com/31d957cd934d1af8719f6a1c11e0df26.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    _src="http://ads-cdn03.ccjlook.com/31d957cd934d1af8719f6a1c11e0df26.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    alt="">
                    <p>雪纺衫</p></div>
                </li>
                <li
                  data-query="{&quot;function&quot;:&quot;keyword&quot;,&quot;group&quot;:1,&quot;module&quot;:&quot;search&quot;,&quot;page&quot;:1,&quot;pic_square&quot;:&quot;1&quot;,&quot;q&quot;:&quot;\u534a\u8eab\u88d9&quot;,&quot;type&quot;:&quot;keyword&quot;,&quot;keywordId&quot;:&quot;2492719&quot;}"
                  data-title="半身裙" data-keyword="2492719" class="lazyonlyImg ">
                  <div class="item"><img
                    src="http://ads-cdn03.ccjlook.com/2fe03ee114087b6be731431e1ea03cf4.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    _src="http://ads-cdn03.ccjlook.com/2fe03ee114087b6be731431e1ea03cf4.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    alt="">
                    <p>半身裙</p></div>
                </li>
                <li
                  data-query="{&quot;function&quot;:&quot;keyword&quot;,&quot;group&quot;:1,&quot;module&quot;:&quot;search&quot;,&quot;page&quot;:1,&quot;pic_square&quot;:&quot;1&quot;,&quot;q&quot;:&quot;\u536b\u8863\u5973&quot;,&quot;type&quot;:&quot;keyword&quot;,&quot;keywordId&quot;:&quot;2494139&quot;}"
                  data-title="显瘦卫衣" data-keyword="2494139" class="lazyonlyImg ">
                  <div class="item"><img
                    src="http://ads-cdn03.ccjlook.com/431b5df66c1845da4d050c93c13561f3.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    _src="http://ads-cdn03.ccjlook.com/431b5df66c1845da4d050c93c13561f3.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    alt="">
                    <p>显瘦卫衣</p></div>
                </li>
                <li
                  data-query="{&quot;function&quot;:&quot;keyword&quot;,&quot;group&quot;:1,&quot;module&quot;:&quot;search&quot;,&quot;page&quot;:1,&quot;pic_square&quot;:&quot;1&quot;,&quot;q&quot;:&quot;\u98ce\u8863&quot;,&quot;type&quot;:&quot;keyword&quot;,&quot;keywordId&quot;:&quot;2494189&quot;}"
                  data-title="风衣外套" data-keyword="2494189" class="lazyonlyImg ">
                  <div class="item"><img
                    src="http://ads-cdn04.ccjlook.com/57c54f02a095971d29c55f71a514eab0.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    _src="http://ads-cdn04.ccjlook.com/57c54f02a095971d29c55f71a514eab0.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    alt="">
                    <p>风衣外套</p></div>
                </li>
              </ul>
            </div>
            <div class="bgFFF mb10"><h2 class="hot_biaoti">♥买手精选♥</h2>
              <ul class="f_hot clearfix">
                <li
                  data-query="{&quot;adWord&quot;:&quot;\u4e2d\u6027-\u70ed\u5356\u5973\u88c5-\u534a\u8eab\u88d9&quot;,&quot;function&quot;:&quot;v3&quot;,&quot;group&quot;:1,&quot;keyword&quot;:&quot;\u534a\u8eab\u88d9\u5973&quot;,&quot;keywordId&quot;:&quot;1451834&quot;,&quot;module&quot;:&quot;search&quot;,&quot;page&quot;:1,&quot;pic_square&quot;:&quot;1&quot;,&quot;tagId&quot;:&quot;2323&quot;,&quot;title&quot;:&quot;\u534a\u8eab\u88d9\u5973&quot;,&quot;type&quot;:&quot;category&quot;}"
                  data-title="半身裙" data-keyword="1451834" class="lazyonlyImg ">
                  <div class="item"><img
                    src="http://ads-cdn01.ccjlook.com/5d9ca51c9f7213bf80e8557f45917780.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    _src="http://ads-cdn01.ccjlook.com/5d9ca51c9f7213bf80e8557f45917780.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    alt="">
                    <p>半身裙</p></div>
                </li>
                <li
                  data-query="{&quot;adWord&quot;:&quot;\u5973\u6027-\u70ed\u5356\u5973\u88c5-\u725b\u4ed4\u88e4&quot;,&quot;function&quot;:&quot;v3&quot;,&quot;group&quot;:1,&quot;keyword&quot;:&quot;\u725b\u4ed4\u88e4\u5973&quot;,&quot;keywordId&quot;:&quot;1923874&quot;,&quot;module&quot;:&quot;search&quot;,&quot;page&quot;:1,&quot;pic_square&quot;:&quot;1&quot;,&quot;tagId&quot;:&quot;&quot;,&quot;title&quot;:&quot;\u725b\u4ed4\u88e4\u5973&quot;,&quot;type&quot;:&quot;category&quot;}"
                  data-title="牛仔裤" data-keyword="1923874" class="lazyonlyImg ">
                  <div class="item"><img
                    src="http://ads-cdn01.ccjlook.com/5ddb6e394dbb869a9acfc3c4b68717b5.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    _src="http://ads-cdn01.ccjlook.com/5ddb6e394dbb869a9acfc3c4b68717b5.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    alt="">
                    <p>牛仔裤</p></div>
                </li>
                <li
                  data-query="{&quot;adWord&quot;:&quot;\u5973\u6027-\u70ed\u5356\u5973\u88c5-\u4f11\u95f2\u88e4&quot;,&quot;function&quot;:&quot;v3&quot;,&quot;group&quot;:1,&quot;keyword&quot;:&quot;\u4f11\u95f2\u88e4\u5973&quot;,&quot;keywordId&quot;:&quot;983071&quot;,&quot;module&quot;:&quot;search&quot;,&quot;page&quot;:1,&quot;pic_square&quot;:&quot;1&quot;,&quot;tagId&quot;:&quot;3123131&quot;,&quot;title&quot;:&quot;\u4f11\u95f2\u88e4\u5973&quot;,&quot;type&quot;:&quot;category&quot;}"
                  data-title="休闲裤" data-keyword="983071" class="lazyonlyImg ">
                  <div class="item"><img
                    src="http://ads-cdn04.ccjlook.com/39318da2aec8fd9eb3383beab609ffa4.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    _src="http://ads-cdn04.ccjlook.com/39318da2aec8fd9eb3383beab609ffa4.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    alt="">
                    <p>休闲裤</p></div>
                </li>
                <li
                  data-query="{&quot;adWord&quot;:&quot;\u4e2d\u6027-\u70ed\u5356\u5973\u88c5-\u817f\u957f\u20182m\u2019\u70ed\u88e4&quot;,&quot;function&quot;:&quot;v3&quot;,&quot;group&quot;:1,&quot;keyword&quot;:&quot;\u77ed\u88e4\u5973&quot;,&quot;keywordId&quot;:&quot;1451851&quot;,&quot;module&quot;:&quot;search&quot;,&quot;page&quot;:1,&quot;pic_square&quot;:&quot;1&quot;,&quot;tagId&quot;:&quot;453453&quot;,&quot;title&quot;:&quot;\u77ed\u88e4\u5973&quot;,&quot;type&quot;:&quot;category&quot;}"
                  data-title="腿长‘2m’热裤" data-keyword="1451851" class="lazyonlyImg ">
                  <div class="item"><img
                    src="http://ads-cdn03.ccjlook.com/b810aa5063fba67fb4816a9006310040.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    _src="http://ads-cdn03.ccjlook.com/b810aa5063fba67fb4816a9006310040.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    alt="">
                    <p>腿长‘2m’热裤</p></div>
                </li>
                <li
                  data-query="{&quot;adWord&quot;:&quot;\u5973\u6027-\u70ed\u5356\u5973\u88c5-\u4f5b\u7cfb\u5957\u88c5&quot;,&quot;function&quot;:&quot;v3&quot;,&quot;group&quot;:1,&quot;keyword&quot;:&quot;\u5957\u88c5\u5973&quot;,&quot;keywordId&quot;:&quot;982953&quot;,&quot;module&quot;:&quot;search&quot;,&quot;page&quot;:1,&quot;pic_square&quot;:&quot;1&quot;,&quot;tagId&quot;:&quot;453345&quot;,&quot;title&quot;:&quot;\u5957\u88c5\u5973&quot;,&quot;type&quot;:&quot;category&quot;}"
                  data-title="佛系套装" data-keyword="982953" class="lazyonlyImg ">
                  <div class="item"><img
                    src="http://ads-cdn01.ccjlook.com/747eb5485088b86d6956c10eaded87c9.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    _src="http://ads-cdn01.ccjlook.com/747eb5485088b86d6956c10eaded87c9.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    alt="">
                    <p>佛系套装</p></div>
                </li>
                <li
                  data-query="{&quot;adWord&quot;:&quot;\u5973\u6027-\u5973\u88c5-\u9614\u817f\u88e4&quot;,&quot;function&quot;:&quot;v3&quot;,&quot;group&quot;:1,&quot;keyword&quot;:&quot;\u9614\u817f\u88e4\u5973&quot;,&quot;keywordId&quot;:&quot;1893464&quot;,&quot;module&quot;:&quot;search&quot;,&quot;page&quot;:1,&quot;pic_square&quot;:&quot;1&quot;,&quot;tagId&quot;:&quot;42324&quot;,&quot;title&quot;:&quot;\u9614\u817f\u88e4\u5973&quot;,&quot;type&quot;:&quot;category&quot;}"
                  data-title="阔腿裤" data-keyword="1893464" class="lazyonlyImg ">
                  <div class="item"><img
                    src="http://ads-cdn02.ccjlook.com/4950389873d19bc9bc3bf906d9b25ed8.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    _src="http://ads-cdn02.ccjlook.com/4950389873d19bc9bc3bf906d9b25ed8.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    alt="">
                    <p>阔腿裤</p></div>
                </li>
                <li
                  data-query="{&quot;adWord&quot;:&quot;\u4e2d\u6027-\u70ed\u5356\u5973\u88c5-\u4e2d\u957f\u88d9&quot;,&quot;function&quot;:&quot;v3&quot;,&quot;group&quot;:1,&quot;keyword&quot;:&quot;\u4e2d\u957f\u88d9\u5973&quot;,&quot;keywordId&quot;:&quot;1451886&quot;,&quot;module&quot;:&quot;search&quot;,&quot;page&quot;:1,&quot;pic_square&quot;:&quot;1&quot;,&quot;tagId&quot;:&quot;342342&quot;,&quot;title&quot;:&quot;\u4e2d\u957f\u88d9\u5973&quot;,&quot;type&quot;:&quot;category&quot;}"
                  data-title="中长裙" data-keyword="1451886" class="lazyonlyImg ">
                  <div class="item"><img
                    src="http://ads-cdn03.ccjlook.com/a43c02a3426514e13778dd26d5773634.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    _src="http://ads-cdn03.ccjlook.com/a43c02a3426514e13778dd26d5773634.jpg?imageView2/2/format/jpg&amp;|imageMogr2/format/jpg/quality/90!|imageslim"
                    alt="">
                    <p>中长裙</p></div>
                </li>
              </ul>
            </div>
          </div>
          <div class="bgFFF">
            <div class="biaoti_wrap" id="classifyShowArrivals">
              <div class="z_biaoti">
                <div class="nr bgFFF s_textalign">
                  <i class="lt"></i>
                  <i class="rt"></i>
                  <em>精品推荐</em>
                  <span>New Arrivals</span>
                </div>
              </div>
            </div>

            <div class="container">
              <ul class="f_list clearfix" id="classifyShowContains"></ul>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
  import {findOneCategory} from "../api/index"
  import loading from "../base/loading.vue"
  export default {
    data(){
      return {
          loading:true
      }
    },
    created(){
      this.getData()
      setTimeout(()=>{
          this.loading=false
      },1000)
    },
    methods: {
      async getData(){
        this.category = await findOneCategory(this.bid)
      },
      goBack(){
          this.$router.go(-1)
      }
    },
    computed: {
      bid(){
        this.$route.params.id
      }
    },
    components: {loading}
  }
</script>
<style scoped>
</style>
