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
//导入支付弹窗
import {Button,MessageBox} from 'element-ui'
//懒加载导入
import VueLazyload from 'vue-lazyload'
import err from '@/assets/error.jpg'
import loading from '@/assets/loading.gif'
//导入表单验证
import '@/utils/veeValidate'

//使用懒加载插件
Vue.use(VueLazyload,{
  error: err,
  loading: loading,
})


Vue.config.productionTip = false

//注册全局组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Swiper.name,Swiper)
Vue.component(Pagination.name,Pagination)

//使用组件
Vue.use(Button)
//挂在原形上
Vue.prototype.$msgbox=MessageBox
Vue.prototype.$alert=MessageBox.alert

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
