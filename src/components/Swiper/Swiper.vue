<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="banner in banners" :key="banner.id">
        <img :src="banner.imgUrl"/>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
  import Swiper from "swiper";

  export default {
    name: "Swiper",
    props:{
      banners:{
        type:Array,
        default:()=>[]
      },
      //切换效果fade，cube，coverflow，flip，cards，creative
      effect:{
        type:String,
        default:'slide'
      },
      //自动滑动
      autoplay:{
        type:Boolean,
        default:true
      },
      //循环模式
      loop:{
        type:Boolean,
        default:true
      }
    },
    watch: {
      //监听传来的数据变化，再实例化swiper
      banners: {
        handler(newValue,oldValue){
          this.$nextTick(()=>{
            let mySwiper = new Swiper (this.$refs.mySwiper, {
              loop: this.loop, // 循环模式选项
              autoplay: this.autoplay,//可选选项，自动滑动
              effect : this.effect,//切换效果
              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
              },
              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
            })
          })
        },
        immediate:true
      }
    }

  }
</script>

<style scoped>

</style>