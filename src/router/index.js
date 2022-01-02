import vue from 'vue'
import Router from 'vue-router'
import {store} from "@/store";
//使用插件
vue.use(Router)

//引入组件
const Home = () => import('@/pages/Home/Home')
const Login = () => import('@/pages/Login/Login')
const Register = () => import('@/pages/Register/Register')
const Search = () => import('@/pages/Search/Search')
const Detail = () => import('@/pages/Detail/Detail')
const AddCart = () => import('@/pages/Detail/childCpns/AddCartSuccess')
const ShopCart = () => import('@/pages/ShopCart/ShopCart')
const Trade = () => import('@/pages/Trade/Trade')
const Pay = () => import('@/pages/Pay/Pay')
const PaySuccess = () => import('@/pages/Pay/PaySuccess')

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


const router=new Router({
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
      path:'/search/:keyword?',
      name:'search',
      component:Search,
      meta:{
        showFooter:true
      },
      // props:true,
      // props:{a:1,b:2},
      // props:($route)=>({params:$route.params,query:$route.query})
    },
    {
      path:'/detail/:goodsId',
      name:'detail',
      component:Detail,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/addCart',
      name:'addCart',
      component:AddCart,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/shopCart',
      name: 'shopCart',
      component:ShopCart,
      meta:{
        showFooter:true
      },
    },
    {
      path: '/trade',
      name: 'trade',
      component:Trade,
      meta:{
        showFooter:true
      },
    },
    {
      path: '/pay',
      name: 'pay',
      component:Pay,
      meta:{
        showFooter:true
      },
    },
    {
      path: '/paySuccess',
      name: 'paySuccess',
      component:PaySuccess,
      meta:{
        showFooter:true
      },
    },
  ],
  //路由跳转滚动条回到顶部
  scrollBehavior(to,from,savedPosition){
    return {y:0}
  }
})

//全局前置守卫
router.beforeEach((to,from,next)=>{
  //to:想要去的路由信息
  //from:从哪个路由来的信息
  //next():放行
  //next(false):中断当前导航
  //next({path:'/login'}):放行到哪个路由

  //如果登录后再前往登录页，自动跳转到首页
  const isToken=Boolean(store.state.user.token)
  if (isToken){
    if (to.path=='/login'){
      next('/home')
    }
  }
  //如果没登录前往购物车，会跳转到登录页面
  if (!isToken){
    if (to.path=='/shopCart' ||
        to.path=='/addCart' ||
        to.path=='/trade' ||
        to.path=='/trade' ||
        to.path=='/pay'||
        to.path=='/paySuccess'){
      next('/login')
    }
  }
  next()
})

export default router