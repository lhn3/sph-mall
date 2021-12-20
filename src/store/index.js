import Vue from 'vue'
import Vuex from 'vuex'
import homeStore from "@/store/home/homeStore";
import searchStore from "@/store/search/searchStore";
import userStore from "@/store/user/userStore";
import detailStore from "@/store/detail/detailStore";
import cartStore from "@/store/cart/cartStore";
//安装插件
Vue.use(Vuex)

//定义仓库
export const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    home: homeStore,
    search: searchStore,
    detail: detailStore,
    cart: cartStore,
    user: userStore
  }
})