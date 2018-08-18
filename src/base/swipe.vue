<template>
  <div>
    <mt-swipe ref="swipe" :auto="2000" class="swipe">
      <mt-swipe-item  v-for="slider in sliders" :key="slider.id">
        <router-link :to="{name:'branddetail',params:{id:slider.id}}">
          <img :src="slider.url" alt="">
        </router-link>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
    export default {
        props:["sliders"],
        methods: {},
        computed: {},
        components: {}
    }
</script>
<style scoped lang="less">
.swipe{
  width: auto;
  height: 200px;
  img {
    width: 100%;
  }
}
</style>
