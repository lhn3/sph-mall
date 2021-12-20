import {getCartList} from "@/serve/cart/cartServe";

export default {
  namespaced: true,
  state: {
    cartList: [],
  },
  getters: {},
  mutations: {
    saveCartList(state,payload){
      state.cartList=payload
    }
  },
  actions: {
    //获取商品详情页信息
    async getCartAction(action) {
      let cartList=await getCartList()
      action.commit('saveCartList',cartList.data)
    }
  },
}