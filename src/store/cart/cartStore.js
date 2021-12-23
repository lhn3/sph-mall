import {changeCartCheck, delCartGoods, getCartList} from "@/serve/cart/cartServe";
import {updateCart} from "@/serve/detail/detailServe";

export default {
  namespaced: true,
  state: {
    cartList: [],
    totalPrice:0,
    selectNum:0,
    checkedAll:true,
  },
  getters: {},
  mutations: {
    saveCartList(state,payload){
      state.cartList=payload
    },
    saveChangeList(state,payload){
      state.totalPrice=payload.price
      state.checkedAll=payload.checkedAll
      state.selectNum=payload.selectNum
    },
  },
  actions: {
    //获取商品详情页信息
    async getCartAction(action) {
      let res=await getCartList()
      let cartList=res.data[0]?.cartInfoList || []
      action.commit('saveCartList',cartList)
    },

    //修改商品的数量
    async changeGoodsNumAction(action,payload){
      await updateCart(payload)
      action.dispatch('getCartAction')
    },

    //删除商品的数量
    async delCartGoodsAction(action,payload){
      let res=await delCartGoods(payload)
      action.dispatch('getCartAction')
      return res
    },

    //修改商品是否选择
    async changeCartCheckAction(action,payload){
      await changeCartCheck(payload)
      action.dispatch('getCartAction')
    },

    //修改全部商品是否选择
    changeAllCartCheckAction({dispatch,state},payload){
      const {isChecked}=payload
      let promiseList=[]
      state.cartList.forEach(item=>{
        promiseList.push(dispatch('changeCartCheckAction',{id:item.skuId,isChecked}))
      })
      return Promise.all(promiseList)
    },

    //删除所选的商品
    delSelectCartGoodsAction({dispatch,state}){
      let promiseList=[]
      state.cartList.forEach(item=>{
        promiseList.push(item.isChecked==1?dispatch('delCartGoodsAction',item.skuId):'')
      })
      return Promise.all(promiseList)
    }
  },
}