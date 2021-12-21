<template>
  <div class="cart-body">
    <ul class="cart-list" v-for="(item,index) in cartLists" :key="item.id">
      <li class="cart-list-con1">
        <input type="checkbox" name="chk_list" :checked="item.isChecked==1" @change="changeCartCheck(item.skuId,item.isChecked)">
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
        <a class="mins" @click="changeNum('minus',item.skuNum,item.skuId)">-</a>
        <input autocomplete="off" type="number" :value="item.skuNum" minnum="1" class="itxt"
               @change="changeNum('change',item.skuNum,item.skuId,$event)">
        <a class="plus" @click="changeNum('add',item.skuNum,item.skuId)">+</a>
      </li>
      <li class="cart-list-con6">
        <span class="sum">{{goodsPrice(index)}}</span>
      </li>
      <li class="cart-list-con7">
        <a class="sindelet" @click="delCartGoods(item.skuId)">删除</a>
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
    methods: {
      //改变的数量向服务器发送请求

      changeNum(type,oldNum,id,e) {
        switch (type) {
          case 'add':
            this.$store.dispatch('cart/changeGoodsNumAction',{id,num:1})
            break;
          case 'minus':
            //如果剩下的数量大于一才可以减
            if (oldNum>1){
              this.$store.dispatch('cart/changeGoodsNumAction',{id,num:-1})
            }else {
              alert('此商品不能再减了')
            }
            break;
          case 'change':
            let value=e.target.value
            if (value>=1){
              let num=Math.floor(value)-oldNum
              this.$store.dispatch('cart/changeGoodsNumAction',{id,num})
            }else{
              let num=1-oldNum
              this.$store.dispatch('cart/changeGoodsNumAction',{id,num})
            }
            break;
        }
      },

      //购物车删除商品
      async delCartGoods(id){
        let res=await this.$store.dispatch('cart/delCartGoodsAction',id)
        if (res.code==200){
          alert('删除成功')
        }else {
          alert('删除失败')
        }
      },

      //改变商品是否选中
      changeCartCheck(id,isChecked){
        if (isChecked==0){
          this.$store.dispatch('cart/changeCartCheckAction',{id,isChecked:1})
        }else {
          this.$store.dispatch('cart/changeCartCheckAction',{id,isChecked:0})
        }
      }

    },
    computed: {
      // 单个商品总价
      goodsPrice() {
        return function (index) {
          return (this.cartList[index].skuNum * this.cartList[index].cartPrice).toFixed(2) + '￥'
        }
      },

      //选择的商品总价,选择商品的个数,是否全选
      changeList() {
        //总价
        let price = 0
        //选择的商品个数
        let selectNum = 0
        //选中的所有商品Id
        let selectId=[]
        //所有的商品Id
        let allId=[]
        //全选框是否勾选
        let checkedAll = false

        this.cartLists.forEach(item => {
          if (item.isChecked == 1) {
            selectNum += 1
            price += item.skuNum * item.cartPrice
            selectId.push(item.skuId)
            allId.push(item.skuId)
          }else {
            allId.push(item.skuId)
          }
        })
        if (selectNum == this.cartList.length && selectNum>0) {
          checkedAll = true
        }
        return {price: price.toFixed(2), selectNum, checkedAll,selectId,allId}
      }
    },
    watch: {
      cartList() {
        this.cartLists = this.cartList
      },
      cartLists: {
        handler() {
          //  vueX中修改总价格和全选按钮
          this.$store.commit('cart/saveChangeList', this.changeList)
        },
        deep: true,
        immediate: true
      }
    },

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
          cursor: pointer;
        }
      }
    }
  }
  /*取消number类型的input上下点击按钮*/
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
  }

  /*取消input选中后的边框*/
  input{
    outline:none;
  }
  a{
    cursor: pointer;
  }

</style>