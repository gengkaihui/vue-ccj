<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide,key) in swiperSlides" :key="key">
      <router-link
        :to="{name:'branddetail',params:{id:slide.id}}"
        tag="li">
        <img :src="slide.src" alt="">
      </router-link>
    </swiper-slide>
    <!-- 分页器 -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
  export default {
//    name: 'carousel',
    props: ['swiperSlides'],
    data(){
      return {
        swiperOption: {
          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
            //用户操作swiper之后，是否禁止autoplay。默认为true：停止。
            // 操作包括触碰，拖动，点击pagination等
          },
          speed: 500,//默认300ms
          pagination: {//分页器
            el: ".swiper-pagination"
          },
          loop: true,
          observeParents: true,
          setWrapperSize: true,//Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
        }
      }
    },
  }
</script>
<style scoped lang="less">
  img {
    width: 100%;
  }
</style>
