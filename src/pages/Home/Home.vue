<template>
  <div class="home">
    <!--    三级联动-->
    <TypeNav></TypeNav>

    <!--    轮播图-->
    <ListContainer :banners="banners"></ListContainer>

    <!--    今日推荐-->
    <TodayRecommend></TodayRecommend>

    <!--    商品排行-->
    <Rank></Rank>

    <!--    猜你喜欢-->
    <Like></Like>

    <!--    楼层-->
    <Floor v-for="floor in floors" :floor-info="floor" :key="floor.id"></Floor>
<!--    <Floor :floor-info="floors[0]"></Floor>-->
<!--    <Floor :floor-info="floors[1]"></Floor>-->

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

  import {mapState} from 'vuex'

  export default {
    name: "Home",
    state() {
      return {}
    },
    components: {
      ListContainer,
      TodayRecommend,
      Rank,
      Like,
      Floor,
      Brand,
    },
    mounted() {
      //获取轮播图，floor数据
      this.$store.dispatch('home/getMessageAction')
    },
    computed:{
      ...mapState({
        banners:(state)=>state.home.banner,
        floors:(state)=>state.home.floor
      })
    },
    methods: {}
  }
</script>

<style scoped lang="less">

</style>