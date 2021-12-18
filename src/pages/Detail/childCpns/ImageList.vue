<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide"
           v-for="item in skuImageList"
           :key="item.id"
           @click="electImg(item.id)"
           >
        <img :src="item.imgUrl" :class="{'active':index==item.id}">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    data(){
      return{
        index:1
      }
    },
    props:{
      skuImageList:{
        type:Array,
        default:()=>[]
      }
    },
    methods:{
      electImg(id){
        this.index=id
        this.$emit('showImg',id)
      }
    },
    watch:{
      //监听传来的数据变化，再实例化swiper
      skuImageList: {
        handler(newValue,oldValue){
          this.index=this.skuImageList[0].id
          this.$nextTick(()=>{
            let mySwiper = new Swiper (this.$refs.mySwiper, {
              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
              //以此显示几个
              slidesPerView:3,
              //一组几个
              // slidesPerGroup:3
            })
          })
        },
      }
    }
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;
        margin: 0 auto;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>