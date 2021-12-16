import Vue from 'vue'
import App from './App.vue'
//导入注册的路由
import router from '@/router'
//导入store
import {store} from '@/store'
//导入全局组件
import TypeNav from "@/components/TypeNav/TypeNav";
import Swiper from "@/components/Swiper/Swiper"
import Pagination from "@/components/Pagination/Pagination"
//导入mock
import '@/mock/mockServe'
//导入swiper样式
import 'swiper/css/swiper.min.css'

Vue.config.productionTip = false

//注册全局组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Swiper.name,Swiper)
Vue.component(Pagination.name,Pagination)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
