import {getTradeGoods, getUserAddress} from "@/serve/trade/tradeServe";

export default {
  namespaced: true,
  state: {
    address: [],
    goods: {}
  },
  getters: {},
  mutations: {
    saveAddress(state, payload) {
      state.address = payload
    },
    saveGoods(state, payload) {
      state.goods = payload
    },
  },
  actions: {
    //获取地址
    async getUserAddressAction(action) {
      const res = await getUserAddress()
      action.commit('saveAddress', res.data)
    },
    //获取交易清单
    async getTradeGoodsAction(action) {
      const res = await getTradeGoods()
      action.commit('saveGoods', res.data)
    }
  },
}