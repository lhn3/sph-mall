<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="categoryShow" @mouseleave="categoryHidden">
      <h2 class="all" >全部商品分类</h2>
        <div class="sort" v-show="isShow">
          <div class="all-sort-list2" @click="toSearch">
            <div class="item" v-for="(item1,index) in categoryList" :key="item1.categoryId"
                 :class="{'active':actIndex==index}"
                 @mouseenter="focusItem(index)"
                 @mouseleave="blurItem">
              <h3>
                <a :data-category="item1.categoryName" :data-category1="item1.categoryId">{{item1.categoryName}}</a>
              </h3>
              <div class="item-list clearfix" :style="{display:actIndex==index?'block':'none' }">
                <div class="subitem" v-for="item2 in item1.categoryChild" :key="item2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a :data-category="item2.categoryName" :data-category2="item2.categoryId">{{item2.categoryName}}</a>
                    </dt>
                    <dd>
                      <em v-for="item3 in item2.categoryChild" :key="item3.categoryId">
                        <a :data-category="item3.categoryName"
                           :data-category3="item3.categoryId">{{item3.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <nav class="nav">
        <a>服装城</a>
        <a>美妆馆</a>
        <a>尚品汇超市</a>
        <a>全球购</a>
        <a>闪购</a>
        <a>团购</a>
        <a>有趣</a>
        <a>秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
  import debounce from 'lodash/debounce'
  import {mapState} from "vuex";

  export default {
    name: "TypeNav",
    data() {
      return {
        actIndex: -1,
        isShow:true,
      }
    },
    mounted() {
      //如果是进入搜索页面，一进入就先隐藏
      if(this.$route.name=='search'){
        this.isShow=false
      }
    },

    computed: {
      ...mapState({
        // state为根，包含所有模块的state
        categoryList: (state) => state.home.typeNav
      })
    },

    methods: {
      //防抖
      //鼠标进入离开增加删除背景色
      focusItem: debounce(function (i) {
        this.actIndex = i
      }, 50),
      blurItem() {
        this.actIndex = -1
      },

      //在搜索页面，鼠标进入离开显示和隐藏category
      categoryShow(){
        if (this.$route.name=='search'){
          this.isShow=true
        }
      },
      categoryHidden(){
        if (this.$route.name=='search'){
          this.isShow=false
        }
      },

      //  组件跳转(事件委派)
      toSearch(event) {
        //绑定在标签上 data- 的属性，通过event.target.dataset获取
        const {category, category1, category2, category3} = event.target.dataset
        //点击了任何一个a标签
        if (category) {
          let query = {categoryName: category}
          //点击了第一级标签
          if (category1) {
            query.category1Id = category1
            //点击了第二级标签
          } else if (category2) {
            query.category2Id = category2
            //点击了第二级标签
          } else {
            query.category3Id = category3
          }

          //  组件跳转
          this.$router.push({name: 'search', query: query})
          this.show=false
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;

      .all {
        width: 210px;
        height: 45px;
        background-color: #e1251b;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }

      .nav {
        a {
          height: 45px;
          margin: 0 22px;
          line-height: 45px;
          font-size: 16px;
          color: #333;
        }
      }

      .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 461px;
        position: absolute;
        background: #fafafa;
        z-index: 999;

        .all-sort-list2 {
          .item {
            h3 {
              line-height: 30px;
              font-size: 14px;
              font-weight: 400;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;

              a {
                color: #333;
              }
            }

            .item-list {
              display: none;
              position: absolute;
              width: 734px;
              min-height: 460px;
              background: #f7f7f7;
              left: 210px;
              border: 1px solid #ddd;
              top: 0;
              z-index: 9999 !important;

              .subitem {
                float: left;
                width: 650px;
                padding: 0 4px 0 8px;

                dl {
                  border-top: 1px solid #eee;
                  padding: 6px 0;
                  overflow: hidden;
                  zoom: 1;

                  &.fore {
                    border-top: 0;
                  }

                  dt {
                    float: left;
                    width: 54px;
                    line-height: 22px;
                    text-align: right;
                    padding: 3px 6px 0 0;
                    font-weight: 700;
                  }

                  dd {
                    float: left;
                    width: 415px;
                    padding: 3px 0 0;
                    overflow: hidden;

                    em {
                      float: left;
                      height: 14px;
                      line-height: 14px;
                      padding: 0 8px;
                      margin-top: 5px;
                      border-left: 1px solid #ccc;
                    }
                  }
                }
              }
            }

            /*&:hover {*/
            /*  .item-list {*/
            /*    display: block;*/
            /*  }*/
            /*}*/
          }
        }
      }
    }
  }

  .active {
    background-color: #a4cb76;
  }

  a {
    cursor: pointer;
    text-decoration: none !important;
  }

</style>