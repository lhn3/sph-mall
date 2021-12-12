<template>
  <div class="home">
    <!--    三级联动-->
    <TypeNav></TypeNav>

    <!--    轮播图-->
    <ListContainer></ListContainer>

    <!--    今日推荐-->
    <TodayRecommend></TodayRecommend>

    <!--    商品排行-->
    <Rank></Rank>

    <!--    猜你喜欢-->
    <Like></Like>

    <!--    楼层-->
    <Floor></Floor>

    <!--    商标-->
    <Brand></Brand>
  </div>
</template>

<script>
  import ListContainer from './childCpns/ListContainer'
  import TodayRecommend from './childCpns/TodayRecommend'
  import Rank from './childCpns/Rank'
  import Like from './childCpns/Like'
  import Floor from './childCpns/Floor'
  import Brand from './childCpns/Brand'

  export default {
    name: "Home",
    components: {
      ListContainer,
      TodayRecommend,
      Rank,
      Like,
      Floor,
      Brand,
    }
  }
</script>

<style scoped lang="less">

</style>