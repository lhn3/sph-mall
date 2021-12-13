import vue from 'vue'
import Router from 'vue-router'
//使用插件
vue.use(Router)

//引入组件
const Home = () => import('@/pages/Home/Home')
const Login = () => import('@/pages/Login/Login')
const Register = () => import('@/pages/Register/Register')
const Search = () => import('@/pages/Search/Search')

//重写Router原形上的push,replace方法
let oldPush=Router.prototype.push
let oldReplace=Router.prototype.replace
Router.prototype.push=function (location,resolve,reject) {
  if(resolve||reject){
    oldPush.call(this,location,resolve,reject)
  }else {
    oldPush.call(this,location,()=>{})
  }
}
Router.prototype.replace=function (location,resolve,reject) {
  if(resolve||reject){
    oldReplace.call(this,location,resolve,reject)
  }else {
    oldReplace.call(this,location,()=>{})
  }
}


export default new Router({
  //配置路由
  routes: [
      // 重定向
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/home',
      name:'home',
      component:Home,
      children:[],
      meta:{
        showFooter:true
      }
    },
    {
      path:'/login',
      name:'login',
      component:Login,
      meta:{
        showFooter:false
      }
    },
    {
      path:'/register',
      name:'register',
      component:Register,
      meta:{
        showFooter:false
      }
    },
    {
      path:'/search/:key?',
      name:'search',
      component:Search,
      meta:{
        showFooter:true
      },
      // props:true,
      // props:{a:1,b:2},
      // props:($route)=>({params:$route.params,query:$route.query})
    },
  ]
})