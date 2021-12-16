<template>
  <div class="detail">
    <!-- 商品分类导航 -->
    <TypeNav/>

    <!-- 主要内容区域 -->
    <GoodsInfo/>

    <!-- 内容详情页 -->
    <ProductDetail/>
  </div>
</template>

<script>
  import GoodsInfo from "./childCpns/GoodsInfo";
  import ProductDetail from './childCpns/ProductDetail'

  export default {
    name: 'Detail',
    data(){
      return{
        goodsId:0
      }
    },
    components: {
      GoodsInfo,
      ProductDetail
    },
    beforeMount() {
      this.goodsId=this.$route.params
    }
  }
</script>

<style scoped>
</style>