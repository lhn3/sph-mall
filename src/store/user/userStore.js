import {finishRegister, getCode} from '@/serve/user/userServe'

export default {
  namespaced:true,
  state: {
    code:null
  },
  getters: {},
  mutations: {
    saveCode(state,payload){
      state.code=payload
    }
  },
  actions: {
    //获取手机验证码
    async getCodeAction(action,payload){
      const res=await getCode(payload)
      return res
    },
    //完成注册
    async finishRegisterAction(action,payload){
      const res=await finishRegister(payload)
      return res
    }
  },
}