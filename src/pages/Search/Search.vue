<template>
  <div>
    <!--三级联动-->
    <TypeNav/>

    <div class="main">
      <div class="py-container">
        <!--面包屑-->
        <Bread/>

        <!--选择部分-->
        <SearchSelector :attrsList="getAttrsList" :trademarkList="getTrademarkList"/>

        <!--主要部分-->
        <Detail :goodsList="getGoodsList"/>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Bread from './childCpns/Bread'
  import SearchSelector from './childCpns/SearchSelector'
  import Detail from "./childCpns/Detail";

  export default {
    name: 'Search',
    data() {
      return {
        searchDate: {
          // //一级分类的id
          // category1Id: "",
          // //二级分类id
          // category2Id: "",
          // //三级分类的id
          // category3Id: "",
          // //分类名字
          // categoryName: "",
          // //params参数
          // keyword: "",
          //排序
          order: "",
          //分页器用的:代表的是当前是第几页
          pageNo: 1,
          //代表的是每一个展示数据个数
          pageSize: 10,
          //平台售卖属性操作带的参数
          props: [],
          //品牌
          trademark: "",
        }
      }
    },
    components: {
      Bread,
      SearchSelector,
      Detail
    },
    beforeMount() {
      //挂载完毕前执行一次
      this.toSearch()
    },
    mounted() {
    },
    computed: {
      ...mapGetters('search', ['getAttrsList', 'getGoodsList', 'getTrademarkList']),
    },
    methods:{
      //说去搜索页面数据
      toSearch(){
        let params = this.$route.params
        let query = this.$route.query
        this.$store.dispatch('search/getSearchInfoAction', {...params, ...query,...this.searchDate})
      }
    },
    watch:{
      //监听路由信息变化再次发送请求
      $route(newValue,oldValue){
        this.toSearch()
      }
    }
  }

</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;
    }
  }
</style>