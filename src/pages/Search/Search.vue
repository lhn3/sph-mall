<template>
  <div>
    <!--三级联动-->
    <TypeNav/>

    <div class="main">
      <div class="py-container">
        <!--面包屑-->
        <Bread/>

        <!--选择部分-->
        <SearchSelector/>

        <!--主要部分-->
        <Detail/>
      </div>
    </div>
  </div>
</template>

<script>
  import Bread from './childCpns/Bread'
  import SearchSelector from './childCpns/SearchSelector'
  import Detail from "./childCpns/Detail";

  export default {
    name: 'Search',

    components: {
      Bread,
      SearchSelector,
      Detail
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