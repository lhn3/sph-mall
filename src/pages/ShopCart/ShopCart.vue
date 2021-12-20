<template>
  <div class="cart">
    <h4>全部商品</h4>

    <!--    头部-->
    <CartHeader/>

    <!--      商品列表-->
    <CartBody/>

    <!--    全选，结算-->
    <CartTool/>
  </div>
</template>

<script>
  import CartHeader from './childCpns/CartHeater'
  import CartBody from './childCpns/CartBody'
  import CartTool from "./childCpns/CartTool";

  export default {
    name: 'ShopCart',
    components: {
      CartHeader,
      CartBody,
      CartTool
    },
    mounted() {
      this.getCartInfo()
    },
    methods:{
      // 获取购物车数据
      getCartInfo(){
        this.$store.dispatch('cart/getCartAction')
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }
  }
</style>