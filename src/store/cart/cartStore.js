import {getCartList} from "@/serve/cart/cartServe";
import {updateCart} from "@/serve/detail/detailServe";

export default {
  namespaced: true,
  state: {
    cartList: [],
    totalPrice:0,
    selectNum:0,
    checkedAll:true,
  },
  getters: {},
  mutations: {
    saveCartList(state,payload){
      state.cartList=payload
    },
    saveChangeList(state,payload){
      state.totalPrice=payload.price
      state.checkedAll=payload.checkedAll
      state.selectNum=payload.selectNum
    },
  },
  actions: {
    //获取商品详情页信息
    async getCartAction(action) {
      let cartList=await getCartList()
      action.commit('saveCartList',cartList.data[0].cartInfoList)
    },
    //修改商品的数量
    async changeGoodsNumAction(action,payload){
      await updateCart(payload)
      action.dispatch('getCartAction')
    }
  },
}