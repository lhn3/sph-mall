<template>
  <div class="spec-preview" @mousemove="handler">
    <img :src="bigImg"/>
    <div class="event"></div>
    <div class="big">
      <img :src="bigImg" ref="bigImg"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props: {
      bigImg: {
        type: String,
        default: ''
      }
    },
    methods: {
      handler(e) {
        let mask = this.$refs.mask
        let bigImg = this.$refs.bigImg
        // 获取蒙版在盒子中的位置
        //鼠标在盒子中的坐标-蒙版大小的一半
        let left = e.offsetX - mask.offsetWidth / 2
        let top = e.offsetY - mask.offsetHeight / 2
        //防止出界
        if (left <= 0) left = 0
        if (left >= mask.offsetWidth) left = mask.offsetWidth
        if (top <= 0) top = 0
        if (top >= mask.offsetHeight) top = mask.offsetHeight
        //修改蒙版位置
        mask.style.left = left + 'px'
        mask.style.top = top + 'px'
        //修改大图片
        bigImg.style.left = -2 * left + 'px'
        bigImg.style.top = -2 * top + 'px'
      }
    }


  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover ~ .mask,
    .event:hover ~ .big {
      display: block;
    }
  }
</style>