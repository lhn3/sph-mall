import {finishRegister, getAuth, getCode, login} from '@/serve/user/userServe'
import cache from "@/utils/cache";

export default {
  namespaced:true,
  state: {
    token:'',
    userId:'',
    username:'',
    phone:'',
    avatar:'',
    status:1,
    gender:''
  },
  getters: {},
  mutations: {
    saveToken(state,payload){
      state.token=payload
    },
    saveUserInfo(state,payload){
      state.userId=payload.id
      state.username=payload.nickName
      state.phone=payload.phoneNum
      state.avatar=payload.headImg
      state.status=payload.status
      state.gender=payload.gender
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
        action.commit('saveToken',res.data.token)
        cache.setCache('sph_token',res.data.token)
      }
      return res
    },
    //获取用户信息
    async getAuthAction(action){
      const res=await getAuth()
      if (res.code==200){
        // 本地保存用户信息
        action.commit('saveUserInfo',res.data??{})
        cache.setCache('sph_userInfo',res.data??{})
      }
    },

  //  数据持久化
    userInfoToVuex(action){
      const token=cache.getCache('sph_token')??''
      const userInfo=cache.getCache('sph_userInfo')??{}
      action.commit('saveToken',token)
      action.commit('saveUserInfo',userInfo)
    }
  },
}