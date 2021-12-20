<template>
  <div class="cart-body">
    <ul class="cart-list" v-for="(item,index) in cartList" :key="item.id">
      <li class="cart-list-con1">
        <input type="checkbox" name="chk_list" :checked="item.isChecked==1">
      </li>
      <li class="cart-list-con2">
        <img :src="item.imgUrl">
        <div class="item-msg">{{item.skuName}}</div>
      </li>
      <li class="cart-list-con3">
        <div class="item-txt">语音升级款</div>
      </li>
      <li class="cart-list-con4">
        <span class="price">{{(item.cartPrice).toFixed(2)}}￥</span>
      </li>
      <li class="cart-list-con5">
        <a href="javascript:void(0)" class="mins">-</a>
        <input autocomplete="off" type="text" :value="item.skuNum" minnum="1" class="itxt">
        <a href="javascript:void(0)" class="plus">+</a>
      </li>
      <li class="cart-list-con6">
        <span class="sum">{{goodsPrice(index)}}</span>
      </li>
      <li class="cart-list-con7">
        <a href="#none" class="sindelet">删除</a>
        <br>
        <a href="#none">移到收藏</a>
      </li>
    </ul>
  </div>

</template>

<script>
  export default {
    name: "CartBody",
    data() {
      return {
        cartLists: []
      }
    },
    props: {
      cartList: {
        type: Array,
        default: () => []
      }
    },
    mounted() {
      this.cartLists = this.cartList
    },
    computed: {
      // 单个商品总价
      goodsPrice() {
        return function (index) {
          return (this.cartList[index].skuNum * this.cartList[index].cartPrice).toFixed(2) + '￥'
        }
      },
      //选择的商品总价
      totalPrice() {
        let price = 0
        this.cartLists.forEach(item => {
          if (item.isChecked == 1) {
            price += item.skuNum * item.cartPrice
          }
        })
        return price.toFixed(2)
      }
    },
    watch:{
      cartLists:{
        handler(){
        //  vueX中修改总价格和全选按钮
          this.$store.commit('cart/saveTotalPrice',this.totalPrice)
        },
        deep:true,
        immediate:true
      }
    }
  }
</script>

<style scoped lang="less">
  .cart-body {
    margin: 15px 0;
    border: 1px solid #ddd;

    .cart-list {
      padding: 10px;
      border-bottom: 1px solid #ddd;
      overflow: hidden;

      & > li {
        float: left;
      }

      .cart-list-con1 {
        width: 4.1667%;
      }

      .cart-list-con2 {
        width: 25%;

        img {
          width: 82px;
          height: 82px;
          float: left;
        }

        .item-msg {
          float: left;
          width: 150px;
          margin: 0 10px;
          line-height: 18px;
        }
      }

      .cart-list-con3 {
        width: 20.8333%;

        .item-txt {
          text-align: center;
        }
      }

      .cart-list-con4 {
        width: 12.5%;

      }

      .cart-list-con5 {
        width: 12.5%;

        .mins {
          border: 1px solid #ddd;
          border-right: 0;
          float: left;
          color: #666;
          width: 6px;
          text-align: center;
          padding: 8px;
        }

        input {
          border: 1px solid #ddd;
          width: 40px;
          height: 33px;
          float: left;
          text-align: center;
          font-size: 14px;
        }

        .plus {
          border: 1px solid #ddd;
          border-left: 0;
          float: left;
          color: #666;
          width: 6px;
          text-align: center;
          padding: 8px;
        }
      }

      .cart-list-con6 {
        width: 12.5%;

        .sum {
          font-size: 16px;
        }
      }

      .cart-list-con7 {
        width: 12.5%;

        a {
          color: #666;
        }
      }
    }
  }

</style>