<template>
  <div>
    <!--三级联动-->
    <TypeNav/>

    <div class="main">
      <div class="py-container">
        <!--面包屑-->
        <Bread :bread="bread" @removeBread="removeBread"/>

        <!--选择部分-->
        <SearchSelector
                :attrsList="getAttrsList"
                :trademarkList="getTrademarkList"
                @trademark="trademark"
                @attr="attr"/>

        <!--主要部分-->
        <Detail
                :goodsList="getGoodsList"
                :orders="searchDate.order"
                @changeOrder="changeOrder"
                :pageInfo="{pageNo:6,pageSize: 10,total:101,con:5}"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
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
          order: "1:desc",
          //分页器用的:代表的是当前是第几页
          pageNo: 1,
          //代表的是每一个展示数据个数
          pageSize: 10,
          //平台售卖属性操作带的参数
          props: [],
          //品牌
          trademark: "",
        },
      //  面包屑
        bread: {props:[]},
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
    computed: {
      ...mapGetters('search', ['getAttrsList', 'getGoodsList', 'getTrademarkList']),
    },
    methods:{
      //获取搜索页面数据
      toSearch(){
        let params = this.$route.params
        let query = this.$route.query
        //每次也要保存面包屑数据
        this.bread= {...this.$route.params,...this.$route.query,...this.bread}
        this.$store.dispatch('search/getSearchInfoAction', {...params, ...query,...this.searchDate})
      },

    //删除面包屑
      removeBread(info){
        let params = this.$route.params
        let query = this.$route.query
        //删除路由中的query参数
        if (info=='categoryName'){
          Vue.delete(query,info)
          Vue.delete(query,'category1Id')
          Vue.delete(query,'category2Id')
          Vue.delete(query,'category3Id')
        }else if (info=='keyword'){
          //删除路由中的params参数
          Vue.delete(params,info)
          Vue.delete(params,'category1Id')

        }else if (info=='trademark') {
          //删除品牌
          this.searchDate[info]=''
        }else {
          //平台售卖属性操作带的参数,info为索引
          Vue.delete(this.searchDate.props,info)
          Vue.delete(this.bread.props,info)
        }
        //面包屑内容要删除
        Vue.delete(this.bread,info)
        //有问题，query参数改变，trademark，props参数改变请求不会发送！！！！！！！！！！！！！！！！！！！
        this.$router.push({name:'search',params,query})
      },

      //点击品牌发送请求
      trademark(item){
        this.searchDate.trademark=`${item.tmId}:${item.tmName}`
        //添加面包屑
        this.bread={...this.bread,trademark:item.tmName}
        this.toSearch()
      },

      //点击商品其他信息发送请求
      attr(i){
        if (this.searchDate.props.indexOf(i)==-1){
          this.searchDate.props.push(i)
        }
        //添加面包屑
        let prop=i.split(':')[1]
        if (this.bread.props.indexOf(prop)==-1){
          this.bread.props.push(prop)
        }
        this.toSearch()
      },

      //排序
      changeOrder(order){
        this.searchDate.order=order
        this.toSearch()
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