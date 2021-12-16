<template>
  <div class="details clearfix">
    <div class="sui-navbar">
      <div class="navbar-inner filter">
        <ul class="sui-nav">
          <li
            :class="{'active':isShow(item.id)}"
            @click="changeOrders(item.id)"
            v-for="item in message"
            :key="item.id"
          >
            <a>{{item.title}}
              <span v-if="isShow(item.id)">
                <i :class="{'iconfont':true, 'icon-expand_less':isShow('desc'),'icon-expand_more':isShow('asc') }"/>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="goods-list">
      <ul class="yui3-g">
        <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
          <div class="list-wrap">
            <div class="p-img">
              <a href="item.html" target="_blank"><img :src="item.defaultImg"/></a>
            </div>
            <div class="price">
              <strong>
                <em>¥</em>
                &ensp;
                <i>{{item.price}}</i>
              </strong>
            </div>
            <div class="attr">
              <a target="_blank" href="item.html" :title="item.title">
                {{item.title}}
              </a>
            </div>
            <div class="commit">
              <i class="command">已有<span>{{item.hotScore}}</span>人评价</i>
            </div>
            <div class="operate">
              <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
              <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
<!--    分页-->
    <Pagination :pageInfo="pageInfo"/>
  </div>

</template>

<script>
  export default {
    name: "Detail",
    data(){
      return{
        message:[
          {id:'1',title:'综合'},
          {id:'2',title:'价格'}
        ],
        //1:desc,1:asc;2:desc,2:asc
        order:'1:desc'
      }
    },
    props:{
      goodsList:{
        type:Array,
        default:()=>[]
      },
      orders:{
        type:String,
        default:'1:desc'
      },
      pageInfo:{
        type:Object,
        default:()=>({})
      }
    },
    beforeMount() {
      this.order=this.orders
    },
    computed:{
      //是否显示箭头或是背景色
      isShow(){
        return function (info) {
          return this.order.indexOf(info)!=-1
        }
      }
    },
    methods:{
      //点击切换order
      changeOrders(id){
        if (id==1){
          this.order=='1:desc'?this.order='1:asc':this.order='1:desc'
        }else {
          this.order=='2:desc'?this.order='2:asc':this.order='2:desc'
        }
        this.$emit('changeOrder',this.order)
      },
    }
  }
</script>

<style scoped lang="less">
  .details {
    margin-bottom: 5px;

    .sui-navbar {
      overflow: visible;
      margin-bottom: 0;

      .filter {
        min-height: 40px;
        padding-right: 20px;
        background: #fbfbfb;
        border: 1px solid #e2e2e2;
        padding-left: 0;
        border-radius: 0;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

        .sui-nav {
          position: relative;
          left: 0;
          display: block;
          float: left;
          margin: 0 10px 0 0;

          li {
            float: left;
            line-height: 18px;

            a {
              display: block;
              cursor: pointer;
              padding: 11px 15px;
              color: #777;
              text-decoration: none;
            }

            &.active {
              a {
                background: #e1251b;
                color: #fff;
              }
            }
          }
        }
      }
    }

    .goods-list {
      margin: 20px 0;

      ul {
        display: flex;
        flex-wrap: wrap;

        li {
          height: 100%;
          width: 20%;
          margin-top: 10px;
          line-height: 28px;

          .list-wrap {
            .p-img {
              padding-left: 15px;
              width: 215px;
              height: 255px;

              a {
                color: #666;

                img {
                  max-width: 100%;
                  height: auto;
                  vertical-align: middle;
                }
              }
            }

            .price {
              padding-left: 15px;
              font-size: 18px;
              color: #c81623;

              strong {
                font-weight: 700;

                i {
                  margin-left: -5px;
                }
              }
            }

            .attr {
              padding-left: 15px;
              width: 85%;
              overflow: hidden;
              margin-bottom: 8px;
              min-height: 38px;
              cursor: pointer;
              line-height: 1.8;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;

              a {
                color: #333;
                text-decoration: none;
              }
            }

            .commit {
              padding-left: 15px;
              height: 22px;
              font-size: 13px;
              color: #a7a7a7;

              span {
                font-weight: 700;
                color: #646fb0;
              }
            }

            .operate {
              padding: 12px 15px;

              .sui-btn {
                display: inline-block;
                padding: 2px 14px;
                box-sizing: border-box;
                margin-bottom: 0;
                font-size: 12px;
                line-height: 18px;
                text-align: center;
                vertical-align: middle;
                cursor: pointer;
                border-radius: 0;
                background-color: transparent;
                margin-right: 15px;
              }

              .btn-bordered {
                min-width: 85px;
                background-color: transparent;
                border: 1px solid #8c8c8c;
                color: #8c8c8c;

                &:hover {
                  border: 1px solid #666;
                  color: #fff !important;
                  background-color: #666;
                  text-decoration: none;
                }
              }

              .btn-danger {
                border: 1px solid #e1251b;
                color: #e1251b;

                &:hover {
                  border: 1px solid #e1251b;
                  background-color: #e1251b;
                  color: white !important;
                  text-decoration: none;
                }
              }
            }
          }
        }
      }
    }

    .page {
      width: 733px;
      height: 66px;
      overflow: hidden;
      float: right;

      .sui-pagination {
        margin: 18px 0;

        ul {
          margin-left: 0;
          margin-bottom: 0;
          vertical-align: middle;
          width: 490px;
          float: left;

          li {
            line-height: 18px;
            display: inline-block;

            a {
              position: relative;
              float: left;
              line-height: 18px;
              text-decoration: none;
              background-color: #fff;
              border: 1px solid #e0e9ee;
              margin-left: -1px;
              font-size: 14px;
              padding: 9px 18px;
              color: #333;
            }

            &.active {
              a {
                background-color: #fff;
                color: #e1251b;
                border-color: #fff;
                cursor: default;
              }
            }

            &.prev {
              a {
                background-color: #fafafa;
              }
            }

            &.disabled {
              a {
                color: #999;
                cursor: default;
              }
            }

            &.dotted {
              span {
                margin-left: -1px;
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                font-size: 14px;
                border: 0;
                padding: 9px 18px;
                color: #333;
              }
            }

            &.next {
              a {
                background-color: #fafafa;
              }
            }
          }
        }

        div {
          color: #333;
          font-size: 14px;
          float: right;
          width: 241px;
        }
      }
    }
  }
  a{cursor: pointer}
</style>