<template>
  <div class="cart-tool">
    <div class="select-all">
      <input class="chooseAll" type="checkbox" :checked="checkedAll" @change="changeCheckedAll(checkedAll)">
      <span>全选</span>
    </div>
    <div class="option">
      <a @click="delSelectCartGoods">删除选中的商品</a>
      <a href="#none">移到我的关注</a>
      <a href="#none">清除下柜商品</a>
    </div>
    <div class="money-box">
      <div class="chosed">已选择
        <span>{{selectNum}}</span>件商品
      </div>
      <div class="sumprice">
        <em>总价（不含运费） ：</em>
        <i class="summoney">{{totalPrice}}￥</i>
      </div>
      <div class="sumbtn">
        <a class="sum-btn" target="_blank" @click="toTrade">结算</a>
      </div>
    </div>
  </div>

</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "CartTool",
    computed:{
      ...mapState('cart',['totalPrice','selectNum','checkedAll'])
    },
    methods:{
      //全选按钮改变
      changeCheckedAll(isCheck){
        if (isCheck){
          this.$store.dispatch('cart/changeAllCartCheckAction',{isChecked:0})
        }else {
          this.$store.dispatch('cart/changeAllCartCheckAction',{isChecked:1})
        }
      },
      //删除所有选中的商品
      async delSelectCartGoods(){
        await this.$store.dispatch('cart/delSelectCartGoodsAction')
      },
      //结算
      toTrade(){
        this.$router.push({name:'trade'})
      }
    }
  }
</script>

<style scoped lang="less">
  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;
    margin-bottom: 15px;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
  a{
    cursor: pointer;
  }
</style>