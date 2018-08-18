<template>
  <div class="area">
    <area-select v-model="selected" :data="pcaa" :level="2" :placeholders="placeholders">
    </area-select>
  </div>
</template>
<script>
  // 根据需要按需引入数据
  import {pca, pcaa} from "area-data";
  export default {
    data() {
      return {
        pcaa: pcaa,//最多省市区三级，结合:level='2'选择，0省、1省市、2省市区
        placeholders: ['选择省', '选择市', '选择区'],
        selected: [],
      }
    },
  }
</script>
<style lang="less">
  .area {
    .area-select-wrap {
      display: flex;
      height: 600px;
      .area-select {
        box-sizing: border-box;
        flex: 1;
        margin: 0;
        padding: 10px;
        height: 3rem;
        line-height: 3rem;
        font-size: 1rem;

        border: 1px solid #449fdb;
        .area-selected-trigger {
          position: relative;
          /* display: block; */
          font-size: 14px;
          cursor: pointer;
          margin: 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          height: 100%;
          padding: 8px 20px 7px 12px;
        }
      }
    }
  }

</style>
