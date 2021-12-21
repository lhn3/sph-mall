import {request} from '../request'

//获取购物车列表
export const getCartList = () => {
  return request({
    url: '/cart/cartList',
  })
}

//购物车删除某个商品
export const delCartGoods = (id) => {
  return request({
    method:'delete',
    url: '/cart/deleteCart/'+id,
  })
}

//购物车某个商品是否选择
export const changeCartCheck = (data) => {
  return request({
    url: `/cart/checkCart/${data.id}/${data.isChecked}`,
  })
}
