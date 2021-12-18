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
  import {mapState} from 'vuex'
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
      this.goodsId=this.$route.params.goodsId
    },
    mounted(){
      this.$store.dispatch('detail/getDetailAction',this.goodsId)
    },
    computed:{
      ...mapState('detail',['categoryView', 'price', 'skuInfo', 'spuSaleAttrList','valuesSkuJson'])
    }
  }
</script>

<style scoped>
</style>