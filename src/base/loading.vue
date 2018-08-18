<template>
    <div class="loading">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAANlBMVEUAAADfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTBHesYPAAAAEnRSTlMA/fF5o97FSww1Za0f1IwpVkAcANuOAAABh0lEQVRIx+2U27KDIAxFIwQMNy///7OnVSSMgJXj9K1rpi/K6k7ZmUIbcmIYhCP4B2aImH6XhkR/tmPZdcuCZdEtDxnflmcMStursWk2xlPNxWFD+eaFmXHD19yIoKIqduv2zGexviR+TFC7VlFfzzW5RXR4W/HjocbInBdWDcxcc+lC1plMvcl207ZyA1Qx+YU1517rMhXBjBfRldCA2C0gfOthhSb0nnz1UMcbgmsIfgBNQYgw0W3BWCntXtisxIaab2ZZuWFfaaRERN3LtjJiASaRmG7NLBMGAsvhZjBHi4w7ssx4JD8a+9GFPanq0ZI8Wc8fQP7jCWo8l0Ep5Uzb9BIRp6XmarWzNBvCnUqpTh2YRi4eSDgxqoSryxIT569HxdRlZGwxNeNrLiEjL2TqlSW7ASIWteYRJ5bPhXiWZXzi9IaLv2JhmaAVreMrpyOOTtEjQMM+jlqdsMcKslvgpXP8BlnG/F9gIfiMzoCCL8nl2B2UF9YL5VX1UC5JP9a91KuZ/wCIaBQFmaG1twAAAABJRU5ErkJggg=="
        alt="">
      <div class="text">
        加载中...
      </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {}
        },
        methods: {},
        computed: {},
        components: {}
    }
</script>
<style scoped lang="less">
  .loading {
    position: fixed;
    top: 20%;
    width: 100%;
    z-index: 1000;
    text-align: center;
    .text{
      padding-left: 10px;
      color: red;
      font-size: 18px;
    }
  }
</style>
