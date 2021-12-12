import {getTypeNav} from '@/serve/home/homeServe'
export default {
  namespaced:true,
  state: {
    typeNav:[]
  },
  getters: {},
  mutations: {
    saveTypeNav(state,payload){
      state.typeNav=payload
    }
  },
  actions: {
    async getMessageAction(action){
      //获取三级联动标签数据
      const typeNav=await getTypeNav()
      typeNav.data.pop()
      action.commit('saveTypeNav',typeNav.data)
    }

  },
}