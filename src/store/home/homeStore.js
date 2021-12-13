import {getBanner, getFloor, getTypeNav} from '@/serve/home/homeServe'
export default {
  namespaced:true,
  state: {
    typeNav:[],
    banner:[],
    floor:[]
  },
  getters: {},
  mutations: {
    saveTypeNav(state,payload){
      state.typeNav=payload
    },
    saveBanner(state,payload){
      state.banner=payload
    },
    saveFloor(state,payload){
      state.floor=payload
    },
  },
  actions: {
    //获取三级联动标签数据
    async getTypeNavAction(action){
      const typeNav=await getTypeNav()
      typeNav.data.pop()
      action.commit('saveTypeNav',typeNav.data)
    },
    //获取首页其他数据
    async getMessageAction(action){
      //获取轮播图数据
      const banner=await getBanner()
      action.commit('saveBanner',banner.data)
      //获取floor
      const floor=await getFloor()
      action.commit('saveFloor',floor.data)
    }

  },
}