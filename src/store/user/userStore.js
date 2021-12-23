import {finishRegister, getCode,login} from '@/serve/user/userServe'
import cache from "@/utils/cache";

export default {
  namespaced:true,
  state: {
    token:'',
    userId:'',
    username:'',
  },
  getters: {},
  mutations: {
    saveUserInfo(state,payload){
      state.token=payload.token
      state.userId=payload.userId
      state.username=payload.name
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
    },
    //登录
    async loginAction(action,payload){
      const res=await login(payload)
      //如果登陆成功
      if (res.code==200){
        // 本地保存token
        action.commit('saveUserInfo',res.data)
        cache.setCache('sph_userInfo',res.data)
      }
      return res
    },



  //  数据持久化
    userInfoToVuex(action){
      const userInfo=cache.getCache('sph_userInfo')??{}
      action.commit('saveUserInfo',userInfo)
    }
  },
}