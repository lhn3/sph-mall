import {getPayInfo} from "@/serve/pay/payServe";

export default {
  namespaced: true,
  state: {
    codeUrl:'',
    totalFee:0
  },
  getters: {},
  mutations: {
    saveCodeUrl(state,payload) {
      state.codeUrl=payload
    },
    saveTotalFee(state,payload){
      state.totalFee=payload
    }
  },
  actions: {
    async getPayInfoAction(action,payload){
      const res=await getPayInfo(payload)
      if (res.code==200){
        const {codeUrl,totalFee}=res.data
        action.commit('saveCodeUrl',codeUrl)
        action.commit('saveTotalFee',totalFee)
      }
    }

  },
}