import {getCartList} from "@/serve/cart/cartServe";

export default {
  namespaced: true,
  state: {
    cartList: [],
    totalPrice:0,
    clickAll:true
  },
  getters: {},
  mutations: {
    saveCartList(state,payload){
      state.cartList=payload
    },
    saveTotalPrice(state,payload){
      state.totalPrice=payload
    },
    saveClickAll(state,payload){
      state.clickAll=payload
    },

  },
  actions: {
    //获取商品详情页信息
    async getCartAction(action) {
      let cartList=await getCartList()
      action.commit('saveCartList',cartList.data[0].cartInfoList)
    }
  },
}