<template>
  <section class="con">
    <!-- 导航路径区域 -->
    <div class="conPoin">
      <span v-if="categoryView.category1Name">{{categoryView.category1Name}}</span>
      <span v-if="categoryView.category2Name">{{categoryView.category2Name}}</span>
      <span v-if="categoryView.category3Name">{{categoryView.category3Name}}</span>
    </div>
    <!-- 主要内容区域 -->
    <div class="mainCon">
      <!-- 左侧放大镜区域 -->
      <div class="previewWrap">
        <!--放大镜效果-->
        <Zoom :bigImg="bigImg"/>
        <!-- 小图列表 -->
        <ImageList :skuImageList="skuInfo.skuImageList" @showImg="showImg"/>
      </div>
      <!-- 右侧选择区域布局 -->
      <div class="InfoWrap">
        <div class="goodsDetail">
          <h3 class="InfoName">{{skuInfo.skuName}}</h3>
          <p class="news">{{skuInfo.skuDesc}}</p>
          <div class="priceArea">
            <div class="priceArea1">
              <div class="title">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</div>
              <div class="price">
                <i>¥</i>
                <em>{{skuInfo.price}}</em>
                <span>降价通知</span>
              </div>
              <div class="remark">
                <i>累计评价</i>
                <em>65545</em>
              </div>
            </div>
            <div class="priceArea2">
              <div class="title">
                <i>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</i>
              </div>
              <div class="fixWidth">
                <i class="red-bg">加价购</i>
                <em class="t-gray">满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品</em>
              </div>
            </div>
          </div>
          <div class="support">
            <div class="supportArea">
              <div class="title">支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</div>
              <div class="fixWidth">以旧换新，闲置手机回收 4G套餐超值抢 礼品购</div>
            </div>
            <div class="supportArea">
              <div class="title">配 送 至</div>
              <div class="fixWidth">广东省 深圳市 宝安区</div>
            </div>
          </div>
        </div>

        <div class="choose">
          <div class="chooseArea">
            <div class="choosed"></div>
            <dl v-for="items in mySpu" :key="items.id">
              <dt class="title">{{items.saleAttrName}}</dt>
              <dd changepirce="0"
                  :class="{'active':item.isChecked==1}"
                  v-for="item in items.spuSaleAttrValueList"
                  :key="item.id"
                  @click="changeInfo(items,item)">
                {{item.saleAttrValueName}}
              </dd>
            </dl>
          </div>
          <div class="cartWrap">
            <div class="controls">
              <input autocomplete="off" class="itxt" v-model="num" @change="inputNum">
              <a class="plus" @click="num++">+</a>
              <a class="mins" @click="num > 1 ? num-- : num = 1">-</a>
            </div>
            <div class="add">
              <a @click="toMark">加入购物车</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import ImageList from './ImageList'
  import Zoom from './Zoom'
  import cache from '@/utils/cache.js'
  export default {
    name: "GoodsInfo",
    data(){
      return{
        bigImg:'',
        //先保存一份方便改变数据
        mySpu:[],
        num:1
      }
    },
    props:{
      categoryView:{
        type:Object,
        default:()=>({})
      },
      skuInfo:{
        type:Object,
        default:()=>({})
      },
      spuSaleAttrList:{
        type:Array,
        default:()=>[]
      }
    },
    watch:{
      //初始加载的大图图片
      skuInfo(){
        this.bigImg=this.skuInfo.skuImageList[0].imgUrl
      },
      //保存一份数据方便更改数据内容，单向数据流
      spuSaleAttrList(){
        this.mySpu=this.spuSaleAttrList
      },
    },
    components:{
      ImageList,
      Zoom
    },
    computed:{
      //选择的商品参数
      spu(){
        let info='/'
        this.mySpu.forEach(item=>{
          item.spuSaleAttrValueList.forEach(i=>{
            if (i.isChecked==1){
              info+=i.saleAttrValueName+'/'
            }
          })
        })
        return info
      },
    },
    methods:{
      //放大镜图片
      showImg(id){
        const bigImgObj=this.skuInfo.skuImageList.find((item)=>{
          return item.id==id
        })
        this.bigImg=bigImgObj.imgUrl
      },

      //选择不同的商品属性
      changeInfo(items,item){
        items.spuSaleAttrValueList.forEach(i=>{
          i.isChecked=0
        })
        item.isChecked=1
      },

      //输入的数量校验
      inputNum(e){
        let value=e.target.value*1
        if (isNaN(value) || value<1){
          this.num=1
        }else {
          this.num=parseInt(value)
        }
      },
      //加入购物车
      async toMark(){
        //商品Id，商品数量
        let info=this.spu
        let res=await this.$store.dispatch('detail/updateCartAction',{id:this.skuInfo.id,num:this.num})
        if (res.code==200){
          //本地储存
          cache.setCache('updateCart',
              {id:this.skuInfo.id,title:this.skuInfo.skuName,img:this.skuInfo.skuDefaultImg,spu:info,num:this.num})
          this.$router.push({name:'addCart'})
        }else {
          alert('加入购物车失败')
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .con {
    width: 1200px;
    margin: 15px auto 0;

    .conPoin {
      padding: 9px 15px 9px 0;

      &>span+span:before {
        content: "/\00a0";
        padding: 0 5px;
        color: #ccc;
      }
    }

    .mainCon {
      overflow: hidden;
      margin: 5px 0 15px;

      .previewWrap {
        float: left;
        width: 400px;
        position: relative;
      }

      .InfoWrap {
        width: 700px;
        float: right;

        .InfoName {
          font-size: 14px;
          line-height: 21px;
          margin-top: 15px;
        }

        .news {
          color: #e12228;
          margin-top: 15px;
        }

        .priceArea {
          background: #fee9eb;
          padding: 7px;
          margin: 13px 0;

          .priceArea1 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              float: left;
              margin-right: 15px;
            }

            .price {
              float: left;
              color: #c81623;

              i {
                font-size: 16px;
              }

              em {
                font-size: 24px;
                font-weight: 700;
              }

              span {
                font-size: 12px;
              }
            }

            .remark {
              float: right;
            }
          }

          .priceArea2 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;

              .red-bg {
                background: #c81623;
                color: #fff;
                padding: 3px;
              }

              .t-gray {
                color: #999;
              }
            }
          }


        }

        .support {
          border-bottom: 1px solid #ededed;
          padding-bottom: 5px;

          .supportArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;
              color: #999;
            }
          }
        }

        .choose {
          .chooseArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            dl {
              overflow: hidden;
              margin: 13px 0;

              dt {
                margin-right: 15px;
                float: left;
              }

              dd {
                float: left;
                margin-right: 5px;
                color: #666;
                line-height: 24px;
                padding: 2px 14px;
                border-top: 1px solid #eee;
                border-right: 1px solid #bbb;
                border-bottom: 1px solid #bbb;
                border-left: 1px solid #eee;

                &.active {
                  color: green;
                  border: 1px solid green;
                }
              }
            }
          }

          .cartWrap {
            .controls {
              width: 48px;
              position: relative;
              float: left;
              margin-right: 15px;

              .itxt {
                width: 38px;
                height: 37px;
                border: 1px solid #ddd;
                color: #555;
                float: left;
                border-right: 0;
                text-align: center;
              }

              .plus,
              .mins {
                width: 15px;
                text-align: center;
                height: 17px;
                line-height: 17px;
                background: #f1f1f1;
                color: #666;
                position: absolute;
                right: -8px;
                border: 1px solid #ccc;
              }

              .mins {
                right: -8px;
                top: 19px;
                border-top: 0;
              }

              .plus {
                right: -8px;
              }
            }

            .add {
              float: left;

              a {
                background-color: #e1251b;
                padding: 0 25px;
                font-size: 16px;
                color: #fff;
                height: 36px;
                line-height: 36px;
                display: block;
              }
            }
          }
        }
      }
    }
  }
  dd{
    cursor: pointer;
  }
  a{
    cursor: pointer;
  }

  /*取消number类型的input上下点击按钮*/
  /*input::-webkit-outer-spin-button,*/
  /*input::-webkit-inner-spin-button{*/
  /*  -webkit-appearance: none !important;*/
  /*}*/

  /*取消input选中后的边框*/
  input{
    outline:none;
  }
</style>