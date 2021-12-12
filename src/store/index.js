import Vue from 'vue'
import Vuex from 'vuex'
import homeStore from "@/store/home/homeStore";
import searchStore from "@/store/search/searchStore";
import userStore from "@/store/user/userStore";
//安装插件
Vue.use(Vuex)

//定义仓库
export default store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    home:homeStore,
    search:searchStore,
    user:userStore
  }
})