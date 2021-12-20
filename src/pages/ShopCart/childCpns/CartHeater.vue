<template>
  <div class="cart-th">
    <div class="cart-th1">全部</div>
    <div class="cart-th2">商品</div>
    <div class="cart-th3">参数</div>
    <div class="cart-th4">单价（元）</div>
    <div class="cart-th5">数量</div>
    <div class="cart-th6">小计（元）</div>
    <div class="cart-th7">操作</div>
  </div>
</template>

<script>
  export default {
    name: "CartMain"
  }
</script>

<style scoped lang="less">
  .cart-th {
    background: #f5f5f5;
    border: 1px solid #ddd;
    padding: 10px;
    overflow: hidden;

    & > div {
      float: left;
    }

    .cart-th1 {
      width: 5%;

      input {
        vertical-align: middle;
      }

      span {
        vertical-align: middle;
      }
    }


    .cart-th2{
      width: 32.5%;
    }
    .cart-th3,
    .cart-th4,
    .cart-th5,
    .cart-th6,
    .cart-th7 {
      width: 12.5%;

    }
  }

</style>