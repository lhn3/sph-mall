import {getDetail} from "@/serve/detail/detailServe";

export default {
  namespaced: true,
  state: {
    categoryView: {},
    price: '',
    skuInfo: {},
    spuSaleAttrList: {},
    valuesSkuJson: {}
  },
  getters: {},
  mutations: {
    saveCategoryView(state, payload) {
      state.categoryView = payload
    },
    savePrice(state, payload) {
      state.price = payload
    },
    saveSkuInfo(state, payload) {
      state.skuInfo = payload
    },
    saveSpuSaleAttrList(state, payload) {
      state.spuSaleAttrList = payload
    },
    saveValuesSkuJson(state, payload) {
      state.valuesSkuJson = payload
    },
  },
  actions: {
    //获取商品详情页信息
    async getDetailAction(action, payload) {
      const detail = await getDetail(payload)
      console.log(detail.data)
      const {categoryView, price, skuInfo, spuSaleAttrList, valuesSkuJson} = detail.data
      action.commit('saveCategoryView', categoryView)
      action.commit('savePrice', price)
      action.commit('saveSkuInfo', skuInfo)
      action.commit('saveSpuSaleAttrList', spuSaleAttrList)
      action.commit('saveValuesSkuJson', valuesSkuJson)
    },
  },
}