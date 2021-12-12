import Vue from 'vue'
import App from './App.vue'
//导入注册的路由
import router from '@/router'
//导入store
import store from '@/store'

Vue.config.productionTip = false

//注册全局组件
Vue.component(TypeNav.name,TypeNav)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
