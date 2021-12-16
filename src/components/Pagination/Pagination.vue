<template>
  <div class="pagination">
    <!-- 上 -->
<!--    当前页pageNo等于第一页不显示-->
    <button v-if="pageInfo.pageNo>1">上一页</button>
<!--    当前页pageNo要大于con页码范围的左边个数时显示-->
    <button v-if="pageInfo.pageNo>(pageInfo.con - 1) / 2">1</button>
<!--    比第一页显示多加一位，产生页面差距再显示-->
    <button v-if="pageInfo.pageNo>((pageInfo.con - 1) / 2) + 1">···</button>
    <!-- 中间部分 只显示以当前页数pageNo两边的con范围页数-->
    <button v-for="num in pageNumbers.endPage" v-if="num >= pageNumbers.startPage" :key="num">
      {{num}}
    </button>

    <!-- 下 与上相反逻辑-->
    <button v-if="pageInfo.pageNo<pageTotal-((pageInfo.con - 1) / 2) - 1">···</button>
    <button v-if="pageInfo.pageNo<pageTotal-(pageInfo.con - 1) / 2">{{pageTotal}}</button>
    <button v-if="pageInfo.pageNo<pageTotal">下一页</button>

    <button style="margin-left: 30px">共 {{pageInfo.total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props: {
      //{pageNo:1,pageSize: 10,total:101,con:5}
      pageInfo: {
        type: Object,
        default: () => ({})
      }
    },
    mounted() {
    },
    computed: {
      //总页数
      pageTotal() {
        return Math.ceil(this.pageInfo.total / this.pageInfo.pageSize)
      },

      //计算当前页数的起始页码
      pageNumbers() {
        let {pageNo, con} = this.pageInfo
        let startPage = 0
        let endPage = 0
        const pageTotal = this.pageTotal
        //如果总页数小于连续页数
        if (con > pageTotal) {
          startPage = 1
          endPage = pageTotal

          //如果总页数大于连续页数
        } else {
          if (pageNo === 1 || pageNo === 2) {
            startPage = 1
            endPage = con
          } else if (pageNo === pageTotal || pageNo === pageTotal - 1) {
            startPage = pageTotal - con
            endPage = pageTotal
          } else {
            startPage = pageNo - (con - 1) / 2
            endPage = pageNo + (con - 1) / 2
          }
        }
        return {startPage, endPage}
      }
    },
    methods: {}
  };
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;

    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }

  .active {
    background: skyblue;
  }
</style>
