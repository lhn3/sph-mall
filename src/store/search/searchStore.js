import {getSearch} from '@/serve/search/searchServe'

export default {
  namespaced: true,
  state: {
    searchInfo: {},
  },
  getters: {
    getAttrsList(sate) {
      return sate.searchInfo.attrsList ?? []
    },
    getGoodsList(sate) {
      return sate.searchInfo.goodsList ?? []
    },
    getTrademarkList(sate) {
      return sate.searchInfo.trademarkList ?? []
    },
    getTotal(sate) {
      return sate.searchInfo.total ?? 0
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