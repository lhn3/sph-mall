import vue from 'vue'
import Router from 'vue-router'
//使用插件
vue.use(Router)

//引入组件
const Home = () => import('@/pages/Home/Home')
const Login = () => import('@/pages/Login/Login')
const Register = () => import('@/pages/Register/Register')
const Search = () => import('@/pages/Search/Search')

export default new Router({
  //配置路由
  routes: [
    {
      path:'/home',
      component:Home,
      children:[]
    },
    {
      path:'/login',
      component:Login,
    },
    {
      path:'/register',
      component:Register,
    },
    {
      path:'/search',
      component:Search,
    },
  ]
})