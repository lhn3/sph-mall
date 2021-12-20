<template>
  <div class="cart-body">
    <ul class="cart-list">
      <li class="cart-list-con1">
        <input type="checkbox" name="chk_list">
      </li>
      <li class="cart-list-con2">
        <img src="./images/goods1.png">
        <div class="item-msg">米家（MIJIA） 小米小白智能摄像机增强版 1080p高清360度全景拍摄AI增强</div>
      </li>
      <li class="cart-list-con3">
        <div class="item-txt">语音升级款</div>
      </li>
      <li class="cart-list-con4">
        <span class="price">399.00</span>
      </li>
      <li class="cart-list-con5">
        <a href="javascript:void(0)" class="mins">-</a>
        <input autocomplete="off" type="text" value="1" minnum="1" class="itxt">
        <a href="javascript:void(0)" class="plus">+</a>
      </li>
      <li class="cart-list-con6">
        <span class="sum">399</span>
      </li>
      <li class="cart-list-con7">
        <a href="#none" class="sindelet">删除</a>
        <br>
        <a href="#none">移到收藏</a>
      </li>
    </ul>

    <ul class="cart-list">
      <li class="cart-list-con1">
        <input type="checkbox" name="chk_list" id="" value="">
      </li>
      <li class="cart-list-con2">
        <img src="./images/goods2.png">
        <div class="item-msg">华为（MIJIA） 华为metaPRO 30 浴霸4摄像 超清晰</div>
      </li>
      <li class="cart-list-con3">
        <div class="item-txt">黑色版本</div>
      </li>
      <li class="cart-list-con4">
        <span class="price">5622.00</span>
      </li>
      <li class="cart-list-con5">
        <a href="javascript:void(0)" class="mins">-</a>
        <input autocomplete="off" type="text" value="1" minnum="1" class="itxt">
        <a href="javascript:void(0)" class="plus">+</a>
      </li>
      <li class="cart-list-con6">
        <span class="sum">5622</span>
      </li>
      <li class="cart-list-con7">
        <a href="#none" class="sindelet">删除</a>
        <br>
        <a href="#none">移到收藏</a>
      </li>
    </ul>

    <ul class="cart-list">
      <li class="cart-list-con1">
        <input type="checkbox" name="chk_list" id="chk_list" value="">
      </li>
      <li class="cart-list-con2">
        <img src="./images/goods3.png">
        <div class="item-msg">iphone 11 max PRO 苹果四摄 超清晰 超费电 超及好用</div>
      </li>
      <li class="cart-list-con3">
        <div class="item-txt">墨绿色</div>
      </li>
      <li class="cart-list-con4">
        <span class="price">11399.00</span>
      </li>
      <li class="cart-list-con5">
        <a href="javascript:void(0)" class="mins">-</a>
        <input autocomplete="off" type="text" value="1" minnum="1" class="itxt">
        <a href="javascript:void(0)" class="plus">+</a>
      </li>
      <li class="cart-list-con6">
        <span class="sum">11399</span>
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
    name: "CartBody"
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