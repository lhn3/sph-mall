import {getSearch} from '@/serve/search/searchServe'

export default {
  namespaced: true,
  state: {
    searchInfo: {},
  },
  getters: {
    getAttrsList(state) {
      return state.searchInfo.attrsList ?? []
    },
    getGoodsList(state) {
      return state.searchInfo.goodsList ?? []
    },
    getTrademarkList(state) {
      return state.searchInfo.trademarkList ?? []
    },
    getTotal(state) {
      return state.searchInfo.total ?? 0
    }
  },
  mutations: {
    saveSearchInfo(state, payload) {
      state.searchInfo = payload
    },
  },
  actions: {
    //获取搜索内容
    async getSearchInfoAction(action, payload) {
      const searchInfo = await getSearch(payload)
      action.commit('saveSearchInfo', searchInfo.data)
    },
  },
}