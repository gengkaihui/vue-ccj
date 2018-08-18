<template>
    <div>
        {{msg}}
    </div>
</template>
<script>
    export default {
        data(){
            return {
              tabs: ["人气", "销量", "最新", "价格"],
              iscur: 0,
              count:1,//用于判断价格排序“顺逆”
              dataList:[]
            }
        },
        methods: {
            async getData(){

            }
        },
        computed: {},
        components: {}
    }


</script>
<style scoped>

</style>
