import Vue from 'vue'
import App from './App.vue'
//导入注册的路由
import router from '@/router'
//导入store
import {store} from '@/store'
//导入组件
import TypeNav from "@/components/TypeNav/TypeNav";

Vue.config.productionTip = false

//注册全局组件
Vue.component(TypeNav.name,TypeNav)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
